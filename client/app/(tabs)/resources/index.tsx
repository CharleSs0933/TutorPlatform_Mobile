import { ActivityIndicator, View } from "react-native";
import React from "react";
import ResourceScreen from "@/screens/resources/resource.screen";
import useUser from "@/hooks/useUser";
import { Redirect } from "expo-router";
import CalendarChildScreen from "@/screens/resources/calendarChild.screen";

const ResourceIndex = () => {
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

  // Role-based rendering
  if (user.role === "Parent") {
    return <ResourceScreen />;
  } else {
    return <CalendarChildScreen />;
  }
};

export default ResourceIndex;
