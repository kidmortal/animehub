import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { JikanMoeSeason } from '@/services/JikanMoe/types/seasons';

type Props = {
  seasons: JikanMoeSeason[];
};

export default function SeasonList(props: Props) {
  function parseSeasons() {
    let parsedSeasons: string[] = [];
    for (let i = 0; i < props.seasons.length; i++) {
      const seasonYear = props.seasons[i];
      seasonYear.seasons.forEach((season) => {
        parsedSeasons.push(`${season} ${seasonYear.year}`);
      });
    }
    return parsedSeasons;
  }

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.container}
        data={parseSeasons()}
        horizontal
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        renderItem={({ item }) => (
          <View style={styles.seasonButton}>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  seasonButton: {
    flex: 1,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  animeTitle: {
    fontSize: 16,
    color: '#fff',
  },
  animeImage: {
    width: 100,
    height: 150,
  },
});
