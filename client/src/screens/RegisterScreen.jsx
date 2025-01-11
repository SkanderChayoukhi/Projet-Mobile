import React from 'react';
import { View } from 'react-native';
import FormComponent from '../components/FormComponent';
import registerScreenStyles from '../styles/screens/RegisterScreenStyles';
import Header from '../components/HeaderComponent';

function RegisterScreen() {
    return (
        <View style={styles.container}>
            <Header isHome={false} title="S'inscrire" />
            <FormComponent type="register" />
        </View>
    );
}

const styles = registerScreenStyles;

export default RegisterScreen;
