import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, TouchableOpacity, TextInput, Image, Text } from 'react-native';
import TaskList from '../components/TaskListComponent';
import Header from '../components/HeaderComponent';
import AddButton from '../components/actions/AddButton';
import Footer from '../components/FooterComponent';
import DialogInput from 'react-native-dialog-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import homeScreenStyles from '../styles/screens/HomeScreenStyles';
import SixNumberBoxes from '../components/NumbersComponent';
import SearchBar from '../components/actions/SearchButton';
import ButtonComponent from '../components/ButtonComponent';
import SelectMultiple from 'react-native-select-multiple';
import { Colors } from '../../app.constants';
import { GlobalConstants } from '../../app.constants';
const { apiURL } = GlobalConstants;


function HomeScreen({ navigation }) {
    const [Button, setButton] = useState('Home');
    const [user, setUser] = useState('');
    const [groups, setGroups] = useState('');
    const [cards, setCards] = useState('');
    const styles = homeScreenStyles;
    const [shiftedCards, setShiftedCards] = useState('');
    const [expiredCards, setExpiredCards] = useState('');
    const [invitations, setInvitations] = useState('');
    const [finishedCards, setFinishedCards] = useState('');
    const [unfinishedCards, setUnfinishedCards] = useState('');
    const [groupSearch, setGroupSearch] = useState('');
    const [code, setVerificationCode] = useState('0');
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [groupTags, setGroupTags] = useState('');
    const [groupSelectedTags, setGroupSelectedTags] = useState('');
    const [groupTypes, setGroupTypes] = useState('');
    const [groupSelectedTypes, setGroupSelectedTypes] = useState('');
    const [groupFrequency, setGroupFrequency] = useState('');
    const [emailInput, setEmailInput] = React.useState('');
    const [dialogVisible, setDialogVisible] = React.useState(false);
    const goBackToHome = () => {
        setButton('Home');
    }
    const handleGroupFrequencyChange = (text) => {
        setGroupFrequency(text);
    }
    const handleGroupSelectionTypes = (selectedGroupTypes) => {
        setGroupSelectedTypes(selectedGroupTypes);
    }
    const handleGroupSelectionTags = (selectedGroupTags) => {
        setGroupSelectedTags(selectedGroupTags);
    }
    const handleGroupDescriptionChange = (text) => {
        setGroupDescription(text);
    }
    const handleGroupNameChange = (text) => {
        setGroupName(text);
    }
    const handleCodeInput = (code) => {
        setVerificationCode(code);
    }
    const handleGroupSearch = (value) => {
        setGroupSearch(value);
    };


    // API 
    const InviteUser = async (email) => {
        try {
            const response = await fetch(`${apiURL}/user/InviteUser`, {
                method: "POST",
                body: JSON.stringify({ 'email': email }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Request failed with status ' + response.status);
            }

            const data = await response.json();
            console.log(data);
            setDialogVisible(false);
            await getGroups();
            goBackToHome();
        } catch (error) {
            console.error('Error occurred:', error);
        }
    }
    const getTags = async () => {
        const response = await fetch(`${apiURL}/tags`,
            {
                method: "GET",
            });

        const data = await response.json();
        setTags(data);
        return data;
    }

    const handleAddGroup = async () => {
        const data = await getTags();
        for (var i in data) {
            data[i]['value'] = data[i]['id'];
            data[i]['label'] = data[i]['name'];
            delete data[i]['id'];
            delete data[i]['name'];
            delete data[i]['created_at'];
            delete data[i]['updated_at'];
        }
        setGroupTags(data);
        var typesData = [
            { value: 1, label: 'Action' },
            { value: 2, label: 'Défi' },
            { value: 3, label: 'Vérité' }
        ];
        setGroupTypes(typesData);
        goBackToHome();
    }
    const createGroup = async () => {
        const groupSelectedTagsId = groupSelectedTags.map(item => item['value']);
        const groupSelectedTypesId = groupSelectedTypes.map(item => item['value']);
        const response = await fetch(`${apiURL}/groups`,
            {
                method: "POST",
                body: JSON.stringify({ 'name': groupName, 'creator_id': user.id, 'description': groupDescription, 'tasks_frequency': groupFrequency, 'is_paused': 0, 'tags_id': groupSelectedTagsId, 'types_id': groupSelectedTypesId }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        getGroups();
        goBackToHome();
    }
    const getGroups = async () => {
        const response = await fetch(`${apiURL}/groups`,
            {
                method: "GET",
            });

        const data = await response.json();
        setGroups(data);
        return data;
    }
    const getGroupIdFromGroupName = async (groupSearch) => {
        const response = await fetch(`${apiURL}/groups/getGroupIdFromGroupName/${groupSearch}`,
            {
                method: "GET",
            });

        const groupId = await response.json();
        return groupId;
    }
    const verifyUserGroup = async (number, user, groupId) => {
        const response = await fetch(`${apiURL}/groups/verifyUserGroup`,
            {
                method: "POST",
                body: JSON.stringify({ 'number': number, 'email': user.email, 'group_id': groupId, 'user_id': user.id }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        getGroups();
        goBackToHome();

    }
    const getUserGroups = async (userId) => {
        const response = await fetch(`${apiURL}/groups/users/${userId}`,
            {
                method: "GET",
            });

        const data = await response.json();
        setGroups(data);
        return data;
    }

    const getInvitationsToGroups = async (userId) => {
        const response = await fetch(`${apiURL}/invitations/${userId}`,
            {
                method: "GET",
            });

        const data = await response.json();
        setInvitations(data);
        return data;
    }
    const getGroupCards = async (idGroups) => {
        const response = await fetch(`${apiURL}/groupCards/${idGroups}`,
            {
                method: "GET",
            });

        const data = await response.json();
        setCards(data);
        data.forEach(element => {
            generateTargetDate(element);
        });

        return data;
    }
    const getShiftedGroupCards = async (idGroups) => {
        const response = await fetch(`${apiURL}/shiftedGroupCards/${idGroups}`,
            {
                method: "GET",
            });

        const data = await response.json();
        setShiftedCards(data);
        return data;
    }
    const getUnfinishedGroupCards = async (idGroups) => {
        const response = await fetch(`${apiURL}/unfinishedGroupCards/${idGroups}`,
            {
                method: "GET",
            });

        const data = await response.json();
        setUnfinishedCards(data);
        return data;
    }
    const getFinishedGroupCards = async (idGroups) => {
        const response = await fetch(`${apiURL}/finishedGroupCards/${idGroups}`,
            {
                method: "GET",
            });

        const data = await response.json();
        setFinishedCards(data);
        return data;
    }


    const getExpiredGroupCards = async (idGroups) => {
        const response = await fetch(`${apiURL}/expiredGroupCards/${idGroups}`,
            {
                method: "GET",
            });

        const data = await response.json();
        setExpiredCards(data);
        return data;
    }

    useLayoutEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            if (token) {
                navigation.setOptions({
                    headerLeft: null,
                });
            }
        });
    }, [navigation]);
    const fetchData = async () => {
        const fetchedGroups = await getUserGroups(user.id);
        await getInvitationsToGroups(user.id);
        if (fetchedGroups) {
            const idGroups = fetchedGroups.map(obj => obj.id);
            getGroupCards(idGroups);
            getShiftedGroupCards(idGroups);
            getExpiredGroupCards(idGroups);
            getFinishedGroupCards(idGroups);
            getUnfinishedGroupCards(idGroups);
            cards.forEach(element => {
                generateTargetDate(element);
            });
        }
    };

    useEffect(() => {
        const fetchDataFromAsyncStorage = async () => {
            try {
                const localUser = await AsyncStorage.getItem('user');
                setUser(JSON.parse(localUser));
                const fetchedGroups = await getUserGroups(user.id);
            } catch (error) {
                // Handle error
            }
        };
        fetchData();
        fetchDataFromAsyncStorage();
    }, []);
    let Cardlist = [];
    Cardlist.push(unfinishedCards, expiredCards, finishedCards, shiftedCards, cards);
    const isEmpty = Cardlist.reduce((accumulator, currentValue) => accumulator + currentValue.length, 0) == 0;

    if (!user) {
        return null;
    }
    return (
        <>
            {(Button == 'Home') && (
                !isEmpty ? (
                    <View style={styles.container}>
                        <Header isHome={true} title='' />
                        <View style={styles.Welcomescreen}>
                            <View style={styles.screen}>
                                <View style={styles.FirstRow}>
                                    <TouchableOpacity onPress={() => setButton('Join')} >
                                        <View style={styles.ImageContainer}>
                                            <Image style={styles.Image} source={require("../../assets/8635954.jpg")} />
                                            <Text style={styles.Text}>Rejoindre une équipe</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setButton('Add'); handleAddGroup }} >
                                        <View style={styles.ImageContainer}>
                                            <Image style={styles.Image} source={require("../../assets/3949048.jpg")} />
                                            <Text style={styles.Text}>Créer une équipe</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.SecondRow}>
                                    <DialogInput
                                        isDialogVisible={dialogVisible}
                                        title={"Inviter"}
                                        hintInput={"utilisateur@email.com"}
                                        submitInput={(inputText) => {
                                            setEmailInput(inputText);
                                            InviteUser(inputText);
                                        }}
                                        closeDialog={() => setDialogVisible(false)}>
                                    </DialogInput>
                                    <TouchableOpacity onPress={() => setDialogVisible(true)} >
                                        <View style={[styles.ImageContainer, { height: 300, width: 370 }]}>
                                            <Image style={[styles.Image, { height: 300, width: 370 }]} source={require("../../assets/5592286.jpg")} />
                                            <Text style={styles.Text}>Inviter un ami </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <View />
                                </View>
                            </View>
                        </View>

                        <Footer />
                    </View>) : (
                    <View style={styles.container}>
                        <Header isHome={true} title='' />
                        <TaskList user={user} />
                        <Footer />
                    </View>
                )
            )}
            {(Button == 'Join') && (
                <View style={styles.container}>
                    <View style={{ width: '75%', alignSelf: 'center', flex: 1 }}>
                        <View style={{ width: '100%' }}>
                            <Header isHome={false} title='Joindre un Groupe' />
                        </View>
                        <View style={{ marginTop: 30, }}>
                            <SearchBar onValueSelect={handleGroupSearch} />
                        </View>
                        <SixNumberBoxes onCodeInput={handleCodeInput} />
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ alignItems: 'center', width: '50%' }}>
                                <ButtonComponent color={Colors.light} title="Rejoindre" onPress={() => {
                                    getGroupIdFromGroupName(groupSearch);
                                    verifyUserGroup(code, user, groupId);
                                }
                                } />
                            </View>
                            <View style={{ alignItems: 'center', width: '50%' }}>
                                <ButtonComponent color={Colors.light} title="Retour" onPress={() => setButton('Home')} />
                            </View>
                        </View>
                    </View>
                    <Footer />
                </View>
            )}
            {(Button == 'Add') && (
                <>
                    <View style={{ width: '75%', alignSelf: 'center', flex: 1 }}>
                        <TextInput
                            style={[styles.taskContainer, { color: 'white' }]}
                            placeholder="Nom de Groupe"
                            placeholderTextColor={Colors.secondary}
                            value={groupName}
                            onChangeText={handleGroupNameChange}
                        />
                        <TextInput
                            style={[styles.taskContainer, { color: 'white' }]}
                            placeholder="Description de Groupe"
                            placeholderTextColor={Colors.secondary}
                            multiline={true}
                            numberOfLines={3}
                            value={groupDescription}
                            onChangeText={handleGroupDescriptionChange}
                        />
                        <View style={{ paddingHorizontal: 16 }}>
                            <Text style={{ color: Colors.light, }}>Tags associés aux groupe :</Text>
                        </View>
                        <SelectMultiple
                            items={groupTags}
                            selectedItems={groupSelectedTags}
                            onSelectionsChange={handleGroupSelectionTags}
                            max={2}
                            style={{
                                backgroundColor: 'transparent',
                                borderRadius: 8,
                                paddingVertical: 10,
                                paddingHorizontal: 16,
                                marginBottom: 16,
                            }}
                            rowStyle={{ backgroundColor: Colors.dark, borderRadius: 8, display: 'flex', }}
                            checkboxStyle={{ tintColor: Colors.white }}
                            labelStyle={{ color: Colors.white }}
                            selectedCheckboxStyle={{
                                tintColor: '#FF0000',
                            }}
                            selectedLabelStyle={{
                                color: '#FF0000',
                                fontWeight: 'bold',
                            }}
                        />
                        <View style={{ paddingHorizontal: 16 }}>
                            <Text style={{ color: Colors.light, }}>Type(s) du groupe :</Text>
                        </View>
                        <SelectMultiple
                            items={groupTypes}
                            selectedItems={groupSelectedTypes}
                            onSelectionsChange={handleGroupSelectionTypes}
                            max={2}
                            style={{
                                backgroundColor: 'transparent',
                                borderRadius: 8,
                                paddingVertical: 10,
                                paddingHorizontal: 16,
                                marginBottom: 16,
                            }}
                            rowStyle={{ backgroundColor: Colors.dark, borderRadius: 8 }}
                            checkboxStyle={{ tintColor: Colors.white }}
                            labelStyle={{ color: Colors.white }}
                            selectedCheckboxStyle={{
                                tintColor: '#FF0000',
                            }}
                            selectedLabelStyle={{
                                color: '#FF0000',
                                fontWeight: 'bold',
                            }}
                        />
                        <TextInput
                            style={[styles.taskContainer, { color: 'white' }]}
                            placeholder="Fréquence par jours du groupe"
                            placeholderTextColor={Colors.secondary}
                            value={groupFrequency}
                            onChangeText={handleGroupFrequencyChange}
                        />


                        <View style={{ justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={goBackToHome} style={[styles.button, { backgroundColor: 'transparent' }]}>
                                <Text style={{ color: Colors.light, textAlign: 'center' }}>Retour</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={createGroup} style={styles.button}>
                                <Text style={{ color: Colors.light, textAlign: 'center' }}>Ajouter</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Footer />
                </>
            )}
        </>
    );
}
export default HomeScreen;
