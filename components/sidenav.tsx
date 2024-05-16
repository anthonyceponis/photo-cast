import { createDrawerNavigator } from "@react-navigation/drawer";
import { TipsScreen } from "../screens/Tips";
import { SettingsScreen } from "../screens/Settings";
import { FavouritesScreen } from "../screens/Favourites";
import { HomeScreen } from "../App";

const Drawer = createDrawerNavigator();

export function SideNav() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Tips" component={TipsScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="Favourites" component={FavouritesScreen} />
        </Drawer.Navigator>
    );
}