import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type TopMenuProps = {
  onHomePress: () => void;
  onProfilePress: () => void;
  onSettingsPress: () => void;
};

const TopMenu = ({
  onHomePress,
  onProfilePress,
  onSettingsPress,
}: TopMenuProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onHomePress} style={styles.menuItem}>
        <Ionicons name="home-outline" size={24} color="#555" />
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onProfilePress} style={styles.menuItem}>
        <Ionicons name="person-outline" size={24} color="#555" />
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSettingsPress} style={styles.menuItem}>
        <Ionicons name="settings-outline" size={24} color="#555" />
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuItem: {
    alignItems: "center",
  },
  menuText: {
    marginTop: 5,
    fontSize: 12,
    color: "#555",
  },
});

export default TopMenu;
