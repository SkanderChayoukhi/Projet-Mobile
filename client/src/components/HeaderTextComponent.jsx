import React from 'react';
import { Text } from 'react-native';
import headerTextComponentStyles from '../styles/components/HeaderTextComponentStyles';

export default function HeaderTextComponent(props) {
    const { title } = props;
    return (
        <Text style={styles.text}>
            {title}
        </Text>
    );
}

const styles = headerTextComponentStyles;
