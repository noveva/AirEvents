import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text} from 'react-native';
import {GestureResponderEvent} from 'react-native-modal';
import spacingUtils from '../styles/spacing';
import {palette} from '../styles/colors';
import textVariants from '../styles/text';

enum ButtonSize {
  large = 'large',
}

type ButtonSizeString = ButtonSize.large;

type Props = {
  label: string;
  size?: ButtonSizeString;
  disabled?: boolean;
  waiting?: boolean;
  onPress: (event: GestureResponderEvent) => void;
};

function Button({
  label,
  size = ButtonSize.large,
  disabled = false,
  waiting = false,
  onPress,
}: Props): React.JSX.Element {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, disabled && styles.buttonDisabled, styles[size]]}>
      {({pressed}) => {
        return waiting ? (
          <ActivityIndicator size="small" color={palette.white} />
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
    backgroundColor: palette.greyDark,
    opacity: 0.6,
    color: palette.grey,
  },
  buttonText: {
    ...textVariants.heading,
    color: palette.white,
  },
  buttonPressed: {
    color: palette.grey,
  },
  large: {
    width: 120,
    alignItems: 'center',
  },
});
