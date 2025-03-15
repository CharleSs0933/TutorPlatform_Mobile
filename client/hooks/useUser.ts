import { register } from "./../../server/src/controllers/authController";
import React, { useEffect, useState, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import {
  useGetUserDataQuery,
  useLoginMutation,
  useRegisterMutation,
} from "@/state/api";
import { router } from "expo-router";
import { User } from "@/types";

export default function useUser() {
  const [user, setUser] = useState<User>();
  const [loader, setLoader] = useState(false);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [loginAPI] = useLoginMutation();
  const [registerAPI] = useRegisterMutation();

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setLoader(true);
    try {
      const data = await loginAPI({ username, password }).unwrap();

      await SecureStore.setItemAsync("accessToken", data.accessToken);

      router.push("/(tabs)");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoader(false);
    }
  };

  const register = async ({
    username,
    password,
    full_name,
    email,
  }: {
    username: string;
    password: string;
    full_name: string;
    email: string;
  }) => {
    setLoader(true);
    try {
      await registerAPI({ username, password, full_name, email }).unwrap();

      router.push("/(auth)/sign-in");
    } catch (error) {
      console.error("Register failed:", error);
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
      const { data: user } = useGetUserDataQuery({});
      setUser(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
    return () => setShouldRefetch(false);
  }, [fetchUserData, shouldRefetch]);

  const refetch = () => {
    setShouldRefetch(true);
  };

  return { user, loader, refetch, login, register, logout };
}
