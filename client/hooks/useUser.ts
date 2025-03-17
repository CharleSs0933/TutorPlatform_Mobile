import React, { useEffect, useState, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import { useLazyGetUserDataQuery, useLoginMutation } from "@/state/api";
import { router } from "expo-router";
import { User } from "@/types";

export default function useUser() {
  const [user, setUser] = useState<User>();
  const [loader, setLoader] = useState(false);

  const [loginAPI] = useLoginMutation();

  const [fetchUserDataAPI, { data, error, isFetching }] =
    useLazyGetUserDataQuery();

  const login = async (credentials: { username: string; password: string }) => {
    setLoader(true);
    try {
      const data = await loginAPI(credentials).unwrap();
      await SecureStore.setItemAsync("accessToken", data.accessToken);
      router.push("/(tabs)");
      fetchUserData();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoader(false);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    router.push("/(auth)/sign-in");
  };

  const fetchUserData = useCallback(async () => {
    setLoader(true);
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");

      if (!accessToken) {
        router.push("/(auth)/sign-in");
        return;
      }

      await fetchUserDataAPI({}).unwrap();
    } catch (err) {
      console.error("Error fetching user data:", err);
      router.push("/(auth)/sign-in");
    } finally {
      setLoader(false);
    }
  }, [fetchUserDataAPI]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (data) setUser(data);
    if (error) {
      console.error("Fetch user data failed:", error);
      // router.push("/(auth)/sign-in");
    }
  }, [data, error]);

  return {
    user,
    loader,
    login,
    logout,
    refetch: fetchUserData,
  };
}
