import React from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {palette} from '../../common/styles/colors';
import textVariants from '../../common/styles/text';

type Props = {isVisible: boolean; onClose: () => void};

function EventModal({isVisible, onClose}: Props) {
  return (
    <Modal
      style={{margin: 0}}
      isVisible={isVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      animationInTiming={800}
      animationOutTiming={800}
      hasBackdrop={false}>
      <View style={{flex: 1, backgroundColor: palette.lightBlue}}>
        <Text style={textVariants.body}>I am the modal content!</Text>
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
}

export default EventModal;
