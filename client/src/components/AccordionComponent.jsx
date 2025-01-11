import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Modal, View, Text, TouchableOpacity, Alert, Switch, TextInput, Image, ActivityIndicator, ScrollView, Platform, ImageBackground, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Colors, GlobalConstants } from '../../app.constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const apiURL = GlobalConstants.apiURL;
const baseURL = GlobalConstants.baseURL;
import Header from './HeaderComponent';
import accordionCoponentStyles from '../styles/components/AccordionComponentStyles';
import DialogInput from 'react-native-dialog-input';
import AddButton from './actions/AddButton';
import InviteButton from './actions/InviteButton';
import EditButton from './actions/EditButton';
import ViewButton from './actions/ViewButton';
import KingButton from './actions/KingButton';
import QuitButton from './actions/QuitButton';
import DeleteButton from './actions/DeleteButton';
import SelectMultiple from 'react-native-select-multiple'
import SixNumberBoxes from './NumbersComponent';
import ButtonComponent from './ButtonComponent';
import SearchBar from './actions/SearchButton';
import * as ImagePicker from 'expo-image-picker';

const Accordion = ({ title, content, icon, type }) => {
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [editUserVisible, setEditUserVisible] = useState(false);
    const [editGroupVisible, setEditGroupVisible] = useState(false);
    const [editCardVisible, setEditCardVisible] = useState(false);
    const [editTagVisible, setEditTagVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [tagButton, setTagButton] = useState('');
    const [groupButton, setGroupButton] = useState('');
    const [cardButton, setCardButton] = useState('');

    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [tagName, setTagName] = useState('');
    const [updatedTag, setUpdatedTag] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [tags, setTags] = useState('');

    const [selectedCard, setSelectedCard] = useState('');
    const [cards, setCards] = useState([]);

    const [selectedGroup, setSelectedGroup] = useState('');
    const [groups, setGroups] = useState([]);

    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [groupFrequency, setGroupFrequency] = useState('');
    const [updatedGroupName, setUpdatedGroupName] = useState('');
    const [updatedGroupDescription, setUpdatedGroupDescription] = useState('');
    const [updatedGroupFrequency, setUpdatedGroupFrequency] = useState('');
    const [groupSelectedTags, setGroupSelectedTags] = useState('');
    const [groupSelectedTypes, setGroupSelectedTypes] = useState('');
    const [groupTags, setGroupTags] = useState('');
    const [groupTypes, setGroupTypes] = useState('');

    const [dialogVisible, setDialogVisible] = React.useState(false);
    const [emailInput, setEmailInput] = React.useState('');

    const [code, setVerificationCode] = useState('0');
    const [groupSearch, setGroupSearch] = useState('');

    const [cardTitle, setCardTitle] = useState('');
    const [cardDescription, setCardDescription] = useState('');
    const [cardDuration, setCardDuration] = useState('');
    const [cardImage, setCardImage] = useState(null);
    const [cardType, setCardType] = useState(1);
    const [updatedCardTitle, setUpdatedCardTitle] = useState('');
    const [updatedCardDescription, setUpdatedCardDescription] = useState('');
    const [updatedCardDuration, setUpdatedCardDuration] = useState('');
    const [updatedCardImage, setUpdatedCardImage] = useState('');
    const [updatedCardType, setUpdatedCardType] = useState('');
    const [cardSelectedTags, setCardSelectedTags] = useState('');
    const [cardTags, setCardTags] = useState('');
    const navigation = useNavigation();

    // FETCH USER FROM ASYNC STORAGE
    useEffect(() => {
        const fetchDataFromAsyncStorage = async () => {
            try {
                const localUser = await AsyncStorage.getItem('user');
                setUser(JSON.parse(localUser));
                if (localUser) {
                    const parsedUser = JSON.parse(localUser);
                    setFirstName(parsedUser.first_name);
                    setLastName(parsedUser.last_name);
                    setEmail(parsedUser.email);
                }
            } catch (error) {
                // Handle error
            };
        }
        fetchDataFromAsyncStorage();
    }, []);


    if (!user) {
        return null;
    }
    /******************************************* USER  *******************************************/
    // API
    const editUser = async () => {
        setIsLoading(true);
        const response = await fetch(`${apiURL}/users/${user.id}/update`, {
            method: "PATCH",
            body: JSON.stringify({ 'first_name': firstName, 'last_name': lastName, 'email': email, 'password': password }),
            headers: { 'Content-Type': 'Application/json' }
        });

        const jsonResponse = await response.json();
        if (jsonResponse.status == '200') {
            setIsLoading(false);
            await AsyncStorage.clear();
            navigation.navigate('Login');
        } else {
            setIsLoading(false);
            alert(jsonResponse.message);
        }
    }

    // USER HANDLERS
    const handleFirstNameChange = (text) => {
        setFirstName(text);
    }

    const handleLastNameChange = (text) => {
        setLastName(text);
    }

    const handleEmailChange = (text) => {
        setEmail(text);
    }

    const handlePasswordChange = (text) => {
        setPassword(text);
    }

    /******************************************* TAGS  *******************************************/
    // API
    const getTags = async () => {
        const response = await fetch(`${apiURL}/tags`,
            {
                method: "GET",
            });

        const data = await response.json();
        setTags(data);
        return data;
    }

    const getTagById = async (id) => {
        const response = await fetch(`${apiURL}/tags/${id}`,
            {
                method: "GET",
            });

        const data = await response.json();
        setSelectedTag(data);
        return data;
    }

    const deleteTag = async (id) => {
        const response = await fetch(`${apiURL}/tags/${id}`,
            {
                method: "DELETE",
            });

        const data = await response.json();
        getTags();
        goBackToTags();
    }

    const createTag = async () => {
        const response = await fetch(`${apiURL}/tags`,
            {
                method: "POST",
                body: JSON.stringify({ 'name': tagName }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        getTags();
        goBackToTags();
    }

    const editTag = async (id) => {
        const response = await fetch(`${apiURL}/tags/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify({ 'name': updatedTag }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        getTags();
        goBackToTags();
    }

    // TAG HANDLERS
    const goBackToTags = () => {
        setTagButton('');
    }

    const handleAddTag = () => {
        setTagButton('add');
    }

    const handleEditTag = async (tagId) => {
        const result = await getTagById(tagId);
        setUpdatedTag(result.name);
        if (tagId != '') {
            setTagButton('edit');
        }
    }

    const handleDeleteTag = (tagId) => {
        getTagById(tagId);
        if (tagId != '') {
            setTagButton('delete');
        }
    }

    const handleTagNameChange = (text) => {
        setTagName(text);
    }

    const handleUpdatedTagNameChange = (text) => {
        setUpdatedTag(text);
    }

    /******************************************* CARDS  *******************************************/
    // API
    const getCards = async () => {
        const response = await fetch(`${apiURL}/cards`,
            {
                method: "GET",
            });

        const data = await response.json();
        setCards(data);
        return data;
    }

    const getCardById = async (id) => {
        const response = await fetch(`${apiURL}/cards/${id}`,
            {
                method: "GET",
            });

        const data = await response.json();
        setSelectedCard(data);
        return data;
    }

    const openCardGroup = async () => {
        setCardButton('');
        const data = await getCards();
        setCards(data);
        if (groups.length == 0) {
            setCards(data);
        }
        setEditCardVisible(true);
    }

    const createCard = async () => {
        const cardSelectedTagsId = cardSelectedTags.map(item => item['value']);

        const response = await fetch(`${apiURL}/cards`,
            {
                method: "POST",
                body: JSON.stringify({ 'type': cardType, 'image': cardImage, 'title': cardTitle, 'duration': cardDuration, 'description': cardDescription, 'tags_id': cardSelectedTagsId }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        console.log(data);
        getCards();
        goBackToCards();
    }

    const editCard = async (id) => {
        const cardSelectedTagsId = cardSelectedTags.map(item => item['value']);
        const response = await fetch(`${apiURL}/cards/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify({ 'title': updatedCardTitle, 'description': updatedCardDescription, 'duration': updatedCardDuration, 'tags_id': cardSelectedTagsId, 'type': updatedCardType, 'status': 2, 'image': updatedCardImage }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        console.log(data);
        getCards();
        goBackToCards();
    }

    // CARD HANDLERS
    const goBackToCards = () => {
        setCardButton('');
    }

    const handleAddCard = async () => {
        const data = await getTags();
        for (var i in data) {
            data[i]['value'] = data[i]['id'];
            data[i]['label'] = data[i]['name'];
            delete data[i]['id'];
            delete data[i]['name'];
            delete data[i]['created_at'];
            delete data[i]['updated_at'];
        }
        setCardTags(data);
        setCardImage(null);
        setCardButton('add');
    }

    const handleEditCard = async (cardId) => {
        const result = await getCardById(cardId);
        for (var i in result.tags) {
            result.tags[i]['value'] = result.tags[i]['id'];
            result.tags[i]['label'] = result.tags[i]['name'];
            delete result.tags[i]['id'];
            delete result.tags[i]['name'];
            delete result.tags[i]['created_at'];
            delete result.tags[i]['updated_at'];
        }
        const data = await getTags();
        for (var i in data) {
            data[i]['value'] = data[i]['id'];
            data[i]['label'] = data[i]['name'];
            delete data[i]['id'];
            delete data[i]['name'];
            delete data[i]['created_at'];
            delete data[i]['updated_at'];
        }
        setCardTags(data);
        setUpdatedCardTitle(result.title);
        setUpdatedCardDescription(result.description);
        setUpdatedCardDuration(result.duration);
        setCardSelectedTags(result.tags);
        setUpdatedCardType(result.type);
        setUpdatedCardImage(result.image);
        if (cardId != '') {
            setCardButton('edit');
        }
    }

    const handleCardTitleChange = (text) => {
        setCardTitle(text);
    }

    const handleCardDescriptionChange = (text) => {
        setCardDescription(text);
    }

    const handleCardDurationChange = (text) => {
        setCardDuration(text);
    }

    const handleCardSelectionTags = (selectedCardTags) => {
        setCardSelectedTags(selectedCardTags);
    }

    const handleCardImageChange = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;

            const response = await fetch(imageUri);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result;
                setCardImage(base64data);
            };
            reader.readAsDataURL(blob);
        } else {
            setCardImage(null);
        }
    };

    const handleUpdatedCardTitleChange = (text) => {
        setUpdatedCardTitle(text);
    }

    const handleUpdatedCardDescriptionChange = (text) => {
        setUpdatedCardDescription(text);
    }

    const handleUpdatedCardDurationChange = (text) => {
        setUpdatedCardDuration(text);
    }

    const handleUpdatedCardSelectionTags = (selectedCardTags) => {
        setCardSelectedTags(selectedCardTags);
    }

    const handleUpdatedCardImageChange = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;

            const response = await fetch(imageUri);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result;
                setUpdatedCardImage(base64data);
            };
            reader.readAsDataURL(blob);
        } else {
            setUpdatedCardImage(null);
        }
    };


    /******************************************* GROUPS  *******************************************/
    // API
    const getGroups = async () => {
        const response = await fetch(`${apiURL}/groups`,
            {
                method: "GET",
            });

        const data = await response.json();
        setGroups(data);
        return data;
    }

    const openEditGroup = async () => {
        setGroupButton('');
        const data = await getGroups();
        setGroups(data);
        if (groups.length == 0) {
            setGroups(data);
        }
        setEditGroupVisible(true);
    }

    const getGroupById = async (id) => {
        const response = await fetch(`${apiURL}/groups/${id}`,
            {
                method: "GET",
            });

        const data = await response.json();
        setSelectedGroup(data);
        return data;
    }

    const deleteGroup = async (id) => {
        const response = await fetch(`${apiURL}/groups/${id}`,
            {
                method: "DELETE",
            });

        const data = await response.json();
        await getGroups();
        goBackToGroups();
    }

    const deleteUserFromGroup = async (userId, groupId) => {
        const response = await fetch(`${apiURL}/groups/${groupId}/${userId}`,
            {
                method: "DELETE",
            });

        const data = await response.json();
        await getGroups();
        goBackToGroups();
    }

    const inviteUserToGroup = async (email, groupId) => {
        const response = await fetch(`${apiURL}/groups/${groupId}`,
            {
                method: "POST",
                body: JSON.stringify({ 'email': email }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        setDialogVisible(false);
        await getGroups();
        goBackToGroups();
    }

    const verifyUserGroup = async () => {
        const response = await fetch(`${apiURL}/groups/verifyUserGroup`,
            {
                method: "POST",
                body: JSON.stringify({ 'user_id': user.id, 'group_name': groupSearch, 'number': code }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        await getGroups();
        goBackToGroups();
    }

    const quitGroup = async (userId, groupId) => {
        const response = await fetch(`${apiURL}/groups/${groupId}/${userId}/quit`,
            {
                method: "DELETE",
            });

        const data = await response.json();
        await getGroups();
        goBackToGroups();
    }

    const pauseGroup = async (id) => {
        const response = await fetch(`${apiURL}/groups/${id}/pause`,
            {
                method: "PATCH",
                body: JSON.stringify({ 'is_paused': 1 }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        getGroups();
        goBackToGroups();
    }

    const activateGroup = async (id) => {
        const response = await fetch(`${apiURL}/groups/${id}/pause`,
            {
                method: "PATCH",
                body: JSON.stringify({ 'is_paused': 0 }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        getGroups();
        goBackToGroups();
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
        goBackToGroups();
    }

    const editGroup = async (id) => {
        const groupSelectedTagsId = groupSelectedTags.map(item => item['value']);
        const groupSelectedTypesId = groupSelectedTypes.map(item => item['value']);
        const response = await fetch(`${apiURL}/groups/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify({ 'name': updatedGroupName, 'creator_id': user.id, 'description': updatedGroupDescription, 'tasks_frequency': updatedGroupFrequency, 'is_paused': 0, 'tags_id': groupSelectedTagsId, 'types_id': groupSelectedTypesId }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        console.log(data);
        getGroups();
        goBackToGroups();
    }

    // GROUP HANDLERS
    const goBackToGroups = () => {
        setGroupButton('');
    }

    const handleEnterGroup = () => {
        setGroupButton('validate');
    }

    const handleCodeInput = (code) => {
        setVerificationCode(code);
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
        setGroupButton('add');
    }

    const handleEditGroup = async (groupId) => {
        const result = await getGroupById(groupId);
        for (var i in result.tags) {
            result.tags[i]['value'] = result.tags[i]['id'];
            result.tags[i]['label'] = result.tags[i]['name'];
            delete result.tags[i]['id'];
            delete result.tags[i]['name'];
            delete result.tags[i]['created_at'];
            delete result.tags[i]['updated_at'];
        }
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
        setUpdatedGroupName(result.name);
        setUpdatedGroupDescription(result.description);
        setUpdatedGroupFrequency(result.tasks_frequency);
        setGroupSelectedTags(result.tags);
        for (var i in result.types) {
            result.types[i]['value'] = result.types[i]['id'];
            result.types[i]['label'] = result.types[i]['name'];
            delete result.types[i]['id'];
            delete result.types[i]['name'];
            delete result.types[i]['created_at'];
            delete result.types[i]['updated_at'];
        }
        setGroupSelectedTypes(result.types);
        if (groupId != '') {
            setGroupButton('edit');
        }
    }

    const handleDeleteUserFromGroup = (user) => {
        if (Platform.OS === 'android' || Platform.OS === 'ios') {
            return Alert.alert(
                "Etes vous sur(e) ?",
                `Etes vous sur(e) que vous voulez supprimer l'utilisateur ${user.first_name} ${user.last_name}`,
                [
                    {
                        text: "Non",
                    },
                    {
                        text: "Oui",
                        onPress: () => {
                            deleteUserFromGroup(user.id, selectedGroup.id);
                        },
                    },
                ]
            );
        } else {
            const result = window.confirm(`Etes vous sur(e) que vous voulez supprimer l'utilisateur ${user.first_name} ${user.last_name}`);
            if (result) {
                deleteUserFromGroup(user.id, selectedGroup.id);
            }
        }

    }

    const handleDeleteGroup = (groupId) => {
        const data = getGroupById(groupId);
        setSelectedGroup(data);
        if (groupId != '') {
            setGroupButton('delete');
        }
    }

    const handleViewGroup = (groupId) => {
        const data = getGroupById(groupId);
        setSelectedGroup(data);
        if (groupId != '') {
            setGroupButton('view');
        }
    }

    const handleQuitGroup = (group) => {
        const data = getGroupById(group.id);
        setSelectedGroup(data);
        if (group.id != '') {
            if (Platform.OS === 'android' || Platform.OS === 'ios') {
                return Alert.alert(
                    "Etes vous sur(e) ?",
                    `Etes vous sur(e) que vous voulez quitter le groupe ${group.name}`,
                    [
                        {
                            text: "Non",
                        },
                        {
                            text: "Oui",
                            onPress: () => {
                                quitGroup(user.id, selectedGroup.id);
                            },
                        },
                    ]
                );
            } else {
                const result = window.confirm(`Etes vous sur(e) que vous voulez quitter le groupe ${group.name}`);
                if (result) {
                    quitGroup(user.id, selectedGroup.id);
                }
            }
        }
    }

    const handleGroupSearch = (value) => {
        setGroupSearch(value);
    };

    const handleGroupNameChange = (text) => {
        setGroupName(text);
    }

    const handleGroupDescriptionChange = (text) => {
        setGroupDescription(text);
    }

    const handleGroupFrequencyChange = (text) => {
        setGroupFrequency(text);
    }

    const handleGroupSelectionTags = (selectedGroupTags) => {
        setGroupSelectedTags(selectedGroupTags);
    }

    const handleGroupSelectionTypes = (selectedGroupTypes) => {
        setGroupSelectedTypes(selectedGroupTypes);
    }

    const handleUpdatedGroupNameChange = (text) => {
        setUpdatedGroupName(text);
    }

    const handleUpdatedGroupDescriptionChange = (text) => {
        setUpdatedGroupDescription(text);
    }

    const handleUpdatedGroupFrequencyChange = (text) => {
        setUpdatedGroupFrequency(text);
    }


    /******************************************* MODALS *******************************************/
    // CARD MODAL
    const closeEditCard = () => {
        setEditCardVisible(false);
    }

    // TAG MODAL
    const openEditTag = () => {
        setTagButton('');
        getTags();
        setEditTagVisible(true);
    }

    const closeEditTag = () => {
        setEditTagVisible(false);
    }

    // USER MODAL
    const closeEditUser = () => {
        setEditUserVisible(false);
    }

    const openEditUser = () => {
        setEditUserVisible(true);
    }

    const canEdit = () => {
        return (user.type === 'basic')
    }

    // GROUP MODAL
    const closeEditGroup = () => {
        setEditGroupVisible(false);
    }

    // DATE MODAL
    const closeDateModal = () => {
        setDateModalVisible(false);
    }

    const openDateModal = () => {
        setIsEnabled(previousState => !previousState);
        if (!isEnabled) {
            setDateModalVisible(true);
        }
    }

    // FOR SWITCHES AND LOGOUT BUTTON
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    const toggleAccordion = () => {
        if (content != '') {
            setIsExpanded(!isExpanded);
        }
        if (type == "button") {
            AsyncStorage.clear();
            navigation.navigate("Landing");
        }
        if (type == "cronjob") {
            cronjob();
        }
    };

    const isUserValidated = (group) => {
        const userGroup = group.users.filter(userGroup => userGroup.id == user.id)[0];
        try {
            return (userGroup.pivot.is_validated);
        }
        catch {
            // ...
        }
    }

    const cronjob = async () => {
        const response = await fetch(`${apiURL}/cronjob`,
            {
                method: "GET",
            });

        const data = await response.json();
    }

    return (
        <View style={styles.container}>

            {/* Select Date Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={dateModalVisible}
                onRequestClose={closeDateModal}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={{ backgroundColor: Colors.dark, borderRadius: 8, width: '100%', height: '100%', justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ marginBottom: 8, color: Colors.light, textAlign: 'center', fontSize: 20 }}>Selectionner une date :</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={closeDateModal} style={styles.button}>
                                <Text style={{ color: Colors.light, textAlign: 'center' }}>Retour</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closeDateModal} style={styles.button}>
                                {isLoading ? (
                                    <ActivityIndicator color={Colors.light} />
                                ) : (
                                    <Text style={{ color: Colors.light, textAlign: 'center' }}>Sauvegarder</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Edit User Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={editUserVisible}
                onRequestClose={closeEditUser}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={{ backgroundColor: Colors.background, borderRadius: 8, width: '100%', height: '100%', justifyContent: "center", alignItems: "center" }}>
                        <View style={{ position: 'absolute', top: 0, width: '100%' }}>
                            <Header isHome={false} title='Profil' />
                        </View>
                        <View style={{ marginVertical: 20 }}>
                            <Image source={{ uri: user.picture }} style={{ width: 100, height: 100, borderRadius: 100 / 2 }} />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={Colors.secondary}
                            placeholder="Nom"
                            value={lastName}
                            onChangeText={handleLastNameChange}
                            editable={canEdit()}
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={Colors.secondary}
                            placeholder="Prénom"
                            value={firstName}
                            onChangeText={handleFirstNameChange}
                            editable={canEdit()}
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={Colors.secondary}
                            placeholder="Email"
                            value={email}
                            onChangeText={handleEmailChange}
                            editable={canEdit()}
                        />
                        {canEdit() && (
                            <>
                                <Text style={{ margin: 0, color: 'gray', fontSize: 10 }}>Vous pouvez laisser ce champ vide*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={Colors.secondary}
                                    placeholder="Mot de passe"
                                    value={password}
                                    onChangeText={handlePasswordChange}
                                />
                            </>
                        )}

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={closeEditUser} style={styles.button}>
                                <Text style={{ color: Colors.light, textAlign: 'center' }}>Retour</Text>
                            </TouchableOpacity>
                            {canEdit() && (
                                <>
                                    <TouchableOpacity onPress={editUser} style={styles.button}>
                                        {isLoading ? (
                                            <ActivityIndicator color={Colors.light} />
                                        ) : (
                                            <Text style={{ color: Colors.light, textAlign: 'center' }}>Sauvegarder</Text>
                                        )}
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Edit Card Modal */}
            < Modal
                animationType="slide"
                transparent={false}
                visible={editCardVisible}
                onRequestClose={closeEditCard} >
                <View style={{ backgroundColor: Colors.background, width: '100%', height: '100%', justifyContent: "center", alignItems: "center" }}>
                    <View style={{ position: 'absolute', top: 0, width: '100%' }}>
                        <Header isHome={false} title='Cards' />
                    </View>

                    <View style={{ height: '75%', width: '100%', }}>
                        <ScrollView style={{ flexGrow: 0 }}>
                            {(cardButton == '') && (<>
                                {Array.isArray(cards) ? cards.map((card) => (
                                    <TouchableOpacity onPress={() => { handleEditCard(card.id) }} >
                                        <View style={[styles.taskContainer, { padding: 0, width: 300, alignSelf: 'center', borderWidth: 0, }]}>
                                            <ImageBackground source={{ uri: `${baseURL}/${card.image}` }} resizeMode="cover" imageStyle={{ borderColor: Colors.black, borderRadius: 10 }} >
                                                <View style={{ justifyContent: 'space-around', height: 150, alignItems: 'center', padding: 10, flexDirection: 'row', backgroundColor: '#00000B55', borderWidth: 1, borderColor: Colors.black, borderRadius: 10 }}>
                                                    <View style={styles.topTagContainer}>
                                                        <Text style={styles.taskTitle}>{card.title}</Text>
                                                        <Text style={[styles.taskDescription, { fontSize: 10, color: 'gray' }]}>{card.description}</Text>
                                                    </View>
                                                    <View style={styles.countNumbersContainer}>
                                                        <Text style={styles.taskTitle}>{card.duration} jrs</Text>
                                                        <Text style={[styles.taskDescription, { fontSize: 10, color: 'gray' }]}>Durée suggérée </Text>
                                                    </View>
                                                    <View style={{ position: 'absolute', bottom: 5, right: 5, flexDirection: 'row' }}>
                                                        {card.type == 1 && <Text style={styles.taskDescription}>Action</Text>}
                                                        {card.type == 2 && <Text style={styles.taskDescription}>Defi</Text>}
                                                        {card.type == 3 && <Text style={styles.taskDescription}>Vérité</Text>}
                                                    </View>
                                                    <View style={{ position: 'absolute', top: 5, right: 5, flexDirection: 'row' }}>
                                                        {Array.isArray(card.tags) ? card.tags.map((tag) => (
                                                            <View style={[styles.tag, { padding: 2, margin: 0, marginRight: 5 }]}><Text>{tag.name}</Text></View>
                                                        )) : null}
                                                    </View>
                                                </View>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity>
                                )) : null}
                            </>)}

                            {(cardButton == 'add') && (
                                <View style={{ width: '75%', alignSelf: 'center' }}>
                                    <TextInput
                                        style={[styles.taskContainer, { color: 'white' }]}
                                        placeholder="Titre de Card"
                                        placeholderTextColor={Colors.secondary}
                                        value={cardTitle}
                                        onChangeText={handleCardTitleChange}
                                    />
                                    <TextInput
                                        style={[styles.taskContainer, { color: 'white' }]}
                                        placeholder="Description de Card"
                                        placeholderTextColor={Colors.secondary}
                                        multiline={true}
                                        numberOfLines={3}
                                        value={cardDescription}
                                        onChangeText={handleCardDescriptionChange}
                                    />
                                    <View style={{ paddingHorizontal: 16 }}>
                                        <Text style={{ color: Colors.light, }}>Tags associés aux card :</Text>
                                    </View>
                                    <SelectMultiple
                                        items={cardTags}
                                        selectedItems={cardSelectedTags}
                                        onSelectionsChange={handleCardSelectionTags}
                                        max={2}
                                        style={{
                                            backgroundColor: 'transparent',
                                            borderRadius: 8,
                                            paddingVertical: 10,
                                            paddingHorizontal: 16,
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
                                    <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                                        <TextInput
                                            style={[styles.taskContainer, { color: 'white', width: '30%' }]}
                                            placeholder="Durée"
                                            placeholderTextColor={Colors.secondary}
                                            value={cardDuration}
                                            onChangeText={handleCardDurationChange}
                                        />
                                        <Picker
                                            style={[styles.taskContainer, { color: 'white', width: '60%' }]}
                                            selectedValue={cardType}
                                            onValueChange={(value) => setCardType(value)}>
                                            <Picker.Item label="Action" value="1" />
                                            <Picker.Item label="Défi" value="2" />
                                            <Picker.Item label="Verité" value="3" />
                                        </Picker>
                                    </View>
                                    <View style={[styles.taskContainer, { alignItems: 'center', justifyContent: 'center' }]}>
                                        <TouchableOpacity onPress={handleCardImageChange} style={[styles.button, { alignSelf: 'center' }]}>
                                            <Text style={{ color: Colors.light, textAlign: 'center' }}>Choisir Image du card</Text>
                                        </TouchableOpacity>
                                        <View style={{ marginTop: 10 }}>
                                            {cardImage && <Image source={{ uri: cardImage }} style={{ width: 100, height: 100, borderRadius: 100 / 2 }} />}
                                        </View>
                                    </View>

                                    <View style={{ justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={goBackToCards} style={[styles.button, { backgroundColor: 'transparent' }]}>
                                            <Text style={{ color: Colors.light, textAlign: 'center' }}>Retour</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={createCard} style={styles.button}>
                                            <Text style={{ color: Colors.light, textAlign: 'center' }}>Ajouter</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}

                            {(cardButton == 'edit') && (
                                <View style={{ width: '75%', alignSelf: 'center' }}>
                                    <TextInput
                                        style={[styles.taskContainer, { color: 'white' }]}
                                        placeholder="Titre de Card"
                                        placeholderTextColor={Colors.secondary}
                                        value={updatedCardTitle}
                                        onChangeText={handleUpdatedCardTitleChange}
                                    />
                                    <TextInput
                                        style={[styles.taskContainer, { color: 'white' }]}
                                        placeholder="Description de Card"
                                        placeholderTextColor={Colors.secondary}
                                        multiline={true}
                                        numberOfLines={3}
                                        value={updatedCardDescription}
                                        onChangeText={handleUpdatedCardDescriptionChange}
                                    />
                                    <View style={{ paddingHorizontal: 16 }}>
                                        <Text style={{ color: Colors.light, }}>Tags associés aux card :</Text>
                                    </View>
                                    <SelectMultiple
                                        items={cardTags}
                                        selectedItems={cardSelectedTags}
                                        onSelectionsChange={handleUpdatedCardSelectionTags}
                                        max={2}
                                        style={{
                                            backgroundColor: 'transparent',
                                            borderRadius: 8,
                                            paddingVertical: 10,
                                            paddingHorizontal: 16,
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
                                    <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                                        <TextInput
                                            style={[styles.taskContainer, { color: 'white', width: '30%' }]}
                                            placeholder="Durée"
                                            placeholderTextColor={Colors.secondary}
                                            value={updatedCardDuration}
                                            onChangeText={handleUpdatedCardDurationChange}
                                        />
                                        <Picker
                                            style={[styles.taskContainer, { color: 'white', width: '60%' }]}
                                            selectedValue={updatedCardType}
                                            onValueChange={(value) => setUpdatedCardType(value)}>
                                            <Picker.Item label="Action" value="1" />
                                            <Picker.Item label="Défi" value="2" />
                                            <Picker.Item label="Verité" value="3" />
                                        </Picker>
                                    </View>
                                    <View style={[styles.taskContainer, { alignItems: 'center', justifyContent: 'center' }]}>
                                        <TouchableOpacity onPress={handleUpdatedCardImageChange} style={[styles.button, { alignSelf: 'center' }]}>
                                            <Text style={{ color: Colors.light, textAlign: 'center' }}>Choisir Image du card</Text>
                                        </TouchableOpacity>
                                        <View style={{ marginTop: 10 }}>
                                            {updatedCardImage && <Image source={{ uri: `${baseURL}/${updatedCardImage}` }} style={{ width: 100, height: 100, borderRadius: 100 / 2 }} />}
                                        </View>
                                    </View>

                                    <View style={{ justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={goBackToCards} style={[styles.button, { backgroundColor: 'transparent' }]}>
                                            <Text style={{ color: Colors.light, textAlign: 'center' }}>Retour</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { editCard(selectedCard.id) }} style={styles.button}>
                                            <Text style={{ color: Colors.light, textAlign: 'center' }}>Sauvegarder</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
                {
                    (cardButton == '') && (
                        <View>
                            <AddButton onPress={handleAddCard} />
                        </View>
                    )
                }

            </Modal >

            {/* Edit Group Modal */}
            < Modal
                animationType="slide"
                transparent={false}
                visible={editGroupVisible}
                onRequestClose={closeEditGroup} >
                <View style={{ backgroundColor: Colors.background, borderRadius: 8, width: '100%', height: '100%', justifyContent: "center", alignItems: "center" }}>
                    <View style={{ position: 'absolute', top: 0, width: '100%' }}>
                        <Header isHome={false} title='Groupes' />
                    </View>

                    <View style={{ height: '75%', width: '100%', }}>
                        <ScrollView style={{ flexGrow: 0 }}>
                            {(groupButton == '') && (
                                <View >
                                    {Array.isArray(groups) ? groups.map((group) => (
                                        <View style={[styles.taskContainer, { width: 300, display: isUserValidated(group) ? 'flex' : 'none', alignSelf: 'center', backgroundColor: !group.is_paused ? Colors.dark : 'transparent' }]}>
                                            <View style={{ justifyContent: 'space-around', padding: 5, flexDirection: 'row' }}>
                                                <View style={styles.topTagContainer}>
                                                    <Text style={styles.taskTitle}>{group.name}</Text>
                                                    <Text style={[styles.taskDescription, { fontSize: 10, color: 'gray' }]}>{group.description}</Text>
                                                </View>
                                                <View style={styles.countNumbersContainer}>
                                                    <Text style={styles.taskTitle}>{group.tasks_frequency}</Text>
                                                    <Text style={[styles.taskDescription, { fontSize: 10, color: 'gray' }]}>Fréquence des tâches</Text>
                                                </View>
                                            </View>
                                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 5 }}>
                                                <View style={styles.tagContainer}>
                                                    {Array.isArray(group.tags) ? group.tags.map((tag) => (
                                                        <View style={styles.tag}><Text>{tag.name}</Text></View>
                                                    )) : null}
                                                </View>
                                                <View style={styles.countNumbersContainer}>
                                                    <Text style={styles.taskTitle}>{group.users.length}</Text>
                                                    <Text style={[styles.taskDescription, { fontSize: 10, color: 'gray' }]}>membres</Text>
                                                </View>
                                            </View>
                                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 5 }}>
                                                <ViewButton onPress={() => handleViewGroup(group.id)} />
                                                {(!group.is_paused) && (group.creator_id == user.id) && (
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <EditButton onPress={() => handleEditGroup(group.id)} />
                                                    </View>
                                                )}
                                                {(group.creator_id == user.id) && (
                                                    <DeleteButton onPress={() => handleDeleteGroup(group.id)} />
                                                )}
                                            </View>
                                        </View>
                                    )) : null}
                                </View>
                            )}
                            {(groupButton == 'add') && (
                                <View style={{ width: '75%', alignSelf: 'center' }}>
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
                                        <TouchableOpacity onPress={goBackToGroups} style={[styles.button, { backgroundColor: 'transparent' }]}>
                                            <Text style={{ color: Colors.light, textAlign: 'center' }}>Retour</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={createGroup} style={styles.button}>
                                            <Text style={{ color: Colors.light, textAlign: 'center' }}>Ajouter</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            {(groupButton == 'delete') && (
                                <View style={{ width: '75%', alignSelf: 'center' }}>
                                    <Text style={styles.title}>Etes vous sur que vous voulez effacer le groupe {selectedGroup.name} ?</Text>
                                    <View style={{ justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', marginTop: 10, }}>
                                        <TouchableOpacity onPress={goBackToGroups} style={[styles.button, { backgroundColor: 'transparent' }]}>
                                            <Text style={{ color: Colors.light, textAlign: 'center' }}>Retour</Text>
                                        </TouchableOpacity>
                                        {selectedGroup.is_paused ? (
                                            <TouchableOpacity onPress={() => activateGroup(selectedGroup.id)} style={styles.button}>
                                                <Text style={{ color: Colors.light, textAlign: 'center' }}>Activer</Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={() => pauseGroup(selectedGroup.id)} style={styles.button}>
                                                <Text style={{ color: Colors.light, textAlign: 'center' }}>Mettre en pause</Text>
                                            </TouchableOpacity>
                                        )}
                                        <TouchableOpacity onPress={() => deleteGroup(selectedGroup.id)} style={styles.button}>
                                            <Text style={{ color: Colors.light, textAlign: 'center' }}>Effacer</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            {(groupButton == 'edit') && (
                                <View style={{ width: '75%', alignSelf: 'center' }}>
                                    <TextInput
                                        style={[styles.taskContainer, { color: 'white' }]}
                                        placeholder="Nom de Groupe"
                                        placeholderTextColor={Colors.secondary}
                                        value={updatedGroupName}
                                        onChangeText={handleUpdatedGroupNameChange}
                                    />
                                    <TextInput
                                        style={[styles.taskContainer, { color: 'white' }]}
                                        placeholder="Description de Groupe"
                                        placeholderTextColor={Colors.secondary}
                                        multiline={true}
                                        numberOfLines={3}
                                        value={updatedGroupDescription}
                                        onChangeText={handleUpdatedGroupDescriptionChange}
                                    />
                                    <TextInput
                                        style={[styles.taskContainer, { color: 'white' }]}
                                        placeholder="Fréquence par jours du groupe"
                                        placeholderTextColor={Colors.secondary}
                                        value={updatedGroupFrequency.toString()}
                                        onChangeText={handleUpdatedGroupFrequencyChange}
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
                                            display: 'flex',


                                        }}
                                        rowStyle={{ backgroundColor: Colors.dark, borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                        checkboxStyle={{ tintColor: Colors.white }}
                                        labelStyle={{ color: Colors.white, marginTop: 2, }}
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
                                    <View style={{ paddingHorizontal: 16, paddinBottom: 10 }}>
                                        <Text style={{ color: Colors.light, marginBottom: 5 }}>Adhérents sur le groupe :</Text>
                                    </View>
                                    {Array.isArray(selectedGroup.users) ? selectedGroup.users.map((user) => (
                                        <View style={styles.taskContainer}>
                                            <View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                                    <Text style={styles.taskTitle}>{user.first_name} {user.last_name}</Text>
                                                    {selectedGroup.creator_id != user.id ? (
                                                        <DeleteButton onPress={() => handleDeleteUserFromGroup(user)} />
                                                    ) : (
                                                        <EditButton onPress={() => { setGroupButton(''); closeEditGroup(); openEditUser(); }} />
                                                    )}
                                                </View>
                                            </View>
                                        </View>
                                    )) : null}

                                    <View style={{ justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={goBackToGroups} style={[styles.button, { backgroundColor: 'transparent' }]}>
                                            <Text style={{ color: Colors.light, textAlign: 'center' }}>Retour</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => editGroup(selectedGroup.id)} style={styles.button}>
                                            <Text style={{ color: Colors.light, textAlign: 'center' }}>Sauvegarder</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            {(groupButton == 'view') && (
                                <View style={{ width: '75%', alignSelf: 'center' }}>
                                    <View style={{ paddingHorizontal: 16, paddinBottom: 10 }}>
                                        <Text style={{ color: Colors.light, marginBottom: 5 }}>Adhérents sur le groupe :</Text>
                                    </View>
                                    {Array.isArray(selectedGroup.users) ? selectedGroup.users.map((groupUser) => (
                                        <View style={[styles.taskContainer, { backgroundColor: (groupUser.pivot.is_validated == 1) ? Colors.dark : 'transparent' }]}>
                                            <View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                    <Text style={[styles.taskTitle, { width: '75%' }]}>{groupUser.first_name} {groupUser.last_name}</Text>
                                                    {(user.id == groupUser.id && selectedGroup.creator_id != user.id) && (
                                                        <QuitButton onPress={() => handleQuitGroup(selectedGroup)} />
                                                    )}
                                                    {(selectedGroup.creator_id == groupUser.id) && (
                                                        <KingButton />
                                                    )}
                                                </View>
                                            </View>
                                        </View>
                                    )) : null}

                                    <DialogInput
                                        isDialogVisible={dialogVisible}
                                        title={"Inviter"}
                                        hintInput={"utilisateur@email.com"}
                                        submitInput={(inputText) => {
                                            setEmailInput(inputText);
                                            inviteUserToGroup(inputText, selectedGroup.id);
                                        }}
                                        closeDialog={() => setDialogVisible(false)}>
                                    </DialogInput>

                                    <View style={{ justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={goBackToGroups} style={[styles.button, { backgroundColor: 'transparent' }]}>
                                            <Text style={{ color: Colors.light, textAlign: 'center' }}>Retour</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setDialogVisible(true)} style={[styles.button, { backgroundColor: Colors.primary }]}>
                                            <Text style={{ color: Colors.light, textAlign: 'center' }}>Inviter</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            {(groupButton == 'validate') && (
                                <View style={{ width: '75%', alignSelf: 'center' }}>
                                    <View style={{ width: '100%' }}>
                                        <Header isHome={false} title='Joindre un Groupe' />
                                    </View>
                                    <View style={{ marginTop: 30, }}>
                                        <SearchBar onValueSelect={handleGroupSearch} />
                                    </View>
                                    <SixNumberBoxes onCodeInput={handleCodeInput} />
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ alignItems: 'center', width: '50%' }}>
                                            <ButtonComponent color={Colors.light} title="Rejoindre" onPress={verifyUserGroup} />
                                        </View>
                                        <View style={{ alignItems: 'center', width: '50%' }}>
                                            <ButtonComponent color={Colors.light} title="Retour" onPress={() => setGroupButton('')} />
                                        </View>
                                    </View>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View >
                {
                    (groupButton == '') && (
                        <View>
                            <AddButton onPress={handleAddGroup} />
                        </View>
                    )
                }
            </Modal >

            {/* Edit Tag Modal */}
            < Modal
                animationType="slide"
                transparent={false}
                visible={editTagVisible}
                onRequestClose={closeEditTag} >
                <View style={{ backgroundColor: Colors.background, width: '100%', height: '100%', justifyContent: "center", alignItems: "center" }}>
                    <View style={{ position: 'absolute', top: 0, width: '100%' }}>
                        <Header isHome={false} title='Tags' />
                    </View>
                    <View style={{ height: '75%', width: '100%', }}>
                        <ScrollView style={{ flexGrow: 0 }}>
                            {(tagButton == '') && (
                                <View style={[styles.taskContainer, { width: '75%', alignSelf: 'center' }]}>
                                    {Array.isArray(tags) ? tags.map((tag) => (
                                        <View style={{ justifyContent: 'space-around', alignItems: 'center', padding: 5, flexDirection: 'row' }}>
                                            <View style={{ width: '60%' }}>
                                                <Text style={styles.taskTitle}>{tag.name}</Text>
                                            </View>
                                            <EditButton onPress={() => handleEditTag(tag.id)} />
                                            <DeleteButton onPress={() => handleDeleteTag(tag.id)} />
                                        </View>
                                    )) : null}
                                </View>
                            )}
                        </ScrollView>
                        {(tagButton == 'add') && (
                            <View style={{ width: '75%', alignSelf: 'center' }}>
                                <TextInput
                                    style={[styles.taskContainer, { color: 'white' }]}
                                    placeholderTextColor={Colors.secondary}
                                    placeholder="Titre de Tag"
                                    value={tagName}
                                    onChangeText={handleTagNameChange}
                                />
                                <View style={{ justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={goBackToTags} style={[styles.button, { backgroundColor: 'transparent' }]}>
                                        <Text style={{ color: Colors.light, textAlign: 'center' }}>Retour</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={createTag} style={styles.button}>
                                        <Text style={{ color: Colors.light, textAlign: 'center' }}>Ajouter</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                        {(tagButton == 'edit') && (
                            <View style={{ width: '75%', alignSelf: 'center' }}>
                                <TextInput
                                    style={[styles.taskContainer, { color: 'white' }]}
                                    placeholderTextColor={Colors.secondary}
                                    placeholder="Titre de Tag"
                                    value={updatedTag}
                                    onChangeText={handleUpdatedTagNameChange}
                                />
                                <View style={{ justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={goBackToTags} style={[styles.button, { backgroundColor: 'transparent' }]}>
                                        <Text style={{ color: Colors.light, textAlign: 'center' }}>Retour</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => editTag(selectedTag.id)} style={styles.button}>
                                        <Text style={{ color: Colors.light, textAlign: 'center' }}>Sauvegarder</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                        {(tagButton == 'delete') && (
                            <View style={{ width: '75%', alignSelf: 'center' }}>
                                <Text style={styles.title}>Etes vous sur que vous voulez effacer le tag {selectedTag.name} ?</Text>
                                <View style={{ justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', marginTop: 10, }}>
                                    <TouchableOpacity onPress={goBackToTags} style={[styles.button, { backgroundColor: 'transparent' }]}>
                                        <Text style={{ color: Colors.light, textAlign: 'center' }}>Retour</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteTag(selectedTag.id)} style={styles.button}>
                                        <Text style={{ color: Colors.light, textAlign: 'center' }}>Effacer</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                    </View>
                </View>

                {
                    (tagButton == '') && (
                        <View>
                            <AddButton onPress={handleAddTag} />
                        </View>
                    )
                }
            </Modal >

            <TouchableOpacity
                onPress={toggleAccordion}
                activeOpacity={0.7}
                style={styles.titleContainer}>
                <View style={styles.iconContainer}>
                    <Icon name={icon} size={20} color={Colors.light} />
                </View>
                <Text style={styles.title}>{title}</Text>
                {!isExpanded && content != "" && (
                    <View style={styles.iconContainer}>
                        <Icon name="chevron-right" size={20} color={Colors.light} />
                    </View>
                )}
                {isExpanded && (
                    <View style={styles.iconContainer}>
                        <Icon name="chevron-left" size={20} color={Colors.light} />
                    </View>
                )}
                {type == "boolean" && (
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                )}
                {type == "pick" && (
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={openDateModal}
                        value={isEnabled}
                    />
                )}
                {type == "button" && (
                    <View style={styles.iconContainer}>
                        <Icon name="" size={20} color={Colors.light} />
                    </View>
                )}
                {type == "cronjob" && (
                    <View style={styles.iconContainer}>
                        <Icon name="" size={20} color={Colors.light} />
                    </View>
                )}
            </TouchableOpacity>
            {
                isExpanded && (
                    <View style={styles.content}>
                        <Text>{content}</Text>
                        {type == "user" && (
                            <TouchableOpacity onPress={openEditUser} style={styles.button}>
                                <Text style={{ color: Colors.light, textAlign: 'center' }}>Consulter</Text>
                            </TouchableOpacity>
                        )}
                        {type == "group" && (
                            <TouchableOpacity onPress={openEditGroup} style={styles.button}>
                                <Text style={{ color: Colors.light, textAlign: 'center' }}>Consulter</Text>
                            </TouchableOpacity>
                        )}
                        {type == "card" && (
                            <TouchableOpacity onPress={openCardGroup} style={styles.button}>
                                <Text style={{ color: Colors.light, textAlign: 'center' }}>Consulter</Text>
                            </TouchableOpacity>
                        )}
                        {type == "tag" && (
                            <TouchableOpacity onPress={openEditTag} style={styles.button}>
                                <Text style={{ color: Colors.light, textAlign: 'center' }}>Consulter</Text>
                            </TouchableOpacity>
                        )}

                    </View>
                )
            }
        </View >
    );
};

const styles = accordionCoponentStyles;

export default Accordion;
