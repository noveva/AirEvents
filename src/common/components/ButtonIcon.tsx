import React from 'react';
import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import {GestureResponderEvent} from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {palette} from '../styles/colors';

type Props = {
  icon: string;
  size: number;
  style?: ViewStyle;
  onPress: (event: GestureResponderEvent) => void;
};

function ButtonIcon({icon, size, style, onPress}: Props): React.JSX.Element {
  const tappableMinSize = 48; // Android minSize recommendation as it is larger than in iOS
  const hitSlopValue = tappableMinSize > size ? tappableMinSize - size : 0;

  return (
    <Pressable onPress={onPress} style={style} hitSlop={hitSlopValue}>
      {({pressed}) => {
        return (
          <Icon
            name={icon}
            size={size}
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
  textDefault: {
    color: palette.white,
  },
  textPressed: {
    color: palette.opaqueWhite,
  },
});

export default ButtonIcon;
