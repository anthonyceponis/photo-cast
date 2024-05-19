import { createDrawerNavigator } from "@react-navigation/drawer";
import { TipsScreen } from "../screens/Tips";
import { SettingsScreen } from "../screens/Settings";
import { FavouritesScreen } from "../screens/Favourites";
import { HomeScreen } from "../App";
import { NavigationContainer } from "@react-navigation/native";
import { IOpenedCard } from "./footer";

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
            <Drawer.Navigator initialRouteName="Home"
        screenOptions={{
            swipeEdgeWidth: 0,
            drawerStyle: {
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                width: 240
            },
            drawerLabelStyle: {
                fontSize: 18
            },
            drawerActiveTintColor: "#51a7e0",
            drawerInactiveTintColor: "#333"
        }}>
            <Drawer.Screen name="PhotoCast" component={HomeScreen} />
            <Drawer.Screen name="Tips & Tricks" component={TipsScreen} />
            <Drawer.Screen name="Favourites" component={FavouritesScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
        </NavigationContainer>
    );
}