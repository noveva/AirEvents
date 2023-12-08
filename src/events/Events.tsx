import React from 'react';
import {StyleSheet, View} from 'react-native';
import ButtonIcon from './components/ButtonIcon';

function Events(): JSX.Element {
  function handlePress() {
    // TODO open modal with event form
  }

  return (
    <View style={containerStyles.main}>
      <ButtonIcon onPress={handlePress} />
    </View>
  );
}

const containerStyles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default Events;
