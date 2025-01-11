import { StyleSheet } from "react-native";
import { Colors } from "../../../app.constants";

const footerComponentStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 75,
        width: '100%',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        backgroundColor: Colors.dark,
    },
    button: {
        alignItems: 'center',
    },
});

export default footerComponentStyles;