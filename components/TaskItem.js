import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';


export default function TaskItem({ task, onDelete, onToggle }) {
    const viewRef = useRef(null);
    const textRef = useRef(null);

    const handleDelete = () => {
        if (viewRef.current) {
            viewRef.current.animate('lightSpeedOut', 750).then(() => {
                onDelete(task.id);
            });
        }
    };

    const handleToggle = () => {
        if (textRef.current) {
            textRef.current.animate('rubberBand', 1800);
        }
        onToggle(task.id);
    };


    return (
        <Animatable.View
            ref={viewRef}
            animation='fadeIn'
            duration={500}
            style={styles.taskContainer}
        >
            <TouchableOpacity onPress={handleToggle} style={{ flex: 1 }}>
                <Animatable.Text
                    ref={text => (textRef.current = text)}
                    style={[styles.taskText, task.completed && styles.completedText]}
                    numberOfLines={2}
                >
                    {task.text}
                </Animatable.Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
        </Animatable.View>

    );
}



const styles = StyleSheet.create({
    taskContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: 'f1f1f1',
        borderRadius: 10,
        marginVertical: 5,
    },
    taskText: {
        fontSize: 16,
        maxWidth: '70%',
        flexShrink: 1,
    },
    deleteText: {
        fontSize: 20,
        paddingLeft: 10,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
});