import { StyleSheet } from "react-native";
import { Colors } from "../../../app.constants";


const styleloader = StyleSheet.create({
    lottie: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.background,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        justifyContent: 'center',
    },
});

export default styleloader;