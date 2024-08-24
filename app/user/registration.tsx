import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import api from "@/misc/api";
import { RegistrationDetails, extractRegistrationDetails } from "@/misc/utils";
import { ThemedView } from "@/components/ThemedView";
import DataItem from "@/components/DataItem";
import { ThemedText } from "@/components/ThemedText";

const RegistrationScreen: React.FC = () => {
  const [regDetails, setregDetails] = useState<RegistrationDetails | null>(
    null
  );
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  useEffect(() => {
    const fetchregDetails = async () => {
      try {
        const response = await api.get("/registration/regDetails");
        const htmlContent = response.data;
        const details = extractRegistrationDetails(htmlContent);
        setregDetails(details);
      } catch (error) {
        console.error("Error fetching registration details:", error);
      }
    };

    fetchregDetails();
  }, []);

  if (regDetails == null) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        // isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <ThemedView>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: regDetails.imageUrl }}
            style={styles.profileImage}
          />
          <ThemedText style={styles.name}>{regDetails.fullName}</ThemedText>
        </View>
        <ThemedView style={styles.detailsContainer}>
          <DataItem
            label="Registration Number"
            value={regDetails.regNumber}
            iconName="id-badge"
            iconColor="blue"
          />
          <DataItem
            label="Programme"
            value={regDetails.programme}
            iconName="book"
            iconColor="navy"
          />
          <DataItem
            label="Department"
            value={regDetails.department}
            iconName="building"
            iconColor="gray"
          />
          <DataItem
            label="School"
            value={regDetails.school}
            iconName="university"
            iconColor="teal"
          />
          <DataItem
            label="Institution Email"
            value={regDetails.institutionEmail}
            iconName="envelope"
            iconColor="red"
          />
          <DataItem
            label="Default Email Password"
            value={regDetails.defaultPassword}
            iconName="key"
            iconColor="red"
          />
          <ThemedText>{regDetails.notes}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  lightContainer: {
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  lightText: {
    color: "#000",
  },
  darkText: {
    color: "#fff",
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 18,
  },
  notes: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default RegistrationScreen;
