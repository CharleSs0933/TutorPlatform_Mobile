import { Pressable, Text, View } from "react-native";
import React from "react";
import { Course } from "@/types";
import {
  fontSizes,
  SCREEN_WIDTH,
  windowHeight,
  windowWidth,
} from "@/theme/app.constant";
import { router } from "expo-router";
import { Image } from "react-native";
import { images } from "@/constants";
import { Feather } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";

const CourseCard = ({ item }: { item: Course }) => {
  return (
    <Pressable
      style={{
        paddingHorizontal: windowWidth(5),
        paddingVertical: windowHeight(5),
      }}
      onPress={() =>
        router.push({
          pathname: "/(routes)/course-details/[id]",
          params: { id: item.id.toString() },
        })
      }
    >
      <View
        style={{
          borderRadius: windowWidth(10),
          shadowOpacity: 0.1,
          shadowColor: "40E0D0",
          shadowRadius: 5,
          backgroundColor: "#eaf3fb85",
        }}
      >
        <Image
          source={item.image ? { uri: item.image } : images.placeholder}
          resizeMode="contain"
          style={{
            width: SCREEN_WIDTH - 40,
            height: (SCREEN_WIDTH - 28) * 0.5625,
            alignSelf: "center",
            borderRadius: windowWidth(10),
          }}
        />
        <View
          style={{
            paddingHorizontal: windowWidth(15),
            paddingBottom: windowHeight(5),
          }}
        >
          <Text
            style={{
              paddingTop: windowHeight(5),
              fontFamily: "Poppins_400Regular",
              fontSize: fontSizes.FONT18,
              color: "#3E3B54",
            }}
          >
            {item.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: windowHeight(5),
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: fontSizes.FONT20,
                  color: "#000",
                }}
              >
                {item.price === 0 ? "Free" : item.price + "$"}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="list" size={scale(20)} color={"#3E3B54"} />
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: fontSizes.FONT20,
                  color: "#3E3B54",
                  paddingLeft: windowWidth(5),
                }}
              >
                {item?.total_lessons} Lessons
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CourseCard;
