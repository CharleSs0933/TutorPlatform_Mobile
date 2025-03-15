import React, { useEffect, useState, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import {
  useLazyGetUserDataQuery,
  useLoginMutation,
  useRegisterMutation,
} from "@/state/api";
import { router } from "expo-router";
import { User } from "@/types";

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loader, setLoader] = useState(false);

  const [loginAPI] = useLoginMutation();
  const [registerAPI] = useRegisterMutation();
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

  const register = async (userData: {
    username: string;
    password: string;
    full_name: string;
    email: string;
  }) => {
    setLoader(true);
    try {
      await registerAPI(userData).unwrap();
      router.push("/(auth)/sign-in");
    } catch (error) {
      console.error("Register failed:", error);
    } finally {
      setLoader(false);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    setUser(null);
    router.push("/(auth)/sign-in");
  };

  const fetchUserData = useCallback(async () => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (accessToken) {
      fetchUserDataAPI({});
    } else {
      setUser(null);
      router.push("/(auth)/sign-in");
    }
  }, [fetchUserDataAPI]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (data) setUser(data);
    if (error) {
      console.error("Fetch user data failed:", error);
      setUser(null);
      router.push("/(auth)/sign-in");
    }
  }, [data, error]);

  return {
    user,
    loader: loader || isFetching,
    login,
    register,
    logout,
    refetch: fetchUserData,
  };
}
