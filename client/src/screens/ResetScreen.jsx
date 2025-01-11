import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import registerScreenStyles from '../styles/screens/RegisterScreenStyles';
import HeaderTextComponent from '../components/HeaderTextComponent';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SixNumberBoxes from '../components/NumbersComponent';
import { Colors, GlobalConstants } from '../../app.constants';
import Header from '../components/HeaderComponent';
import formComponentStyles from '../styles/components/FormComponentStyles';
const apiURL = GlobalConstants.apiURL;

function ResetScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
    const [confirm_password, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDataFromAsyncStorage = async () => {
            try {
                const mail = await AsyncStorage.getItem('email');
                setEmail(JSON.parse(mail));
            } catch (error) {
                // Handle error
            }
        };

        fetchDataFromAsyncStorage();
    }, []);

    const styles = formComponentStyles;
    const globalStyles = registerScreenStyles;

    const handlePasswordChange = (text) => {
        setPassword(text);
        setPasswordTouched(true);
    }

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
        if (confirm_password == password && password.trim().length > 0) {
            setConfirmPasswordTouched(true);
        }
    }

    const resetPassword = async () => {
        const response = await fetch(`${apiURL}/reset`, {
            method: "POST",
            body: JSON.stringify({ 'email': email, 'password': password }),
            headers: { 'Content-Type': 'Application/json' }
        });

        const jsonResponse = await response.json();

        if (jsonResponse.status === '200') {
            setError('');
            navigation.navigate('Login');
        } else {
            setError(jsonResponse.message);
        }
    }

    const isFormValid = () => {
        return password == confirm_password && password.trim().length > 0;
    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.container}>
                <Header isHome={false} title='Changer mot de passe' />
                <View style={[styles.error, { 'display': !error ? 'none' : 'flex' }]}>
                    <Text style={[styles.errorText, { fontSize: 12 }]}>{error}</Text>
                </View>
                <TextInput
                    style={[styles.input, passwordTouched && password.trim().length === 0 && styles.invalidInput]}
                    placeholderTextColor={Colors.secondary}
                    placeholder="Mot de passe"
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={true}
                    textContentType={'password'} />
                <TextInput
                    style={[styles.input, confirmPasswordTouched && confirm_password.trim().length === 0 && styles.invalidInput]}
                    placeholderTextColor={Colors.secondary}
                    placeholder="Confirmer Mot de passe"
                    value={confirm_password}
                    onChangeText={handleConfirmPasswordChange}
                    secureTextEntry={true}
                    textContentType={'password'} />
                <View style={{ alignItems: 'center', }}>
                    {isFormValid() && (
                        <ButtonComponent color={Colors.light} title="Envoyer"
                            onPress={resetPassword} />
                    )}
                </View>
            </View>
        </View>
    );
}

export default ResetScreen;
