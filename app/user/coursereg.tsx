import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import api from "@/misc/api";
import { CourseRegistrationData, extractCourseReg } from "@/misc/utils";
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

const CourseRegistrationScreen = () => {
  const [data, setData] = useState<CourseRegistrationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.get("/registration/courseReg").then((res) => {
          const extractedData = extractCourseReg(res.data);
          setData(extractedData);
        });
      } catch (error) {
        console.error("Error fetching course registration data:", error);
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
      {/* <ThemedText style={styles.header}>Course Registration</ThemedText> */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.label}>Academic Session:</ThemedText>
        <ThemedText style={styles.value}>{data.academicSession}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.section}>
        <ThemedText style={styles.label}>Class:</ThemedText>
        <ThemedText style={styles.value}>{data.class}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.section}>
        <ThemedText style={styles.label}>Semester:</ThemedText>
        <ThemedText style={styles.value}>{data.semester}</ThemedText>
      </ThemedView>
      {data.courses.map(
        (course, index) =>
          course.code &&
          course.title && (
            <TouchableOpacity key={index} style={styles.courseItem}>
              <Icon name="book" size={24} color={"gray"} />
              <View style={styles.courseDetails}>
                <ThemedText style={styles.courseCode}>{course.code}</ThemedText>
                <ThemedText style={styles.courseTitle}>
                  {course.title}
                </ThemedText>
                <ThemedText style={styles.courseType}>{course.type}</ThemedText>
                <ThemedText style={styles.courseUnit}>
                  {course.unit} units
                </ThemedText>
              </View>
            </TouchableOpacity>
          )
      )}
      <ThemedView style={styles.totalUnit}>
        <ThemedText style={styles.totalLabel}>Total Unit:</ThemedText>
        <ThemedText style={styles.totalValue}>{data.totalUnit}</ThemedText>
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    padding: 8,
    // backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    // color: "#333",
  },
  courseItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    padding: 12,
    // backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  courseDetails: {
    marginLeft: 12,
  },
  courseCode: {
    fontSize: 16,
    fontWeight: "bold",
  },
  courseTitle: {
    fontSize: 14,
    // color: "#666",
  },
  courseType: {
    fontSize: 12,
    // color: "#888",
  },
  courseUnit: {
    fontSize: 12,
    // color: "#888",
  },
  totalUnit: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    padding: 8,
    // backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  totalLabel: {
    fontWeight: "bold",
  },
  totalValue: {
    // color: "#333",
  },
});

export default CourseRegistrationScreen;
