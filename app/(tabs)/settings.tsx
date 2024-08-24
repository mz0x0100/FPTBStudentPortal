import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";
import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ExternalLink } from "@/components/ExternalLink";
import { RadioButton } from "react-native-paper";
import { useContext, useEffect, useState } from "react";

export default function SettingsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="settings" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>
      <ThemedText>Coming soon😎️!!!</ThemedText>
      <ThemedText>
        Contact the developer on{" "}
        <ThemedText type="link">
          <ExternalLink href="https://wa.me/+2348147746399">
            WhatsApp
          </ExternalLink>
        </ThemedText>
        🤓️
      </ThemedText>
      <Collapsible title="Profile Settings">
        <ThemedText>Manage your profile information.</ThemedText>
        <ExternalLink href="/profile/edit">
          <ThemedText type="link">Edit Profile</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Notification Settings">
        <ThemedText>Manage your notification preferences.</ThemedText>
        <ExternalLink href="/settings/notifications">
          <ThemedText type="link">Notification Preferences</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Privacy and Security">
        <ThemedText>Control your privacy and security settings.</ThemedText>
        <ExternalLink href="/settings/privacy">
          <ThemedText type="link">Privacy Settings</ThemedText>
        </ExternalLink>
        <ExternalLink href="/settings/security">
          <ThemedText type="link">Security Settings</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Theme Settings">
        <ThemedText>Select Theme:</ThemedText>
      </Collapsible>

      <Collapsible title="Help and Support">
        <ThemedText>Find help and support resources.</ThemedText>

        <ExternalLink href="/help/contact">
          <ThemedText type="link">Contact Support</ThemedText>
        </ExternalLink>
        <ExternalLink href="mailto:adamukala234@gmail.com">
          <ThemedText type="link">Send Feedback</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
