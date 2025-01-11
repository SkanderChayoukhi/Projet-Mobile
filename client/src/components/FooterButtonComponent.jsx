import React from 'react';
import { Text, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import footerComponentStyles from '../styles/components/FooterComponentStyles';
import { Colors } from '../../app.constants';

export default function ButtonComponent(props) {
    const { name, onPress } = props;
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Ionicons name={name} size={24} color={Colors.light} />
        </TouchableOpacity>
    );
}

const styles = footerComponentStyles;
