import { StyleSheet } from "react-native";
import { Colors } from "../../../app.constants";

const landingScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        color: Colors.light,
    },
    brand: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 50,
    },
    button: {
        paddingVertical: 12,
        marginTop: 25,
        width: '75%',
        borderRadius: 20,
        backgroundColor: "",
    },
    buttonText: {
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 1,
        textAlign: 'center',
        color: Colors.light,
    },
});

export default landingScreenStyles;