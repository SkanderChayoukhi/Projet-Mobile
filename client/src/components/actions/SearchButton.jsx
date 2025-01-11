import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet } from 'react-native';
import { Colors, GlobalConstants } from '../../../app.constants';
const apiURL = GlobalConstants.apiURL;

const SearchBar = ({ onValueSelect }) => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const getGroups = async () => {
            try {
                const response = await fetch(`${apiURL}/groups`, {
                    method: "GET",
                });

                const data = await response.json();
                const groupNames = data.map(elt => elt.name);
                setGroups(groupNames);
            } catch (error) {
                // Handle error
            }
        };

        getGroups();
    }, []);

    const handleSearch = (text) => {
        setSearchText(text);
        const filteredResults = groups.filter((item) =>
            item.toLowerCase().includes(text.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    const handleSelect = (value) => {
        setSearchText(value);
        setSearchResults([]);
        // Call the callback function with the selected value
        onValueSelect(value);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={handleSearch}
                placeholderTextColor={Colors.light}
                value={searchText}
                placeholder="Rechercher ..."
            />
            <FlatList
                data={searchResults}
                renderItem={({ item }) => (
                    <Text style={styles.suggestion} onPress={() => handleSelect(item)}>
                        {item}
                    </Text>
                )}
                keyExtractor={(item) => item}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: Colors.black,
        borderWidth: 1,
        color: Colors.light,
        placeholderTextColor: Colors.light,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: Colors.dark,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    suggestion: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f2f2f2',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default SearchBar;
