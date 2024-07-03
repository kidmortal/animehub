import LoginForm from '@/components/Auth/LoginForm';
import UserInfo from '@/components/Auth/UserInfo';
import Button from '@/components/Button';
import { ImagePicker } from '@/components/ImagePicker';
import WatchingAnimeCard from '@/components/WatchingAnimeCard';
import When from '@/components/When';
import { AnimesContext } from '@/context/animes';
import { SupaBaseService } from '@/services/Supabase';
import { useContext } from 'react';

import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const animeContext = useContext(AnimesContext);

  async function handleAvatarUpdate(base64String: string) {
    if (animeContext.user) {
      const response = await SupaBaseService.updateUserAvatar(animeContext.user.id, base64String);
      if (response) {
        animeContext.setProfileAvatarUrl(SupaBaseService.getUserAvatarUrl(animeContext.user.id) ?? '');
      }
    }
  }

  async function handleSignIn() {
    animeContext.loadUserInfo();
    animeContext.fetchUserWatchingAnimes();
  }

  return (
    <View style={styles.pageContainer}>
      <UserInfo userProfile={animeContext.userProfile} />
      <ImagePicker userId={animeContext.user?.id} onImagePicked={handleAvatarUpdate} />
      <View style={{ height: 24 }} />
      <When value={!animeContext.user}>
        <LoginForm onSignIn={handleSignIn} />
      </When>
      <When value={!!animeContext.user}>
        <Button text="Logout" onPress={() => SupaBaseService.signOut()} />
      </When>
      <Text style={styles.text}>Watching animes</Text>
      <FlatList
        data={animeContext.watchingAnimes}
        numColumns={2}
        keyExtractor={(item) => item.mal_id.toString()}
        renderItem={({ item }) => <WatchingAnimeCard id={item.mal_id} image={item.url} title={item.name} />}
      />
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});
