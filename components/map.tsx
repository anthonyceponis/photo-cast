import { Dimensions, Image, Text, View } from "react-native";
// import MapView from "react-native-maps";

export const Map = () => {
    const windowWidth = Dimensions.get("window").width;

    return (
        <View>
            <Text>This is a mp</Text>
            <Image
                source={require("../assets/united-kingdom.png")}
                resizeMode="contain"
                style={{ width: windowWidth - 100 }}
            />
        </View>
    );
};
