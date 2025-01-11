import { StyleSheet } from "react-native";
import { Colors } from "../../../app.constants";

const homeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark,
    },
    taskContainer: {
        borderWidth: 1,
        borderColor: Colors.black,
        backgroundColor: Colors.dark,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 50,
    },
    Welcomescreen: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.background,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
    },
    screen: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        gap: 50,
        paddingTop: 20

    },
    FirstRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        gap: 30

    },
    SecondRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 40,
    },
    Text: {
        color: Colors.background,
        position: 'absolute',
        padding: 7,
        fontSize: 15,
        fontWeight: 'bold',
        borderRadius: 8,
        backgroundColor: Colors.white,
        opacity: 0.7,
    },
    ImageContainer: {

        height: 250, width: 170, borderRadius: 8, padding: 0, justifyContent: 'center', alignItems: 'center'

    },
    Image: {
        height: 250,
        width: 170,
        borderRadius: 8,
        opacity: 0.7
    },
    button: {
        backgroundColor: Colors.dark,
        borderWidth: 1,
        borderColor: Colors.light,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 5,
        borderRadius: 20,
        alignSelf: 'flex-end',
    },


});

export default homeScreenStyles;