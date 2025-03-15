import { Pressable, Text } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";
import { fontSizes } from "@/theme/app.constant";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Checkout",
          headerTitleStyle: {
            color: "#000",
            fontSize: fontSizes.FONT22,
          },
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#fff" },
          headerShadowVisible: true,
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: scale(5),
              }}
              onPress={() => router.back()}
            >
              <AntDesign name="left" size={scale(20)} color={"#005DE0"} />
              <Text
                style={{
                  color: "#005DE0",
                  fontSize: fontSizes.FONT20,
                }}
              >
                Back
              </Text>
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
