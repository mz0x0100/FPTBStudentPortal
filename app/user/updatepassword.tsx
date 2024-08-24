import CustomAlert from "@/components/CustomAlert";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import api from "@/misc/api";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    if (error.length >= 1) {
      setErrorVisible(true);
    } else if (alertMsg.length >= 1) {
      setAlertVisible(true);
    }
  }, [error, alertMsg]);
  const handleUpdatePassword = async () => {
    setLoading(true);
    setError("");
    setAlertMsg("");
    if (!newPassword || !confirmPassword || !currentPassword) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    } else if (newPassword !== confirmPassword) {
      setError("The password entered does not match!");
      setLoading(false);
      return;
    } else {
      await api
        .post("/registration/formHandler", {
          data: `oldpass=${currentPassword}&newpass=${newPassword}&newpass2=${newPassword}&form_submitted=change_password`,
        })
        .then((res) => {
          const data = res.data;
          console.log(res.data);
          if (data.includes("Password change successful!")) {
            setAlertMsg("Password changed successfully!");
            setLoading(false);
          } else if (data.includes("Your Old Password is wrong!")) {
            setError("Your Old Password is wrong!");
            setError("Unknown error occured, try again later!");
            setLoading(false);
          } else {
            setError("Unknown error occured, try again later!");
            setLoading(false);
          }
        });
    }
  };

  return (
    <>
      {errorVisible && (
        <CustomAlert
          message={error}
          onDismiss={() => setErrorVisible(false)}
          type="error"
          visible
        />
      )}
      {alertVisible && (
        <CustomAlert
          message={alertMsg}
          onDismiss={() => setAlertVisible(false)}
          type="success"
          visible
        />
      )}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <ThemedView style={styles.content}>
          <ThemedText type="title" style={styles.title}>
            Change password
          </ThemedText>
          <Password
            value={currentPassword}
            placeholder="Current password"
            onChangeText={setCurrentPassword}
          />
          <Password
            value={newPassword}
            placeholder="New password"
            onChangeText={setNewPassword}
          />
          <Password
            value={confirmPassword}
            placeholder="Confirm new password"
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleUpdatePassword}
          >
            {loading ? (
              <ActivityIndicator color="#eee" />
            ) : (
              <ThemedText style={styles.loginButtonText}>Update</ThemedText>
            )}
          </TouchableOpacity>
        </ThemedView>
      </KeyboardAvoidingView>
    </>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "90%",
  },
  title: {
    textAlign: "center",
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
    marginTop: 20,
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

interface PasswordProps {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
}
const Password: React.FC<PasswordProps> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ThemedView style={styles.passwordInputContainer}>
      <TextInput
        style={styles.passwordInput}
        keyboardType="default"
        placeholder={placeholder}
        placeholderTextColor={"#999"}
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
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
  );
};
