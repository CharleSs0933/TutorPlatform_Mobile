import { useGetCoursesQuery } from "@/state/api";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";

const HomeScreen = () => {
  const { data: courses, isLoading } = useGetCoursesQuery({});

  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
