import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useLocalSearchParams, router, Redirect } from "expo-router";
import { WalletPackage } from "@/types";
import Payment from "@/components/checkout/Payment";
import useUser from "@/hooks/useUser";

const ConfirmPackageScreen = () => {
  const { package: pkgString } = useLocalSearchParams<{ package?: string }>();
  const pkg: WalletPackage | null = pkgString
    ? JSON.parse(pkgString as string)
    : null;

  const { user, refetch } = useUser();

  // Sample wallet data (replace with real data from context/redux if available)
  const wallet = {
    balance: 150.0,
    currency: "USD",
  };

  const handleConfirm = () => {
    // Add your confirmation logic here (e.g., API call)
    console.log("Confirmed package:", pkg);
  };

  if (!pkg) {
    return <Redirect href="/(routes)/package" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#6248FF", "#8673FC"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContainer}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.screenTitle}>Confirm Package</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Package Details Card */}
        <View style={styles.packageCard}>
          <LinearGradient
            colors={["#4A90E2", "#50E3C2"]}
            style={styles.packageGradient}
          >
            <View style={styles.packageHeader}>
              <Text style={styles.packageTitle}>Selected Wallet Package</Text>
              <Ionicons name="pricetag" size={30} color="#fff" />
            </View>
            <Text style={styles.packageAmount}>
              {pkg.amount} {wallet.currency}
            </Text>
            {pkg.bonus > 0 && (
              <Text style={styles.packageBonus}>
                + {pkg.bonus} {wallet.currency} Bonus
              </Text>
            )}
            <Text style={styles.packagePrice}>
              Total: ${pkg.price + pkg.bonus}
            </Text>
          </LinearGradient>
        </View>

        {/* Wallet Balance Reminder */}
        <View style={styles.walletInfo}>
          <Text style={styles.walletText}>
            Wallet Balance: {wallet.balance} {wallet.currency}
          </Text>
        </View>

        {/* Confirm Button */}

        <Payment
          amount={pkg.amount}
          fullName={user?.full_name!}
          email={user?.email!}
          bonus={pkg.bonus}
          refetch={refetch}
        />

        {/* Cancel Option */}
        <Pressable onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmPackageScreen;

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
  content: {
    padding: moderateScale(20),
    alignItems: "center",
  },
  packageCard: {
    width: "100%",
    borderRadius: moderateScale(15),
    overflow: "hidden",
    marginBottom: verticalScale(20),
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  packageGradient: {
    padding: moderateScale(20),
  },
  packageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  packageTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  packageAmount: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: verticalScale(5),
  },
  packageBonus: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    marginBottom: verticalScale(5),
  },
  packagePrice: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
  },
  walletInfo: {
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  walletText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  warningText: {
    fontSize: 14,
    color: "#FF4D4D",
    marginTop: verticalScale(5),
  },
  confirmButton: {
    width: "80%",
    borderRadius: moderateScale(10),
    overflow: "hidden",
    marginBottom: verticalScale(15),
  },
  buttonGradient: {
    paddingVertical: verticalScale(12),
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    paddingVertical: verticalScale(10),
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  errorText: {
    fontSize: 18,
    color: "#FF4D4D",
    textAlign: "center",
    marginTop: verticalScale(20),
  },
});
