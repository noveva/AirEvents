import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import containerUtils from '../styles/containers';
import spacingUtils from '../styles/spacing';
import {iconSize} from '../styles/iconSize';
import ButtonIcon from './ButtonIcon';

type Props = {
  isVisible?: boolean;
  onClose: () => void;
  children: React.JSX.Element | React.JSX.Element[];
};

function ModalWrapper({isVisible = false, onClose, children}: Props) {
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
        <View style={styles.bar}>
          <ButtonIcon
            icon="arrow-back"
            size={iconSize.medium}
            style={styles.backButton}
            onPress={onClose}
          />
          {children}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default ModalWrapper;

const styles = StyleSheet.create({
  modal: {
    ...containerUtils.main,
    ...spacingUtils.margin0,
  },
  safeArea: {
    flex: 1,
  },
  bar: {
    flex: 1,
    ...containerUtils.withPadding,
  },
  backButton: {
    alignSelf: 'flex-start',
    ...spacingUtils.paddingT6,
  },
});
