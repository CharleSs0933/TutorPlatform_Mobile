import { Alert, Image, Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { fontSizes } from "@/theme/app.constant";
import { useStripe } from "@stripe/stripe-react-native";
import {
  useCreateStripePaymentIntentMutation,
  useCreateTrialBookingMutation,
} from "@/state/api";
import { images } from "@/constants";
import CustomButton from "../CustomButton";
import { router } from "expo-router";
import Modal from "react-native-modal";
import { Children } from "@/types";

declare interface PaymentProps {
  fullName: string;
  email: string;
  amount: number;
  child: Children | null;
  dates: { startTime: string; endTime: string }[];
  courseId: string;
}

const Payment = ({
  amount,
  fullName,
  email,
  child,
  courseId,
  dates,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState<boolean>(false);

  const [createStripePaymentIntent] = useCreateStripePaymentIntentMutation();
  const [createTrialBooking, { isLoading, isSuccess }] =
    useCreateTrialBookingMutation();

  const initializePaymentSheet = async () => {
    const { paymentIntent, customer, ephemeralKey } =
      await createStripePaymentIntent({
        name: fullName || email.split("@")[0],
        email: email,
        amount: amount,
        // paymentMethodId: paymentMethod.id,
      }).unwrap();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey.secret,
      paymentIntentClientSecret: paymentIntent.client_secret,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });

    if (!error) {
      //   setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    // await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      const bookingData = {
        children_id: child?.id,
        courseId,
        dates,
      };
      try {
        await createTrialBooking(bookingData);
        setSuccess(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <>
      <Pressable
        style={{
          marginTop: verticalScale(10),
          paddingVertical: verticalScale(10),
          paddingHorizontal: scale(20),
          backgroundColor: "#2563EB", // Equivalent to primary-700
          borderRadius: moderateScale(8),
          alignItems: "center",
          // opacity: selectedChildren === null ? 0.5 : 1,
        }}
        onPress={openPaymentSheet}
        disabled={child === null}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#FFFF",
            fontSize: fontSizes.FONT24,
            fontFamily: "Poppins_600SemiBold",
          }}
        >
          Confirm Payment
        </Text>
      </Pressable>

      <Modal isVisible={success} onBackdropPress={() => setSuccess(false)}>
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />

          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Booking placed successfully
          </Text>

          <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
            Thank you for your booking. Your reservation has been successfully
            placed. Please proceed with your trip.
          </Text>

          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(tabs)");
            }}
            className="mt-5"
          />
        </View>
      </Modal>
    </>
  );
};

export default Payment;
