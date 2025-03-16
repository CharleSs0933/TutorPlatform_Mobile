import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { verticalScale, moderateScale } from "react-native-size-matters";

interface PackageCardProps {
  amount: number;
  bonus: number;
  price: number;
  onSubscribe: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  amount,
  bonus,
  price,
  onSubscribe,
}) => {
  return (
    <View style={styles.packageCard}>
      <View style={styles.packageInfo}>
        <Text style={styles.packageAmount}>
          ${amount} {bonus > 0 ? `+ $${bonus} Bonus` : ""}
        </Text>
        <Text style={styles.packagePrice}>Total: ${price}</Text>
      </View>
      <Pressable style={styles.subscribeButton} onPress={onSubscribe}>
        <Text style={styles.subscribeButtonText}>Subscribe</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  packageCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    marginBottom: verticalScale(10),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  packageInfo: {
    flex: 1,
  },
  packageAmount: {
    fontSize: 18,
    color: "#2E3192",
    fontWeight: "bold",
  },
  packagePrice: {
    fontSize: 14,
    color: "#666",
  },
  subscribeButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(10),
  },
  subscribeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PackageCard;
