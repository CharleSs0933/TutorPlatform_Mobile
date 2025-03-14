import { Pressable, StatusBar, Text, TextInput, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { fontSizes, windowHeight, windowWidth } from "@/theme/app.constant";
import { EvilIcons } from "@expo/vector-icons";

const WelcomeHeader = () => {
  return (
    <LinearGradient
      colors={["#75ABFC", "#0047AB"]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 1 }}
      style={{
        height: verticalScale(168),
        paddingHorizontal: moderateScale(25),
        borderBottomLeftRadius: moderateScale(40),
        borderBottomRightRadius: moderateScale(40),
        paddingTop: verticalScale(10),
      }}
    >
      <StatusBar barStyle={"light-content"} />
      <View
        style={{
          flexDirection: "row",
          paddingTop: verticalScale(30),
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: fontSizes.FONT32,
              color: "#fff",
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Hi
          </Text>
          <Text
            style={{
              fontSize: fontSizes.FONT22,
              color: "#fff",
              fontFamily: "Poppins_400Regular",
            }}
          >
            Let's start Learning
          </Text>
        </View>
      </View>
      <View className="relative">
        <TextInput
          placeholder="Search for Courses"
          placeholderTextColor={"#000"}
          className="bg-white text-black font-PoppinsRegular text-xl"
          style={{
            height: verticalScale(40),
            marginTop: verticalScale(12),
            borderRadius: moderateScale(30),
            paddingHorizontal: moderateScale(15),
          }}
        />
        <Pressable
          style={{
            position: "absolute",
            right: windowWidth(10),
            top: windowHeight(16),
          }}
        >
          <EvilIcons name="search" size={scale(30)} color={"blue"} />
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default WelcomeHeader;
