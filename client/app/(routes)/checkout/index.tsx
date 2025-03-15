import React from "react";
import CheckoutScreen from "@/screens/checkout/checkout.screen";
import { StripeProvider } from "@stripe/stripe-react-native";

const CheckoutPage = () => {
  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY!}
      urlScheme="myapp"
    >
      <CheckoutScreen />
    </StripeProvider>
  );
};

export default CheckoutPage;
