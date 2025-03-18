import React from "react";
import ProfileScreen from "@/screens/profile/profile.screen";
import useUser from "@/hooks/useUser";
import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import AttendedScreen from "@/screens/attended/attended.screen";
import AttendedChildScreen from "@/screens/attended/attendedChild.screen";

const index = () => {
  const { user, loader } = useUser();

  if (loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2467EC" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  if (user.role === "Parent") {
    return <ProfileScreen />;
  } else {
    return <AttendedChildScreen />;
  }
};

export default index;
