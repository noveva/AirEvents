import React from 'react';
import {GestureResponderEvent, StyleSheet, Text, Pressable} from 'react-native';

type Props = {
  onPress: (event: GestureResponderEvent) => void;
};

function ButtonIcon({onPress}: Props): React.JSX.Element {
  return (
    <Pressable onPress={onPress} style={[buttonIconStyles.container]}>
      <Text style={buttonIconStyles.text}>{'\u002B'}</Text>
    </Pressable>
  );
}

const buttonIconStyles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    alignItems: 'center',
    borderRadius: 20,
    // backgroundColor: '#2effb1',
    backgroundColor: '#ff8371',
    borderColor: '#ffe2de',
    borderWidth: 2,
  },
  text: {
    color: '#fff',
    lineHeight: 40,
    fontSize: 36,
  },
});

export default ButtonIcon;
