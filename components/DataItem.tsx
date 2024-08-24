import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedView } from "./ThemedView";

type DataItemProps = {
  label: string;
  value: string;
  iconName: keyof typeof FontAwesome.glyphMap;
  iconColor: string;
};

const DataItem: React.FC<DataItemProps> = ({
  label,
  value,
  iconName,
  iconColor,
}) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.iconContainer}>
        <FontAwesome name={iconName} size={24} color={iconColor} />
      </ThemedView>
      <ThemedView style={styles.textContainer}>
        <ThemedText style={styles.label}>{label}</ThemedText>
        <ThemedText selectable>{value}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 20,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    opacity: 0.9,
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontWeight: "bold",
  },
});

export default DataItem;
