import React from 'react';
import {StyleSheet, View} from 'react-native';
import Chips, {ChipValue, ChipValues} from './Chips';
import Label from './Label';
import {palette} from '../../../../common/styles/colors';
import spacingUtils from '../../../../common/styles/spacing';

type Props<T> = {
  groupId: string;
  label: string;
  options: ChipValues<T>;
  selected?: ChipValue<T>['id'];
  onPress: (value: any) => any;
};

function EventFormGroup<T>({
  groupId,
  label,
  options,
  selected,
  onPress,
}: Props<T>): React.JSX.Element {
  return (
    <View style={styles.group}>
      <Label text={label} nativeID={groupId} />
      <Chips
        options={options}
        selected={selected}
        labelledBy={groupId}
        onPress={onPress}
      />
    </View>
  );
}

export default EventFormGroup;

const styles = StyleSheet.create({
  group: {
    ...spacingUtils.paddingH16,
    ...spacingUtils.paddingV8,
    ...spacingUtils.marginV4,
    borderRadius: 12,
    backgroundColor: palette.blue100,
  },
});
