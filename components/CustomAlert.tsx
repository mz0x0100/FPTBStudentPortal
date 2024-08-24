import React, { useEffect } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

interface CustomAlertProps {
  message: string;
  visible: boolean;
  type: "success" | "error";
  onDismiss: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  message,
  visible,
  type,
  onDismiss,
}) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(onDismiss);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity },
        type == "success" ? styles.success : styles.error,
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 10,
    zIndex: 1000,
  },
  success: {
    backgroundColor: "#69ff61",
  },
  error: {
    backgroundColor: "#ff6961",
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
});

export default CustomAlert;
