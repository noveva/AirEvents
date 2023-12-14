import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text} from 'react-native';
import {GestureResponderEvent} from 'react-native-modal';
import spacingUtils from '../styles/spacing';
import {palette} from '../styles/colors';
import textVariants from '../styles/text';

export enum ButtonSize {
  large = 'large',
  small = 'small',
}

type ButtonSizeString = ButtonSize.large | ButtonSize.small;

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
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        buttonThemes[size].button,
      ]}>
      {({pressed}) => {
        return waiting ? (
          <ActivityIndicator size="small" color={palette.white} />
        ) : (
          <Text
            style={[
              styles.buttonText,
              buttonThemes[size].text,
              pressed && styles.buttonPressed,
            ]}>
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
    color: palette.white,
  },
  buttonPressed: {
    color: palette.grey,
  },
});

const buttonThemes = {
  large: StyleSheet.create({
    button: {
      width: 120,
      alignItems: 'center',
      ...spacingUtils.marginV6,
      ...spacingUtils.paddingH16,
      paddingVertical: 12,
    },
    text: {
      ...textVariants.heading,
    },
  }),
  small: StyleSheet.create({
    button: {
      ...spacingUtils.paddingH12,
      ...spacingUtils.paddingV8,
    },
    text: {
      ...textVariants.caption,
    },
  }),
};
