import React from "react";
import ConfirmPackageScreen from "@/screens/package/confirm.package.screen";
import { StripeProvider } from "@stripe/stripe-react-native";

const ConfirmPackage = () => {
  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY!}
      urlScheme="myapp"
    >
      <ConfirmPackageScreen />
    </StripeProvider>
  );
};

export default ConfirmPackage;
