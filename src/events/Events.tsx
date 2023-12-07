import React from 'react';
import {View} from 'react-native';
import ButtonIcon from './components/ButtonIcon';

function Events(): JSX.Element {
  function handlePress() {
    // TODO open modal with event form
  }

  return (
    <View>
      <ButtonIcon onPress={handlePress} />
    </View>
  );
}

export default Events;
