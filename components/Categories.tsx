import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Categories() {
  return (
    <View>
      <Text style={styles.text}>Categories</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
