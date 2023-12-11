import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {palette} from '../common/styles/colors';
import textVariants from '../common/styles/text';
import ButtonIcon from '../common/components/ButtonIcon';
import EventModal from './components/EventModal';

const listItems = [
  {title: 'Asdflkja'},
  {title: 'Asdflkja flk'},
  {title: 'Asd flkja sd flk'},
  {title: 'flkj Asdflkja'},
  {title: 'A sdflk ja'},
];

function Events(): React.JSX.Element {
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
      <ButtonIcon
        icon="add"
        size={40}
        style={eventStyles.addButton}
        onPress={toggleModal}
      />
    </View>
  );
}

const eventStyles = StyleSheet.create({
  main: {
    flex: 1,
  },
  addButton: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#f6553e',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default Events;
