import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Snackbar } from "react-native-paper";
import { doLogin } from "@/misc/utils";
import { router } from "expo-router";

export default function Login() {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginProgress, setLoginProgress] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const handleLoginSuccess = (data: any) => {
    // Write a logic to write login credentials to the db
    console.log("Login successful");
    setLoginProgress(false);
    router.replace("/");
  };
  const handleLoginError = () => {
    console.log("Incorrect login credentials");
    setLoginProgress(false);
    setError("Incorrect Login Credentials");
    setVisible(true);
  };
  const handleLogin = async () => {
    setError(null);
    setLoginProgress(true);

    if (!regNo || !password) {
      setError("Please fill in all fields");
      setVisible(true);
      setLoginProgress(false);
      return;
    }
    console.log("Login in progress");
    try {
      doLogin(regNo, password, handleLoginSuccess, handleLoginError);
    } catch (error) {
      setError("An error occurred. Please try again.");
      setVisible(true);
      setLoginProgress(false);
    }
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ThemedView style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/polylogo.jpg")}
            style={styles.logo}
            resizeMode="contain"
          />
          <ThemedText style={styles.title}>Welcome Back!</ThemedText>
        </ThemedView>
        <ThemedView style={styles.formContainer}>
          <TextInput
            style={styles.inputRegNo}
            keyboardType="default"
            placeholder="Reg no"
            placeholderTextColor={"#999"}
            autoCapitalize="none"
            value={regNo}
            onChangeText={setRegNo}
          />
          <ThemedView style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              keyboardType="default"
              placeholder="Password"
              placeholderTextColor={"#999"}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onEndEditing={handleLogin}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.showPasswordIcon}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#10A610"
              />
            </TouchableOpacity>
          </ThemedView>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            {loginProgress ? (
              <ActivityIndicator color="#eee" />
            ) : (
              <ThemedText style={styles.loginButtonText}>Login</ThemedText>
            )}
          </TouchableOpacity>
        </ThemedView>
      </KeyboardAvoidingView>
      <Snackbar visible={visible} onDismiss={handleDismiss}>
        {error}
      </Snackbar>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 25,
    marginTop: 10,
  },
  inputRegNo: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  passwordInputContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  passwordInput: {
    flex: 1,
  },
  showPasswordIcon: {
    marginLeft: "auto",
  },
  loginButton: {
    backgroundColor: "#10A610",
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 45,
  },
  loginButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
