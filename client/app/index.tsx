import { useGetCoursesQuery } from "@/state/api";
import { Text, View } from "react-native";

export default function Index() {
  const { data: courses, isLoading } = useGetCoursesQuery({});

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{JSON.stringify(courses, null, 2)}</Text>
    </View>
  );
}
