import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput } from 'react-native';
import numbersComponentStyles from '../styles/components/NumbersComponentStyles';

export default function SixNumberBoxes(props) {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [number3, setNumber3] = useState('');
    const [number4, setNumber4] = useState('');
    const [number5, setNumber5] = useState('');
    const [number6, setNumber6] = useState('');

    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    const input5Ref = useRef(null);
    const input6Ref = useRef(null);

    useEffect(() => {
        const code = `${number1}${number2}${number3}${number4}${number5}${number6}`;
        props.onCodeInput(code);
        if (number6) {
            input6Ref.current.blur();
        }
    }, [number1, number2, number3, number4, number5, number6]);

    const handleCodeInputChange = (index, value) => {
        switch (index) {
            case 1:
                setNumber1(value);
                break;
            case 2:
                setNumber2(value);
                break;
            case 3:
                setNumber3(value);
                break;
            case 4:
                setNumber4(value);
                break;
            case 5:
                setNumber5(value);
                break;
            case 6:
                setNumber6(value);
                break;
        }
        if (index === 1 && value) {
            input2Ref.current.focus();
        }
        if (index === 2 && value) {
            input3Ref.current.focus();
        }
        if (index === 3 && value) {
            input4Ref.current.focus();
        }
        if (index === 4 && value) {
            input5Ref.current.focus();
        }
        if (index === 5 && value) {
            input6Ref.current.focus();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={1}
                    value={number1}
                    onChangeText={(value) => handleCodeInputChange(1, value)}
                />
            </View>
            <View style={styles.box}>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={1}
                    value={number2}
                    ref={input2Ref}
                    onChangeText={(value) => handleCodeInputChange(2, value)}
                />
            </View>
            <View style={styles.box}>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={1}
                    value={number3}
                    ref={input3Ref}
                    onChangeText={(value) => handleCodeInputChange(3, value)}
                />
            </View>
            <View style={styles.box}>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={1}
                    value={number4}
                    ref={input4Ref}
                    onChangeText={(value) => handleCodeInputChange(4, value)}
                />
            </View>
            <View style={styles.box}>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={1}
                    value={number5}
                    ref={input5Ref}
                    onChangeText={(value) => handleCodeInputChange(5, value)}
                />
            </View>
            <View style={styles.box}>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={1}
                    value={number6}
                    onChangeText={(value) => handleCodeInputChange(6, value)}
                    ref={input6Ref}
                />
            </View>
        </View>
    );
}

const styles = numbersComponentStyles;
