import React, { useEffect, useState } from 'react';
import { BackHandler, DrawerLayoutAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const daysOfWeek = ['Pzt', 'Sal', 'Car', 'Per', 'Cum', 'Cmt', 'Paz'];

export default function Calender({ onDateSelect, theme }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSeceltedDate] = useState(null);
    const [days, setDays] = useState([]);

    useEffect(() => {
        generateCalender(currentDate);
    }, [currentDate]);

    const generateCalender = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const paddedFirstDay = (firstDay + 6) % 7;

        const tempDays = [];
        for (let i = 0; i < paddedFirstDay; i++) {
            tempDays.push(null);
        }
        for (let i = 1; i < daysInMonth; i++) {
            tempDays.push(new Date(year, month, i));
        }
        setDays(tempDays);
    };

    const handleSelectDate = (date) => {
        setSeceltedDate(date);
        onDateSelect && onDateSelect(date);
    };

    const today = new Date();

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <TouchableOpacity
                    onPress={() =>
                        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
                    }
                >
                    <Text style={[styles.navBtn, { color: theme.text }]}>←</Text>
                </TouchableOpacity>

                <Text style={[styles.monthText, { color: theme.text }]}>
                    {currentDate.toLocaleDateString('tr-TR', {
                        month: 'long',
                        year: 'numeric',
                    })}
                </Text>

                <TouchableOpacity
                    onPress={() =>
                        setCurrentDate(
                            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
                        )
                    }
                >
                    <Text style={[styles.navBtn, { color: theme.text }]}>→</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.weekRow}>
                {daysOfWeek.map((day, idx) => (
                    <Text key={idx} style={[styles.dayLabel, { color: theme.text }]}>{day}</Text>
                ))}
            </View>

            <View style={styles.grid}>
                {days.map((day, index) => {
                    const isSelected = selectedDate?.toDateString() === day?.toDateString();
                    const isToday = day?.toDateString() === today.toDateString();

                    return (
                        <Animatable.View
                            key={index}
                            animation={isSelected ? 'jello' : undefined}
                            iterationCount='infinite'
                            duration={1500}
                            style={[
                                styles.dayBox,
                                day && isSelected && {
                                    backgroundColor: theme.accent,
                                    transform: [{ scale: 1.05 }],
                                },
                                isToday && !isSelected && {
                                    borderWidth: 2,
                                    borderColor: theme.accent,
                                },
                            ]}
                        >
                            <TouchableOpacity
                                onPress={() => day && handleSelectDate(day)}
                                disabled={!day}
                            >
                                <Text
                                    style={[
                                        {
                                            color: day ? theme.text : 'transparent',
                                            fontWeight: 'bold',
                                        },
                                        theme.name === 'cyberpunk' && isToday && !isSelected && {
                                            textShadowColor: '#39ff14',
                                            textShadowOffset: { width: 0, height: 0 },
                                            textShadowRadius: 10,
                                        },
                                        theme.name === 'cyberpunk' && isSelected && {
                                            color: '#39ff14',
                                            textShadowColor: '#39ff14',
                                            textShadowOffset: { width: 0, height: 0 },
                                            textShadowRadius: 12,
                                        },
                                    ]}
                                >
                                    {day ? day.getDate() : ''}
                                </Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    );
                })}
            </View>
            <TouchableOpacity
                onPress={() => onDateSelect(null)}
                style={styles.cancelButton}
            >
                <Text style={[styles.cancelButtonText, { color: theme.accent }]}>Cancel ✗</Text>
            </TouchableOpacity>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    monthText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    dayLabel: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayBox: {
        width: '14.28%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 2,
        borderRadius: 6,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
    },

    navBtn: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 10,
        alignSelf: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    cancelButtonText: {
        fontWeight: 'bold',
    },
});