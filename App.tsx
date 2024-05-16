import { Pressable, SafeAreaView, View } from "react-native";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { Map } from "./components/map";
import { SideNav } from "./components/sidenav";
import { WeatherContainer } from "./components/weather-box/container";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function App() {
    const [weatherBoxOpen, setWeatherBoxOpen] = useState<boolean>(false);
    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            <Nav />
            {/* <SideNav /> */}
            {/* <Map /> */}
            <Pressable onPress={() => setWeatherBoxOpen(true)}>
                <FontAwesomeIcon icon={faSearch} />
            </Pressable>
            {weatherBoxOpen ? (
                <WeatherContainer
                    isOpen={weatherBoxOpen}
                    setIsOpen={setWeatherBoxOpen}
                />
            ) : null}
            <Footer />
        </SafeAreaView>
    );
}
