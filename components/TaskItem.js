import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function TaskItem({ task, onDelete, onToggle }) {
    return (
        <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => onToggle(task.id)} style={{ flex: 1 }}>
                <Text style={[styles.taskText, task.completed && styles.completedText]}>
                    {task.text}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(task.id)}>
                <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
        </View>
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