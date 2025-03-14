import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import useUser from "@/hooks/useUser";
import { LinearGradient } from "expo-linear-gradient";
import { scale, verticalScale } from "react-native-size-matters";
import { fontSizes } from "@/theme/app.constant";
import { router } from "expo-router";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const ProfileScreen = () => {
  const { user, logout } = useUser();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: "#f5f5f5",
        },
      ]}
    >
      <LinearGradient
        colors={["#6248FF", "#8673FC"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.header}
      >
        <StatusBar barStyle={"light-content"} />
        <SafeAreaView style={{ paddingTop: verticalScale(20) }}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Profile</Text>
            <View></View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Profile Wrapper */}
      <View
        style={[
          styles.profileWrapper,
          {
            backgroundColor: "#fff",
            shadowOpacity: 0.25,
          },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          Avatar
          <View style={styles.profileTextContainer}>
            <Text
              style={[
                styles.profileName,
                {
                  color: "#000",
                },
              ]}
            >
              Name
            </Text>
            <Text style={styles.profileTitle}>Email</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <LinearGradient
            style={styles.statBox}
            colors={["#01CED3", "#0185F7"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.statNumber}>{user?.orders?.length}</Text>
            <Text style={styles.statLabel}>Enrolled</Text>
          </LinearGradient>
          <LinearGradient
            style={styles.statBox}
            colors={["#BF6FF8", "#3C1BE9"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Certificates</Text>
          </LinearGradient>
        </View>
      </View>

      {/* Profile options */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ padding: scale(20) }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: verticalScale(20),
          }}
          // onPress={() =>
          //   router.push({
          //     pathname: "/(routes)/enrolled-courses",
          //     params: { courses: JSON.stringify(user?.orders) },
          //   })
          // }
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: scale(38),
                height: scale(38),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: scale(10),
                borderWidth: 1,
                borderColor: "#E2DDFF",
              }}
            >
              <Feather name="book-open" size={scale(21)} color={"#0047AB"} />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT22,
                  fontFamily: "Poppins_400Regular",
                  color: "#000",
                }}
              >
                Enrolled Courses
              </Text>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT15,
                  fontFamily: "Poppins_400Regular",
                  color: "#000",
                  opacity: 0.6,
                }}
              >
                Explore your all enrolled courses
              </Text>
            </View>
          </View>
        </Pressable>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: verticalScale(20),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: scale(38),
                height: scale(38),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: scale(10),
                borderWidth: 1,
                borderColor: "#E2DDFF",
              }}
            >
              <MaterialIcons
                name="leaderboard"
                size={scale(23)}
                color={"#0047AB"}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT22,
                  fontFamily: "Poppins_400Regular",
                  color: "#000",
                }}
              >
                Course Leaderboard
              </Text>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT15,
                  fontFamily: "Poppins_400Regular",
                  color: "#000",
                  opacity: 0.6,
                }}
              >
                Let's see your position in Leaderboard
              </Text>
            </View>
          </View>
        </Pressable>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: verticalScale(20),
          }}
          // onPress={() => router.push("/(routes)/my-tickets")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: scale(38),
                height: scale(38),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: scale(10),
                borderWidth: 1,
                borderColor: "#E2DDFF",
              }}
            >
              <MaterialCommunityIcons
                name="message-alert-outline"
                size={scale(22)}
                color={"#0047AB"}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT22,
                  fontFamily: "Poppins_400Regular",
                  color: "#000",
                }}
              >
                My Tickets
              </Text>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT15,
                  fontFamily: "Poppins_400Regular",
                  color: "#000",
                  opacity: 0.6,
                }}
              >
                Explore your all support tickets
              </Text>
            </View>
          </View>
        </Pressable>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: verticalScale(30),
          }}
          onPress={() => logout()}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: scale(38),
                height: scale(38),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: scale(10),
                borderWidth: 1,
                borderColor: "#E2DDFF",
              }}
            >
              <MaterialIcons name="logout" size={scale(23)} color={"#0047AB"} />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT22,
                  fontFamily: "Poppins_400Regular",
                  color: "#000",
                }}
              >
                Log Out
              </Text>
              <Text
                style={{
                  marginLeft: scale(10),
                  fontSize: fontSizes.FONT15,
                  fontFamily: "Poppins_400Regular",
                  color: "#000",
                  opacity: 0.6,
                }}
              >
                Logging out from your account
              </Text>
            </View>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: verticalScale(180),
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    padding: scale(20),
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: fontSizes.FONT28,
    color: "#fff",
    fontFamily: "Poppins_500Medium",
  },
  profileWrapper: {
    width: scale(320),
    backgroundColor: "#fff",
    height: verticalScale(155),

    marginTop: verticalScale(-90),
    alignSelf: "center",
    borderRadius: scale(20),
    padding: scale(15),
    zIndex: 10,
    shadowColor: "#999",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    marginBottom: verticalScale(10),
  },
  profileTextContainer: {
    marginBottom: verticalScale(10),
    marginLeft: scale(10),
  },
  profileName: {
    fontSize: fontSizes.FONT22,
    fontFamily: "Poppins_500Medium",
    color: "#000",
  },
  profileTitle: {
    fontSize: fontSizes.FONT17,
    fontFamily: "Poppins_400Regular",
    color: "#8a8a8a",
    width: scale(230),
    overflow: "hidden",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: verticalScale(10),
  },
  statBox: {
    alignItems: "center",
    justifyContent: "center",
    width: scale(120),
    height: verticalScale(62),
    borderRadius: scale(10),
    color: "#fff",
  },
  statNumber: {
    fontSize: fontSizes.FONT25,
    fontFamily: "Poppins_700Bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: fontSizes.FONT20,
    fontFamily: "Poppins_400Regular",
    color: "#fff",
  },
});
