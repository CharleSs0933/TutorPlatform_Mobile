import { Pressable, StatusBar, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { fontSizes } from "@/theme/app.constant";
import useUser from "@/hooks/useUser";
import { MaterialIcons } from "@expo/vector-icons";

const WelcomeHeader = () => {
  const { user, logout } = useUser();

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
        <Pressable onPress={() => logout()}>
          <View
            style={{
              width: scale(45),
              height: scale(45),
              borderRadius: scale(10),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#004FAB",
              borderWidth: 0,
              borderColor: "transparent",
            }}
          >
            <MaterialIcons name="logout" size={scale(25)} color={"#fff"} />
          </View>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default WelcomeHeader;
