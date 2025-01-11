import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import landingScreenStyles from '../styles/screens/LandingScreenStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, GlobalConstants } from '../../app.constants';
const apiURL = GlobalConstants.apiURL;

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from 'expo-auth-session/providers/facebook';

WebBrowser.maybeCompleteAuthSession();

function LandingScreen({ navigation }) {
    const [token, setToken] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    const [googleRequest, googleResponse, promptGoogleAsync] = Google.useAuthRequest({
        expoClientId: "89653286518-vj5291m8vevijsekqi5plrogub1vt79v.apps.googleusercontent.com",
        webClientId: "89653286518-vj5291m8vevijsekqi5plrogub1vt79v.apps.googleusercontent.com",
        iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    });

    const [facebookRequest, facebookResponse, promptFacebookAsync] = Facebook.useAuthRequest({
        clientId: "3589476397965760",
    });

    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            if (token) {
                navigation.navigate('Home')
            }
        });
    });

    useEffect(() => {
        if (facebookResponse && facebookResponse.type === "success" && facebookResponse.authentication) {
            (async () => {
                const userInfoFacebookResponse = await fetch(
                    `https://graph.facebook.com/me?access_token=${facebookResponse.authentication.accessToken}&fields=id,email,name,picture`
                );
                const jsonUserInfoFacebookResponse = await userInfoFacebookResponse.json();
                setUserInfo(jsonUserInfoFacebookResponse);
                await AsyncStorage.clear();
                await AsyncStorage.setItem('user', JSON.stringify(jsonUserInfoFacebookResponse));
                await AsyncStorage.setItem('type', 'facebook');
                if (AsyncStorage.getItem('user') && AsyncStorage.getItem('token') && AsyncStorage.getItem('type')) {
                    setTimeout(() => {
                        navigation.navigate('Home');
                    }, 1000);
                }
            })();
        }
    }, [facebookResponse]);

    useEffect(() => {
        if (googleResponse?.type === "success") {
            setToken(googleResponse.authentication.accessToken);
            getGoogleUserInfo();
        }
    }, [googleResponse, token]);

    const registerOrLoginGoogle = async (user) => {
        const response = await fetch(`${apiURL}/registerOrLoginGoogle`, {
            method: "POST",
            body: JSON.stringify({ 'first_name': user.given_name, 'last_name': user.family_name, 'email': user.email, 'picture': user.picture }),
            headers: { 'Content-Type': 'Application/json' }
        });

        const jsonResponse = await response.json();

        if (jsonResponse.status === '201' || jsonResponse.status === '200') {
            AsyncStorage.clear();
            await AsyncStorage.setItem('user', JSON.stringify(jsonResponse.user));
            setTimeout(() => {
                navigation.navigate('Home');
            }, 1000);
        } else {
            alert(jsonResponse.message);
        }

    }

    const getGoogleUserInfo = async () => {
        try {
            const googleResponse = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const jsonGoogleResponse = await googleResponse.json();
            registerOrLoginGoogle(jsonGoogleResponse);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.welcome}>
                    Bienvenu(e) à :
                </Text>
                <Text style={[styles.welcome, styles.brand]}>
                    AGA FUN
                </Text>
            </View>
            <ButtonComponent backgroundColor={Colors.light} color="black" title="Se Connecter" onPress={() => navigation.navigate('Login')} />
            <ButtonComponent color={Colors.light} title="S'inscrire" onPress={() => navigation.navigate('Register')} />
            <Text style={{ color: Colors.light }}>Ou</Text>
            <View style={{ width: '100%', alignItems: 'center' }} >
                <TouchableOpacity
                    style={[styles.button, { borderWidth: 0, backgroundColor: Colors.google }]}
                    onPress={() => {
                        promptGoogleAsync();
                    }}>
                    <Text style={[styles.buttonText, { color: 'white', }]}>Continuer avec Google </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: Colors.facebook }]}
                    onPress={() => {
                        promptFacebookAsync();
                    }}>
                    <Text style={[styles.buttonText, { color: 'white', }]}>Continuer avec Facebook </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = landingScreenStyles;

export default LandingScreen;