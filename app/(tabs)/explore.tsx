import { StyleSheet, ScrollView, Text } from "react-native";

export default function SearchPage() {
  return (
    <ScrollView style={styles.pageContainer}>
      <Text style={styles.pageTitle}>Find Movies, Tv series, and more..</Text>
    </ScrollView>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
