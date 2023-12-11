import React from 'react';
import {GestureResponderEvent, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {palette} from '../../common/styles/colors';

const buttonSize = 60;

type Props = {
  onPress: (event: GestureResponderEvent) => void;
};

function ButtonIcon({onPress}: Props): React.JSX.Element {
  return (
    <Pressable onPress={onPress} style={buttonIconStyles.container}>
      {({pressed}) => {
        return (
          <Icon
            name="add"
            size={buttonIconStyles.text.fontSize}
            color={
              pressed
                ? buttonIconStyles.textPressed.color
                : buttonIconStyles.textDefault.color
            }
            allowFontScaling={false}
          />
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
    fontSize: buttonSize / 1.4,
  },
  textDefault: {
    color: palette.white,
  },
  textPressed: {
    color: palette.opaqueWhite,
  },
});

export default ButtonIcon;
