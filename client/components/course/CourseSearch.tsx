import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { fontSizes, windowHeight, windowWidth } from "@/theme/app.constant";
import { router, useLocalSearchParams } from "expo-router";
import { useDebouncedCallback } from "use-debounce";
import { EvilIcons } from "@expo/vector-icons";

const CourseSearch = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 500);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  const clearSearch = () => {
    setSearch("");
    debouncedSearch("");
  };

  return (
    <View style={{ position: "relative" }}>
      <TextInput
        placeholder="Search for Courses"
        placeholderTextColor={"#000"}
        style={{
          backgroundColor: "#fff",
          color: "#000",
          fontFamily: "Poppins_400Regular",
          height: verticalScale(40),
          marginTop: verticalScale(6),
          borderRadius: moderateScale(30),
          paddingHorizontal: moderateScale(15),
          borderWidth: 1,
          borderColor: "#000",
          fontSize: fontSizes.FONT18,
        }}
        value={search}
        onChangeText={handleSearch}
      />
      {search && (
        <Pressable
          style={{
            position: "absolute",
            right: windowWidth(10),
            top: windowHeight(14),
          }}
          onPress={clearSearch}
        >
          <EvilIcons name="close" size={scale(24)} color={"blue"} />
        </Pressable>
      )}
    </View>
  );
};

export default CourseSearch;
