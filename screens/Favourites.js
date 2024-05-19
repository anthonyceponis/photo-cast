import { View, Text, TouchableOpacity, ImageBackground, StyleSheet,
    Pressable, Button
 } from 'react-native';
 import Icon from 'react-native-vector-icons/Ionicons'

export function FavouritesScreen() {

    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        loadFavourites();
    }, []);
    
    const loadFavourites = async () => {
        setFavorites((Array.from(await getFavourites())).map(favorite => ({ location: favorite, icon: 'location' })));
    }

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



const handleDeletePress = (favorite) => {
    // Handle delete action
    // use the deleteFavourite function from storage.js
    // I'm not sure whether I have to render this again so I'll have to check
    deleteFavourite(favorite.name);
    console.log(`Deleted ${favorite.name}`);
}

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
        margin:5
    },
    icon: {
        marginLeft: 10,
    },
    trashIcon: {
        marginLeft: 0,
    },
    row: {
        flexDirection: 'row'
    },
    trash: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 2,
    }
});