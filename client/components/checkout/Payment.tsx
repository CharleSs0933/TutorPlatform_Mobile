import { Alert, Image, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { useStripe } from "@stripe/stripe-react-native";
import {
  useAddMoneyToWalletMutation,
  useCreateStripePaymentIntentMutation,
} from "@/state/api";
import { images } from "@/constants";
import CustomButton from "../CustomButton";
import { router } from "expo-router";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";

declare interface PaymentProps {
  fullName: string;
  email: string;
  amount: number;
  bonus: number;
  refetch: () => void;
}

const Payment = ({
  amount,
  fullName,
  email,
  bonus = 0,
  refetch,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [createStripePaymentIntent] = useCreateStripePaymentIntentMutation();
  const [addMoneyToWallet] = useAddMoneyToWalletMutation();

  const initializePaymentSheet = async () => {
    const { paymentIntent, customer, ephemeralKey } =
      await createStripePaymentIntent({
        name: fullName || email.split("@")[0],
        email: email,
        amount: amount,
        // paymentMethodId: paymentMethod.id,
      }).unwrap();

    console.log(paymentIntent);

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey.secret,
      paymentIntentClientSecret: paymentIntent.client_secret,

      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      // allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });

    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      try {
        await addMoneyToWallet({ amount: amount + bonus }).unwrap();
        refetch();
        setSuccess(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Pressable
        onPress={openPaymentSheet}
        style={{
          width: "80%",
          borderRadius: moderateScale(10),
          overflow: "hidden",
          marginBottom: verticalScale(15),
        }}
        // disabled={!loading}
      >
        <LinearGradient
          colors={["#4A90E2", "#50E3C2"]}
          style={{
            paddingVertical: verticalScale(12),
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Confirm
          </Text>
        </LinearGradient>
      </Pressable>

      <Modal isVisible={success} onBackdropPress={() => setSuccess(false)}>
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />

          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Add money to your wallet successfully
          </Text>

          <CustomButton
            title="Back"
            onPress={() => {
              setSuccess(false);
              router.push("/(routes)/package");
            }}
            className="mt-5"
          />
        </View>
      </Modal>
    </>
  );
};

export default Payment;
