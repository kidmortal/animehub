import Button from '@/components/Button';
import {
  AnimeHubLocalStorageService,
  CacheKeyInfo,
  LocalStorageCacheExpirationSettings,
  LocalStorageCacheExpirationTimestamps,
} from '@/services/LocalStorageData';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  const [cachedKeys, setCachedKeys] = useState<CacheKeyInfo[]>([]);
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
    AnimeHubLocalStorageService.getAllCachedDataInfo().then((data) => {
      setCachedKeys(data);
    });
  }, []);

  function clearStorage() {
    AnimeHubLocalStorageService.clearLocalStorage();
  }

  return (
    <View style={styles.pageContainer}>
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
      <FlatList
        data={cachedKeys}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.cacheKeyTitle}>{item.key}</Text>
            <Text style={styles.cacheKeyTimestamp}>
              Cached at: {dayjs(item.cachedAt).format('DD/MM/YYYY hh:mm') || 'N/A'}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
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
  cacheKeyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cacheKeyTimestamp: {
    fontSize: 14,
    color: '#fff',
  },
});
