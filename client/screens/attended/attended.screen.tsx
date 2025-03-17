import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useGetSessionQuery } from "@/state/api";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const AttendedScreen = () => {
  const { childId } = useLocalSearchParams();
  const {
    data: sessions = [],
    isLoading,
    isError,
  } = useGetSessionQuery({
    userId: Number(childId),
  });

  const renderAttendedSession = ({ item }: { item: any }) => {
    const subscriptionSessions = sessions.filter(
      (session: any) => session.subscription_id === item.subscription_id
    );
    const attendedCount = subscriptionSessions.filter(
      (session: any) => session.status === "Attended"
    ).length;

    const totalSessions = subscriptionSessions.filter(
      (session: any) =>
        session.status === "Attended" || session.status === "Absent"
    ).length;

    const attendancePercentage =
      totalSessions > 0 ? (attendedCount / totalSessions) * 100 : 0;

    const attendanceDisplay =
      totalSessions === 0
        ? "No sessions yet"
        : `${attendedCount}/${totalSessions}`;

    const attendanceTextColor =
      attendancePercentage < 50
        ? "#FF0000"
        : attendancePercentage < 80
        ? "#6248FF"
        : "#0185F7";

    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          {/* Circular Progress Indicator */}
          <AnimatedCircularProgress
            size={60}
            width={8}
            fill={attendancePercentage}
            tintColor="#01CED3"
            backgroundColor="#6248FF"
            rotation={0}
            lineCap="round"
          >
            {() => (
              <Text style={styles.percentageText}>
                {Math.round(attendancePercentage)}%
              </Text>
            )}
          </AnimatedCircularProgress>

          {/* Session Details */}
          <Pressable
            style={styles.sessionDetails}
            onPress={() =>
              router.push({
                pathname: "/(routes)/attended-detail",
                params: { subscriptionId: item.subscription_id.toString() },
              })
            }
          >
            <Text style={styles.subjectText}>
              {item.subscription?.course?.subject}
            </Text>
            <Text style={styles.detailText}>
              Grade: {item.subscription?.course?.grade}
            </Text>
            <Text style={styles.detailText}>
              Tutor: {item.subscription?.course?.tutor?.profile?.full_name}
            </Text>
            <Text
              style={[styles.attendanceText, { color: attendanceTextColor }]}
            >
              Attended: {attendanceDisplay}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading sessions...</Text>
      </View>
    );
  }

  if (isError || !sessions) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading sessions</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#01CED3", "#0185F7"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.headerContainer}>
            <Pressable onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </Pressable>
            <Text style={styles.screenTitle}>Attendance Report</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Session List */}
      <FlatList
        data={sessions}
        renderItem={renderAttendedSession}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No attended sessions found</Text>
        }
      />
    </SafeAreaView>
  );
};

export default AttendedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    height: verticalScale(60),
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    padding: scale(20),
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  screenTitle: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: scale(10),
    marginVertical: verticalScale(5),
    marginHorizontal: scale(10),
    padding: scale(15),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  sessionDetails: {
    flex: 1,
    marginLeft: moderateScale(15),
  },
  subjectText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0185F7",
    marginBottom: verticalScale(5),
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginBottom: verticalScale(3),
  },
  attendanceText: {
    fontSize: 14,
    color: "#2E3192",
    fontWeight: "bold",
  },
  percentageText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  listContent: {
    paddingBottom: verticalScale(20),
    paddingTop: verticalScale(10),
  },
  loadingText: {
    color: "grey",
    textAlign: "center",
    marginTop: verticalScale(20),
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: verticalScale(20),
  },
  emptyText: {
    color: "#666",
    textAlign: "center",
    marginTop: verticalScale(20),
  },
});
