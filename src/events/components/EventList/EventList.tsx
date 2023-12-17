import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
} from 'react-native';
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
  const eventsList = data.sort(
    (eventA, eventB) => eventB.startTimestamp - eventA.startTimestamp,
  ); //latest events first

  if (status === RequestStatus.error) {
    const message = error || 'Something went wrong';
    Alert.alert('Could not load events', message, [
      {text: 'OK', onPress: () => console.log(message)},
    ]);
  }

  function updateList(event: Event) {
    setUpdatedEventId(event.id);
  }

  function renderItem({item}: ListRenderItemInfo<Event>) {
    return (
      <EventListItem
        key={item.id as string}
        id={item.id}
        eventType={item.eventType as EventType}
        locationId={item.locationId as EventLocation}
        startTimestamp={item.startTimestamp}
        endTimestamp={item.endTimestamp}
        onUpdate={updateList}
      />
    );
  }

  if (status === RequestStatus.error) {
    const message = error || 'Something went wrong';
    Alert.alert('Could not load events', message, [
      {text: 'OK', onPress: () => console.log(message)},
    ]);
  }

  return (
    <>
      <Text style={styles.heading}>Today</Text>
      <FlatList
        data={eventsList}
        renderItem={renderItem}
        keyExtractor={event => event.id as string}
        onRefresh={() => updateList(data[data.length - 1])}
        refreshing={status === RequestStatus.fetching}
      />
    </>
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
