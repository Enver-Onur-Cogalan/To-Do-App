import React, { useState } from "react";

import TaskItem from "../components/TaskItem";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState([]);

    const addTask = () => {
        if (task.trim()) {
            const newTask = {
                id: Date.now().toString(),
                text: task,
            };
            setTaskList([...taskList, newTask]);
            setTask('');
        }
    };

    const deleteTask = (id) => {
        const updatedList = taskList.filter(task => task.id !== id);
        setTaskList(updatedList);
    };

    const toggleTask = (id) => {
        const updatedList = taskList.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTaskList(updatedList);
    };

    return (
        <View style={styles.continer}>
            <Text style={styles.header}>⇢ To Do App ⇠</Text>
            <TextInput
                style={styles.input}
                placeholder="Write new task ⌚︎"
                value={task}
                onChangeText={setTask}
                keyboardType='default'
                editable={true}
            />
            <Button title="Add" onPress={addTask} />
            <FlatList
                data={taskList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TaskItem task={item} onDelete={deleteTask} onToggle={toggleTask} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    continer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        borderRadius: 5,
        alignSelf: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});