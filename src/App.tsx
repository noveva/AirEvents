import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import containerUtils from './common/styles/containers';
import Events from './events/Events';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={containerUtils.main.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.contents}>
        <Events />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  wrapper: {
    ...containerUtils.main,
  },
  contents: {
    flex: 1,
    ...containerUtils.withPadding,
  },
});
