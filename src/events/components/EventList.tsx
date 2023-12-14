import React from 'react';
import {Alert, Text, View} from 'react-native';
import {getUnixTimestamp} from '../../api/Utils';
import textVariants from '../../common/styles/text';
import {palette} from '../../common/styles/colors';
import {RequestStatus} from '../../api/RequestReducer';
import {EVENTS_API} from '../../api/Endpoints';
import useFetch from '../../api/FetchRequest';
import {Event} from '../EventsTypes';

function EventList(): React.JSX.Element {
  const toNow = getUnixTimestamp(new Date().getTime());
  const from24hrsAgo = toNow - 24 * 60 * 60;

  const {status, error, data} = useFetch<Event[]>(
    EVENTS_API.fetch(from24hrsAgo, toNow),
  );
  console.log(`${status}: from ${from24hrsAgo} to ${toNow}`);

  if (status === RequestStatus.error) {
    const message = error || 'Something went wrong';
    Alert.alert('Could not load events', message, [
      {text: 'OK', onPress: () => console.log(message)},
    ]);
  }

  return (
    <>
      {data &&
        data.map(event => {
          return (
            <View
              key={event.id}
              style={[
                {
                  backgroundColor: palette.blue84,
                  marginTop: 10,
                  padding: 10,
                  borderRadius: 20,
                },
              ]}>
              <Text style={textVariants.body}>{event.eventType}</Text>
            </View>
          );
        })}
    </>
  );
}

export default EventList;
