import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import useUser from "@/hooks/useUser";
import { LinearGradient } from "expo-linear-gradient";

const ProfileScreen = () => {
  const { user, loader } = useUser();

  return (
    <View>
      {loader ? (
        <Text>Loading...</Text>
      ) : (
        <LinearGradient
          colors={["#6248FF", "#8673FC"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          // style={styles.header}
        >
          <ScrollView>
            <View className="flex justify-center">
              <Text>Name Parent###</Text>
            </View>
          </ScrollView>
        </LinearGradient>
      )}
    </View>
  );
};

export default ProfileScreen;

// const styles = StyleSheet.create({
//   header: {
//     height: verticalScale(180),
//     borderBottomLeftRadius: scale(20),
//     borderBottomRightRadius: scale(20),
//     padding: scale(20),
//   },
// });
