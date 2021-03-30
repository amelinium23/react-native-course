import React, {useState, useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, Text} from 'react-native';
import PalettePreview from '../components/PalettePreview';

const URL = 'https://color-palette-api.kadikraman.now.sh/palettes';

const Home = ({navigation, route}) => {
  const newPalette = route.params ? route.params.newPalette : null;
  const [palette, setPalette] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleFetchPalettes = useCallback(async () => {
    const res = await fetch(URL);
    if (res.ok) {
      const palettes = await res.json();
      setPalette(palettes);
    }
  }, []);

  useEffect(() => {
    handleFetchPalettes();
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await handleFetchPalettes();
    setIsRefreshing(false);
  }, [handleFetchPalettes]);

  useEffect(() => {
    if (newPalette) {
      setPalette(current => [newPalette, ...current]);
    }
  }, [newPalette]);

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('AddNewPaletteModal');
        }}>
        <Text style={styles.buttonText}>Add a color scheme</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.list}
        data={palette}
        keyExtractor={item => item.paletteName}
        renderItem={({item}) => (
          <PalettePreview
            onPress={() => navigation.push('ColorPalette', item)}
            palette={item}
          />
        )}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  button: {
    height: 50,
    backgroundColor: 'white',
    padding: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'teal',
  },
});

export default Home;
