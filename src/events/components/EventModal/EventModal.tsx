import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import spacingUtils from '../../../common/styles/spacing';
import containerUtils from '../../../common/styles/containers';
import ButtonIcon from '../../../common/components/ButtonIcon';
import EventForm from './components/EventForm';

type Props = {isVisible: boolean; onClose: () => void};

function EventModal({isVisible, onClose}: Props): React.JSX.Element {
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      animationInTiming={800}
      animationOutTiming={800}
      hasBackdrop={false}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.wrapper}>
          <ButtonIcon
            icon="arrow-back"
            size={28}
            style={styles.backButton}
            onPress={onClose}
          />
          <EventForm />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default EventModal;

const styles = StyleSheet.create({
  modal: {
    ...containerUtils.main,
    ...spacingUtils.margin0,
  },
  safeArea: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    ...containerUtils.withPadding,
  },
  backButton: {
    alignSelf: 'flex-start',
    ...spacingUtils.paddingT6,
  },
});
