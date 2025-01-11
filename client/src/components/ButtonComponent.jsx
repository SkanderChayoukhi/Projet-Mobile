import React from 'react';
import { Text, Pressable } from 'react-native';
import buttonComponentStyles from '../styles/components/ButtonComponentStyles';

export default function ButtonComponent(props) {
    const { onPress, backgroundColor, color, title } = props;
    return (
        <Pressable style={[styles.button, { 'backgroundColor': backgroundColor, 'borderColor': color }]} onPress={onPress} >
            <Text style={[styles.text, { 'color': color }]}>{title}</Text>
        </Pressable >
    );
}

const styles = buttonComponentStyles;
