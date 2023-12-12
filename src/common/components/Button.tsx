import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {GestureResponderEvent} from 'react-native-modal';
import spacingUtils from '../styles/spacing';
import {palette} from '../styles/colors';
import textVariants from '../styles/text';

type Props = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
};

function Button({label, onPress}: Props): React.JSX.Element {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      {({pressed}) => {
        return (
          <Text style={[styles.buttonText, pressed && styles.buttonPressed]}>
            {label}
          </Text>
        );
      }}
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    ...spacingUtils.marginV6,
    ...spacingUtils.paddingH16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: palette.blue63,
  },
  buttonText: {
    ...textVariants.heading,
    color: palette.white,
  },
  buttonPressed: {
    color: palette.grey,
  },
});
