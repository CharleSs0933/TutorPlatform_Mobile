import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useGetSessionQuery } from "@/state/api";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const DetailAttendedScreen = () => {
  const { subscriptionId } = useLocalSearchParams();
  const {
    data: sessions = [],
    isLoading,
    isError,
  } = useGetSessionQuery({
    userId: Number(subscriptionId),
  });

  const subscriptionSessions = sessions.filter(
    (session: any) => session.subscription_id === Number(subscriptionId)
  );
  const absentCount = subscriptionSessions.filter(
    (session) => session.status === "Absent"
  ).length;
  const notYetCount = subscriptionSessions.filter(
    (session) => session.status === "NotYet"
  ).length;
  const attendedCount = subscriptionSessions.filter(
    (session: any) => session.status === "Attended"
  ).length;
  const totalSessions = subscriptionSessions.filter(
    (session: any) =>
      session.status === "Attended" || session.status === "Absent"
  ).length;

  const attendancePercentage =
    totalSessions > 0 ? (attendedCount / totalSessions) * 100 : 0;

  // Render session details
  const renderSessionDetail = ({ item }: { item: any }) => {
    const isAttended = item.status === "Attended";
    const isAbsent = item.status === "Absent";
    const isFuture = item.status === "NotYet";
    const checkmarkColor = isAttended
      ? "#28a745"
      : isAbsent
      ? "#FF6F61"
      : "#666";

    return (
      <View style={styles.sessionRow}>
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionDate}>
            Date: {item.startTime.split("T")[0]}
          </Text>
          <Text style={styles.sessionLecturer}>
            Tutor: {item.subscription?.course?.tutor?.profile?.full_name}
          </Text>
        </View>
        <View style={styles.checkmarkContainer}>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={checkmarkColor}
            style={styles.checkmark}
          />
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

  if (isError || !subscriptionSessions) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No session details available</Text>
      </View>
    );
  }
  const attendanceTextColor =
    attendancePercentage < 50
      ? "#FF0000"
      : attendancePercentage < 80
      ? "#6248FF"
      : "#0185F7";

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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
            <Text style={styles.screenTitle}>Details</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Details Card */}
      <View style={styles.card}>
        <Text style={styles.courseTitle}>
          {subscriptionSessions[0]?.subscription?.course?.subject}
        </Text>
        <View style={styles.progressContainer}>
          <AnimatedCircularProgress
            size={80}
            width={10}
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
          <Text style={[styles.attendanceText, { color: attendanceTextColor }]}>
            Attended: {attendedCount}/{totalSessions}
          </Text>
        </View>
        <View style={styles.statusRow}>
          <View style={styles.statusItem}>
            <Text style={styles.statusValue}>{attendedCount}</Text>
            <Text style={styles.statusLabel}>Present</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusValue}>{absentCount}</Text>
            <Text style={styles.statusLabel}>Absent</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusValue}>{notYetCount}</Text>
            <Text style={styles.statusLabel}>Future</Text>
          </View>
        </View>
        <FlatList
          data={subscriptionSessions}
          renderItem={renderSessionDetail}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.sessionList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default DetailAttendedScreen;

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
    margin: scale(10),
    padding: scale(15),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0185F7",
    marginBottom: verticalScale(5),
  },
  className: {
    fontSize: 16,
    color: "#666",
    marginBottom: verticalScale(10),
  },
  progressContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: verticalScale(10),
  },
  percentageText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  attendanceText: {
    fontSize: 16,
    color: "#2E3192",
    fontWeight: "bold",
    marginTop: verticalScale(5),
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(15),
  },
  statusItem: {
    alignItems: "center",
  },
  statusValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E3192",
  },
  statusLabel: {
    fontSize: 14,
    color: "#666",
  },
  sessionList: {
    paddingBottom: verticalScale(10),
  },
  sessionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  sessionInfo: {
    flex: 1,
  },
  sessionDate: {
    fontSize: 14,
    color: "#333",
  },
  sessionLecturer: {
    fontSize: 14,
    color: "#666",
  },
  checkmarkContainer: {
    paddingLeft: scale(10),
  },
  checkmark: {
    opacity: 0.8,
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
});
