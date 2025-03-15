import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { useGetCoursesQuery } from "@/state/api";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CourseCard from "@/components/cards/CourseCard";
import { fontSizes, windowHeight, windowWidth } from "@/theme/app.constant";
import GradiantText from "@/components/common/GradientText";
import { EvilIcons } from "@expo/vector-icons";
import usePagination from "@/hooks/usePagination";

const CoursesScreen = () => {
  const {
    data,
    totalResult,
    refreshing,
    loadingMore,
    handleRefresh,
    loadMore,
    initialLoader,
  } = usePagination();

  const renderFooter = () => {
    if (!loadingMore || data.length < 8) return null; // Show footer loader only for subsequent pages
    return <ActivityIndicator animating size="large" />;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={{}}>
        <StatusBar barStyle={"dark-content"} />
        {initialLoader ? (
          <ActivityIndicator size="large" />
        ) : (
          <View
            style={{
              paddingHorizontal: scale(8),
            }}
          >
            <FlatList
              data={data}
              ListHeaderComponent={() => (
                <View style={{ marginHorizontal: windowWidth(20) }}>
                  <View
                    style={{ flexDirection: "row", marginTop: windowHeight(8) }}
                  >
                    <Text
                      style={{
                        fontSize: fontSizes.FONT35,
                        fontFamily: "Poppins_500Medium",
                        color: "#000",
                      }}
                    >
                      All
                    </Text>
                    <GradiantText
                      text="Courses"
                      styles={{
                        fontSize: fontSizes.FONT35,
                        fontFamily: "Poppins_500Medium",
                        paddingLeft: scale(5),
                      }}
                    />
                  </View>
                  <View className="relative">
                    <TextInput
                      placeholder="Search for Courses"
                      placeholderTextColor={"#000"}
                      className="bg-white text-black font-PoppinsRegular text-xl"
                      style={{
                        height: verticalScale(40),
                        marginTop: verticalScale(10),
                        borderRadius: moderateScale(30),
                        paddingHorizontal: moderateScale(15),
                        borderWidth: 1,
                        borderColor: "#000",
                      }}
                    />
                    <Pressable
                      style={{
                        position: "absolute",
                        right: windowWidth(10),
                        top: windowHeight(16),
                      }}
                    >
                      <EvilIcons
                        name="search"
                        size={scale(30)}
                        color={"blue"}
                      />
                    </Pressable>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <CourseCard item={item} />}
              ListEmptyComponent={<Text>No courses Available yet!</Text>}
              //   ListFooterComponent={() => (
              //     <View
              //       style={{
              //         paddingBottom: verticalScale(0),
              //       }}
              //     ></View>
              //   )}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
              contentContainerStyle={{ paddingBottom: 50 }}
              ListFooterComponent={renderFooter}
              onEndReached={loadMore}
              onEndReachedThreshold={0.1}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CoursesScreen;
