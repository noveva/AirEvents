import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text} from 'react-native';
import {getUnixNow} from '../../../api/Utils';
import textVariants from '../../../common/styles/text';
import spacingUtils from '../../../common/styles/spacing';
import containerUtils from '../../../common/styles/containers';
import {RequestStatus} from '../../../api/RequestReducer';
import {EVENTS_API} from '../../../api/Endpoints';
import useFetch from '../../../api/FetchRequest';
import {Event, EventLocation, EventType} from '../../EventsTypes';
import EventListItem from './EventListItem';

function EventList(): React.JSX.Element {
  const toNow = getUnixNow();
  const from24hrsAgo = toNow - 24 * 60 * 60;
  const {
    status,
    error,
    data = [],
  } = useFetch<Event[]>(EVENTS_API.fetch(from24hrsAgo, toNow));
  const [updatedEventId, setUpdatedEventId] = useState<string>();

  if (status === RequestStatus.error) {
    const message = error || 'Something went wrong';
    Alert.alert('Could not load events', message, [
      {text: 'OK', onPress: () => console.log(message)},
    ]);
  }

  function updateList(event: Event) {
    setUpdatedEventId(event.id);
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Today</Text>
      {data.length > 0 &&
        data
          .sort(
            (eventA, eventB) => eventB.startTimestamp - eventA.startTimestamp,
          ) //latest events first
          .map(event => {
            return (
              <EventListItem
                key={event.id as string}
                id={event.id}
                eventType={event.eventType as EventType}
                locationId={event.locationId as EventLocation}
                startTimestamp={event.startTimestamp}
                endTimestamp={event.endTimestamp}
                onUpdate={updateList}
              />
            );
          })}
    </ScrollView>
  );
}

export default EventList;

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    ...textVariants.heading,
    ...spacingUtils.marginT16,
    ...spacingUtils.marginB12,
  },
  container: {
    ...containerUtils.withPadding,
  },
});
