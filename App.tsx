import { Pressable, Button, View } from "react-native";
import { Footer } from "./components/footer";
import { Map } from "./components/map";

import { WeatherContainer } from "./components/weather-box/container";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

import { SideNav } from "./components/sidenav";
import { SlideInView } from "./components/squareDemo";

import { IOpenedCard } from "./components/footer";

export function HomeScreen() {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    const [openTabs, setOpenTabs] = useState<Array<IOpenedCard>>([]); //List of all tabs
    const [openedCard, setOpenedCard] = useState<IOpenedCard | null>(null); //Currently opened card

    return (
        <View className="flex-1 items-center justify-center bg-orange-50">
            <View className="absolute top-0 left-0 w-screen p-3"></View>
            <Map cardSet={setOpenedCard}/>

            <SlideInView
                style={{ zIndex: 2 }}
                positions={{ startX: 175, startY: -800, endX: 300, endY: -800 }}
                prompt={isSideNavOpen}
            >
                <Button
                    title="search"
                    onPress={() => {
                        setIsSideNavOpen(!isSideNavOpen);
                        //console.log(isSideNavOpen);
                    }}
                />
            </SlideInView>

            <SlideInView
                style={{
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                    transform: [{ translateX: 800 }, { translateY: 0 }],
                    zIndex: 1,
                    flexGrow: 0,
                    position: "absolute",
                }}
                positions={{ startX: 800, startY: 0, endX: 0, endY: 0 }}
                prompt={isSideNavOpen}
            >
                <WeatherContainer
                    setIsOpen={setIsSideNavOpen}
                    openedCard={openedCard}
                    setOpenedCard={setOpenedCard}
                    openCards={openTabs}
                    setOpenCards={setOpenTabs}
                />
            </SlideInView>
            <Footer openTabs={openTabs} setCurCard={setOpenedCard} />
        </View>
    );
}

export default function App() {
    return <SideNav />;
}
