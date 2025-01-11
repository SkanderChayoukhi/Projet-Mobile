import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // import useNavigation hook
import footerComponentStyles from '../styles/components/FooterComponentStyles';
import FooterButton from '../components/FooterButtonComponent'

const Footer = () => {
    const navigation = useNavigation();

    const navigateToSettings = () => {
        navigation.navigate('Parameters');
    };

    const navigateToHome = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <FooterButton name="home-outline" onPress={navigateToHome} />
            <FooterButton name="search-outline" />
            <FooterButton name="add-circle-outline" />
            <FooterButton name="settings-outline" onPress={navigateToSettings} />
        </View>
    );
};

const styles = footerComponentStyles;

export default Footer;
