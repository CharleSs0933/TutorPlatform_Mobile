import { useGetCoursesQuery } from "@/state/api";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FlatList, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import WelcomeHeader from "@/components/home/WelcomeHeader";
import { scale, verticalScale } from "react-native-size-matters";
import { fontSizes, windowHeight, windowWidth } from "@/theme/app.constant";
import GradiantText from "@/components/common/GradientText";
import HomeBanner from "@/components/home/HomeBanner";

const HomeScreen = () => {
  const { data: courses, isLoading } = useGetCoursesQuery({});

  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <>
      <LinearGradient
        colors={["#fff", "#f7f7f7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1 bg-[#fff]"
      >
        <WelcomeHeader />
        <View className="flex-1">
          {isLoading} ? (
          <>
            {/* <SkeletonLoader />
                    <SkeletonLoader /> */}
          </>
          ): (
          <View style={{ paddingHorizontal: scale(8) }}>
            <FlatList
              ListHeaderComponent={() => (
                <>
                  <HomeBanner />
                  <View
                    style={{
                      marginHorizontal: windowWidth(20),
                      marginTop: verticalScale(-25),
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: windowHeight(5),
                      }}
                    >
                      <Text className="text-4xl font-PoppinsMedium text-black">
                        Popular
                      </Text>
                      <GradiantText
                        text="Courses"
                        styles={{
                          fontSize: fontSizes.FONT35,
                          fontFamily: "PoppinsMedium",
                          paddingLeft: scale(5),
                        }}
                      />
                    </View>
                  </View>
                </>
              )}
              data={courses}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <View></View>}
            />
          </View>
          )
        </View>
      </LinearGradient>
    </>
  );
};

export default HomeScreen;
