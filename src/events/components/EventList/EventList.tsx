import React from 'react';
import {Alert, StyleSheet, Text} from 'react-native';
import {format} from 'date-fns';
import {getUnixTimestamp} from '../../../api/Utils';
import textVariants from '../../../common/styles/text';
import spacingUtils from '../../../common/styles/spacing';
import {RequestStatus} from '../../../api/RequestReducer';
import {EVENTS_API} from '../../../api/Endpoints';
import useFetch from '../../../api/FetchRequest';
import Button, {ButtonSize} from '../../../common/components/Button';
import {Event} from '../../EventsTypes';
import Card from '../../../common/components/Card';

function EventList(): React.JSX.Element {
  const toNow = getUnixTimestamp(new Date().getTime());
  const from24hrsAgo = toNow - 24 * 60 * 60;

  const {status, error, data} = useFetch<Event[]>(
    EVENTS_API.fetch(from24hrsAgo, toNow),
  );

  function formatEventTime(unixTimestamp: number): string {
    const timestampUTC = unixTimestamp * 1000;
    return format(new Date(timestampUTC), 'HH:mm');
  }

  console.log(`from ${from24hrsAgo} to ${toNow}`);

  if (status === RequestStatus.error) {
    const message = error || 'Something went wrong';
    Alert.alert('Could not load events', message, [
      {text: 'OK', onPress: () => console.log(message)},
    ]);
  }

  return (
    <>
      <Text style={styles.heading}>Today</Text>
      {data &&
        data
          .sort(
            (eventA, eventB) => eventB.startTimestamp - eventA.startTimestamp,
          ) //latest events first
          .map(event => {
            return (
              <Card key={event.id as string} style={styles.row}>
                <Text style={styles.cell}>{event.eventType}</Text>
                <Text style={styles.cell}>{event.locationId}</Text>
                <Text style={styles.cell}>
                  {formatEventTime(event.startTimestamp)}
                </Text>
                {event.endTimestamp ? (
                  <Text style={styles.cell}>{event.eventType}</Text>
                ) : (
                  <Button
                    label="Stop"
                    size={ButtonSize.small}
                    onPress={() => {}}
                  />
                )}
              </Card>
            );
          })}
    </>
  );
}

export default EventList;

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    ...textVariants.heading,
    ...spacingUtils.paddingT6,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  cell: {
    flex: 1,
    ...textVariants.body,
  },
});
