import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {format} from 'date-fns';
import {getUnixTimestamp} from '../../api/Utils';
import textVariants from '../../common/styles/text';
import {palette} from '../../common/styles/colors';
import spacingUtils from '../../common/styles/spacing';
import {RequestStatus} from '../../api/RequestReducer';
import {EVENTS_API} from '../../api/Endpoints';
import useFetch from '../../api/FetchRequest';
import Button, {ButtonSize} from '../../common/components/Button';
import {Event} from '../EventsTypes';

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
              <View
                key={event.id}
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: palette.blue84,
                    marginTop: 10,
                    padding: 10,
                    borderRadius: 20,
                  },
                ]}>
                <Text style={styles.rowCell}>{event.eventType}</Text>
                <Text style={styles.rowCell}>{event.locationId}</Text>
                <Text style={styles.rowCell}>
                  {formatEventTime(event.startTimestamp)}
                </Text>
                {event.endTimestamp ? (
                  <Text style={styles.rowCell}>{event.eventType}</Text>
                ) : (
                  <View
                    style={[
                      styles.rowCell,
                      {flexDirection: 'row', justifyContent: 'flex-end'},
                    ]}>
                    <Button
                      label="Stop"
                      size={ButtonSize.small}
                      onPress={() => {}}
                    />
                  </View>
                )}
              </View>
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
  rowCell: {
    flex: 1,
    ...textVariants.body,
  },
});
