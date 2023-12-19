import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {isToday, format, sub, add, endOfDay} from 'date-fns';
import ButtonIcon from '../../../../common/components/ButtonIcon';
import containerUtils from '../../../../common/styles/containers';
import textVariants from '../../../../common/styles/text';
import spacingUtils from '../../../../common/styles/spacing';
import {EventListProps} from '../EventList';

const iconSize = 28;

export default function EventListHeader({
  timestamp = new Date(),
  refresh,
}: Pick<EventListProps, 'timestamp' | 'refresh'>) {
  const isTimestampToday = isToday(timestamp);
  const title = isTimestampToday ? 'Today' : format(timestamp, 'd MMM');

  function loadPreviousDay() {
    const prevDay = endOfDay(sub(timestamp, {days: 1}));
    refresh(prevDay);
  }

  function loadNextDay() {
    const nextDay = endOfDay(add(timestamp, {days: 1}));
    refresh(nextDay);
  }

  return (
    <View style={styles.row}>
      <ButtonIcon
        icon="arrow-back"
        size={iconSize}
        style={styles.cell}
        onPress={loadPreviousDay}
      />
      <Text style={[styles.heading, styles.cell]}>{title}</Text>
      <View style={styles.cell}>
        {isTimestampToday === false && (
          <ButtonIcon
            style={styles.alignEnd}
            icon="arrow-forward"
            size={iconSize}
            onPress={loadNextDay}
          />
        )}
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
