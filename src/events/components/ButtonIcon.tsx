import React from 'react';
import {GestureResponderEvent, StyleSheet, Text, Pressable} from 'react-native';

const buttonSize = 60;

type Props = {
  onPress: (event: GestureResponderEvent) => void;
};

function ButtonIcon({onPress}: Props): React.JSX.Element {
  return (
    <Pressable onPress={onPress} style={buttonIconStyles.container}>
      {({pressed}) => {
        return (
          <Text
            style={[
              pressed
                ? buttonIconStyles.textPressed
                : buttonIconStyles.textDefault,
              buttonIconStyles.text,
            ]}>
            {'\u002B'}
          </Text>
        );
      }}
    </Pressable>
  );
}

const buttonIconStyles = StyleSheet.create({
  container: {
    height: buttonSize,
    width: buttonSize,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: buttonSize / 2,
    backgroundColor: '#f6553e',
    position: 'absolute',
    bottom: buttonSize / 2,
    right: buttonSize / 2,
  },
  text: {
    lineHeight: buttonSize,
    fontSize: buttonSize - 12,
  },
  textDefault: {
    color: 'rgba(255,255,255, 1)',
  },
  textPressed: {
    color: 'rgba(255,255,255, 0.5)',
  },
});

export default ButtonIcon;
