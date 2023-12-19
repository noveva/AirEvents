import React from 'react';
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import textVariants from '../../../common/styles/text';
import spacingUtils from '../../../common/styles/spacing';
import containerUtils from '../../../common/styles/containers';
import {RequestState, RequestStatus} from '../../../api/RequestReducer';
import {palette} from '../../../common/styles/colors';
import {Event, EventLocation, EventType} from '../../EventsTypes';
import EventListItem from './components/EventListItem';
import EventListHeader from './components/EventListHeader';

interface Props extends RequestState<Event[]> {
  refresh: () => void;
}

function EventList({
  status,
  error,
  data = [],
  refresh,
}: Props): React.JSX.Element {
  if (status === RequestStatus.error) {
    const message = error || 'Something went wrong';
    Alert.alert('Could not load events', message, [
      {text: 'OK', onPress: () => console.log(message)},
    ]);
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
      />
    );
  }

  return (
    <>
      <EventListHeader />
      {data.length === 0 && status !== RequestStatus.fetching && (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>No events</Text>
        </View>
      )}
      {(data.length > 0 || status === RequestStatus.fetching) && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={event => event.id as string}
          onRefresh={refresh}
          refreshing={status === RequestStatus.fetching}
        />
      )}
    </>
  );
}

export default EventList;

const styles = StyleSheet.create({
  container: {
    ...containerUtils.withPadding,
  },
  messageContainer: {
    flex: 1,
    ...spacingUtils.marginT16,
    alignItems: 'center',
  },
  message: {
    ...textVariants.body,
    color: palette.blue63,
  },
});
