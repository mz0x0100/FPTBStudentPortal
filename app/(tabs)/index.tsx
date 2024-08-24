import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DataItem from "@/components/DataItem";
import { HelloWave } from "@/components/HelloWave";
import api from "@/misc/api";
import { ActivityIndicator } from "react-native-paper";
import CustomAlert from "@/components/CustomAlert";
import { HomeDataType, doLogin, extractHomeDataFromHtml } from "@/misc/utils";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [profile, setProfile] = useState<HomeDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  const loginCred = AsyncStorage.getItem("loginCred");

  const loadStudentData = () => {
    try {
      api.get("/registration/personalDetails").then((res) => {
        const extractedData = extractHomeDataFromHtml(`${res.data}`);
        console.log(extractedData);
        setProfile(extractedData);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Error fetching data..");
      setVisible(true);
    }
  };

  useEffect(() => {
    loadStudentData();
  }, []);

  const handleDismiss = () => {
    setVisible(false);
  };
  return (
    <ScrollView style={styles.container}>
      <CustomAlert
        message={error}
        visible={visible}
        type="error"
        onDismiss={handleDismiss}
      />

      <Image
        source={require("@/assets/images/poly.jpg")}
        resizeMode="cover"
        style={styles.imageHeader}
      />
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: profile?.profileImage }}
          style={styles.profileImage}
          resizeMode="cover"
        />
      </View>
      {/* <ThemedView style={styles.content}> */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ThemedView style={styles.content}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText style={{ fontSize: 24, fontWeight: "bold" }}>
              {profile?.name}
            </ThemedText>
            <HelloWave />
          </ThemedView>
          <ThemedView style={styles.sectionContainer}>
            <ThemedText style={styles.welcome}>Personal Details</ThemedText>
            <DataItem
              label="Registration Number"
              value={profile?.regNo ?? ""}
              iconName="id-badge"
              iconColor="blue"
            />
            <DataItem
              label="Application Number"
              value={profile?.appNo ?? ""}
              iconName="id-card"
              iconColor="orange"
            />
            <DataItem
              label="Date of Birth"
              value={profile?.dob ?? ""}
              iconName="birthday-cake"
              iconColor="green"
            />
            <DataItem
              label="Phone Number"
              value={profile?.phone ?? ""}
              iconName="phone"
              iconColor="purple"
            />
            <DataItem
              label="Residential Address"
              value={profile?.address ?? ""}
              iconName="home"
              iconColor="brown"
            />
            <DataItem
              label="Institution Email"
              value={profile?.email ?? ""}
              iconName="envelope"
              iconColor="red"
            />
          </ThemedView>
          <ThemedView style={styles.sectionContainer}>
            <ThemedText style={styles.welcome}>Academic Details</ThemedText>
            <DataItem
              label="Programme"
              value={profile?.programme ?? ""}
              iconName="book"
              iconColor="navy"
            />
            <DataItem
              label="Current Class"
              value={profile?.currentClass ?? ""}
              iconName="graduation-cap"
              iconColor="gold"
            />
            <DataItem
              label="Department"
              value={profile?.department ?? ""}
              iconName="building"
              iconColor="gray"
            />
            <DataItem
              label="School"
              value={profile?.school ?? ""}
              iconName="university"
              iconColor="teal"
            />
          </ThemedView>
        </ThemedView>
      )}
      {/* </ThemedView> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 26,
    marginTop: 40,
  },
  welcome: {
    fontWeight: "bold",
    fontSize: 20,
  },
  imageHeader: {
    maxHeight: 200,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 20,
  },
  profileImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    position: "absolute",
    width: "100%",
    top: 90,
    zIndex: 1,
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 82,
    borderWidth: 4,
    borderColor: "#fff",
    marginHorizontal: "auto",
  },
  sectionContainer: {
    // padding: 10,
    marginBottom: 20,
  },
});
