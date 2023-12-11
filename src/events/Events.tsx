import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ButtonIcon from './components/ButtonIcon';
import EventModal from './components/EventModal';
import {palette} from '../common/styles/colors';
import textVariants from '../common/styles/text';

const listItems = [
  {title: 'Asdflkja'},
  {title: 'Asdflkja flk'},
  {title: 'Asd flkja sd flk'},
  {title: 'flkj Asdflkja'},
  {title: 'A sdflk ja'},
];

function Events(): JSX.Element {
  const [isModalVisible, setModalVisible] = useState(false);

  function toggleModal() {
    setModalVisible(!isModalVisible);
  }

  return (
    <View style={eventStyles.main}>
      {listItems.map(item => (
        <View
          style={[
            {
              backgroundColor: palette.opaqueBlue,
              marginTop: 10,
              padding: 10,
              borderRadius: 20,
            },
            eventStyles.main,
          ]}>
          <Text style={textVariants.body}>{item.title}</Text>
        </View>
      ))}
      <EventModal isVisible={isModalVisible} onClose={toggleModal} />
      <ButtonIcon onPress={toggleModal} />
    </View>
  );
}

const eventStyles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default Events;
