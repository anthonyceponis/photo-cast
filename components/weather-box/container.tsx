import { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    ListRenderItem,
    ListRenderItemInfo,
    Text,
    TextInput,
    View,
} from "react-native";
const cityData = require("../../assets/cities.json");

interface ICity {
    city: String;
    lng: String;
    country: String;
    iso2: String;
    admin_name: String;
    capital: String;
    population: String;
    population_proper: String;
}

const ListItem = ({ item }: { item: string }) => {
    return (
        <View className="bg-white text-black p-3 border-b">
            <Text>{item}</Text>
        </View>
    );
};

export const WeatherContainer = () => {
    const windowWidth = Dimensions.get("window").width;
    const [cityList, setCityList] = useState(
        cityData.map((city: ICity) => city.city.toLowerCase())
    );
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setCityList(
            cityData
                .map((city: ICity) => city.city)
                .filter((city: string) =>
                    city.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .sort()
        );
    }, [searchQuery]);

    return (
        <View className="bg-black opacity-75 h-screen w-screen z-10">
            <View
                style={{ width: windowWidth - 20 }}
                className={`bg-white rounded p-3 mx-auto mt-40`}
            >
                <TextInput
                    className="border rounded px-3 py-2 mb-5"
                    placeholder="Enter location or weather condition"
                    onChangeText={(value: string) => setSearchQuery(value)}
                />
                <View>
                    {cityList.map((name: string) => {
                        <View className="bg-white text-black">
                            <Text>{name}</Text>
                        </View>;
                    })}
                </View>
                <FlatList
                    data={cityList}
                    renderItem={({ item }) => <ListItem item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
};
