import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useUser from "@/hooks/useUser";

const SubscribedCourseScreen = () => {
  const { user, loader, refetch } = useUser();

  // Flatten course subscriptions from all children
  const subscribedCourses =
    user && user.role === "Parent"
      ? user.childrens?.flatMap(
          (child) =>
            child.courseSubscriptions?.map((subscription) => ({
              childName: child.profile?.full_name || "Unknown Child",
              subject: subscription.course?.subject || "N/A",
              price: subscription.course?.price || 0,
              status: subscription.status || "N/A",
              subscriptionId: subscription.id,
            })) || []
        ) || []
      : [];

  useEffect(() => {
    if (user && !subscribedCourses.length) {
      refetch();
    }
  }, [user, subscribedCourses.length, refetch]);

  const renderSubscribedCourse = ({ item }: { item: any }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.courseDetails}>
            <Text style={styles.subjectText}>{item.subject}</Text>
            <Text style={styles.detailText}>Child: {item.childName}</Text>
            <Text style={styles.detailText}>
              Price: ${item.price.toFixed(2)}
            </Text>
            <Text style={styles.statusText}>Status: {item.status}</Text>
          </View>
          {item.status === "Active" && (
            <Pressable style={styles.detailsButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  if (loader) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading subscriptions...</Text>
      </View>
    );
  }

  if (!user || !subscribedCourses.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          No subscribed courses found or user not loaded
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#6248FF", "#8673FC"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.headerContainer}>
            <Pressable onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </Pressable>
            <Text style={styles.screenTitle}>Subscribed Courses</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Course List */}
      <FlatList
        data={subscribedCourses}
        renderItem={renderSubscribedCourse}
        keyExtractor={(item) => item.subscriptionId.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No subscribed courses found</Text>
        }
      />
    </SafeAreaView>
  );
};

export default SubscribedCourseScreen;

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
    justifyContent: "space-between",
  },
  courseDetails: {
    flex: 1,
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
  statusText: {
    fontSize: 14,
    color: "#2E3192",
    fontWeight: "bold",
  },
  detailsButton: {
    backgroundColor: "#8673FC",
    paddingVertical: verticalScale(5),
    paddingHorizontal: moderateScale(10),
    borderRadius: scale(5),
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
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
