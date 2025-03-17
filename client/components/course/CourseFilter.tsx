import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, ScrollView, TouchableOpacity } from "react-native";

import { courseSubjects } from "@/constants";

const CourseFilter = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedBrand, setSelectedBrand] = useState(params.filter || "all");

  const handlebrandPress = (brand: string) => {
    if (selectedBrand === brand) {
      setSelectedBrand("");
      router.setParams({ filter: "" });
      return;
    }

    setSelectedBrand(brand);
    router.setParams({ filter: brand, query: "" });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {courseSubjects.map((item, index) => (
        <TouchableOpacity
          onPress={() => handlebrandPress(item.value)}
          key={index}
          className={`flex flex-col items-start mr-3 px-4 py-2 rounded-full ${
            selectedBrand === item.value
              ? "bg-[#2563EB]"
              : "bg-primary-100 border border-primary-200"
          }`}
        >
          <Text
            className={`text-sm ${
              selectedBrand === item.value
                ? "text-white font-rubik-bold mt-0.5"
                : "text-black-300 font-rubik"
            }`}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CourseFilter;
