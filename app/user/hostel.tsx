import { ThemedText } from "@/components/ThemedText";
import api from "@/misc/api";
import { HostelAccommodationData, extractHostelData } from "@/misc/utils";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

const HostelAccommodationScreen = () => {
  const [data, setData] = useState<HostelAccommodationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.get("/registration/getHostel").then((res) => {
          const extractedData = extractHostelData(res.data);
          setData(extractedData);
        });
      } catch (error) {
        console.error("Error fetching hostel accommodation data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!data) {
    return <Text>Error loading data</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText style={styles.header}>Hostel Accommodation</ThemedText>
      <TouchableOpacity style={styles.item}>
        <Icon name="bed" size={24} color="gray" />
        <View style={styles.itemDetails}>
          <ThemedText style={styles.label}>Allocation Availability:</ThemedText>
          <ThemedText style={styles.value}>
            {data.allocationAvailability}
          </ThemedText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Icon name="clipboard" size={24} color="gray" />
        <View style={styles.itemDetails}>
          <ThemedText style={styles.label}>Booking Status:</ThemedText>
          <ThemedText style={styles.value}>{data.bookingStatus}</ThemedText>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    padding: 12,
    // backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  itemDetails: {
    marginLeft: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 14,
    // color: "#666",
  },
});

export default HostelAccommodationScreen;
