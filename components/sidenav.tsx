import { createDrawerNavigator } from "@react-navigation/drawer";
import { TipsScreen } from "../screens/Tips";
import { SettingsScreen } from "../screens/Settings";
import { FavouritesScreen } from "../screens/Favourites";
import { HomeScreen } from "../App";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export function SideNav() {
    return (
        <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home"
        screenOptions={{
            headerShown: true,
            drawerStyle: {
                backgroundColor: "#",
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