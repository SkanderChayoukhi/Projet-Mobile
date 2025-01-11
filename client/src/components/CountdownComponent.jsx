import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../app.constants';

const Countdown = ({ targetDate, shifted }) => {
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        if (!shifted) {
            const interval = setInterval(() => {
                const now = new Date();
                const distance = targetDate.getTime() - now.getTime();

                const distanceInSeconds = Math.floor(distance / 1000);

                const days = Math.floor(distanceInSeconds / (60 * 60 * 24));
                const hours = Math.floor((distanceInSeconds % (60 * 60 * 24)) / (60 * 60));
                const minutes = Math.floor((distanceInSeconds % (60 * 60)) / 60);
                const seconds = Math.floor(distanceInSeconds % 60);

                setTimeRemaining({ days, hours, minutes, seconds });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [targetDate]);

    const { days, hours, minutes, seconds } = timeRemaining;

    return (
        <View style={styles.container}>
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{days >= 0 ? days : days + 1}</Text>
                <Text style={styles.labelText}>Jrs</Text>
            </View>
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{hours >= 0 ? hours : hours + 1}</Text>
                <Text style={styles.labelText}>Hrs</Text>
            </View>
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{minutes >= 0 ? minutes : minutes + 1}</Text>
                <Text style={styles.labelText}>Min</Text>
            </View>
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{seconds >= 0 ? seconds : seconds + 1}</Text>
                <Text style={styles.labelText}>Sec</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        borderRadius: 10,
    },
    timeContainer: {
        alignItems: 'center',
        marginHorizontal: 5,
    },
    timeText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
        color: Colors.white,
    },
    labelText: {
        fontSize: 8,
        color: Colors.light,
        textTransform: 'uppercase',
    },
});

export default Countdown;
