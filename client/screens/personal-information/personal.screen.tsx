import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { scale, verticalScale } from "react-native-size-matters";
import { fontSizes } from "@/theme/app.constant";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUpdateParentMutation } from "@/state/api";
import useUser from "@/hooks/useUser";

const PersonalInformationScreen = () => {
  const { parent: parentString } = useLocalSearchParams();
  const { refetch, user } = useUser();
  const initialProfile = parentString
    ? JSON.parse(parentString as string)
    : null;

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(
    initialProfile || {
      username: "",
      full_name: "",
      email: "",
      phone: "",
    }
  );

  const [updateParent, { isLoading: isUpdating }] = useUpdateParentMutation();

  const handleInputChange = (field: keyof typeof profile, value: string) => {
    setProfile((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    if (!profile) return;

    const formData = new FormData();
    formData.append("full_name", profile.full_name);
    formData.append("email", profile.email);
    formData.append("phone", profile.phone);

    try {
      await updateParent({
        parentId: Number(user?.id),
        formData,
      }).unwrap();
      refetch();
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (!initialProfile) {
    return (
      <View style={styles.container}>
        <Text>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#6248FF", "#8673FC"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.header}
      >
        <StatusBar barStyle={"light-content"} />
        <SafeAreaView style={{ paddingTop: verticalScale(20) }}>
          <View style={styles.headerContent}>
            <Pressable onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={scale(24)} color="#fff" />
            </Pressable>
            <Text style={styles.headerTitle}>Personal Information</Text>
            <Pressable
              onPress={() => (isEditing ? handleUpdate() : setIsEditing(true))}
            >
              <Text style={styles.editButton}>
                {isEditing ? (isUpdating ? "Saving..." : "Save") : "Edit"}
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ padding: scale(20) }}
      >
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Profile Details</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>User Name</Text>
            <Text style={styles.value}>{profile.username}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Full Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profile.full_name}
                onChangeText={(text) => handleInputChange("full_name", text)}
              />
            ) : (
              <Text style={styles.value}>{profile.full_name}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profile.email}
                onChangeText={(text) => handleInputChange("email", text)}
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.value}>{profile.email}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profile.phone}
                onChangeText={(text) => handleInputChange("phone", text)}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.value}>{profile.phone}</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PersonalInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    height: verticalScale(60),
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    paddingHorizontal: scale(20),
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: fontSizes.FONT24,
    color: "#fff",
    fontFamily: "Poppins_500Medium",
  },
  editButton: {
    fontSize: fontSizes.FONT20,
    color: "#fff",
    fontFamily: "Poppins_500Medium",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: scale(20),
    padding: scale(15),
    marginBottom: verticalScale(20),
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: fontSizes.FONT22,
    fontFamily: "Poppins_500Medium",
    color: "#000",
    marginBottom: verticalScale(10),
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(10),
    alignItems: "center",
  },
  label: {
    fontSize: fontSizes.FONT17,
    fontFamily: "Poppins_400Regular",
    color: "#8a8a8a",
  },
  value: {
    fontSize: fontSizes.FONT17,
    fontFamily: "Poppins_400Regular",
    color: "#000",
  },
  input: {
    fontSize: fontSizes.FONT17,
    fontFamily: "Poppins_400Regular",
    color: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#8a8a8a",
    width: scale(200),
    paddingVertical: verticalScale(2),
  },
});
