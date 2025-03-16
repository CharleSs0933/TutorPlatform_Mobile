import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  useGetChildrenQuery,
  useUpdateChildrenMutation,
  useCreateChildrenMutation,
  useDeleteChildrenMutation,
} from "@/state/api";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { FormData } from "@/types";
import { scale } from "react-native-size-matters";
import { verticalScale } from "react-native-size-matters";

const ChildManagementScreen = () => {
  const router = useRouter();
  const {
    data: children,
    isLoading,
    isError,
    refetch,
  } = useGetChildrenQuery({});
  const [updateChild] = useUpdateChildrenMutation();
  const [createChild] = useCreateChildrenMutation();
  const [deleteChild] = useDeleteChildrenMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [selectedChild, setSelectedChild] = useState<any>(null); // Thay bằng type cụ thể nếu có API schema
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState<number[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    username: "",
    full_name: "",
    password: "",
    date_of_birth: new Date().toISOString(),
    learning_goals: "",
  });

  const handleInputChange = (
    field: keyof Omit<FormData, "date_of_birth">,
    value: string
  ) => {
    setShowDatePicker(false);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: DateType) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      setFormData((prev) => ({
        ...prev,
        date_of_birth: date.toISOString(),
      }));
    }
    setShowDatePicker(false);
  };

  const handleSubmit = async () => {
    try {
      const submitData = {
        ...formData,
        date_of_birth: formData.date_of_birth,
      };

      if (modalType === "create") {
        if (!submitData.password) {
          alert("Password is required for creating a child!");
          return;
        }
        await createChild(submitData).unwrap();
      } else if (modalType === "edit" && selectedChild) {
        const updatedData = { id: selectedChild.id, ...submitData };
        await updateChild(updatedData).unwrap();
      }
      refetch();
      setModalVisible(false);
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      full_name: "",
      password: "",
      date_of_birth: new Date().toISOString(),
      learning_goals: "",
    });
    setSelectedChild(null);
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedForDelete.map((id) => deleteChild(id).unwrap())
      );
      setSelectedForDelete([]);
      setIsDeleteMode(false);
      refetch();
    } catch (error) {
      console.error("Error deleting children:", error);
    }
  };

  const openCreateModal = () => {
    setModalType("create");
    resetForm();
    setModalVisible(true);
  };

  const openEditModal = (child: any) => {
    setModalType("edit");
    setSelectedChild(child);
    setFormData({
      username: child.profile.username,
      full_name: child.profile.full_name,
      password: "",
      date_of_birth: child.date_of_birth,
      learning_goals: child.learning_goals || "",
    });
    setModalVisible(true);
  };

  const renderChildItem = ({ item }: { item: any }) => (
    <Pressable
      style={styles.childItem}
      onPress={() => {
        if (isDeleteMode) {
          setSelectedForDelete((prev) =>
            prev.includes(item.id)
              ? prev.filter((id) => id !== item.id)
              : [...prev, item.id]
          );
        } else {
          openEditModal(item);
        }
      }}
    >
      <View style={styles.childInfo}>
        <LinearGradient
          colors={["#01CED3", "#0185F7"]}
          style={styles.profileImg}
        >
          <Text style={styles.profileInitial}>
            {item.profile.full_name.charAt(0)}
          </Text>
        </LinearGradient>
        <View>
          <Text style={styles.childName}>{item.profile.full_name}</Text>
          <Text style={styles.childDOB}>
            {new Date(item.date_of_birth).toLocaleDateString()}
          </Text>
        </View>
      </View>
      {isDeleteMode ? (
        <View
          style={[
            styles.checkbox,
            selectedForDelete.includes(item.id) && styles.checkboxSelected,
          ]}
        />
      ) : (
        <Ionicons name="chevron-down" size={20} color="#8a8a8a" />
      )}
    </Pressable>
  );

  return (
    <View style={styles.container}>
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
            <Text style={styles.screenTitle}>Children Management</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={openCreateModal}>
          <LinearGradient
            style={styles.actionButton}
            colors={["#01CED3", "#0185F7"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <MaterialIcons name="add" size={24} color="#fff" />
            <Text style={styles.buttonText}>Create</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsDeleteMode((prev) => !prev)}>
          <LinearGradient
            style={styles.actionButton}
            colors={["#BF6FF8", "#3C1BE9"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <MaterialIcons name="delete" size={24} color="#fff" />
            <Text style={styles.buttonText}>
              {isDeleteMode ? "Cancel" : "Delete"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Danh sách trẻ */}
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : isError ? (
        <Text style={styles.errorText}>Error loading children</Text>
      ) : (
        <FlatList
          data={children}
          renderItem={renderChildItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      )}

      {/* Modal chung cho create và edit */}
      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.modalTitle}>
              {modalType === "create" ? "Create New Child" : "Edit Child"}
            </Text>
            <Pressable
              style={styles.absoluteModalBackButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </Pressable>
            <View style={styles.modalContent}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                value={formData.username}
                onChangeText={(text) => handleInputChange("username", text)}
              />
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={formData.full_name}
                onChangeText={(text) => handleInputChange("full_name", text)}
              />
              <Text style={styles.label}>
                {modalType === "create"
                  ? "Password"
                  : "New Password (optional)"}
              </Text>
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(text) => handleInputChange("password", text)}
                secureTextEntry
              />
              <Text style={styles.label}>Date of Birth</Text>
              <Pressable onPress={() => setShowDatePicker(true)}>
                <Text style={styles.input}>
                  {new Date(formData.date_of_birth).toLocaleDateString()}
                </Text>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  mode="single"
                  date={new Date(formData.date_of_birth)}
                  onChange={(params) => handleDateChange(params.date)}
                  // headerContainerStyle={{ backgroundColor: "#6248FF" }}
                  // headerTextStyle={{ color: "#fff" }}
                  // weekDaysTextStyle={{ color: "#6248FF" }}
                  // selectedItemColor="#6248FF"
                  // calendarTextStyle={{ color: "#000" }}
                  // selectedTextStyle={{ color: "#fff" }}
                />
              )}
              <Text style={styles.label}>Learning Goals</Text>
              <TextInput
                style={styles.input}
                value={formData.learning_goals}
                onChangeText={(text) =>
                  handleInputChange("learning_goals", text)
                }
              />
            </View>
            <View style={styles.modalButtons}>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={handleSubmit}>
                <Text style={styles.modalButtonText}>
                  {modalType === "create" ? "Create" : "Save"}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Nút xác nhận xóa */}
      {isDeleteMode && selectedForDelete.length > 0 && (
        <TouchableOpacity
          style={styles.deleteConfirmButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteConfirmText}>Delete Selected</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ChildManagementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  actionButton: {
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 5,
  },
  list: {
    paddingHorizontal: 20,
  },
  childItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  childInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  profileInitial: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  childName: {
    fontSize: 18,
    color: "#000",
  },
  childDOB: {
    fontSize: 14,
    color: "#8a8a8a",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#8a8a8a",
    borderRadius: 5,
  },
  checkboxSelected: {
    backgroundColor: "#6248FF",
    borderColor: "#6248FF",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  absoluteModalBackButton: {
    position: "absolute",
    top: 20,
    right: 0,
    padding: 5,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 22,
    color: "#000",
    marginBottom: 20,
  },
  modalContent: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#8a8a8a",
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    color: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#8a8a8a",
    paddingVertical: 5,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButtonText: {
    fontSize: 18,
    color: "#6248FF",
  },
  deleteConfirmButton: {
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 20,
  },
  deleteConfirmText: {
    color: "#fff",
    fontSize: 18,
  },
});
