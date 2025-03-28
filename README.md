# 📝 To Do App

A simple yet animated React Native To-Do application with theme switching, deadline support, and custom calendar.

## 🚀 Features

- ✅ Add, complete, and delete tasks
- 🎨 Three dynamic themes:  
  - **Green-Dark** (Default)  
  - **Light**  
  - **Cyberpunk**  
- 🔄 Animated UI using `react-native-animatable`
- 📅 Custom-built calendar for selecting deadlines
- 🗓️ Displays task deadlines and highlights them
- 🧠 Task persistence via `@react-native-async-storage/async-storage`

## 🎨 Theme Preview

Switch between themes using the buttons at the bottom of the screen.

Each theme changes:
- Background colors  
- Task card colors  
- Accent colors  
- Button styles  
- Headline animations

> ⚠️ Note: We removed one of the animations related to theme switching due to a minor conflict with another animation library. The smooth transition animation remains active.

## 🛠 Tech Stack

- **React Native**
- **AsyncStorage**
- **React Native Animatable**
- **Custom Date Selector** (No third-party date picker used)
- **FlatList**, **TouchableOpacity**, **TextInput**

## 🗂 Folder Structure

```
/components
  - TaskItem.js
  - Calender.js
/utils
  - colors.js
/screens
  - HomeScreen.js
```

## 📦 Installation

```bash
git clone https://github.com/Enver-Onur-Cogalan/To-Do-App.git
cd toDoApp
npm install
npx react-native run-ios # or run-android
```

> ⚠️ Make sure you have a working React Native environment set up. Check [React Native Environment Setup](https://reactnative.dev/docs/environment-setup).

## 📌 Important Notes

- Animations are used throughout the app for a smoother and more engaging experience.
- Calendar is built from scratch to allow styling and animations.
- Deadline highlighting is active but the red background effect was removed during the final revision for clarity.

---

Made with ❤️ by Enver Onur Çoğalan
