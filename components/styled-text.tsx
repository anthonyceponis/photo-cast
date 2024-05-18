import { Text, TextProps } from "react-native";
import {
    useFonts,
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export const StyledText: React.FC<TextProps> = ({
    children,
    style,
    ...rest
}) => {
    let [fontsLoaded] = useFonts({
        MontserratThin: Montserrat_100Thin,
        MontserratExtraLight: Montserrat_200ExtraLight,
        MontserratLight: Montserrat_300Light,
        MontserratRegular: Montserrat_400Regular,
        MontserratMedium: Montserrat_500Medium,
        MontserratSemiBold: Montserrat_600SemiBold,
        MontserratBold: Montserrat_700Bold,
    });

    return (
        <Text
            style={[
                style,
                {
                    fontFamily: "Montserrat",
                },
            ]}
            {...rest}
        >
            {children}
        </Text>
    );
};
