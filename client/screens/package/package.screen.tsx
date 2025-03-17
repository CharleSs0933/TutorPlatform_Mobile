import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { router } from "expo-router";
import PackageCard from "@/components/cards/Package";
import { WalletPackage } from "@/types";
import useUser from "@/hooks/useUser";

const PackageScreen = () => {
  const { user } = useUser();

  const packages: WalletPackage[] = [
    { id: 1, amount: 10, bonus: 0, price: 10 },
    { id: 2, amount: 25, bonus: 0, price: 25 },
    { id: 3, amount: 50, bonus: 0, price: 50 },
    { id: 4, amount: 100, bonus: 15, price: 100 },
    { id: 5, amount: 200, bonus: 40, price: 200 },
    { id: 6, amount: 500, bonus: 100, price: 500 },
    { id: 7, amount: 1000, bonus: 250, price: 1000 },
  ];

  const handleSubscribe = (pkg: WalletPackage) => {
    router.push({
      pathname: "/(routes)/confirm-package",
      params: { package: JSON.stringify(pkg) },
    });
  };

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
          <Text style={styles.screenTitle}>Package</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Wallet Card Section */}
        <View style={styles.content}>
          <View style={styles.walletCard}>
            <LinearGradient
              colors={["#4A90E2", "#50E3C2"]}
              style={styles.walletGradient}
            >
              <View style={styles.walletHeader}>
                <Text style={styles.walletTitle}>Wallet Balance</Text>
                <Ionicons name="wallet" size={30} color="#fff" />
              </View>
              <Text style={styles.walletBalance}>${user?.walletAmount}</Text>
            </LinearGradient>
          </View>

          {/* Packages Section */}
          <Text style={styles.sectionTitle}>Wallet Packages</Text>
          <ScrollView contentContainerStyle={styles.packageScrollContainer}>
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                amount={pkg.amount}
                bonus={pkg.bonus}
                price={pkg.price}
                onSubscribe={() => handleSubscribe(pkg)}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PackageScreen;

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
    padding: moderateScale(5),
  },
  walletCard: {
    borderRadius: moderateScale(15),
    overflow: "hidden",
    marginBottom: verticalScale(20),
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  walletGradient: {
    padding: moderateScale(20),
  },
  walletHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  walletTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  walletBalance: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: verticalScale(5),
  },
  walletSubText: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.8,
  },
  walletFooter: {
    marginTop: verticalScale(15),
  },
  rechargeButton: {
    backgroundColor: "#fff",
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(10),
    alignItems: "center",
  },
  rechargeButtonText: {
    color: "#4A90E2",
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
    marginBottom: verticalScale(15),
  },
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
  packageScrollContainer: {
    paddingBottom: verticalScale(10),
  },
});
