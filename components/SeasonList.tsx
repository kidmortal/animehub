import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { SeasonYearName } from '@/context/animes';

type Props = {
  seasons: SeasonYearName[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export default function SeasonList(props: Props) {
  const ref = useRef<FlatList<SeasonYearName> | null>(null);

  useEffect(() => {
    if (props.selectedIndex > 0) {
      ref?.current?.scrollToIndex({ index: props.selectedIndex, viewPosition: 0.5 });
    }
  }, [props.selectedIndex]);

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.container}
        data={props.seasons}
        horizontal
        keyExtractor={(item) => item.year + item.season}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.seasonButton} onPress={() => props.onSelect(index)}>
            <Text style={[styles.text, index === props.selectedIndex ? styles.selected : null]}>
              {item.year} {item.season}
            </Text>
          </TouchableOpacity>
        )}
        getItemLayout={(_, index) => ({
          length: 95, //  WIDTH + (MARGIN_HORIZONTAL * 2)
          offset: 95 * index, //  ( WIDTH + (MARGIN_HORIZONTAL*2) ) * (index)
          index,
        })}
        ref={ref}
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
  selected: {
    backgroundColor: 'orange',
    borderRadius: 6,
    padding: 6,
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
