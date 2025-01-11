import { StyleSheet } from "react-native";

const buttonComponentStyles = StyleSheet.create({
    button: {
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 20,
        borderWidth: 1,
        width: '75%',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});

export default buttonComponentStyles;