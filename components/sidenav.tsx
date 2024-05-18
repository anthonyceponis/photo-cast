import { createDrawerNavigator } from "@react-navigation/drawer";
import { TipsScreen } from "../screens/Tips";
import { SettingsScreen } from "../screens/Settings";
import { FavouritesScreen } from "../screens/Favourites";
import { HomeScreen } from "../App";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const navTheme = {
    dark:false,
    colors: {
        primary: '#fb923c',
        background: '#fffbeb',
        card:'#fff7ed',
        text:'#020617',
        border:'#27272a',
        notification:'#ecfccb',
    },
  };

export function SideNav() {
    return (
        <NavigationContainer theme={navTheme}>
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Tips" component={TipsScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="Favourites" component={FavouritesScreen} />
        </Drawer.Navigator>
        </NavigationContainer>
    );
}