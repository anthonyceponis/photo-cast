import { Text, View } from "react-native";
import MapView from "react-native-maps";

export const Map = () => {
    return (
        <View className="h-50 w-50 bg-red-400 block">
            <Text>This is a map</Text>
            <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    );
};
