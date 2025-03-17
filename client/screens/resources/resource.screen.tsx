import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useGetChildrenQuery } from "@/state/api";
import { fontSizes, windowHeight } from "@/theme/app.constant";
import GradiantText from "@/components/common/GradientText";
import { scale } from "react-native-size-matters";

const ResourceScreen = () => {
  const router = useRouter();
  const { data: children, isLoading, isError } = useGetChildrenQuery({});

  const handleChildAttended = (childId: number) => {
    router.push({
      pathname: "/(routes)/attended-check",
      params: { childId: childId.toString() },
    });
  };

  const handleChildPress = (childId: number) => {
    router.push({
      pathname: "/(routes)/calendar",
      params: { childId: childId.toString() },
    });
  };

  const renderChildItem = ({ item }: { item: any }) => (
    <View style={styles.childCard}>
      <LinearGradient colors={["#01CED3", "#0185F7"]} style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.profile.full_name.charAt(0).toUpperCase()}
        </Text>
      </LinearGradient>
      <View style={styles.childInfo}>
        <Text style={styles.childName}>{item.profile.full_name}</Text>
        <Text style={styles.childDOB}>
          DOB: {new Date(item.date_of_birth).toLocaleDateString()}
        </Text>
      </View>
      <Pressable onPress={() => handleChildAttended(item.id)}>
        <FontAwesome
          name="calendar-check-o"
          size={24}
          color="#0185F7"
          style={{ marginRight: 10 }}
        />
      </Pressable>
      <Pressable onPress={() => handleChildPress(item.id)}>
        <Ionicons name="calendar-outline" size={24} color="#6248FF" />
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>Chilren</Text>
        <GradiantText
          text="SCHEDULE"
          styles={[
            styles.headerTitle,
            {
              paddingLeft: scale(5),
            },
          ]}
        />
      </View>

      {/* Nội dung */}
      <View style={styles.content}>
        {isLoading ? (
          <Text style={styles.loadingText}>Loading children...</Text>
        ) : isError ? (
          <Text style={styles.errorText}>Error loading children</Text>
        ) : children && children.length > 0 ? (
          <FlatList
            data={children}
            renderItem={renderChildItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.noDataText}>No children found</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ResourceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  headerWrapper: {
    flexDirection: "row",
    marginTop: windowHeight(8),
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: fontSizes.FONT35,
    fontFamily: "Poppins_500Medium",
    color: "#000",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  childCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  childDOB: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  listContent: {
    paddingBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  noDataText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});
