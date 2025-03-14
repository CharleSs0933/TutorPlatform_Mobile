import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Text, View } from "react-native";
import { Redirect } from "expo-router";

export default function Index() {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subcription = async () => {
      const token = SecureStore.getItem("accessToken");
      setLoggedInUser(token ? true : false);
      setLoading(false);
    };
    subcription();
  }, []);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <Redirect href={!loggedInUser ? "/(routes)/onboarding" : "/(tabs)"} />
      )}
    </>
  );
}
