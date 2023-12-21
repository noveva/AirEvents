import React, {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {getUnixTime} from 'date-fns';
import {EVENTS_API} from '../../api/Endpoints';
import useMutate from '../../api/useMutate';
import {RequestStatus} from '../../api/RequestReducer';
import {HttpRequestMethods} from '../../api/utils';
import spacingUtils from '../../common/styles/spacing';
import Button from '../../common/components/Button';
import {
  EVENTS,
  Event,
  EventLocation,
  EventType,
  LOCATIONS,
} from '../EventsTypes';
import {EventsDispatchContext} from '../EventsContext';
import {EventsReducerActionType} from '../EventsReducer';
import EventFormGroup from '../../common/components/FormGroup';

import {ChipValue, ChipValues} from '../../common/components/Chips';

type TimeStamp = {
  label: string;
  value: number;
};

const TIMESTAMPS: TimeStamp[] = [
  {label: 'now', value: 0},
  {label: '5m ago', value: 5 * 60},
  {label: '10m ago', value: 10 * 60},
  {label: '20m ago', value: 20 * 60},
  {label: '30m ago', value: 30 * 60},
  {label: '40m ago', value: 40 * 60},
  {label: '50m ago', value: 50 * 60},
  {label: '1h ago', value: 60 * 60},
];

type Props = {onClose: () => void};

function AddEventModal({onClose}: Props): React.JSX.Element {
  const eventTypeOptions: ChipValues<string> = mapOptions(EVENTS);
  const locationOptions: ChipValues<string> = mapOptions(LOCATIONS);
  const timestampOptions: ChipValues<number> = TIMESTAMPS.map(
    ({label, value}) => ({id: value.toString(), label, value}),
  );
  const [startTime, setStartTime] = useState<ChipValue<number>>(
    timestampOptions[0],
  );
  const [event, setEvent] = useState<Partial<Event> | undefined>({
    locationId: locationOptions[0].value as EventLocation,
    startTimestamp: timestampOptions[0].value,
  });
  const {status, error, data, mutate} = useMutate<{id: string}>(
    HttpRequestMethods.post,
  );
  const dispatch = useContext(EventsDispatchContext);
  const isValidEvent: boolean =
    !!event &&
    !!event.eventType &&
    !!event.locationId &&
    !!startTime &&
    startTime.value >= 0;

  function mapOptions(values: readonly string[]) {
    return values.map(value => ({
      label: value,
      id: value,
      value,
    }));
  }

  function updateLocation({value}: ChipValue<EventLocation>) {
    setEvent({...event, locationId: value} as Event);
  }

  function updateType({value}: ChipValue<EventType>) {
    setEvent({...event, eventType: value} as Event);
  }

  async function addEvent() {
    const withUpdatedStart = {
      ...event,
      startTimestamp: getUnixTime(new Date()) - startTime.value,
    };
    setEvent(withUpdatedStart);
    await mutate(EVENTS_API.add, withUpdatedStart as Event);
  }

  useEffect(() => {
    if (status === RequestStatus.fetched && dispatch && event && data) {
      // make sure this effect runs only once
      setEvent(undefined);
      onClose();
      dispatch({
        type: EventsReducerActionType.added,
        payload: {...event, ...data} as Event, //assign event id to form data
      });
    }
  }, [status, onClose, dispatch, event, data]);

  if (status === RequestStatus.error) {
    const message = error || 'Something went wrong';
    Alert.alert('Could not create event', message, [
      {text: 'OK', onPress: () => console.log(message)},
    ]);
    setEvent(undefined);
  }

  return (
    <View style={styles.container}>
      <EventFormGroup
        groupId="selectLocation"
        label="Location"
        options={locationOptions}
        selected={event?.locationId}
        onPress={updateLocation}
      />
      <EventFormGroup
        groupId="selectEventType"
        label="Event"
        options={eventTypeOptions}
        selected={event?.eventType}
        onPress={updateType}
      />
      <EventFormGroup
        groupId="selectStart"
        label="Started"
        selected={startTime.id}
        options={timestampOptions}
        onPress={setStartTime}
      />
      <View style={styles.buttonRow}>
        <Button
          label="Submit"
          disabled={!isValidEvent}
          waiting={status === RequestStatus.fetching}
          onPress={addEvent}
        />
      </View>
    </View>
  );
}

export default AddEventModal;

const styles = StyleSheet.create({
  container: {
    ...spacingUtils.marginV6,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    ...spacingUtils.marginV6,
  },
});
