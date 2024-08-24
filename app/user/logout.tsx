import { ThemedText } from "@/components/ThemedText";
import { doLogout } from "@/misc/utils";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";

export default function Logout() {
  const [logoutInProgress, setLogoutInProgress] = useState(false);
  const [error, setError] = useState("");
  const handleLogout = () => {
    setLogoutInProgress(false);
    router.replace("/user/login");
  };
  useEffect(() => {
    try {
      setLogoutInProgress(true);
      doLogout(handleLogout);
    } catch (err) {
      setError("Unable to sign you out, try again in a little bit!!");
    }
  }, []);

  if (logoutInProgress) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <ThemedText>{error}</ThemedText>;
  }
}
