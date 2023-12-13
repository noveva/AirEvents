import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import spacingUtils from '../../../../common/styles/spacing';
import Button from '../../../../common/components/Button';
import {getUnixEpoch} from '../../../../api/Utils';
import {RequestStatus, RequestStatusString} from '../../../../api/RequestTypes';
import {
  EVENTS,
  Event,
  EventLocation,
  EventType,
  LOCATIONS,
} from '../../../EventsTypes';
import EventFormGroup from './FormGroup';

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
  const [event, setEvent] = useState<EventType>();
  const [location, setLocation] = useState<EventLocation>(LOCATIONS[0]);
  const [startTimestamp, setStartTimestamp] = useState<string>(
    TIMESTAMPS[0].label,
  );
  const timestampOptions = TIMESTAMPS.map(stamp => stamp.label);
  const isValidEvent: boolean = !!event && !!location && !!startTimestamp;

  function getTimeStamp(selectedLabel: string): number {
    const stamp = TIMESTAMPS.find(({label}) => label === selectedLabel);
    return stamp ? getUnixEpoch(stamp.value) : 0;
  }

  function submit() {
    const data: Event = {
      startTimestamp: getTimeStamp(startTimestamp),
      eventType: event as EventType,
      locationId: location,
    };
    onSubmit(data);
  }

  return (
    <View style={styles.container}>
      <EventFormGroup
        groupId="selectLocation"
        label="Location"
        values={LOCATIONS}
        selected={location}
        onPress={setLocation}
      />
      <EventFormGroup
        groupId="selectEvent"
        label="Event"
        values={EVENTS}
        selected={event}
        onPress={setEvent}
      />
      <EventFormGroup
        groupId="selectStart"
        label="Started"
        selected={startTimestamp}
        values={timestampOptions}
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
