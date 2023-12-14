import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {palette} from '../common/styles/colors';
import textVariants from '../common/styles/text';
import ButtonIcon from '../common/components/ButtonIcon';
import EventModal from './components/EventModal/EventModal';
import containerUtils from '../common/styles/containers';
import spacingUtils from '../common/styles/spacing';

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
              backgroundColor: palette.blue84,
              marginTop: 10,
              padding: 10,
              borderRadius: 20,
            },
            eventStyles.main,
          ]}>
          <Text style={textVariants.body}>{item.title}</Text>
        </View>
      ))}
      <Modal
        style={eventStyles.modal}
        isVisible={isModalVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        animationInTiming={800}
        animationOutTiming={800}
        hasBackdrop={false}>
        {isModalVisible && <EventModal onClose={toggleModal} />}
      </Modal>
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
  modal: {
    ...containerUtils.main,
    ...spacingUtils.margin0,
  },
  addButton: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: palette.orange,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default Events;
