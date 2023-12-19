import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ButtonIcon from '../../../../common/components/ButtonIcon';
import containerUtils from '../../../../common/styles/containers';
import textVariants from '../../../../common/styles/text';
import spacingUtils from '../../../../common/styles/spacing';

const iconSize = 28;

export default function EventListHeader() {
  function loadPreviousDay() {}

  return (
    <View style={styles.row}>
      <ButtonIcon
        icon="arrow-back"
        size={iconSize}
        style={styles.cell}
        onPress={loadPreviousDay}
      />
      <Text style={[styles.heading, styles.cell]}>Today</Text>
      <View style={styles.cell}>
        <ButtonIcon
          style={styles.alignEnd}
          icon="arrow-forward"
          size={iconSize}
          onPress={loadPreviousDay}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    ...containerUtils.row,
  },
  cell: {
    flex: 1,
  },
  alignEnd: {
    alignSelf: 'flex-end',
  },
  heading: {
    textAlign: 'center',
    ...textVariants.heading,
    ...spacingUtils.marginT16,
    ...spacingUtils.marginB12,
  },
});
