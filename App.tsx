import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import HomeScreen from './screens/HomeScreen';


const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <HomeScreen />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default App;