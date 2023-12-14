import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {palette} from '../common/styles/colors';
import ButtonIcon from '../common/components/ButtonIcon';
import EventModal from './components/EventModal/EventModal';
import containerUtils from '../common/styles/containers';
import spacingUtils from '../common/styles/spacing';
import EventList from './components/EventList';

function Events(): React.JSX.Element {
  const [isModalVisible, setModalVisible] = useState(false);

  function toggleModal() {
    setModalVisible(!isModalVisible);
  }

  return (
    <View style={styles.main}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.container}>
        <EventList />
      </ScrollView>
      <ButtonIcon
        icon="add"
        size={40}
        style={styles.addButton}
        onPress={toggleModal}
      />
      <Modal
        style={styles.modal}
        isVisible={isModalVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        animationInTiming={800}
        animationOutTiming={800}
        hasBackdrop={false}>
        {isModalVisible && <EventModal onClose={toggleModal} />}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    ...containerUtils.withPadding,
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
    bottom: spacingUtils.marginR18.marginRight,
    right: spacingUtils.marginR18.marginRight,
  },
});

export default Events;
