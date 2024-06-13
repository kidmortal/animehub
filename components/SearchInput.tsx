import { View, StyleSheet, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

type Props = {
  placeholder: string;
  onChangeText: (text: string) => void;
};

export default function SearchInput(props: Props) {
  return (
    <View style={styles.searchSection}>
      <Ionicons name="search" size={24} color="white" />
      <TextInput
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        placeholderTextColor="#BBB"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#211F30",
    padding: 12,
    borderRadius: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    marginLeft: 16,
    fontSize: 14,
    lineHeight: 16,
    color: "#fff",
  },
});
