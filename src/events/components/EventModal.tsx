import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import textVariants from '../../common/styles/text';
import spacingUtils from '../../common/styles/spacing';
import Icon from 'react-native-vector-icons/Ionicons';
import {palette} from '../../common/styles/colors';
import containerUtils from '../../common/styles/containers';

type Props = {isVisible: boolean; onClose: () => void};

function EventModal({isVisible, onClose}: Props) {
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      animationInTiming={800}
      animationOutTiming={800}
      hasBackdrop={false}>
      <SafeAreaView style={styles.wrapper}>
        <View>
          <Icon
            name="arrow-back"
            size={20}
            color={palette.white}
            allowFontScaling={false}
          />
        </View>
        <Text style={textVariants.body}>I am the modal content!</Text>
        <Button title="Close" onPress={onClose} />
      </SafeAreaView>
    </Modal>
  );
}

export default EventModal;

const styles = StyleSheet.create({
  modal: {
    ...containerUtils.main,
    ...spacingUtils.margin0,
    ...containerUtils.withPadding,
  },
  wrapper: {
    flex: 1,
  },
});
