import { Tabs } from "expo-router";
import React, { useContext, useEffect } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SupaBaseService } from "@/services/Supabase";
import { AnimesContext } from "@/context/animes";

export default function TabLayout() {
  const colorScheme = useColorScheme();
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
  async function loadUserWatchingAnimes() {
    if (animeContext.user) {
      animeContext.fetchUserWatchingAnimes();
    }
  }

  useEffect(() => {
    loadUserWatchingAnimes();
  }, [animeContext.user]);

  useEffect(() => {
    if (!animeContext.userProfile) loadUserInfo();
  }, []);

  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: "#15141F" }}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "search" : "search-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
