import { View, Text, TouchableOpacity, ImageBackground, StyleSheet,
    Pressable, Button
 } from 'react-native';
 import Icon from 'react-native-vector-icons/Ionicons'

export function FavouritesScreen() {
  const favorites = [
    { name: 'Location 1', icon: 'location' },
    { name: 'Location 2', icon: 'location' },
    { name: 'Location 3', icon: 'location' },
    // Add more favorite locations as needed
  ];

  return (
    <ImageBackground source={require('./favouritesbg.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Favourite Locations</Text>
        {favorites.map((favorite, index) => (
          <TouchableOpacity key={index} style={styles.favoriteItem} onPress={() => handleFavoritePress(favorite)}>
            <Text>{favorite.name}</Text>
            <Icon name={favorite.icon} size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        ))}

      </View>
    </ImageBackground>
  );
};

const handleFavoritePress = (favorite) => {
  // Handle press action
  //console.log(`Pressed ${favorite.name}`);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    marginBottom: 10,
  },
  icon: {
    marginLeft: 10,
  },
});