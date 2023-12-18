import React, {useEffect} from 'react';
import {Text, StyleSheet, Alert, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../../../common/components/Card';
import textVariants from '../../../common/styles/text';
import useMutate from '../../../api/useMutate';
import {HttpRequestMethods} from '../../../api/utils';
import {getUnixNow} from '../../../common/utils';
import {RequestStatus} from '../../../api/RequestReducer';
import {EVENTS_API} from '../../../api/Endpoints';
import spacingUtils from '../../../common/styles/spacing';
import {palette} from '../../../common/styles/colors';
import ButtonIcon from '../../../common/components/ButtonIcon';
import containerUtils from '../../../common/styles/containers';
import {formatHHmm} from '../../../common/utils';
import {Event} from '../../EventsTypes';

const iconSize = 16;

interface Props extends Event {
  onUpdate: () => void;
}

function EventListItem({
  id,
  eventType,
  locationId,
  startTimestamp,
  endTimestamp,
  onUpdate,
}: Props): React.JSX.Element {
  const startTime = formatEventTime(startTimestamp);
  const endTime = endTimestamp && formatEventTime(endTimestamp);
  const {status, error, data, mutate} = useMutate<Event>(
    HttpRequestMethods.patch,
  );

  function formatEventTime(unixTimestamp: number): string {
    const timestampUTC = unixTimestamp * 1000;
    return formatHHmm(timestampUTC);
  }

  async function stop() {
    await mutate(EVENTS_API.stop(id as string), {
      endTimestamp: getUnixNow(),
    });
  }

  if (status === RequestStatus.error) {
    const message = error || 'Something went wrong';
    Alert.alert('Could not stop event', message, [
      {text: 'OK', onPress: () => console.log(message)},
    ]);
  }

  useEffect(() => {
    if (status === RequestStatus.fetched && data) {
      onUpdate();
    }
  }, [status, data, onUpdate]);

  return (
    <Card style={{...styles.row, ...styles.rowFixedHeight}}>
      <View style={[styles.cell, styles.row]}>
        {/* View slightly smaller than the Icon to align with Text */}
        <View style={styles.icon}>
          <Icon
            name={locationId === 'bedroom' ? 'bed' : 'cafe'}
            size={iconSize + 2}
            color={palette.white}
            allowFontScaling={false}
          />
        </View>
        <Text style={[styles.textWithPadding, styles.heading]}>
          {eventType}
        </Text>
      </View>
      <Text style={[styles.textWithPadding, styles.text]}>{startTime}</Text>
      <View style={[styles.row, styles.lastCell]}>
        {endTime ? (
          <Text style={[styles.text]}>{endTime}</Text>
        ) : (
          <ButtonIcon
            icon="stop"
            size={iconSize}
            style={styles.stopButton}
            onPress={stop}
          />
        )}
      </View>
    </Card>
  );
}

export default EventListItem;

const styles = StyleSheet.create({
  row: {
    ...containerUtils.row,
  },
  rowFixedHeight: {
    minHeight: 70,
  },
  cell: {
    flex: 1,
  },
  lastCell: {
    width: 68,
    justifyContent: 'center',
  },
  text: {
    ...textVariants.body,
  },
  textWithPadding: {
    ...spacingUtils.paddingH12,
  },
  heading: {
    ...textVariants.headingSmall,
  },
  icon: {
    width: iconSize,
    height: iconSize,
  },
  stopButton: {
    backgroundColor: palette.blue63,
    borderRadius: 20,
    padding: 12,
  },
});
