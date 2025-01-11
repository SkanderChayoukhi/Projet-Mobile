import { StyleSheet } from "react-native";
import { Colors } from "../../../app.constants";

const headerComponentStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        height: 75,
        backgroundColor: Colors.dark,
        borderBottomEndRadius: 50,
        borderBottomStartRadius: 50,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.light,
    },
});

export default headerComponentStyles;