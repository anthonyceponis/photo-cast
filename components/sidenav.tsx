import { createDrawerNavigator } from "@react-navigation/drawer";
import { TipsScreen } from "../screens/Tips";
import { SettingsScreen } from "../screens/Settings";
import { FavouritesScreen } from "../screens/Favourites";
import { HomeScreen } from "../App";
import { NavigationContainer } from "@react-navigation/native";
import { IOpenedCard } from "./footer";
import { SlideInView } from "./squareDemo";
import { Button, Touchable } from "react-native";
import { useState } from "react";
import { StyledText } from "./styled-text";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Drawer = createDrawerNavigator();

const navTheme = {
    dark: false,
    colors: {
        primary: "#fb923c",
        background: "#fffbeb",
        card: "#fff7ed",
        text: "#020617",
        border: "#27272a",
        notification: "#ecfccb",
    },
};

export const SideNav: React.FC = () => {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    return (
        <NavigationContainer theme={navTheme}>
            <Drawer.Navigator
                initialRouteName="Home"
                screenOptions={{
                    swipeEdgeWidth: 0,
                    drawerStyle: {
                        //backgroundColor: 'rgba(255, 255, 255, 1)',
                        width: 240,
                    },
                    drawerLabelStyle: {
                        fontSize: 18,
                    },
                    //drawerActiveTintColor: "#51a7e0",
                    //drawerInactiveTintColor: "#333"
                }}
            >
                <Drawer.Screen
                    name="PhotoCast"
                    component={() => (
                        <HomeScreen
                            isSideNavOpen={isSideNavOpen}
                            setIsSideNavOpen={setIsSideNavOpen}
                        />
                    )}
                    options={{
                        headerRight: () => (
                            <SlideInView
                                style={{ zIndex: 2 }}
                                positions={{
                                    startX: -20,
                                    startY: 0,
                                    endX: 200,
                                    endY: 0,
                                }}
                                prompt={isSideNavOpen}
                            >
                                <TouchableOpacity
                                    className="flex-row gap-x-2 items-center"
                                    onPress={() => {
                                        setIsSideNavOpen(!isSideNavOpen);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faSearch} />
                                    <StyledText>Search...</StyledText>
                                </TouchableOpacity>
                            </SlideInView>
                        ),
                    }}
                />
                <Drawer.Screen name="Tips & Tricks" component={TipsScreen} />
                <Drawer.Screen name="Favourites" component={FavouritesScreen} />
                <Drawer.Screen name="Settings" component={SettingsScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
