import AnimeList from '@/components/AnimeList';
import AppLogo from '@/components/AppLogo';
import SeasonList from '@/components/SeasonList';
import { AnimesContext } from '@/context/animes';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const animeContext = useContext(AnimesContext);

  return (
    <View style={styles.pageContainer}>
      <AppLogo />
      <View style={{ height: 24 }} />
      <SeasonList
        seasons={animeContext.seasons}
        selectedIndex={animeContext.selectedSeasonIndex}
        onSelect={(index) => animeContext.setSelectedSeasonIndex(index)}
      />
      <View style={{ height: 24 }} />
      <AnimeList animes={animeContext.animesData} />
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
});
