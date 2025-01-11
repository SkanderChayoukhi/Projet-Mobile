import { StyleSheet } from "react-native";
import { Colors } from "../../../app.constants";

const headerTextComponentStyles = StyleSheet.create({
    text: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 50,
        color: Colors.light,
        textAlign: 'center',
    },
});

export default headerTextComponentStyles;