import Button from "@/components/Button";
import {
  LocalStorageAnimes,
  clearLocalStorageAnimes,
  getLocalStorageAnimes,
} from "@/services/LocalStorageData";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

export default function SettingsScreen() {
  const [cachedData, setCachedData] = useState<LocalStorageAnimes | null>(null);

  useEffect(() => {
    getLocalStorageAnimes().then((data) => {
      if (data) {
        setCachedData(data);
      }
    });
  }, []);

  function clearStorage() {
    clearLocalStorageAnimes();
    setCachedData(null);
  }

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.pageTitle}>
        Cached data: {cachedData ? "true" : "false"}
      </Text>
      <Text style={styles.pageTitle}>
        Cached anime amount: {cachedData?.animesData.length || 0}
      </Text>
      <Text style={styles.pageTitle}>
        Last Updated At:{" "}
        {dayjs(cachedData?.updatedAt).format("DD/MM/YYYY hh:mm") || "N/A"}
      </Text>
      <Button text="Clear cache" onPress={() => clearStorage()} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 36,
    backgroundColor: "#15141F",
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
