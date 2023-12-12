import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text} from 'react-native';
import {GestureResponderEvent} from 'react-native-modal';
import spacingUtils from '../styles/spacing';
import {palette} from '../styles/colors';
import textVariants from '../styles/text';

type Props = {
  label: string;
  disabled?: boolean;
  waiting?: boolean;
  onPress: (event: GestureResponderEvent) => void;
};

function Button({
  label,
  disabled = false,
  waiting = false,
  onPress,
}: Props): React.JSX.Element {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, disabled && styles.buttonDisabled]}>
      {({pressed}) => {
        return waiting ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
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
    opacity: 1,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    ...textVariants.heading,
    color: palette.white,
  },
  buttonPressed: {
    color: palette.grey,
  },
});
