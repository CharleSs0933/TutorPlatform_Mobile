import { Pressable, View } from "react-native";
import React from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Swiper from "react-native-swiper";
import { bannerData } from "@/constants";
import { Image } from "react-native";

const HomeBanner = () => {
  return (
    <View
      style={{
        paddingVertical: verticalScale(10),
        paddingHorizontal: verticalScale(7),
      }}
    >
      <Swiper
        dotStyle={{
          backgroundColor: "#C6C7CC",
          width: scale(8),
          height: scale(8),
          borderRadius: scale(5),
          marginHorizontal: verticalScale(3),
        }}
        activeDotStyle={{
          backgroundColor: "#2467EC",
          width: scale(8),
          height: scale(8),
          borderRadius: scale(5),
          marginHorizontal: verticalScale(3),
        }}
        autoplay={true}
        autoplayTimeout={10}
        style={{ height: moderateScale(230) }}
      >
        {bannerData.map((item, index: number) => (
          <Pressable
            key={index}
            style={{ flex: 1, marginHorizontal: scale(10) }}
          >
            <Image
              source={item.image}
              alt={`banner${index}`}
              className="w-full h-[200px] object-cover rounded-md"
            />
          </Pressable>
        ))}
      </Swiper>
    </View>
  );
};

export default HomeBanner;
