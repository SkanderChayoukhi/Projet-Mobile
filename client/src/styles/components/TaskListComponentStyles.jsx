import { StyleSheet } from "react-native";
import { Colors } from "../../../app.constants";

const taskListComponentStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.background,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    section: {
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.light,
    },
    taskContainer: {
        borderWidth: 1,
        borderColor: Colors.black,
        backgroundColor: Colors.dark,
        padding: 10,
        marginRight: 'auto',
        borderRadius: 10,
        marginBottom: 10,
        width: '47.5%',
    },
    button: {
        paddingVertical: 6,
        color: Colors.danger,
        textAlign: 'center',
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: Colors.light,
    },
    dialogContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
    },
    dialogContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
    },
    group: {
        fontSize: 14,
        fontWeight: 900,
        color: Colors.white,
        padding: 5,
        borderBottomColor: Colors.white,
        borderTopColor: Colors.white,
        borderWidth: 1,
        justifyContent: 'center',
        textAlign: 'center'
    },
    taskDescription: {
        fontSize: 12,
        color: Colors.light,
    },
    tag: {
        fontSize: 8,
        color: Colors.dark,
        fontWeight: 'bold',
        marginRight: 5,
        marginTop: 5,
        backgroundColor: Colors.white,
        paddingHorizontal: 2,
        paddingVertical: 1,
        borderRadius: 5,
    },
    itemContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    item: {
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        margin: 10,
        borderRadius: 8,
    },
    input: {
        marginVertical: 12,
        borderWidth: 1,
        borderColor: Colors.black,
        backgroundColor: Colors.light,
        borderRadius: 20,
        marginBottom: 20,
        paddingLeft: 20,
        fontSize: 10,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: Colors.black,
    },
    starsContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: Colors.background,
        borderRadius: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    stars: {
        flexDirection: 'row',
    },
    starUnselected: {
        color: '#aaa',
    },
    starSelected: {
        color: '#FFD700',
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
    },
    errorText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: Colors.danger,
        textAlign: 'center',
    },
});

export default taskListComponentStyles;