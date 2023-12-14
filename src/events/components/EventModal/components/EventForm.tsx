import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import spacingUtils from '../../../../common/styles/spacing';
import Button from '../../../../common/components/Button';
import {getUnixNow} from '../../../../api/Utils';
import {
  RequestStatus,
  RequestStatusString,
} from '../../../../api/RequestReducer';
import {
  EVENTS,
  Event,
  EventLocation,
  EventType,
  LOCATIONS,
} from '../../../EventsTypes';
import EventFormGroup from './FormGroup';
import {ChipValue, ChipValues} from './Chips';

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

type Props = {
  status: RequestStatusString;
  onSubmit: (eventData: Event) => Promise<void>;
};

function EventForm({status, onSubmit}: Props): React.JSX.Element {
  const eventOptions: ChipValues<string> = mapOptions(EVENTS);
  const locationOptions: ChipValues<string> = mapOptions(LOCATIONS);
  const timestampOptions: ChipValues<number> = TIMESTAMPS.map(
    ({label, value}) => ({id: value.toString(), label, value}),
  );
  const [event, setEvent] = useState<ChipValue<string>>();
  const [location, setLocation] = useState<ChipValue<string>>(
    locationOptions[0],
  );
  const [startTimestamp, setStartTimestamp] = useState<ChipValue<number>>(
    timestampOptions[0],
  );
  const isValidEvent: boolean = !!event && !!location && !!startTimestamp;

  function mapOptions(values: readonly string[]) {
    return values.map(value => ({
      label: value,
      id: value,
      value,
    }));
  }

  function getStartTime(secondsAgo: number): number {
    return getUnixNow() - secondsAgo;
  }

  function submit() {
    const data: Event = {
      startTimestamp: getStartTime(startTimestamp.value),
      eventType: event?.value as EventType,
      locationId: location.value as EventLocation,
    };
    onSubmit(data);
  }

  return (
    <View style={styles.container}>
      <EventFormGroup
        groupId="selectLocation"
        label="Location"
        options={locationOptions}
        selected={location.id}
        onPress={setLocation}
      />
      <EventFormGroup
        groupId="selectEvent"
        label="Event"
        options={eventOptions}
        selected={event?.id}
        onPress={setEvent}
      />
      <EventFormGroup
        groupId="selectStart"
        label="Started"
        selected={startTimestamp.id}
        options={timestampOptions}
        onPress={setStartTimestamp}
      />
      <View style={styles.buttonRow}>
        <Button
          label="Submit"
          disabled={!isValidEvent}
          waiting={status === RequestStatus.fetching}
          onPress={submit}
        />
      </View>
    </View>
  );
}

export default EventForm;

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
