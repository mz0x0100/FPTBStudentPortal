import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import api from "@/misc/api";
import {
  ReceiptDetails,
  ReceiptSession,
  extractReceiptDetails,
  extractReceiptSessions,
} from "@/misc/utils";
import { Collapsible } from "@/components/Collapsible";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type PaymentReceipt = {
  session: string;
  details: ReceiptDetails[];
};

const PayReceipt = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sessions, setSessions] = useState<ReceiptSession[] | null>(null);
  const [receiptDetails, setReceiptDetails] = useState<PaymentReceipt[] | null>(
    null
  );

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await api.get("/registration/payReceipt");
        const receipts = extractReceiptSessions(res.data);
        console.log(receipts);
        setSessions(receipts);
      } catch (err) {
        setError("Failed to load receipt sessions.");
      }
    };

    const fetchReceipts = async (sessions: ReceiptSession[]) => {
      try {
        const tmpReceipt: PaymentReceipt[] = [];
        for (const session of sessions) {
          const res = await api.post("/registration/payReceipt", {
            data: `form_submitted=setSession&pay_session=${session.session}`,
          });
          const details = extractReceiptDetails(res.data);
          console.log(details);
          tmpReceipt.push({ session: session.session, details: details });
        }
        setReceiptDetails(tmpReceipt);
        setLoading(false);
      } catch (err) {
        setError("Failed to load receipt details.");
      }
    };

    if (!sessions) {
      fetchSessions();
    } else {
      fetchReceipts(sessions);
    }
  }, [sessions]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#0000ff" size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ThemedView>
        {receiptDetails?.map((details, idx) => (
          <Collapsible
            title={`Receipt for ${details.session}`}
            key={idx}
            style={styles.collapsible}
          >
            <ScrollView style={styles.receiptContainer}>
              {details.details.map((item, i) => (
                <ThemedView key={i} style={styles.detailContainer}>
                  <ThemedText style={styles.label}>{item.label}:</ThemedText>
                  <ThemedText style={styles.value}>{item.value}</ThemedText>
                </ThemedView>
              ))}
            </ScrollView>
          </Collapsible>
        ))}
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: "#f5f5f5",
  },
  collapsible: {
    paddingVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  receiptContainer: {
    marginVertical: 10,
    padding: 10,
    // backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  label: {
    fontWeight: "bold",
    // color: "#333",
  },
  value: {
    // color: "#555",
  },
});

export default PayReceipt;
