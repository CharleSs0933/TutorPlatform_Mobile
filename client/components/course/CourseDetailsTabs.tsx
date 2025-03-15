import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { fontSizes } from "@/theme/app.constant";
import { scale, verticalScale } from "react-native-size-matters";

const CourseDetailsTabs = ({
  activeButton,
  setActiveButton,
}: {
  activeButton: string;
  setActiveButton: (e: "About" | "Reviews" | "Lessons") => void;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: verticalScale(15),
        marginHorizontal: scale(8),
        backgroundColor: "#E1E9F8",
        borderRadius: scale(50),
        height: verticalScale(35),
      }}
    >
      <TouchableOpacity
        style={{
          paddingHorizontal: scale(25),
          height: verticalScale(32),
          justifyContent: "center",
          backgroundColor: activeButton === "About" ? "#2467EC" : "transparent",
          borderRadius: scale(50),
        }}
        onPress={() => setActiveButton("About")}
      >
        <Text
          style={{
            color: activeButton === "About" ? "#fff" : "#000",
            fontFamily: "Poppins_500Medium",
            fontSize: fontSizes.FONT20,
          }}
        >
          About
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingHorizontal: scale(25),
          height: verticalScale(32),
          justifyContent: "center",
          backgroundColor:
            activeButton === "Lessons" ? "#2467EC" : "transparent",
          borderRadius: scale(50),
        }}
        onPress={() => setActiveButton("Lessons")}
      >
        <Text
          style={{
            color: activeButton === "Lessons" ? "#fff" : "#000",
            fontFamily: "Poppins_500Medium",
            fontSize: fontSizes.FONT20,
          }}
        >
          Lessons
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingHorizontal: scale(25),
          height: verticalScale(32),
          justifyContent: "center",
          backgroundColor:
            activeButton === "Reviews" ? "#2467EC" : "transparent",
          borderRadius: scale(50),
        }}
        onPress={() => setActiveButton("Reviews")}
      >
        <Text
          style={{
            color: activeButton === "Reviews" ? "#fff" : "#000",
            fontFamily: "Poppins_500Medium",
            fontSize: fontSizes.FONT20,
          }}
        >
          Reviews
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CourseDetailsTabs;
