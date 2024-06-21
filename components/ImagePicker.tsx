import React, { useEffect, useState } from "react";
import { View, Platform, StyleSheet, Alert } from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { manipulateAsync } from "expo-image-manipulator";
import Button from "./Button";
import { SupaBaseService } from "@/services/Supabase";

type Props = {
  userId?: string;
};

export function ImagePicker(props: Props) {
  async function requestPermissions() {
    if (Platform.OS !== "web") {
      const libraryStatus =
        await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
      if (libraryStatus.status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }

      const cameraStatus =
        await ExpoImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus.status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    }
  }

  const pickImage = async () => {
    await requestPermissions();
    if (!props.userId) return Alert.alert("User ID is missing");
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      const resizedImage = await manipulateAsync(image.uri, [
        { resize: { width: 250, height: 250 } },
      ]);
      const base64 = await FileSystem.readAsStringAsync(resizedImage.uri, {
        encoding: "base64",
      });
      SupaBaseService.uploadUserAvatar(`${props.userId}.png`, base64);
    }
  };

  return (
    <View style={styles.container}>
      <Button text="Pick an image from camera roll" onPress={pickImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
