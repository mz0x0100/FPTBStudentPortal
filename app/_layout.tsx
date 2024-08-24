import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/misc/api";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const sessionCookie = AsyncStorage.getItem("PHPSESSID");

  useEffect(() => {
    api.get("/registration/doLogin/0").then((res) => {});
    if (!sessionCookie) {
      api.get("/registration/doLogin/0");
    } else {
      console.log(sessionCookie);
    }
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      router.replace("/user/login");
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="user/login"
          options={{ headerShown: true, headerTitle: "Student Login" }}
        />
        <Stack.Screen
          name="user/coursereg"
          options={{ headerShown: true, headerTitle: "Course registration" }}
        />
        <Stack.Screen
          name="user/hostel"
          options={{ headerShown: true, headerTitle: "Hostel accommodation" }}
        />
        <Stack.Screen
          name="user/logout"
          options={{ headerShown: true, headerTitle: "Student logout" }}
        />
        <Stack.Screen
          name="user/payreceipt"
          options={{ headerShown: true, headerTitle: "Payment receipt" }}
        />
        <Stack.Screen
          name="user/registration"
          options={{ headerShown: true, headerTitle: "Registration details" }}
        />
        <Stack.Screen
          name="user/results"
          options={{ headerShown: true, headerTitle: "Student result" }}
        />
        <Stack.Screen
          name="user/updatepassword"
          options={{ headerShown: true, headerTitle: "Update password" }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
