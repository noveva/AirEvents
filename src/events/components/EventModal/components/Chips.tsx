import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import textVariants from '../../../../common/styles/text';
import {palette} from '../../../../common/styles/colors';
import spacingUtils from '../../../../common/styles/spacing';

export type ChipValue<T> = {id: string; label: string; value: T};
export type ChipValues<T> = ChipValue<T>[];

type Props<T> = {
  options: ChipValues<T>;
  selected?: string | number;
  labelledBy: string;
  onPress: (value: ChipValue<T>) => void;
};

// TODO refactor to add keys, forgot
function Chips<T>({
  options,
  selected,
  labelledBy,
  onPress,
}: Props<T>): React.JSX.Element {
  return (
    <View
      role="radiogroup"
      accessibilityLabelledBy={labelledBy}
      style={styles.flexRow}>
      {options.map(option => (
        <Pressable
          key={option.id}
          style={[styles.chip, selected === option.id && styles.selected]}
          onPress={event => {
            event.preventDefault();
            onPress(option);
          }}>
          {({pressed}) => {
            return (
              <Text
                role="radio"
                style={[textVariants.body, pressed && styles.textPressed]}>
                {option.label}
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
