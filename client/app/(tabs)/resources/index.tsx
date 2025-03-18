import { ActivityIndicator, View } from "react-native";
import React from "react";
import ResourceScreen from "@/screens/resources/resource.screen";
import useUser from "@/hooks/useUser";
import { Redirect } from "expo-router";

const ResourceIndex = () => {
  const { user, loader } = useUser();

  // Show loading indicator while user data is being fetched
  if (loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2467EC" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/sign-in" />; // Adjust to your login route
  }

  // Role-based rendering
  if (user.role === "Parent") {
    return <ResourceScreen />;
  } else {
    return (
      <Redirect
        href={{
          pathname: "/(routes)/calendar",
          params: { childId: user.id.toString() },
        }}
      />
    );
  }
};

export default ResourceIndex;
