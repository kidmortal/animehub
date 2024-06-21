import LoginForm from "@/components/Auth/LoginForm";
import UserInfo from "@/components/Auth/UserInfo";
import Button from "@/components/Button";
import { ImagePicker } from "@/components/ImagePicker";
import When from "@/components/When";
import { AnimesContext } from "@/context/animes";
import { SupaBaseService } from "@/services/Supabase";
import { useContext, useEffect } from "react";

import { StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  const animeContext = useContext(AnimesContext);

  async function loadUserInfo() {
    const response = await SupaBaseService.getUser();
    if (response?.data?.user) {
      animeContext.setUser(response.data.user);
      const getProfile = await SupaBaseService.getUserProfile(
        response.data.user
      );
      const profileUrl = SupaBaseService.getUserAvatarUrl(
        response.data.user.id
      );
      if (getProfile)
        animeContext.setUserProfile({
          ...getProfile,
          avatar_url: profileUrl ?? "",
        });
    }
  }

  useEffect(() => {
    if (!animeContext.userProfile) loadUserInfo();
  }, []);

  return (
    <View style={styles.pageContainer}>
      <UserInfo userProfile={animeContext.userProfile} />
      <View style={{ height: 24 }} />
      <When value={!animeContext.user}>
        <LoginForm />
      </When>
      <When value={!!animeContext.user}>
        <Button text="Logout" onPress={() => SupaBaseService.signOut()} />
      </When>
      <ImagePicker userId={animeContext.user?.id} />
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
