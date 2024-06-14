import LoginForm from "@/components/Auth/LoginForm";
import UserInfo from "@/components/Auth/UserInfo";

import { StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.pageContainer}>
      <UserInfo />
      <View style={{ height: 24 }} />
      <LoginForm />
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
