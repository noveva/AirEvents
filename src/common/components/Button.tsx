import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text} from 'react-native';
import {GestureResponderEvent} from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import spacingUtils from '../styles/spacing';
import {palette} from '../styles/colors';
import textVariants from '../styles/text';
import {iconSize} from '../styles/iconSize';

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
  icon?: string;
  onPress: (event: GestureResponderEvent) => void;
};

function Button({
  label,
  size = ButtonSize.large,
  disabled = false,
  waiting = false,
  icon,
  onPress,
}: Props): React.JSX.Element {
  function getPressableStyle({pressed}: {pressed: boolean}) {
    return {
      ...styles.button,
      ...buttonThemes[size].button,
      ...(disabled ? styles.buttonDisabled : {}),
      ...(pressed ? styles.buttonPressed : {}),
    };
  }

  return (
    <Pressable disabled={disabled} onPress={onPress} style={getPressableStyle}>
      {({pressed}) => {
        return waiting ? (
          <ActivityIndicator size="small" color={palette.white} />
        ) : (
          <>
            <Text
              style={[
                styles.buttonText,
                buttonThemes[size].text,
                pressed && styles.buttonTextPressed,
              ]}>
              {label}
            </Text>
            {icon && (
              <Icon
                style={styles.icon}
                name={icon}
                size={iconSize.medium}
                color={
                  pressed
                    ? styles.buttonTextPressed.color
                    : styles.buttonText.color
                }
                allowFontScaling={false}
              />
            )}
          </>
        );
      }}
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: palette.blue63,
    opacity: 1,
  },
  buttonDisabled: {
    backgroundColor: palette.blue63,
    opacity: 0.6,
    color: palette.grey,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: palette.white,
  },
  buttonTextPressed: {
    color: palette.grey,
  },
  icon: {
    height: iconSize.medium - 2,
    width: iconSize.medium,
    ...spacingUtils.marginL6,
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
