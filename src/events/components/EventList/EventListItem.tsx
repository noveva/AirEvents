import React, {useEffect} from 'react';
import {Text, StyleSheet, Alert} from 'react-native';
import {format} from 'date-fns';
import Card from '../../../common/components/Card';
import textVariants from '../../../common/styles/text';
import Button, {ButtonSize} from '../../../common/components/Button';
import useMutate from '../../../api/useMutate';
import {HttpRequestMethods, getUnixNow} from '../../../api/Utils';
import {RequestStatus} from '../../../api/RequestReducer';
import {EVENTS_API} from '../../../api/Endpoints';
import spacingUtils from '../../../common/styles/spacing';
import {Event} from '../../EventsTypes';

interface Props extends Event {
  onUpdate: (event: Event) => void;
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
    return format(new Date(timestampUTC), 'HH:mm');
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
      onUpdate(data);
    }
  }, [status, data, onUpdate]);

  return (
    <Card style={styles.row}>
      <Text style={styles.text}>{locationId}</Text>
      <Text style={[styles.cell, styles.text]}>{eventType}</Text>
      <Text style={styles.text}>{startTime}</Text>
      {endTime ? (
        <Text style={styles.text}>{endTime}</Text>
      ) : (
        <Button
          label="Stop"
          size={ButtonSize.small}
          waiting={status === RequestStatus.fetching}
          onPress={stop}
        />
      )}
    </Card>
  );
}

export default EventListItem;

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center', minHeight: 50},
  text: {
    ...spacingUtils.paddingH12,
    ...textVariants.body,
  },
  cell: {
    flex: 1,
  },
});
