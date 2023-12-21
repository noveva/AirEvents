import React from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import containerUtils from '../styles/containers';
import spacingUtils from '../styles/spacing';

type Props = {
  isVisible?: boolean;
  children: React.JSX.Element | React.JSX.Element[];
};

function ModalWrapper({isVisible = false, children}: Props) {
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      animationInTiming={800}
      animationOutTiming={800}
      hasBackdrop={false}>
      {children}
    </Modal>
  );
}

export default ModalWrapper;

const styles = StyleSheet.create({
  modal: {
    ...containerUtils.main,
    ...spacingUtils.margin0,
  },
});
