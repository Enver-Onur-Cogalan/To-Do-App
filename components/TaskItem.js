import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import themes from '../utils/colors';

export default function TaskItem({ task, onDelete, onToggle, theme }) {
    console.log('TASKITEM THEME:', theme);
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
    const styles = getStyles(theme);
    ;

    return (
        <Animatable.View
            ref={viewRef}
            animation={task.completed ? 'zoomIn' : 'zoomInDown'}
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
                {task.deadline && (
                    <Text style={styles.deadlineText}>⏰ {task.deadline}</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
        </Animatable.View>

    );
}



const getStyles = (theme) => StyleSheet.create({
    taskContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: theme.background,
        borderRadius: 10,
        marginVertical: 5,
    },
    taskText: {
        fontSize: 16,
        maxWidth: '70%',
        flexShrink: 1,
        color: theme.text,
    },
    deleteText: {
        fontSize: 20,
        paddingLeft: 10,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: theme.completed,
    },
    deadlineText: {
        fontSize: 12,
        color: '#ffa500',
        marginTop: 4,
    },
});