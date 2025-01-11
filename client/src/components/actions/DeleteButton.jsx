import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../app.constants';
import { Ionicons } from '@expo/vector-icons';

const DeleteButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
            <Ionicons name="trash-bin-outline" size={24} color={Colors.light} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: Colors.danger,
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 0.8,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 2,
        borderColor: Colors.background,
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default DeleteButton;
