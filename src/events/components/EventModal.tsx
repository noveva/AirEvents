import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import Modal from 'react-native-modal';
import textVariants from '../../common/styles/text';
import containerStyles from '../../common/styles/containers';
import spacingUtils from '../../common/styles/spacing';

type Props = {isVisible: boolean; onClose: () => void};

function EventModal({isVisible, onClose}: Props) {
  return (
    <Modal
      style={spacingUtils.margin0}
      isVisible={isVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      animationInTiming={800}
      animationOutTiming={800}
      hasBackdrop={false}>
      <SafeAreaView style={containerStyles.main}>
        <Text style={textVariants.body}>I am the modal content!</Text>
        <Button title="Close" onPress={onClose} />
      </SafeAreaView>
    </Modal>
  );
}

export default EventModal;
