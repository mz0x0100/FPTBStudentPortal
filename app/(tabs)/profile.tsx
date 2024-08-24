import React from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Href, router, Link } from "expo-router";

const categories = [
  {
    label: "Results",
    iconName: "stats-chart",
    route: "/user/results",
    color: "#3F51B5",
  },
  {
    label: "Registration Details",
    iconName: "clipboard",
    route: "/user/registration",
    color: "#009688",
  },
  {
    label: "Course Registration",
    iconName: "book",
    route: "/user/coursereg",
    color: "#57FE22",
  },
  {
    label: "Payment Receipts",
    iconName: "receipt",
    route: "/user/payreceipt",
    color: "#607D8B",
  },

  {
    label: "Hostel Accommodation",
    iconName: "bed",
    route: "/user/hostel",
    color: "#795548",
  },
  {
    label: "Update Password",
    iconName: "key",
    route: "/user/updatepassword",
    color: "#B71EAA",
  },
  {
    label: "Logout",
    iconName: "log-out",
    route: "/user/logout",
    color: "#F44336",
  },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.sectionContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.listItem}
            onPress={() =>
              category.label == "Logout"
                ? router.replace(category.route as Href<string>)
                : router.navigate(category.route as Href<string>)
            }
          >
            <Ionicons
              name={`${category.iconName}` as keyof typeof Ionicons.glyphMap}
              size={24}
              color={category.color}
              style={styles.icon}
            />
            <ThemedText style={styles.listText}>{category.label}</ThemedText>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="grey"
              style={styles.arrow}
            />
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    gap: 16,
    overflow: "hidden",
  },
  sectionContainer: {
    padding: 10,
    marginBottom: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 30,
  },
  icon: {
    marginRight: 15,
  },
  listText: {
    flex: 1,
    fontSize: 18,
  },
  arrow: {
    marginLeft: 15,
  },
});
