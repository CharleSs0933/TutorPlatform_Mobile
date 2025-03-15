import { StatusBar, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { fontSizes } from "@/theme/app.constant";
import useUser from "@/hooks/useUser";

const WelcomeHeader = () => {
  const { user } = useUser();

  return (
    <LinearGradient
      colors={["#75ABFC", "#0047AB"]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 1 }}
      style={{
        height: verticalScale(145),
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
              fontSize: fontSizes.FONT35,
              color: "#fff",
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Hi {user?.full_name.split(" ")[0]}
          </Text>
          <Text
            style={{
              fontSize: fontSizes.FONT24,
              color: "#fff",
              fontFamily: "Poppins_400Regular",
            }}
          >
            Let's start Learning
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default WelcomeHeader;
