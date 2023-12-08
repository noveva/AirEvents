import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Events from './events/Events';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={containerStyles.main}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={containerStyles.main.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={containerStyles.main}>
        <Events />
      </ScrollView>
    </SafeAreaView>
  );
}

const containerStyles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#d7f9ff',
  },
});

export default App;
