import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import parametersScreenStyles from '../styles/screens/ParametersScreenStyles';
import Accordion from '../components/AccordionComponent';
import Footer from '../components/FooterComponent';
import Header from '../components/HeaderComponent';
import { Colors } from '../../app.constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
function ParametersScreen() {
    const [isAdmin, setIsAdmin] = useState(0);

    useEffect(() => {
        AsyncStorage.getItem('user').then(localUser => {
            setIsAdmin(JSON.parse(localUser).is_admin);
        });
    }, []);

    return (
        <View style={{ height: '100%', backgroundColor: Colors.background }}>
            <ScrollView >
                <View style={[styles.container, { width: '100%' }]}>
                    <Header isHome={false} title='Paramètres' />
                    <View style={{ marginTop: 20, alignItems: 'center', backgroundColor: Colors.background, width: "100%" }}>
                        <Accordion
                            icon="settings"
                            title="Modification de profil"
                            type="user"
                            content="Modification de prénom, nom et mot de passe de l'utilisateur."
                        />
                        <Accordion
                            icon="group"
                            title="Gestion des groupes"
                            type="group"
                            content="Créer, modifier et archiver les groupes."
                        />
                        {(isAdmin == 1) && (
                            <Accordion
                                icon="list"
                                title="Gestion des cards"
                                type="card"
                                content="Créer, modifier et archiver les cards."
                            />
                        )}
                        {(isAdmin == 1) && (
                            <Accordion
                                icon="tag"
                                title="Gestion des tags"
                                type="tag"
                                content="Créer, modifier et archiver les tags."
                            />
                        )}
                        {(isAdmin == 1) && (
                            <Accordion
                                icon="info"
                                title="Lancer le cronjob"
                                type="cronjob"
                                content=""
                            />
                        )}
                        <Accordion
                            icon="notifications"
                            title="Notifications"
                            type="boolean"
                            content=""
                        />
                        <Accordion
                            icon="info"
                            title="Statut"
                            type="pick"
                            content=""
                        />
                        <Accordion
                            icon="logout"
                            title="Déconnection"
                            type="button"
                            content=""
                        />
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </View>

    );
}

const styles = parametersScreenStyles;

export default ParametersScreen;
