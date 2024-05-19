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

export enum FontWeight {
    Thin,
    ExtraLight,
    Light,
    Regular,
    Medium,
    SemiBold,
    Bold,
}

interface IProps extends TextProps {
    weight?: FontWeight;
}

const renderFontWeight = (fontWeight: FontWeight) => {
    switch (fontWeight) {
        case FontWeight.Thin:
            return "MontserratThin";
        case FontWeight.ExtraLight:
            return "MontserratExtraLight";
        case FontWeight.Light:
            return "MontserratLight";
        case FontWeight.Regular:
            return "MontserratRegular";
        case FontWeight.Medium:
            return "MontserratMedium";
        case FontWeight.SemiBold:
            return "MontserratSemiBold";
        case FontWeight.Bold:
            return "MontserratBold";
        default:
            return "";
    }
};

export const StyledText: React.FC<IProps> = ({
    weight = FontWeight.Regular,
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
                    fontFamily: renderFontWeight(weight),
                },
            ]}
            {...rest}
        >
            {children}
        </Text>
    );
};
