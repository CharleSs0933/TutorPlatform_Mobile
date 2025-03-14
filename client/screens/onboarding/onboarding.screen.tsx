import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.push("/(auth)/sign-up");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-PoppinsBold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View className="flex items-center justify-center p-5" key={item.id}>
            <Image
              source={item.image}
              className="w-full h-[400px]"
              resizeMode="contain"
            />
            <View>
              <View className="p-5">
                <Text className="font-PoppinsSemiBold text-[#05030D] text-3xl">
                  {item.title}
                </Text>
                <Text className="font-PoppinsSemiBold text-[#05030D] text-2xl">
                  {item.secondTitle}
                </Text>
                <Text className="text-[#3E3B54] font-PoppinsLight text-md">
                  {item.description}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? "Get started" : "Next"}
        onPress={() => {
          isLastSlide
            ? router.push("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1);
        }}
        className="w-11/12 mt-10"
      />
    </SafeAreaView>
  );
};

export default Onboarding;
