import React, { useEffect, useState } from 'react';
import { View, Text, Image, LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import headerComponentStyles from '../styles/components/HeaderComponentStyles';

const Header = (props) => {
    const { isHome, title } = props;

    if (isHome) {
        const [user, setUser] = useState('');

        useEffect(() => {
            LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
            AsyncStorage.getItem('user').then(localUser => {
                setUser(JSON.parse(localUser));
            });
        }, []);

        if (!user) {
            return null;
        }

        return (
            <View style={[styles.container, { justifyContent: 'space-around' }]}>
                <Text style={styles.text}>Bonjour {user.first_name} {user.last_name} !</Text>
                <View >
                    <Image source={{ uri: user.picture }} style={{ width: 40, height: 40, borderRadius: 40 / 2 }} />
                </View>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
            </View>
        );

    }
};

const styles = headerComponentStyles;

export default Header;
