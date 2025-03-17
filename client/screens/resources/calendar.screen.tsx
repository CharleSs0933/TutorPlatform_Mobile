import React from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetSessionQuery } from "@/state/api";
import { Agenda } from "react-native-calendars";
import { TeachingSession } from "@/types";
import { Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { scale, verticalScale } from "react-native-size-matters";

function CalendarScreen() {
  const router = useRouter();
  const { childId } = useLocalSearchParams();
  const {
    data: sessions,
    isLoading,
    isError,
  } = useGetSessionQuery({
    userId: Number(childId),
  });

  if (isLoading) {
    return (
      <Text style={{ color: "grey", textAlign: "center", margin: 20 }}>
        Loading sessions...
      </Text>
    );
  }

  if (isError) {
    return (
      <Text style={{ color: "red", textAlign: "center", margin: 20 }}>
        Error loading sessions
      </Text>
    );
  }

  if (!sessions || sessions.length === 0) {
    return (
      <Text style={{ color: "black", textAlign: "center", margin: 20 }}>
        No sessions found
      </Text>
    );
  }

  const items: any = {};
  sessions.forEach((session) => {
    const date = new Date(session.startTime).toISOString().split("T")[0];
    if (!items[date]) {
      items[date] = [];
    }
    items[date].push({
      ...session,
    });
  });

  // Function to handle joining Google Meet
  const handleJoinMeeting = (googleMeetId: string | undefined) => {
    if (googleMeetId) {
      Linking.openURL(`https://meet.google.com/${googleMeetId}`);
    } else {
      alert("No Google Meet link available");
    }
  };

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
            <Text style={styles.screenTitle}>Schedule</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <Agenda
        items={items}
        renderEmptyData={() => <Text>No sessions</Text>}
        renderItem={(item: TeachingSession) => {
          let backgroundColor = "#fff"; // Default
          if (item.status === "Attended") backgroundColor = "#28a745";
          if (item.status === "Absent") backgroundColor = "#dc3545";
          if (item.status === "NotYet") backgroundColor = "#555";

          return (
            <View style={styles.card}>
              <View style={styles.itemContainer}>
                <View style={styles.leftSection}>
                  <View style={styles.timeSection}>
                    <Entypo name="flow-line" size={30} color={"0185F7"} />

                    <View style={styles.time}>
                      <Text style={styles.itemText}>
                        {
                          new Date(item.startTime)
                            .toISOString()
                            .split(/[T,:]/)[1]
                        }
                        {" : "}
                        {
                          new Date(item.startTime)
                            .toISOString()
                            .split(/[T,:]/)[2]
                        }
                      </Text>
                      <Text style={styles.itemText}>
                        {new Date(item.endTime).toISOString().split(/[T,:]/)[1]}
                        {" : "}
                        {new Date(item.endTime).toISOString().split(/[T,:]/)[2]}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.statusText, { backgroundColor }]}>
                    {item.status}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleJoinMeeting(item.google_meet_id)}
                  >
                    <LinearGradient
                      style={styles.joinButton}
                      colors={["#01CED3", "#0185F7"]}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={styles.joinButtonText}>Join</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                {/* Right section: Subject details */}
                <View style={styles.rightSection}>
                  <Text style={styles.subject}>
                    {item.subscription?.course?.subject}
                  </Text>
                  <Text style={styles.itemText}>
                    {item.subscription?.course?.description}
                  </Text>
                  <Text style={styles.itemText}>
                    Grade: {item.subscription?.course?.grade}
                  </Text>
                  <Text style={styles.itemText}>
                    Lecturer:{" "}
                    {item.subscription?.course?.tutor?.profile?.full_name}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    marginLeft: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    margin: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    backgroundColor: "#fff",
  },
  dateHeader: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  timeSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    display: "flex",
    flexDirection: "column",
  },
  leftSection: {
    paddingRight: 10,
  },
  rightSection: {
    flex: 1,
    paddingLeft: 10,
  },
  itemText: {
    color: "#333",
    fontSize: 14,
    marginBottom: 5,
  },
  statusText: {
    textAlign: "center",
    marginBottom: 5,
    color: "#fff",
    borderRadius: 10,
    padding: 5,
  },
  joinButton: {
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  joinButtonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  subject: {
    color: "#0185F7",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
