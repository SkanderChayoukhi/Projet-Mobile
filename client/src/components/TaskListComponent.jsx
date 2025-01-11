import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, ScrollView, Image, TouchableOpacity, ActivityIndicator, SafeAreaView, Modal, ImageBackground, TextInput, Alert, PermissionsAndroid, RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from 'react-native-dialog';
import taskListComponentStyles from '../styles/components/TaskListComponentStyles';
import { Colors, GlobalConstants } from '../../app.constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import Countdown from './CountdownComponent';
import DialogInput from 'react-native-dialog-input';
import styleloader from '../styles/screens/TaskListStyles';
const { apiURL, baseURL } = GlobalConstants;

const TaskList = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const [cardModalVisible, setCardModalVisible] = useState(false);
    const [notificationsModalVisible, setNotificationsModalVisible] = useState(false);
    const { user } = props;
    const [groups, setGroups] = useState('');
    const [cards, setCards] = useState('');
    const [shiftedCards, setShiftedCards] = useState('');
    const [expiredCards, setExpiredCards] = useState('');
    const [invitations, setInvitations] = useState('');
    const [finishedCards, setFinishedCards] = useState('');
    const [unfinishedCards, setUnfinishedCards] = useState('');
    const [selectedCardGroup, setSelectedCardGroup] = useState('');
    const [selectedCard, setSelectedCard] = useState('');
    const [codeNumber, setCodeNumber] = useState('');
    const [cardComments, setCardComments] = useState('');
    const [groupUsers, setUsers] = useState('');
    const [cardImages, setCardImages] = useState('');
    const [cardCustomDescription, setCardCustomDescription] = useState(null);
    const [updatedCardCustomDescription, setUpdatedCardCustomDescription] = useState(null);
    const [updatedComment, setUpdatedComment] = useState('');
    const [updatedCommentId, setUpdatedCommentId] = useState('');
    const [cardImageGallery, setCardImageGallery] = useState('');
    const [notificationErrors, setNotificationErrors] = useState('');
    const [comment, setComment] = useState('');
    const [mode, setMode] = useState('');
    const [shiftCardDialog, setShiftCardDialog] = useState(false);
    const [notificationDialog, setNotificationDialog] = useState(false);
    const [userCanShiftCard, setUserCanShiftCard] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [isCreator, setIsCreator] = useState(false);
    const [selectedStar, setSelectedStar] = useState(-1);
    const [userStars, setUserStars] = useState(Array(groupUsers.length).fill(-1));
    const [isLoading, setIsLoading] = useState(false);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [numberReviews, setNumberReviews] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [totalUsersVotedToStart, setTotalUsersVotedToStart] = useState(0);
    const [totalUsersVotedToFinish, setTotalUsersVotedToFinish] = useState(0);
    const [userHasVotedToStart, setUserHasVotedToStart] = useState(false);
    const [userHasFinished, setUserHasFinished] = useState(false);
    const scrollOffsetY = useRef(0);
    const scrollDirection = useRef('');
    const [loader, setLoader] = useState(false);
    const stLoader = styleloader;
    const styles = taskListComponentStyles;
    let content;

    const handleOpenShiftCardDialog = () => {
        setShiftCardDialog(true);
    };

    const handleCloseShiftCardDialog = () => {
        setShiftCardDialog(false);
    };

    const handleOpenNotificationDialog = () => {
        setNotificationDialog(true);
    };

    const handleCloseNotificationDialog = () => {
        setNotificationDialog(false);
    };

    const handleSelectOption = (option) => {
        shiftCard(selectedCard, selectedCardGroup, option);
        handleCloseShiftCardDialog();
    };

    const handleSelectNotificationOption = (card, option) => {
        finishCard(card.id, card.group.id, option)
        handleCloseNotificationDialog();
    };

    const fetchData = async () => {
        const fetchedGroups = await getUserGroups(user.id);
        await getInvitationsToGroups(user.id);
        if (fetchedGroups) {
            const idGroups = fetchedGroups.map(obj => obj.id);
            await getGroupCards(idGroups);
            await getShiftedGroupCards(idGroups);
            await getExpiredGroupCards(idGroups);
            await getFinishedGroupCards(idGroups);
            await getUnfinishedGroupCards(idGroups);
            cards.forEach(element => {
                generateTargetDate(element);
            });
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchData();
        setTimeout(() => {
            setLoader(true);
        }, 2000);
    }, []);

    const handleScroll = (event) => {
        const { contentOffset } = event.nativeEvent;

        if (contentOffset.y < scrollOffsetY.current) {
            scrollDirection.current = 'up';
        } else if (contentOffset.y > scrollOffsetY.current) {
            scrollDirection.current = 'down';
        }

        scrollOffsetY.current = contentOffset.y;

        if (scrollOffsetY.current <= 0 && scrollDirection.current === 'down') {
            setRefreshing(true);
        } else {
            setRefreshing(false);
        }
    };


    const closeCardModal = () => {
        setCardModalVisible(false);
    }

    const closeNotificationsModal = () => {
        setNotificationsModalVisible(false);
    }

    const openNotificationsModalVisible = () => {
        setNotificationsModalVisible(true);
    }

    const openCardModal = async (card, isFinished = false) => {
        setIsFinished(isFinished);
        setUserCanShiftCard(user.id == card.group.creator_id);
        setSelectedCardGroup(card.group);
        getCardById(card.id);
        getCardCustomDescription(card.id, card.group.id);
        setIsCreator(user.id == card.group.creator_id)
        getCardComments(card.id, card.group.id);
        getCardImages(card.id, card.group.id);
        getCardReview(card.id, card.group.id);
        getGroupUsers(card.group.id);
        getDefiUsers(card.id, card.group.id);
        let reviews = await getUserGroupReview(card.group.id);
        setUserStars(Array(groupUsers.length).fill(-1));
        const averageReviews = [];
        groupUsers.forEach(element => {
            const filteredData = reviews.filter(item => item.partner_id === element.id);

            if (filteredData.length > 0) {
                const totalReviews = filteredData.reduce((sum, item) => sum + item.review, 0);
                const averageReview = totalReviews / filteredData.length;
                const hasVoted = filteredData.some(item => item.user_id === user.id);
                if (hasVoted) {
                    averageReviews.push(averageReview - 1);
                } else {
                    averageReviews.push(-1);
                }
            } else {
                averageReviews.push(-1);
            }
        });

        setUserStars(averageReviews);
        setCardModalVisible(true);
    }

    const handleSelectedGroup = (navigationGroupId) => {
        console.log(navigationGroupId)
    }

    const handleCommentChange = (text) => {
        setComment(text);
    }

    const handleUpdatedCommentChange = (text) => {
        setUpdatedComment(text);
    }

    const handleDeleteComment = (cardId, comment) => {
        return Alert.alert(
            "Etes vous sur(e) ?",
            `Etes vous sur(e) que vous voulez supprimer ce commentaire ?`,
            [
                {
                    text: "Non",
                },
                {
                    text: "Oui",
                    onPress: () => {
                        deleteComment(comment.id);
                    },
                },
            ]
        );
    }

    const handleEditComment = (cardComment) => {
        setMode('edit');
        setUpdatedComment(cardComment.body);
        setUpdatedCommentId(cardComment.id);
    }

    const createImage = async (cardId, source) => {
        setMode('add');
        let result;

        if (source === 'gallery') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Autorisation de la galerie AGAFUN',
                    message: "AGAFUN a besoin d'accéder à votre galerie",
                    buttonNegative: 'Retour',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 0.8,
                });
            } else {
                return;
            }
        } else if (source === 'camera') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Autorisation de la camera AGAFUN',
                    message: "AGAFUN a besoin d'accéder à votre camera",
                    buttonNegative: 'Retour',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 0.8,
                });
            } else {
                return;
            }
        }
        let imageUri;
        if (result.uri) {
            imageUri = result.uri;
        } else if (result.assets && result.assets.length > 0) {
            imageUri = result.assets[0].uri;
        } else {
            return;
        }

        const response = await fetch(imageUri);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = reader.result;
            setCardImageGallery(base64data);
        };
        reader.readAsDataURL(blob);
    };

    // API 
    const getUserGroups = async (userId) => {
        const response = await fetch(`${apiURL}/groups/users/${userId}`,
            {
                method: "GET",
            });

        const data = await response.json();
        setGroups(data);
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

    const getExpiredGroupCards = async (idGroups) => {
        const response = await fetch(`${apiURL}/expiredGroupCards/${idGroups}`,
            {
                method: "GET",
            });

        const data = await response.json();
        setExpiredCards(data);
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

    const verifyUserGroup = async (number, user, groupId) => {
        const response = await fetch(`${apiURL}/groups/verifyUserGroup`,
            {
                method: "POST",
                body: JSON.stringify({ 'number': number, 'email': user.email, 'group_id': groupId, 'user_id': user.id }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        if (data.status != '200') {
            setNotificationErrors(data.message);
        } else {
            setNotificationErrors('');
            handleCloseNotificationDialog();
            onRefresh();
            setTimeout(() => {
                setRefreshing(false);
            }, 1000);
        }
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

    const getCardById = async (cardId) => {
        const response = await fetch(`${apiURL}/cards/${cardId}`,
            {
                method: "GET",
            });

        const data = await response.json();
        setSelectedCard(data);
        return data;
    }

    const getCardComments = async (cardId, groupId) => {
        const response = await fetch(`${apiURL}/comments/${cardId}/${groupId}`,
            {
                method: "GET",
            });

        const data = await response.json();
        setCardComments(data);
        return data;
    }

    const getCardImages = async (cardId, groupId) => {
        const response = await fetch(`${apiURL}/images/${cardId}/${groupId}`,
            {
                method: "GET",
            });

        const data = await response.json();
        setCardImages(data);
        return data;
    }

    const createComment = async (cardId, groupId, userId, comment) => {
        const response = await fetch(`${apiURL}/comments/${cardId}/${groupId}`,
            {
                method: "POST",
                body: JSON.stringify({ 'comment': comment, 'user_id': userId }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        getCardComments(cardId, groupId);
        setComment('');
    }

    const deleteComment = async (commentId) => {
        const response = await fetch(`${apiURL}/comments/${commentId}`,
            {
                method: "DELETE",
            });
        const data = await response.json();
        await getCardComments(selectedCard.id, selectedCardGroup.id);
    }

    const saveImage = async (cardId, groupId) => {
        setIsLoading(true);
        const response = await fetch(`${apiURL}/images/${cardId}/${groupId}`,
            {
                method: "POST",
                body: JSON.stringify({ 'image': cardImageGallery, 'userId': user.id }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        if (data) {
            setIsLoading(false);
            getCardImages(cardId, groupId);
            setCardImageGallery('');
        }
    }

    const editComment = async (cardId, groupId, updatedCommentId, comment) => {
        const response = await fetch(`${apiURL}/comments/${updatedCommentId}`,
            {
                method: "PATCH",
                body: JSON.stringify({ 'comment': comment }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        getCardComments(cardId, groupId);
        setUpdatedComment('');
        setMode('');
    }

    const getCardCustomDescription = async (cardId, groupId) => {
        const response = await fetch(`${apiURL}/cards/customDescription/${cardId}/${groupId}`,
            {
                method: "GET",
            });

        const data = await response.json();
        setCardCustomDescription(data);
    }

    const updateCardCustomDescription = async (custom_description, cardId, groupId) => {
        const response = await fetch(`${apiURL}/cards/customDescription/${cardId}/${groupId}`,
            {
                method: "PATCH",
                body: JSON.stringify({ 'custom_description': custom_description }),
                headers: { 'Content-Type': 'Application/json' }
            });

        getCardCustomDescription(cardId, groupId);
        setDialogVisible(false);
    }

    const shiftCard = async (card, group, days) => {
        const response = await fetch(`${apiURL}/cards/${card.id}/shift`,
            {
                method: "PATCH",
                body: JSON.stringify({ 'days': days, 'group_id': group.id, }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        if (data) {
            const fetchedGroups = await getUserGroups(user.id);
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
                closeCardModal();
            }
        }
    }

    const finishCard = async (cardId, groupId, state) => {
        const response = await fetch(`${apiURL}/cards/${cardId}/finish`,
            {
                method: "PATCH",
                body: JSON.stringify({ 'state': state, 'group_id': groupId, }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        if (data) {
            const fetchedGroups = await getUserGroups(user.id);
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
                closeNotificationsModal();
            }
        }
    }

    const expireCard = async (card, groupId) => {
        const response = await fetch(`${apiURL}/cards/${card.id}/expire`,
            {
                method: "PATCH",
                body: JSON.stringify({ 'group_id': groupId }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        if (data) {
            const fetchedGroups = await getUserGroups(user.id);
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
                closeCardModal();
            }
        }
    }

    const generateTargetDate = (card) => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed).toISOString().split('.')[0];
        const expiryDate = new Date(card.countdown.split('.')[0]);
        const differenceInSeconds = (expiryDate.getTime() - new Date(today).getTime()) / 1000 - 3600;

        if (differenceInSeconds <= 0 && card.type != 1) {
            expireCard(card, card.group.id);
        }

        if (differenceInSeconds <= -172800 && card.type == 1) {
            finishCard(card.id, card.group.id, 60)
        }

        return expiryDate;
    }

    const showExpireCard = (card, group) => {
        return Alert.alert(
            "Etes vous sur(e) ?",
            `Etes vous sur(e) que vous voulez achever cette card ?`,
            [
                {
                    text: "Non",
                },
                {
                    text: "Oui",
                    onPress: () => {
                        expireCard(card, group.id);
                    },
                },
            ]
        );
    }

    const sendUserReview = async (userId, cardId, groupId, review) => {
        const response = await fetch(`${apiURL}/reviews/${cardId}/${groupId}`,
            {
                method: "POST",
                body: JSON.stringify({ 'review': review, 'user_id': userId }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        if (data) {
            getCardReview(cardId, groupId);
        }
    }

    const getUserGroupReview = async (groupId) => {
        const response = await fetch(`${apiURL}/users/getReviews/${groupId}`,
            {
                method: "GET",
            });

        const reviews = await response.json();
        if (reviews) {
            return (reviews);
        }
    }

    const sendUserGroupReview = async (userId, partnerId, groupId, review) => {
        const response = await fetch(`${apiURL}/users/${partnerId}/${groupId}`,
            {
                method: "POST",
                body: JSON.stringify({ 'review': review, 'user_id': userId }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        if (data) {
            let finalReviews = [];
            for (let i = 0; i < groupUsers.length; i++) {
                const partner = groupUsers[i];
                const userReviews = await getUserGroupReview(selectedCardGroup.id);
                const hasVoted = userReviews.filter(obj => obj.user_id === user.id).length > 0;
                let totalReviews = 0;
                for (let i = 0; i < userReviews.length; i++) {
                    const element = userReviews[i].review;
                    totalReviews += element;
                }
                if (hasVoted || totalReviews == 0) {
                    finalReviews.push(totalReviews - 1);
                }
            }
        }
    }

    const getCardReview = async (cardId, groupId) => {
        const response = await fetch(`${apiURL}/reviews/${cardId}/${groupId}`,
            {
                method: "GET",
            });

        const reviews = await response.json();
        const hasVoted = reviews.filter(obj => obj.user_id === user.id).length > 0;
        let totalReviews = 0;
        for (let i = 0; i < reviews.length; i++) {
            const element = reviews[i].review;
            totalReviews += element;
        }
        if (hasVoted) {
            setSelectedStar(Math.floor(totalReviews / reviews.length) - 1);
            setNumberReviews(reviews.length);
        } else {
            setSelectedStar(-1);
        }
    }

    const getGroupUsers = async (groupId) => {
        const response = await fetch(`${apiURL}/users/groups/${groupId}`,
            {
                method: "GET",
            });

        const data = await response.json();
        setUsers(data);
    }

    const updateUserVote = (index, star) => {
        const newUserStars = [...userStars];
        newUserStars[index] = star;
        setUserStars(newUserStars);
        sendUserGroupReview(user.id, groupUsers[index].id, selectedCardGroup.id, star + 1);
    };

    const startDefi = async (card_id, group_id, user_id) => {
        const response = await fetch(`${apiURL}/defis`,
            {
                method: "POST",
                body: JSON.stringify({ 'user_id': user_id, 'card_id': card_id, 'group_id': group_id }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        if (data) {
            getDefiUsers(card_id, group_id);
        }
    };

    const getDefiUsers = async (card_id, group_id) => {
        const response = await fetch(`${apiURL}/defis/${card_id}/${group_id}`,
            {
                method: "GET",
            });

        const data = await response.json();
        if (data) {
            const filteredData = data.filter(item => item.user_id === user.id);
            const finishedUsers = data.filter(item => item.has_finished === 1);

            if (filteredData.length > 0) {
                setUserHasVotedToStart(true);
                if (filteredData[0].has_finished) {
                    setUserHasFinished(true);
                } else {
                    setUserHasFinished(false);
                }
            } else {
                setUserHasVotedToStart(false);
            }
            setTotalUsersVotedToStart(data.length);
            setTotalUsersVotedToFinish(finishedUsers.length);
        }
    };

    const finishDefi = async (card_id, group_id) => {
        const response = await fetch(`${apiURL}/defis/${card_id}/${group_id}`,
            {
                method: "PATCH",
                body: JSON.stringify({ 'user_id': user.id }),
                headers: { 'Content-Type': 'Application/json' }
            });

        const data = await response.json();
        if (data) {
            if (groupUsers.length == totalUsersVotedToFinish + 1) {
                finishCard(card_id, group_id, 50);
                closeCardModal();
            }
            await getDefiUsers(card_id, group_id);
        }
    };

    // Render 
    const renderGroup = ({ item }) => (
        <TouchableOpacity style={styles.taskContainer} onPress={() => { handleSelectedGroup(item.id) }}>
            <View>
                <Text style={styles.taskTitle}>{item.name}</Text>
                <Text style={styles.taskDescription}>{item.description}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                {Array.isArray(item.tags) ? item.tags.map((tag, index) => (
                    <Text style={styles.tag} key={index} >{tag.name}</Text>
                )) : null}
            </View>
        </TouchableOpacity>
    );

    const renderImage = ({ item }) => (
        <>
            <View style={{ width: '49.5%', margin: '1%', marginVertical: '0.5%', marginLeft: 0, }}>
                <Image source={{ uri: `${baseURL}/${item.image}` }} style={{ aspectRatio: 1 }} />
                <View style={{ position: 'absolute', bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", padding: 5, width: '100%' }}>
                    <Text style={[styles.taskDescription]}>{item.user.first_name} {item.user.last_name}, le {item.created_at.split(':')[0].split('T')[0]} </Text>
                </View>
            </View>
        </>
    );

    const renderCard = ({ item }) => (
        <TouchableOpacity style={{ width: '100%', marginBottom: 10, borderRadius: 10, marginRight: 'auto', padding: 10 }} onPress={() => { openCardModal(item) }} onLongPress={() => { if (user.id === item.group.creator_id) { showExpireCard(item, item.group) } }} >
            <ImageBackground source={{ uri: `${baseURL}/${item.image}` }} resizeMode="cover" imageStyle={{ borderColor: Colors.black, borderRadius: 10 }} >
                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: item.type == 1 ? '#00008B77' : '#8b000077', borderWidth: 1, borderColor: Colors.black, borderRadius: 10 }}>
                    <View>
                        <Text style={[styles.taskTitle, { fontSize: 22 }]}>{item.title}</Text>
                        <Text style={[styles.taskDescription, { fontSize: 15, paddingRight: 30, minHeight: 175 }]}>{item.description}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', position: 'absolute', top: 0, left: 0 }}>
                        {Array.isArray(item.tags) ? item.tags.map((tag, index) => (
                            <Text style={[styles.tag, { fontSize: 12 }]} key={tag.id}>{tag.name}</Text>
                        )) : null}
                    </View>
                    <View style={{ flexDirection: 'row', position: 'absolute', top: 0, right: 0 }}>
                        {item.type == 1 && (
                            <Text style={[styles.tag, { fontSize: 12, backgroundColor: 'transparent', color: 'white', textAlign: 'right' }]}>Action</Text>
                        )}
                        {item.type == 1 && (
                            <Text style={[styles.tag, { fontSize: 12, backgroundColor: 'transparent', color: 'white', textAlign: 'right' }]}>Défi</Text>
                        )}
                        {item.type == 2 && (
                            <Text style={[styles.tag, { fontSize: 12, backgroundColor: 'transparent', color: 'white', textAlign: 'right' }]}>Vérité</Text>
                        )}
                    </View>
                    <View style={{ width: '15%', height: '100%', position: 'absolute', bottom: 0, right: 0 }}>
                        <Countdown targetDate={new Date(item.countdown.split('.')[0])} shifted={false} />
                    </View>
                    <View style={{ width: '45%', position: 'absolute', bottom: 0, left: 0 }}>
                        {Array.isArray(item.group) ? item.group.map((group, index) => (
                            <Text style={styles.group} key={group.id}>{group.name}</Text>
                        )) :
                            <Text style={styles.group} key={item.id}>{item.group.name}</Text>
                        }
                    </View>
                </View>
            </ImageBackground >
        </TouchableOpacity >
    );

    const renderShiftedCard = ({ item }) => (
        <TouchableOpacity style={{ width: '100%', marginBottom: 10, borderRadius: 10, marginRight: 'auto', padding: 10 }}>
            <ImageBackground source={{ uri: `${baseURL}/${item.image}` }} resizeMode="cover" imageStyle={{ borderColor: Colors.black, borderRadius: 10 }} >
                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: item.type == 1 ? '#00008B77' : '#8b000077', borderWidth: 1, borderColor: Colors.black, borderRadius: 10 }}>
                    <View>
                        <Text style={[styles.taskTitle, { fontSize: 22 }]}>{item.title}</Text>
                        <Text style={[styles.taskDescription, { fontSize: 15, paddingRight: 30, minHeight: 175 }]}>{item.description}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', position: 'absolute', top: 0, left: 0 }}>
                        {Array.isArray(item.tags) ? item.tags.map((tag, index) => (
                            <Text style={[styles.tag, { fontSize: 12 }]} key={index}>{tag.name}</Text>
                        )) : null}
                    </View>
                    <View style={{ width: '45%', position: 'absolute', bottom: 0, left: 0 }}>
                        {Array.isArray(item.group) ? item.group.map((group, index) => (
                            <Text style={styles.group} key={index}>{group.name}</Text>
                        )) :
                            <Text style={styles.group} key={item.id}>{item.group.name}</Text>
                        }
                    </View>
                </View>
            </ImageBackground >
        </TouchableOpacity>
    );

    const renderFinishedCard = ({ item }) => (
        <TouchableOpacity style={{ width: '50%', marginBottom: 10, borderRadius: 10, marginRight: 'auto', padding: 10 }} onPress={() => { openCardModal(item, true) }}>
            <ImageBackground source={{ uri: `${baseURL}/${item.image}` }} resizeMode="cover" imageStyle={{ borderColor: Colors.black, borderRadius: 10 }} >
                <View style={{ padding: 20, backgroundColor: item.type == 1 ? '#00008B77' : '#8b000077', borderWidth: 1, borderColor: Colors.black, borderRadius: 10 }}>
                    <View>
                        <Text style={styles.taskTitle}>{item.title}</Text>
                        <Text style={[styles.taskDescription, { height: 75 }]}>{item.description.split(' ').slice(0, 10).join(' ')} ...</Text>
                    </View>
                    <View style={{ flexDirection: 'row', position: 'absolute', top: 0, left: 0 }}>
                        {Array.isArray(item.tags) ? item.tags.map((tag, index) => (
                            <Text style={[styles.tag, { fontSize: 12 }]} key={index}>{tag.name}</Text>
                        )) : null}
                    </View>
                    <View style={{ width: '100%', position: 'absolute', bottom: 0, left: 0 }}>
                        {Array.isArray(item.group) ? item.group.map((group, index) => (
                            <Text style={styles.group} key={index}>{group.name}</Text>
                        )) :
                            <Text style={styles.group} key={item.id}>{item.group.name}</Text>
                        }
                    </View>
                </View>
            </ImageBackground >
        </TouchableOpacity >
    );

    const renderUnfinishedCard = ({ item }) => (
        <TouchableOpacity style={{ width: '50%', marginBottom: 10, borderRadius: 10, marginRight: 'auto', padding: 10 }} onPress={() => { openCardModal(item, true) }}>
            <ImageBackground source={{ uri: `${baseURL}/${item.image}` }} resizeMode="cover" imageStyle={{ borderColor: Colors.black, borderRadius: 10 }} >
                <View style={{ padding: 20, backgroundColor: item.type == 1 ? '#00008B77' : '#8b000077', borderWidth: 1, borderColor: Colors.black, borderRadius: 10 }}>
                    <View>
                        <Text style={styles.taskTitle}>{item.title}</Text>
                        <Text style={[styles.taskDescription, { height: 75 }]}>{item.description.split(' ').slice(0, 10).join(' ')} ...</Text>
                    </View>
                    <View style={{ flexDirection: 'row', position: 'absolute', top: 0, left: 0 }}>
                        {Array.isArray(item.tags) ? item.tags.map((tag, index) => (
                            <Text style={[styles.tag, { fontSize: 12 }]} key={index}>{tag.name}</Text>
                        )) : null}
                    </View>
                    <View style={{ width: '100%', position: 'absolute', bottom: 0, left: 0 }}>
                        {Array.isArray(item.group) ? item.group.map((group, index) => (
                            <Text style={styles.group} key={index}>{group.name}</Text>
                        )) :
                            <Text style={styles.group} key={item.id}>{item.group.name}</Text>
                        }
                    </View>
                </View>
            </ImageBackground >
        </TouchableOpacity >
    );
    if (!loader) {
        content =
            <View style={stLoader.lottie}>
                <ActivityIndicator color={Colors.light} size="large" />
            </View>
    } else {
        content =
            <View style={styles.container}>
                <View>
                    <ScrollView
                        contentContainerStyle={{ flex: 1 }}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                        {/* Notifications Modal */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={notificationsModalVisible}
                            onRequestClose={closeNotificationsModal}>
                            <View style={{ alignItems: "flex-end", backgroundColor: '#000000aa', height: '100%' }}>
                                <View style={{ backgroundColor: Colors.background, width: '75%', paddingHorizontal: '10%', height: '100%' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => { setNotificationsModalVisible(false) }}
                                            activeOpacity={0.7} style={{ margin: 20, marginLeft: 0, paddingTop: 15 }}>
                                            <MaterialIcons
                                                name="arrow-back"
                                                color='white'
                                                size={32}
                                            />
                                        </TouchableOpacity>
                                        <Text style={[styles.title, { paddingTop: 20 }]}>Notifications</Text>
                                    </View>
                                    <ScrollView style={{ flexGrow: 0 }}>
                                        <View >
                                            <View style={{ marginVertical: '15%' }}>
                                                <Text style={styles.taskTitle}>Cards</Text>
                                            </View>
                                            {Array.isArray(expiredCards) ? expiredCards.map((card, index) => (
                                                <>
                                                    {user.id == card.group.creator_id && (
                                                        <TouchableOpacity onPress={() => { handleOpenNotificationDialog() }} key={index}>
                                                            <View style={[styles.taskContainer, { width: '100%', backgroundColor: Colors.dark }]}>
                                                                <Text style={styles.taskTitle}>{card.title}</Text>
                                                                <Text style={styles.taskDescription}>{card.group.name}</Text>
                                                            </View>
                                                            <Dialog.Container visible={notificationDialog}>
                                                                <Dialog.Title>{card.title}</Dialog.Title>
                                                                <Dialog.Description>Le countdown de la card est épuisé, la card est achevée ou pas ?</Dialog.Description>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                                    <Dialog.Button color="blue" label="Oui" onPress={() => handleSelectNotificationOption(card, '50')} />
                                                                    <Dialog.Button color="blue" label="Non" onPress={() => handleSelectNotificationOption(card, '60')} />
                                                                    <Dialog.Button color="white" backgroundColor="red" label="Annuler" onPress={handleCloseNotificationDialog} />
                                                                </View>
                                                            </Dialog.Container>
                                                        </TouchableOpacity>
                                                    )}
                                                </>
                                            )) : null}
                                            <View style={{ marginVertical: '15%' }}>
                                                <Text style={styles.taskTitle}>Invitations aux groupes</Text>
                                            </View>
                                            {Array.isArray(invitations) ? invitations.map((invitation, index) => (
                                                <>
                                                    <TouchableOpacity onPress={() => { handleOpenNotificationDialog() }} key={index}>
                                                        <View style={[styles.taskContainer, { width: '100%', backgroundColor: Colors.dark }]}>
                                                            <Text style={styles.taskTitle}>Vous êtes invités à :</Text>
                                                            <Text style={styles.taskDescription}>{invitation.group.name}</Text>
                                                        </View>
                                                        <Dialog.Container visible={notificationDialog}>
                                                            <Dialog.Title>Inserer le code de validation</Dialog.Title>
                                                            {notificationErrors && (
                                                                <View style={styles.error}>
                                                                    <Text style={[styles.errorText, { fontSize: 12 }]}>{notificationErrors}</Text>
                                                                </View>
                                                            )}
                                                            <Dialog.Input placeholder="123456" value={codeNumber} onChangeText={(text) => setCodeNumber(text)} />
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                                <Dialog.Button color="blue" label="Envoyer" onPress={() => verifyUserGroup(codeNumber, user, invitation.group.id)} />
                                                                <Dialog.Button color="white" backgroundColor="red" label="Annuler" onPress={handleCloseNotificationDialog} />
                                                            </View>
                                                        </Dialog.Container>
                                                    </TouchableOpacity>
                                                </>
                                            )) : null}
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>

                        {/* Card Modal */}
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={cardModalVisible}
                            onRequestClose={closeCardModal}>
                            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: '#000000aa', height: '100%' }}>
                                <View style={{ backgroundColor: Colors.dark, borderRadius: 8, width: '100%', paddingHorizontal: '10%', height: '100%' }}>
                                    <ScrollView style={{ flexGrow: 0 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: '15%' }}>
                                            {Array.isArray(selectedCard.tags) ? selectedCard.tags.map((tag, index) => (
                                                <Text style={[styles.tag, { fontSize: 12 }]} key={index}>{tag.name}</Text>
                                            )) : null}
                                            <View style={{ width: '50%' }}>
                                                {Array.isArray(selectedCardGroup) ? selectedCardGroup.map((group, index) => (
                                                    <Text style={styles.group} key={index}>{group.name}</Text>
                                                )) :
                                                    <Text style={styles.group} key={selectedCardGroup.id}>{selectedCardGroup.name}</Text>
                                                }
                                            </View>
                                            {userCanShiftCard && !selectedCard.shifted && !isFinished && (<>
                                                <TouchableOpacity onPress={() => { handleOpenShiftCardDialog(selectedCard) }} style={[styles.button, { backgroundColor: Colors.warning, borderRadius: 50, aspectRatio: 1, height: 30, alignItems: 'center', justifyContent: 'center' }]}>
                                                    <Icon name='edit' size={20} color={'white'} />
                                                </TouchableOpacity>
                                                <Dialog.Container visible={shiftCardDialog}>
                                                    <Dialog.Title>Decaler la card {selectedCard.title}</Dialog.Title>
                                                    <Dialog.Description>Voudriez vous decaler cette card par ces durées données :</Dialog.Description>
                                                    <Dialog.Button color="blue" label="7 jours" onPress={() => handleSelectOption('7')} />
                                                    <Dialog.Button color="blue" label="30 jours" onPress={() => handleSelectOption('30')} />
                                                    <Dialog.Button color="blue" label="90 jours" onPress={() => handleSelectOption('90')} />
                                                    <Dialog.Button color="white" backgroundColor="red" label="Annuler" onPress={handleCloseShiftCardDialog} />
                                                </Dialog.Container>
                                            </>)}

                                            {totalUsersVotedToStart <= groupUsers.length && !selectedCard.shifted && !isFinished && selectedCard.type == 1 && (<>
                                                {
                                                    !userHasVotedToStart ? (
                                                        <TouchableOpacity onPress={() => { startDefi(selectedCard.id, selectedCardGroup.id, user.id) }} style={[styles.button, { backgroundColor: Colors.success, borderRadius: 50, aspectRatio: 1, height: 30, alignItems: 'center', justifyContent: 'center' }]}>
                                                            <Icon name='check' size={20} color={'white'} />
                                                        </TouchableOpacity>

                                                    ) : (
                                                        <>
                                                            {!userHasFinished && (
                                                                <TouchableOpacity onPress={() => finishDefi(selectedCard.id, selectedCardGroup.id)} style={[styles.button, { backgroundColor: Colors.info, borderRadius: 50, aspectRatio: 1, height: 30, alignItems: 'center', justifyContent: 'center' }]}>
                                                                    <Icon name='forward' size={20} color={'white'} />
                                                                </TouchableOpacity>
                                                            )}
                                                            <Text style={[styles.taskTitle, { fontSize: 12, textAlign: 'center' }]}>{totalUsersVotedToFinish} / {groupUsers.length}</Text>
                                                        </>
                                                    )}
                                            </>)}
                                        </View>

                                        <Text style={[styles.taskDescription, { position: 'absolute', top: '0%', right: 0, color: Colors.danger }]}>{selectedCard.duration} jours</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ width: '75%' }}>
                                                <Text style={[styles.taskTitle, { fontSize: 25, textAlign: 'center' }]}>{selectedCard.title}</Text>
                                            </View>
                                            <View style={{ width: '25%' }}>
                                                <ImageBackground source={{ uri: `${baseURL}/${selectedCard.image}` }} resizeMode="cover" imageStyle={{ borderColor: Colors.black, borderRadius: 10 }} >
                                                    <View style={{ height: 75, borderRadius: 10 }}>
                                                    </View>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                        <View style={{ width: '100%' }}>
                                            <Text style={[styles.taskDescription, { fontSize: 14, marginVertical: 7 }]}>{selectedCard.description}</Text>
                                            {cardCustomDescription?.custom_description ? (
                                                <>
                                                    <Text style={[styles.taskDescription, { fontWeight: 'bold', fontSize: 14, marginVertical: 7 }]}>Custom Description :</Text>
                                                    <TouchableOpacity onPress={() => { setUpdatedCardCustomDescription(cardCustomDescription?.custom_description); setDialogVisible(true) }}>
                                                        <Text style={[styles.taskDescription, { fontSize: 14 }]}>{cardCustomDescription?.custom_description}</Text>
                                                    </TouchableOpacity>
                                                    {isCreator && (
                                                        <DialogInput
                                                            isDialogVisible={dialogVisible}
                                                            title={"Modifier"}
                                                            initValueTextInput={updatedCardCustomDescription}
                                                            submitInput={(inputText) => { updateCardCustomDescription(inputText, cardCustomDescription?.card_id, cardCustomDescription?.group_id) }}
                                                            closeDialog={() => setDialogVisible(false)}>
                                                        </DialogInput>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {isCreator && !isFinished && (<>
                                                        <TouchableOpacity onPress={() => { setDialogVisible(true) }} style={[styles.button, { backgroundColor: Colors.success, borderRadius: 50, aspectRatio: 1, height: 30, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 10 }]}>
                                                            <Icon name='add' size={15} color={Colors.white} />
                                                        </TouchableOpacity>
                                                        <DialogInput
                                                            isDialogVisible={dialogVisible}
                                                            title={"Ajouter"}
                                                            hintInput={"commentaire customisé"}
                                                            submitInput={(inputText) => { updateCardCustomDescription(inputText, cardCustomDescription?.card_id, cardCustomDescription?.group_id) }}
                                                            closeDialog={() => setDialogVisible(false)}>
                                                        </DialogInput>
                                                    </>
                                                    )}
                                                </>

                                            )}

                                        </View>
                                        <View>
                                            <Text style={[styles.taskDescription, { fontWeight: 'bold', marginVertical: 7 }]}>Activités:</Text>
                                            {mode != 'edit' && !isFinished && (
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ width: '90%' }}>

                                                        <TextInput
                                                            style={[styles.input, { borderRadius: 0, paddingRight: 5, letterSpacing: 0 }]}
                                                            placeholderTextColor={Colors.secondary}
                                                            value={comment}
                                                            onChangeText={handleCommentChange}
                                                            placeholder="Ajouter Commentaire ..." />
                                                    </View>
                                                    <View style={{ width: '10%', position: 'absolute', backgroundColor: Colors.google, borderRadius: 10, right: 5, top: '19%', alignItems: 'center' }}>
                                                        <TouchableOpacity onPress={() => { createComment(selectedCard.id, selectedCardGroup.id, user.id, comment) }}>
                                                            <Icon name='chevron-right' size={30} color={Colors.dark} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )}
                                            {Array.isArray(cardComments) ? cardComments.map((cardComment, index) => (
                                                <View style={{ paddingVertical: 5 }} key={index}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={[styles.taskDescription, { fontWeight: 'bold', fontSize: 14 }]}>{cardComment.user.first_name} {cardComment.user.last_name} </Text>
                                                        <Text style={[styles.taskDescription, { fontWeight: 'bold', fontSize: 14, paddingHorizontal: 5 }]}>-</Text>
                                                        <Text style={[styles.taskDescription, { fontWeight: 'bold', fontSize: 14, paddingHorizontal: 5 }]}> {cardComment.created_at.split('T')[0]} &#9679; {cardComment.created_at.split('T')[1].split(':')[0]}:{cardComment.created_at.split('T')[1].split(':')[1]}</Text>
                                                    </View>
                                                    <View>
                                                        {user.id == cardComment.user_id && mode == 'edit' ? (
                                                            <>
                                                                <View style={{ width: '90%' }}>
                                                                    <TextInput
                                                                        style={[styles.input, { borderRadius: 0, paddingRight: 5, letterSpacing: 0, backgroundColor: Colors.secondary }]}
                                                                        placeholderTextColor={Colors.secondary}
                                                                        value={updatedComment}
                                                                        onChangeText={handleUpdatedCommentChange} />
                                                                </View>
                                                                <View style={{ width: '10%', position: 'absolute', backgroundColor: Colors.facebook, borderRadius: 10, right: 5, top: '19%', alignItems: 'center' }}>
                                                                    <TouchableOpacity onPress={() => { editComment(selectedCard.id, selectedCardGroup.id, updatedCommentId, updatedComment) }}>
                                                                        <Icon name='chevron-right' size={30} color={Colors.dark} />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </>
                                                        ) : (
                                                            <Text style={[styles.taskDescription, { fontSize: 14, color: Colors.light }]}>{cardComment.body} </Text>
                                                        )}
                                                    </View>
                                                    {user.id == cardComment.user_id && mode != 'edit' && !isFinished && (
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <TouchableOpacity onPress={() => { handleEditComment(cardComment) }} >
                                                                <Text style={[styles.button, { fontSize: 14 }]}>Modifier</Text>
                                                            </TouchableOpacity>
                                                            <Text style={[styles.button, { fontWeight: 'bold', fontSize: 5, paddingHorizontal: 5, color: Colors.white }]}>&#9679;</Text>
                                                            <TouchableOpacity onPress={() => { handleDeleteComment(selectedCard.id, cardComment) }} >
                                                                <Text style={[styles.button, { fontSize: 14 }]}>Effacer</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )}
                                                    {user.id == cardComment.user_id && mode == 'edit' && (
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <TouchableOpacity onPress={() => { setMode('') }} >
                                                                <Text style={[styles.button, { fontSize: 14, color: Colors.facebook }]}>Annuler</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )}
                                                </View>
                                            )) : null}
                                        </View>
                                        <View>
                                            <Text style={[styles.taskDescription, { fontWeight: 'bold', marginVertical: 7 }]}>Gallérie:</Text>
                                            {mode != 'edit' && !isFinished && (
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <View style={{ backgroundColor: Colors.success, width: 30, margin: 10, height: 30, borderRadius: 50, alignSelf: 'center', justifyContent: 'center' }}>
                                                        <TouchableOpacity onPress={() => { createImage(selectedCard.id, 'gallery') }} style={[styles.button, { backgroundColor: Colors.primary, borderRadius: 50, aspectRatio: 1, height: 30, alignItems: 'center', justifyContent: 'center' }]}>
                                                            <Icon name='photo' size={20} color={'white'} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{ backgroundColor: Colors.success, width: 30, margin: 10, height: 30, borderRadius: 50, alignSelf: 'center', justifyContent: 'center' }}>
                                                        <TouchableOpacity onPress={() => { createImage(selectedCard.id, 'camera') }} style={[styles.button, { backgroundColor: Colors.secondary, borderRadius: 50, aspectRatio: 1, height: 30, alignItems: 'center', justifyContent: 'center' }]}>
                                                            <Icon name='photo-camera' size={20} color={'white'} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )}
                                            {mode == 'add' && (
                                                <View style={{ marginTop: 10, alignSelf: 'center' }}>
                                                    {cardImageGallery && (
                                                        <>
                                                            <Image source={{ uri: cardImageGallery }} style={{ width: 100, height: 100, borderRadius: 100 / 5 }} />
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                                <View style={{ backgroundColor: Colors.primary, width: '45%', borderRadius: 10, marginVertical: 10, }}>
                                                                    <TouchableOpacity onPress={() => { saveImage(selectedCard.id, selectedCardGroup.id) }} style={[styles.button, { alignSelf: 'center', paddingVertical: 3 }]}>
                                                                        {isLoading ? (
                                                                            <ActivityIndicator color={Colors.light} />
                                                                        ) : (
                                                                            <Icon name='save' size={20} color={Colors.light} />
                                                                        )}
                                                                    </TouchableOpacity>
                                                                </View>
                                                                <View style={{ backgroundColor: Colors.danger, width: '45%', borderRadius: 10, marginVertical: 10, }}>
                                                                    <TouchableOpacity onPress={() => { setCardImageGallery('') }} style={[styles.button, { alignSelf: 'center', paddingVertical: 3 }]}>
                                                                        <Icon name='delete' size={20} color={Colors.light} />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        </>
                                                    )}
                                                </View>
                                            )}


                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                {Array.isArray(cardImages) ? cardImages.slice(0, 3).map((image, index) => (
                                                    <>
                                                        <TouchableOpacity onPress={() => setImageModalVisible(true)} key={index}>
                                                            <Image source={{ uri: `${baseURL}/${image.image}` }} style={{ width: 100, height: 100, borderRadius: 100 / 5 }} />
                                                        </TouchableOpacity>
                                                    </>
                                                )) : null}
                                            </View>

                                            <Modal visible={imageModalVisible} contentStyle={{ width: '100%', height: '100%' }}>
                                                <TouchableOpacity
                                                    onPress={() => { setImageModalVisible(false) }}
                                                    activeOpacity={0.7} style={{ marginTop: 20 }}>
                                                    <MaterialIcons
                                                        name="arrow-back"
                                                        size={32}
                                                    />
                                                </TouchableOpacity>
                                                <FlatList
                                                    data={cardImages}
                                                    renderItem={renderImage}
                                                    numColumns={2}
                                                    keyExtractor={(item) => item.id}
                                                    contentContainerStyle={styles.itemContainer}
                                                />
                                            </Modal>

                                            <Text style={[styles.taskDescription, { fontWeight: 'bold', marginVertical: 7 }]}>Noter la card:</Text>
                                            <SafeAreaView style={{ flex: 1 }}>
                                                <View style={styles.starsContainer}>
                                                    {(selectedStar == -1) ? (
                                                        <Text style={styles.heading}>Clicker pour noter</Text>
                                                    ) : (
                                                        <Text style={styles.heading}>Note finale : ({numberReviews} votes)</Text>
                                                    )}
                                                    <View>
                                                        <View style={styles.stars}>
                                                            {[0, 1, 2, 3, 4].map((index) => (
                                                                <TouchableOpacity key={index} onPress={() => { if (selectedStar == -1) { setSelectedStar(index); sendUserReview(user.id, selectedCard.id, selectedCardGroup.id, index + 1) } }} activeOpacity={0.7} >
                                                                    <MaterialIcons name="star" size={32} style={[styles.starUnselected, selectedStar >= index && styles.starSelected,]} />
                                                                </TouchableOpacity>
                                                            ))}
                                                        </View>
                                                    </View>
                                                </View>
                                            </SafeAreaView>

                                            <Text style={[styles.taskDescription, { fontWeight: 'bold', marginVertical: 7 }]}>Noter les partenaires:</Text>
                                            <View style={styles.starsContainer}>
                                                {Array.isArray(groupUsers) ? groupUsers.map((groupUser, index) => (
                                                    <>
                                                        <View style={[styles.taskContainer, { width: '100%' }]}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                <View>
                                                                    <Text style={styles.taskTitle}>{groupUser.first_name} {groupUser.last_name}</Text>
                                                                </View>
                                                                <View style={styles.stars}>
                                                                    {[0, 1, 2, 3, 4].map((starIndex) => (
                                                                        <>
                                                                            {(userStars[index] == -1) ? (
                                                                                <TouchableOpacity key={starIndex} onPress={() => { if (user.id !== groupUser.id) { updateUserVote(index, starIndex) } }} activeOpacity={0.7}>
                                                                                    <MaterialIcons name="star-border" size={20} style={[styles.starUnselected, userStars[index] >= starIndex && styles.starSelected]} />
                                                                                </TouchableOpacity>
                                                                            ) : (
                                                                                <TouchableOpacity key={starIndex} activeOpacity={0.7}>
                                                                                    <MaterialIcons name="star-border" size={20} style={[styles.starUnselected, userStars[index] >= starIndex && styles.starSelected]} />
                                                                                </TouchableOpacity>
                                                                            )}
                                                                        </>
                                                                    ))}
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </>
                                                )) : null}
                                            </View>

                                            <View style={{ backgroundColor: Colors.danger, width: '30%', borderRadius: 10, alignSelf: 'center', marginVertical: 30 }}>
                                                <TouchableOpacity onPress={closeCardModal} style={[styles.button, { alignSelf: 'center', paddingVertical: 3 }]}>
                                                    <Text style={{ color: Colors.white, textAlign: 'center', fontSize: 12 }}>Retour</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>

                        <View style={styles.section}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={styles.title}>Cards en cours</Text>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => { openNotificationsModalVisible() }} >
                                        <View>
                                            <Icon name='mode-comment' size={35} color={'white'} />
                                            {(expiredCards.length > 0 || invitations.length > 0) && (
                                                <View style={{ position: 'absolute', top: 0, left: 0, width: 15, height: 15, backgroundColor: Colors.danger, borderRadius: 50 }}>
                                                    <Text style={{ color: Colors.white, alignSelf: 'center', fontSize: 10 }}>{expiredCards.length + invitations.length}</Text>
                                                </View>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <FlatList
                                data={cards}
                                renderItem={renderCard}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={styles.itemContainer}
                            />
                        </View>
                        <View style={styles.section}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={styles.title}>Prochainement</Text>
                                </View>
                            </View>
                            <FlatList
                                data={shiftedCards}
                                renderItem={renderShiftedCard}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={styles.itemContainer}
                            />
                        </View>
                        <View style={styles.section}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={styles.title}>Achevés</Text>
                                </View>
                            </View>
                            <FlatList
                                data={finishedCards}
                                renderItem={renderFinishedCard}
                                numColumns={2}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={styles.itemContainer}
                            />
                        </View>
                        {(unfinishedCards.length > 0) && (
                            <View style={styles.section}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={styles.title}>Non achevés</Text>
                                    </View>
                                </View>
                                <FlatList
                                    data={unfinishedCards}
                                    renderItem={renderUnfinishedCard}
                                    numColumns={2}
                                    keyExtractor={(item) => item.id}
                                    contentContainerStyle={styles.itemContainer}
                                />
                            </View>)}
                        <View style={styles.section}>
                            <Text style={styles.title}>Groupes</Text>
                            <FlatList
                                data={groups}
                                renderItem={renderGroup}
                                keyExtractor={(item) => item.id}
                                numColumns={2}
                                contentContainerStyle={styles.itemContainer}
                            />
                        </View>
                    </ScrollView >
                </View >
            </View >
    }

    return (
        <>
            {content}
        </>
    );
};


export default TaskList;
