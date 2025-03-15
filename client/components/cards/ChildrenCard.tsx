import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Children } from "@/types";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { fontSizes } from "@/theme/app.constant";

type Props = {
  child: Children;
  selectedChild: Children | null;
  setSelectedChild: (child: Children) => void;
};

const ChildrenCard = ({ child, selectedChild, setSelectedChild }: Props) => {
  const isSelected = selectedChild?.id === child.id;

  return (
    <Pressable
      onPress={() => setSelectedChild(child)}
      style={[styles.card, isSelected && styles.cardSelected]}
    >
      <View style={styles.cardContent}>
        <Text style={styles.label}>{child.profile?.full_name}</Text>
        <Text style={styles.label}>
          Date of Birth: {child.date_of_birth.split("T")[0]}
        </Text>
        <Text style={styles.label}>{child.learning_goals}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1, // For equal width in FlatList grid
    marginVertical: verticalScale(4),
    backgroundColor: "#FFF",
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: "#D3D3D3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardSelected: {
    borderColor: "#2563EB", // Equivalent to border-primary
    borderWidth: 2,
  },
  cardContent: {
    padding: moderateScale(10),
    gap: verticalScale(4),
  },
  label: {
    fontSize: fontSizes.FONT16,
    fontFamily: "Poppins_400Regular",
    color: "#000",
  },
});

export default ChildrenCard;
