import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import api from "@/misc/api";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  ResultsPageData,
  SemesterResult,
  CourseResult,
  extractResultsData,
} from "@/misc/utils";
import { Collapsible } from "@/components/Collapsible";

const ResultScreen = () => {
  const [resultsData, setResultsData] = useState<ResultsPageData>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/registration/Result");
        const html = response.data;
        const extractedData = extractResultsData(html);
        setResultsData(extractedData);
      } catch (error) {
        console.error("Error fetching results data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const renderCourseItem = (course: CourseResult, index: number) => (
    <TouchableOpacity key={index} style={styles.courseItem}>
      <Icon name="book" size={24} color={"gray"} />
      <View style={styles.courseDetails}>
        <ThemedText style={styles.courseCode}>{course.courseCode}</ThemedText>
        <ThemedText style={styles.courseTitle}>{course.courseTitle}</ThemedText>
        <ThemedText style={styles.grade}>{course.grade}</ThemedText>
        <ThemedText style={styles.courseUnit}>
          {course.courseUnit} units
        </ThemedText>
        <ThemedText style={styles.remark}>{course.remark}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  const renderSemesterResults = (semesterResults: SemesterResult[]) => {
    return semesterResults.map((semester, index) => (
      <ThemedView key={index} style={styles.section}>
        <Collapsible
          title={semester.title.substring(
            semester.title.indexOf("Session"),
            semester.title.lastIndexOf("]")
          )}
          style={styles.collapsible}
        >
          <ThemedText style={styles.semesterTitle}>{semester.title}</ThemedText>
          {semester.results.map(renderCourseItem)}
          <ThemedView style={styles.summary}>
            <ThemedText style={styles.summaryText}>
              GPA: {semester.gpa}
            </ThemedText>
            <ThemedText style={styles.summaryText}>
              CGPA: {semester.cgpa}
            </ThemedText>
            <ThemedText style={styles.summaryText}>
              Remark: {semester.remark}
            </ThemedText>
          </ThemedView>
        </Collapsible>
      </ThemedView>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.keys(resultsData).length > 0 ? (
        Object.keys(resultsData).map((key) => (
          <ThemedView key={key}>
            {renderSemesterResults(resultsData[key])}
          </ThemedView>
        ))
      ) : (
        <ThemedText>Error loading data</ThemedText>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    elevation: 2,
  },
  collapsible: {
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  semesterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  courseItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    padding: 12,
    borderRadius: 4,
    elevation: 2,
  },
  courseDetails: {
    marginLeft: 5,
  },
  courseCode: {
    fontSize: 16,
    fontWeight: "bold",
  },
  courseTitle: {
    fontSize: 14,
  },
  courseUnit: {
    fontSize: 12,
  },
  grade: {
    fontSize: 16,
    fontWeight: "bold",
  },
  remark: {
    fontSize: 12,
  },
  summary: {
    marginTop: 12,
  },
  summaryText: {
    fontWeight: "bold",
  },
});

export default ResultScreen;
