import React, { useEffect, useState } from "react";
import themes from "../utils/colors";
import TaskItem from "../components/TaskItem";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import Calender from "../components/Calender";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function HomeScreen() {
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState([]);

    const [theme, setTheme] = useState(themes.dark);
    const styles = getStyles(theme);

    const [deadline, setDeadline] = useState(null);
    const [showCalender, setShowCalender] = useState(false);


    const addTask = () => {
        if (task.trim()) {
            const newTask = {
                id: Date.now().toString(),
                text: task,
                completed: false,
                deadline: deadline ? deadline.toDateString() : null,
            };
            setTaskList([...taskList, newTask]);
            setTask('');
            setDeadline(null);
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
    useEffect(() => {
        const loadTasks = async () => {
            try {
                const storedTasks = await AsyncStorage.getItem('taskList');
                if (storedTasks) {
                    setTaskList(JSON.parse(storedTasks));
                }
            } catch (e) {
                console.log('Error loading tasks:', e);
            }
        };
        loadTasks();
    }, []);

    useEffect(() => {
        const saveTasks = async () => {
            try {
                await AsyncStorage.setItem('taskList', JSON.stringify(taskList));
            } catch (e) {
                console.log('Error saving tasks', e);
            }
        };
        saveTasks();
    }, [taskList]);

    return (
        <Animatable.View
            animation='fadeIn'
            duration={300}
            key={theme.background}
            style={styles.continer}
        >
            <Animatable.Text
                animation='flash'
                iterationCount='infinite'
                iterationDelay={2000}
                style={styles.header}
            >
                ⎿ To Do App ⏋
            </Animatable.Text>

            <TextInput
                style={styles.input}
                placeholder="Write new task ⌚︎"
                value={task}
                onChangeText={setTask}
                keyboardType='default'
                editable={true}
            />

            <TouchableOpacity
                onPress={() => setShowCalender(!showCalender)} style={styles.calenderButton} >
                <Text style={styles.calenderButtonText}>
                    {deadline ? `Deadline: ${deadline.toDateString()}` : '📆 Select Deadline'}
                </Text>
            </TouchableOpacity>

            {showCalender && (
                <Calender
                    onDateSelect={(date) => {
                        if (date) {
                            setDeadline(date);
                        }
                        setTimeout(() => {
                            setShowCalender(false);
                        }, 500);
                    }}
                    theme={theme}
                />
            )}

            <Animatable.View animation='bounceIn' duration={500}>
                <TouchableOpacity onPress={addTask} activeOpacity={0.8} style={styles.addButton}>
                    <Animatable.Text
                        animation='pulse'
                        iterationCount='infinite'
                        iterationDelay={3000}
                        style={styles.addButtonText}
                    >
                        ➕〈 Add Task 〉
                    </Animatable.Text>
                </TouchableOpacity>
            </Animatable.View>

            <FlatList
                data={taskList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TaskItem task={item} onDelete={deleteTask} onToggle={toggleTask} theme={theme} />}
            />

            {taskList.length === 0 && (
                <Animatable.Text
                    animation='fadeInUp'
                    duration={600}
                    delay={300}
                    style={{
                        textAlign: 'center',
                        marginTop: 30,
                        fontSize: 16,
                        color: theme.text,
                    }}
                >
                    {theme === themes.dark && 'Nothing here yet... Start adding your tasks! 🎖️'}
                    {theme === themes.light && 'All clear! What\'s next on your mind 📝'}
                    {theme === themes.cyberpunk && 'System clear. Ready for the next missions ⚡🦾'}
                </Animatable.Text>
            )}

            <View style={styles.themeSelector}>
                <TouchableOpacity
                    onPress={() => setTheme(themes.dark)}
                    style={[styles.themeButton, { backgroundColor: 'greenyellow' }]}
                >
                    <Text style={styles.themeButtonText}>🖤</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setTheme(themes.light)}
                    style={[styles.themeButton, { backgroundColor: '#4e73df' }]}
                >
                    <Text style={styles.themeButtonText}>🤍</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setTheme(themes.cyberpunk)}
                    style={[styles.themeButton, { backgroundColor: '#8a08b9' }]}
                >
                    <Text style={styles.themeButtonText}>💜</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
    );
}

const getStyles = (theme) =>
    StyleSheet.create({
        continer: {
            flex: 1,
            padding: 20,
            backgroundColor: theme.background,
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
            borderRadius: 5,
            alignSelf: 'center',
            color: '#adff2f',
        },
        input: {
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
            backgroundColor: theme.taskBackground,
        },
        addButton: {
            backgroundColor: theme.accent,
            paddingVertical: 12,
            paddingHorizontal: 25,
            borderRadius: 25,
            alignItems: 'center',
            alignSelf: 'center',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
            shadowColor: theme.accent,
        },
        addButtonText: {
            color: '#008000',
            fontSize: 18,
            fontWeight: 'bold',
        },
        themeSelector: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
            gap: 10,
        },

        themeButton: {
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 3,
            elevation: 4,
        },
        themeButtonText: {
            fontSize: 20,
            color: '#fff',
        },
        calenderButton: {
            backgroundColor: theme.accent,
            padding: 10,
            borderRadius: 10,
            alignItems: 'center',
            marginBottom: 10,
        },
        calenderButtonText: {
            color: theme.buttonText,
        },
    });