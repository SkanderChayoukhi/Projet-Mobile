import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, Text, View, ActivityIndicator, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import formComponentStyles from '../styles/components/FormComponentStyles'
import { useNavigation } from '@react-navigation/native';
import { Colors, GlobalConstants } from '../../app.constants';
const apiURL = GlobalConstants.apiURL;

const FormComponent = (props) => {
    const navigation = useNavigation();
    const { type } = props;
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [nomTouched, setNomTouched] = useState(false);
    const [prenomTouched, setPrenomTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [verification, setVerification] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false)
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleNomChange = (text) => {
        setNom(text);
        setNomTouched(true);
    }

    const handlePrenomChange = (text) => {
        setPrenom(text);
        setPrenomTouched(true);
    }

    const handlePasswordChange = (text) => {
        setPassword(text);
        setPasswordTouched(true);
    }

    const handleForgotPassword = () => {
        setForgotPassword(true);
    }

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
        if (confirm_password == password && password.trim().length > 0) {
            setConfirmPasswordTouched(true);
        }
    }

    const handleEmailChange = (text) => {
        setEmail(text);
        setEmailTouched(true);
    }

    const register = async () => {
        setIsLoading(true);
        const response = await fetch(`${apiURL}/register`, {
            method: "POST",
            body: JSON.stringify({ 'first_name': prenom, 'last_name': nom, 'email': email, 'password': password }),
            headers: { 'Content-Type': 'Application/json' }
        });

        const jsonResponse = await response.json();

        if (jsonResponse.status === '201') {
            setIsLoading(false);
            setSuccess(jsonResponse.message);
            setError('');
            AsyncStorage.clear();
            await AsyncStorage.setItem('user', JSON.stringify(jsonResponse.user));
            setTimeout(() => {
                navigation.navigate('Verification');
            }, 1000);
        } else {
            setIsLoading(false);
            setError(jsonResponse.message);
            setSuccess('');
        }
    }

    const login = async () => {
        setIsLoading(true);
        const response = await fetch(`${apiURL}/login`, {
            method: "POST",
            body: JSON.stringify({ 'email': email, 'password': password }),
            headers: { 'Content-Type': 'Application/json' }
        });

        const jsonResponse = await response.json();
        if (jsonResponse.status !== '200') {
            setIsLoading(false);
            setError(jsonResponse.message);
            setSuccess('');
            const inputs = document.getElementsByTagName('input');
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = "";
            }
        } else {
            setError('');
            setSuccess(jsonResponse.message);
            await AsyncStorage.clear();
            await AsyncStorage.setItem('token', JSON.stringify(jsonResponse.token));
            await AsyncStorage.setItem('user', JSON.stringify(jsonResponse.user));
            await AsyncStorage.setItem('type', 'basic');
            if (AsyncStorage.getItem('user') && AsyncStorage.getItem('token') && AsyncStorage.getItem('type')) {
                setIsLoading(false);
                setTimeout(() => {
                    navigation.navigate('Home');
                }, 1000);
            }
        }
    }

    const sendForgotPassword = async () => {
        setIsLoading(true);
        const response = await fetch(`${apiURL}/resetVerification`, {
            method: "POST",
            body: JSON.stringify({ 'email': email }),
            headers: { 'Content-Type': 'Application/json' }
        });

        const jsonResponse = await response.json();

        if (jsonResponse.status === '201') {
            setIsLoading(false);
            setSuccess(jsonResponse.message);
            setError('');
            await AsyncStorage.clear();
            await AsyncStorage.setItem('email', JSON.stringify(email));
            setTimeout(() => {
                setForgotPassword(false);
                navigation.navigate('Verification');
            }, 1000);
        } else {
            setError(jsonResponse.message);
            setSuccess('');
            setIsLoading(false);
        }
    }

    const handleSubmit = async () => {
        if (type === 'login') await login();
        if (type === 'register') await register();
    }

    const validateEmail = () => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const isFormValid = () => {
        if (type === 'login') return password.trim().length > 0 && emailTouched && validateEmail();
        if (type === 'register') return nom.trim().length > 0 && prenom.trim().length > 0 && emailTouched && validateEmail() && password == confirm_password && password.trim().length > 0;
    }

    AsyncStorage.getItem('user')
        .then((user) => {
            if (user) {
                if (!JSON.parse(user).email_verified_at) {
                    setVerification(true);
                } else {
                    setVerification(false);
                }
            }
            else {
                setVerification(false);
            }
        })
        .catch((error) => {
            setVerification(false);
        });

    const styles = formComponentStyles;

    return (
        <SafeAreaView style={styles.area}>
            {type == 'register' && (
                <>
                    <View style={[styles.error, { 'display': !error ? 'none' : 'flex' }]}>
                        <Text style={[styles.errorText, { fontSize: 12 }]}>{error}</Text>
                    </View>
                    <View style={[styles.success, { 'display': !success ? 'none' : 'flex' }]}>
                        <Text style={[styles.errorText, { fontSize: 12, color: Colors.success }]}>{success}</Text>
                    </View>
                    <TextInput
                        style={[styles.input, nomTouched && nom.trim().length === 0 && styles.invalidInput]}
                        placeholderTextColor={Colors.secondary}
                        placeholder="Nom"
                        value={nom}
                        onChangeText={handleNomChange} />
                    <TextInput
                        style={[styles.input, prenomTouched && prenom.trim().length === 0 && styles.invalidInput]}
                        placeholderTextColor={Colors.secondary}
                        placeholder="Prénom"
                        value={prenom}
                        onChangeText={handlePrenomChange} />
                    <TextInput
                        style={[styles.input, emailTouched && !validateEmail() && styles.invalidInput]}
                        placeholderTextColor={Colors.secondary}
                        placeholder="Email"
                        value={email}
                        onChangeText={handleEmailChange}
                        keyboardType="email-address" />
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
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, !isFormValid() && styles.disabledButton]}
                            disabled={!isFormValid()}
                            onPress={handleSubmit}>
                            {isLoading ? (
                                <ActivityIndicator color={Colors.light} />
                            ) : (
                                <Text style={styles.buttonText}>S'inscrire</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </>
            )
            }
            {type == 'login' && (
                <>
                    {(forgotPassword == false) && (
                        <View>
                            <View style={[styles.error, { 'display': !error ? 'none' : 'flex' }]}>
                                <Text style={[styles.errorText, { fontSize: 12 }]}>{error}</Text>
                            </View>
                            <View style={[styles.success, { 'display': !success ? 'none' : 'flex' }]}>
                                <Text style={[styles.errorText, { fontSize: 12, color: Colors.success }]}>{success}</Text>
                            </View>
                            <TextInput
                                style={[styles.input, emailTouched && !validateEmail() && styles.invalidInput]}
                                placeholderTextColor={Colors.secondary}
                                placeholder="Email"
                                value={email}
                                onChangeText={handleEmailChange}
                                keyboardType="email-address" />
                            <TextInput
                                style={[styles.input, passwordTouched && password.trim().length === 0 && styles.invalidInput]}
                                placeholderTextColor={Colors.secondary}
                                placeholder="Password"
                                value={password}
                                onChangeText={handlePasswordChange}
                                secureTextEntry={true}
                                textContentType={'password'} />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.button, !isFormValid() && styles.disabledButton]}
                                    disabled={!isFormValid()}
                                    onPress={handleSubmit}>
                                    {isLoading ? (
                                        <ActivityIndicator color={Colors.light} />
                                    ) : (
                                        <Text style={styles.buttonText}>Se connecter</Text>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, { borderWidth: 0 }]}
                                    onPress={handleForgotPassword}>
                                    <Text style={styles.buttonText}>Mot de passe oublié ?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {(forgotPassword == true) && (
                        <View>
                            <View style={[styles.error, { 'display': !error ? 'none' : 'flex' }]}>
                                <Text style={[styles.errorText, { fontSize: 12 }]}>{error}</Text>
                            </View>
                            <View style={[styles.success, { 'display': !success ? 'none' : 'flex' }]}>
                                <Text style={[styles.errorText, { fontSize: 12, color: Colors.success }]}>{success}</Text>
                            </View>
                            <Text style={[styles.buttonText, { TextAlign: 'end' }]}>Inserer votre adresse mail </Text>
                            <TextInput
                                style={[styles.input, emailTouched && !validateEmail() && styles.invalidInput]}
                                placeholderTextColor={Colors.secondary}
                                placeholder="Email"
                                value={email}
                                onChangeText={handleEmailChange}
                                keyboardType="email-address" />
                            <TouchableOpacity
                                style={[styles.button,]}
                                onPress={sendForgotPassword}>
                                {isLoading ? (
                                    <ActivityIndicator color={Colors.light} />
                                ) : (
                                    <Text style={styles.buttonText}>Envoyer</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}

                </>
            )}
        </SafeAreaView >
    );
}

export default FormComponent;
