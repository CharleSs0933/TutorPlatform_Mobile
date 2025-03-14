import useUser from "@/hooks/useUser";
import { Tabs } from "expo-router";
import React from "react";
import { Feather, Ionicons, Octicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

const Layout = () => {
  const { loader } = useUser();

  return (
    <Tabs
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === "index") {
              iconName = (
                <Feather
                  name="home"
                  size={30}
                  color={color}
                  style={{ width: "auto" }}
                />
              );
            } else if (route.name === "courses/index") {
              iconName = (
                <Feather
                  name="book-open"
                  size={30}
                  color={color}
                  style={{ width: "auto" }}
                />
              );
            } else if (route.name === "resources/index") {
              iconName = (
                <Ionicons
                  name="document-text-outline"
                  size={30}
                  style={{ width: "auto" }}
                  color={color}
                />
              );
            } else if (route.name === "profile/index") {
              iconName = (
                <Octicons
                  name="person"
                  size={30}
                  style={{ width: "auto" }}
                  color={color}
                />
              );
            }
            return iconName;
          },
          tabBarActiveTintColor: "#4A90E2",
          tabBarInactiveTintColor: "#8e8e93",
          headerShown:
            route.name === "courses/index" || route.name === "resources/index"
              ? true
              : false,
          headerTitle:
            route.name === "courses/index"
              ? "Courses"
              : route.name === "resources/index"
              ? "Video Lessons"
              : "",
          headerTitleStyle: {
            color: "#000",
            textAlign: "center",
            width: "auto",
            fontSize: 22,
            fontFamily: "Poppins_400Regular",
          },
          headerBackgroundContainerStyle: {
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 1,
            elevation: 1,
          },
          headerBackground: () => (
            <BlurView
              intensity={80}
              style={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                overflow: "hidden",
                backgroundColor: "transparent",
              }}
            />
          ),
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderTopWidth: 0,
            height: 55,
            opacity: loader ? 0 : 1,
            transition: "opacity 0.3s ease-in-out",
          },
          tabBarBackground: () => {
            return (
              <BlurView
                intensity={100}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  overflow: "hidden",
                  backgroundColor: "#fff",
                }}
              />
            );
          },
        };
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="courses/index" />
      <Tabs.Screen name="resources/index" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  );
};

export default Layout;
