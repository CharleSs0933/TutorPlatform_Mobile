import { StatusBar, Text, TextInput, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

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
      <View className="flex-row justify-between pt-12">
        <View>
          <Text className="text-white text-4xl font-PoppinsSemiBold">Hi</Text>
          <Text className="text-2xl text-white font-PoppinsRegular">
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
      </View>
    </LinearGradient>
  );
};

export default WelcomeHeader;
