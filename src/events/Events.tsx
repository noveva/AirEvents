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
    <View style={containerStyles.main}>
      {listItems.map(item => (
        <View
          style={[
            {
              backgroundColor: palette.opaqueBlue,
              marginTop: 10,
              marginLeft: 20,
              marginRight: 20,
              padding: 10,
              borderRadius: 20,
            },
            containerStyles.main,
          ]}>
          <Text style={textVariants.body}>{item.title}</Text>
        </View>
      ))}
      <EventModal isVisible={isModalVisible} onClose={toggleModal} />
      <ButtonIcon onPress={toggleModal} />
    </View>
  );
}

const containerStyles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default Events;
