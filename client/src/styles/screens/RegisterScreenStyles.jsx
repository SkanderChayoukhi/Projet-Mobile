import { StyleSheet } from "react-native";
import { Colors } from "../../../app.constants";

const registerScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    view: {
        marginTop: 50,
        width: '100%',
        alignItems: 'center',
    },
    error: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        borderColor: Colors.danger,
        backgroundColor: "#dc354533",
        borderRadius: 20,
        marginBottom: 20,
        justifyContent: 'center',
        width: '75%',
    },
    errorText: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: Colors.danger,
        textAlign: 'center',
    },
});

export default registerScreenStyles;