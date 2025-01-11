import React from 'react';
import { View, StyleSheet } from 'react-native';
import FormComponent from '../components/FormComponent';
import registerScreenStyles from '../styles/screens/RegisterScreenStyles';
import Header from '../components/HeaderComponent';

function LoginScreen() {
    return (
        <View style={styles.container}>
            <Header isHome={false} title='Se connecter' />
            <FormComponent type="login" />
        </View>
    );
}

const styles = registerScreenStyles;

export default LoginScreen;
