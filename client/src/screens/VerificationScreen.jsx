import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import registerScreenStyles from '../styles/screens/RegisterScreenStyles';
import HeaderTextComponent from '../components/HeaderTextComponent';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SixNumberBoxes from '../components/NumbersComponent';
import { Colors, GlobalConstants } from '../../app.constants';
import Header from '../components/HeaderComponent';
const apiURL = GlobalConstants.apiURL;

function VerificationScreen() {
    const navigation = useNavigation();
    const [code, setVerificationCode] = useState('0');
    const [email, setEmail] = useState('');
    const [resetPassword, setResetPassword] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDataFromAsyncStorage = async () => {
            try {
                const mail = await AsyncStorage.getItem('email');
                if (mail) {
                    setEmail(JSON.parse(mail));
                }
            } catch (error) {
                // Handle error
            }
        };

        fetchDataFromAsyncStorage();
    }, []);

    const handleCodeInput = (code) => {
        setVerificationCode(code);
    }

    const handleEmailVerification = async () => {
        const now = new Date();
        const userString = await AsyncStorage.getItem('user');
        const user = JSON.parse(userString);
        const response = await fetch(`${apiURL}/verification`, {
            method: "POST",
            body: JSON.stringify({ 'email_verified_at': now, 'id': user.id, 'number': code }),
            headers: { 'Content-Type': 'Application/json' }
        });

        const jsonResponse = await response.json();

        if (jsonResponse.status === '200') {
            AsyncStorage.removeItem('user');
            await AsyncStorage.setItem('user', JSON.stringify(jsonResponse.user));
            navigation.navigate("Login");
        } else {
            setError("Erreur dans la validation de votre mail.");
        }
    }

    const handlePasswordVerification = async () => {
        const response = await fetch(`${apiURL}/verifyPassword`, {
            method: "POST",
            body: JSON.stringify({ 'email': email, 'number': code }),
            headers: { 'Content-Type': 'Application/json' }
        });

        const jsonResponse = await response.json();

        if (jsonResponse.status === '200') {
            setError('');
            navigation.navigate('Reset');
        } else {
            setError(jsonResponse.message);
        }
    }


    return (
        <View style={styles.container}>
            <Header isHome={false} title='Code de vérification' />
            <View style={[styles.error, { 'display': !error ? 'none' : 'flex' }]}>
                <Text style={[styles.errorText]}>{error}</Text>
            </View>
            <SixNumberBoxes onCodeInput={handleCodeInput} />
            {(email != '') ? (
                <ButtonComponent color={Colors.light} title="Changer mot de passe" onPress={handlePasswordVerification} />
            ) : (
                <ButtonComponent color={Colors.light} title="Envoyer" onPress={handleEmailVerification} />
            )}
        </View>
    );
}

const styles = registerScreenStyles;

export default VerificationScreen;
