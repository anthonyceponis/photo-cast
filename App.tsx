import { View } from "react-native";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { Map } from "./components/map";
import { SideNav } from "./components/sidenav";
import { WeatherContainer } from "./components/weather-box/container";

export default function App() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Nav />
            <SideNav />
            <Map />
            <WeatherContainer />
            <Footer />
        </View>
    );
}
