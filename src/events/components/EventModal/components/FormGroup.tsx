import React from 'react';
import {StyleSheet, View} from 'react-native';
import Chips from './Chips';
import Label from './Label';
import {palette} from '../../../../common/styles/colors';
import spacingUtils from '../../../../common/styles/spacing';

type Props = {
  groupId: string;
  label: string;
  values: readonly string[];
  selected?: string;
  onPress: (value: any) => any;
};

function EventFormGroup({
  groupId,
  label,
  values,
  selected = '',
  onPress,
}: Props): React.JSX.Element {
  return (
    <View style={styles.group}>
      <Label text={label} nativeID={groupId} />
      <Chips
        values={values}
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
    backgroundColor: palette.blue95,
  },
});
