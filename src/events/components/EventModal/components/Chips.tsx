import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import textVariants from '../../../../common/styles/text';
import {palette} from '../../../../common/styles/colors';
import spacingUtils from '../../../../common/styles/spacing';

type Props = {
  values: readonly string[];
  selected: string;
  labelledBy: string;
  onPress: (event: string) => void;
};

function Chips({
  values,
  selected,
  labelledBy,
  onPress,
}: Props): React.JSX.Element {
  return (
    <View
      role="radiogroup"
      accessibilityLabelledBy={labelledBy}
      style={styles.flexRow}>
      {values.map(value => (
        <Pressable
          style={[styles.chip, selected === value && styles.selected]}
          onPress={event => {
            event.preventDefault();
            onPress(value);
          }}>
          {({pressed}) => {
            return (
              <Text
                role="radio"
                style={[textVariants.body, pressed && styles.textPressed]}>
                {value}
              </Text>
            );
          }}
        </Pressable>
      ))}
    </View>
  );
}

export default Chips;

const styles = StyleSheet.create({
  flexRow: {flexDirection: 'row', flexWrap: 'wrap', ...spacingUtils.marginB4},
  chip: {
    alignSelf: 'flex-start',
    ...spacingUtils.marginV6,
    ...spacingUtils.marginR18,
    ...spacingUtils.paddingH16,
    ...spacingUtils.paddingV8,
    borderRadius: 16,
    backgroundColor: palette.blue84,
  },
  selected: {
    backgroundColor: palette.blue63,
  },
  textPressed: {
    color: palette.grey,
  },
});
