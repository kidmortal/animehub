import Button from '@/components/Button';
import {
  AnimeHubLocalStorageService,
  LocalStorageCacheExpirationSettings,
  LocalStorageCacheExpirationTimestamps,
} from '@/services/LocalStorageData';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  const [cachedTimestamp, setCachedTimestamp] = useState<LocalStorageCacheExpirationTimestamps | null>(null);
  const [cacheSettings, setCacheSettings] = useState<LocalStorageCacheExpirationSettings | null>(null);

  async function loadLocalStorageInfo() {
    const cachedDataTimestamps = await AnimeHubLocalStorageService.getExpirationTimestamps();
    const cacheSettings = await AnimeHubLocalStorageService.getExpirationSettings();
    setCacheSettings(cacheSettings);
    setCachedTimestamp(cachedDataTimestamps);
  }

  useEffect(() => {
    loadLocalStorageInfo();
  }, []);

  function clearStorage() {
    AnimeHubLocalStorageService.clearLocalStorage();
  }

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.pageTitle}>
        Animes cached at: {dayjs(cachedTimestamp?.seasonAnimesUpdatedAt).format('DD/MM/YYYY hh:mm') || 'N/A'}
      </Text>
      <Text style={styles.pageTitle}>
        Profile cached at: {dayjs(cachedTimestamp?.userProfileUpdatedAt).format('DD/MM/YYYY hh:mm') || 'N/A'}
      </Text>
      <Text style={styles.pageTitle}>
        Seasons cached at: {dayjs(cachedTimestamp?.seasonListUpdatedAt).format('DD/MM/YYYY hh:mm') || 'N/A'}
      </Text>
      <View style={{ height: 24 }} />
      <Text style={styles.pageTitle}>
        Season anime cache expiration: {cacheSettings?.seasonAnimeExpirationHours || 'N/A'} hours
      </Text>
      <Text style={styles.pageTitle}>
        Profile cache expiration: {cacheSettings?.userProfileExpirationHours || 'N/A'} hours
      </Text>
      <Text style={styles.pageTitle}>
        Season list cache expiration: {cacheSettings?.seasonListExpirationHours || 'N/A'} hours
      </Text>
      <View style={{ height: 24 }} />
      <Button text="Clear cache" onPress={() => clearStorage()} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 36,
    backgroundColor: '#15141F',
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
