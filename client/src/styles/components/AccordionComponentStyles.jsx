import { StyleSheet } from "react-native";
import { Colors } from "../../../app.constants";

const accordionCoponentStyles = StyleSheet.create({
    container: {
        width: '75%',
        borderWidth: 1,
        borderColor: Colors.black,
        margin: 10,
        borderRadius: 5,
        overflow: 'hidden',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: Colors.dark,
        height: 75
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light,
    },
    input: {
        height: 40,
        width: '75%',
        marginVertical: 12,
        borderWidth: 1,
        borderColor: Colors.light,
        backgroundColor: Colors.background,
        borderRadius: 20,
        marginBottom: 20,
        paddingLeft: 20,
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: Colors.white,
    },
    collapsedIcon: {
        fontSize: 24,
        color: Colors.light,
    },
    expandedIcon: {
        fontSize: 24,
        color: Colors.light,
        transform: [{ rotate: '45deg' }],
    },
    content: {
        padding: 10,
        backgroundColor: Colors.light,
        color: 'black',
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
    taskContainer: {
        borderWidth: 1,
        borderColor: Colors.black,
        backgroundColor: Colors.dark,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    taskTitle: {
        fontSize: 16,
        width: '70%',
        fontWeight: 'bold',
        marginBottom: 5,
        color: Colors.light,
    },
    taskDescription: {
        fontSize: 12,
        color: Colors.light,
    },
    tagContainer: {
        padding: 5,
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    topTagContainer: {
        padding: 5,
        width: '70%',
    },
    countNumbersContainer: {
        padding: 5,
        width: '30%',
    },
    tag: {
        fontSize: 12,
        color: Colors.black,
        backgroundColor: Colors.light,
        padding: 5,
        borderRadius: 10,
        margin: 5,
    }
});
export default accordionCoponentStyles;