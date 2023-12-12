import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import EventFormGroup from './FormGroup';
import spacingUtils from '../../../../common/styles/spacing';

interface Event {
  locationId: EventLocation;
  eventType: EventType;
  startTimestamp: number; //unix epoch time
  endTimestamp: number; //unix epoch time
}

type TimeStamp = {
  label: string;
  value: number;
};

const EVENTS = ['boil', 'fry', 'oven', 'window', 'laundry'] as const;
const LOCATIONS = ['livingroom', 'bedroom'] as const;
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
type EventType = (typeof EVENTS)[number];
type EventLocation = (typeof LOCATIONS)[number];

function EventForm(): React.JSX.Element {
  const [event, setEvent] = useState<EventType>();
  const [location, setLocation] = useState<EventLocation>(LOCATIONS[0]);
  const [startTimestamp, setStartTimestamp] = useState<string>(
    TIMESTAMPS[0].label,
  );
  const timestampOptions = TIMESTAMPS.map(stamp => stamp.label);

  // number of seconds since epoch
  // function getUnixEpoch(secondsAgo: number): number {
  //   return Math.floor(Date.now() / 1000) - secondsAgo;
  // }

  //   function getTimeStamp(selectedLabel: string) {
  //     const stamp = TIMESTAMPS.find(({label}) => label === selectedLabel);
  //     if (stamp) {
  //       setStartTimestamp(getUnixEpoch(stamp.value));
  //     }
  //   }

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
    </View>
  );
}

export default EventForm;

const styles = StyleSheet.create({
  container: {
    ...spacingUtils.marginV6,
  },
});
