import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {palette} from '../styles/colors';
import spacingUtils from '../styles/spacing';

type Props = {
  style?: ViewStyle;
  children: React.ReactNode[];
};

function Card({style, children}: Props): React.JSX.Element {
  return (
    <View
      style={{
        ...style,
        ...styles.card,
      }}>
      {children}
    </View>
  );
}
export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.blue100,
    ...spacingUtils.paddingH16,
    ...spacingUtils.paddingV8,
    ...spacingUtils.marginV4,
    borderRadius: 12,
  },
});
