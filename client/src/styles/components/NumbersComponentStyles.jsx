import { StyleSheet } from "react-native";
import { Colors } from "../../../app.constants";

const numbersComponentStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    box: {
        width: 45,
        height: 45,
        borderWidth: 1,
        marginVertical: 30,
        marginHorizontal: 1,
        borderColor: Colors.light,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 45,
        height: 45,
        textAlign: 'center',
        fontSize: 20,
        color: Colors.light,
    },
});

export default numbersComponentStyles;