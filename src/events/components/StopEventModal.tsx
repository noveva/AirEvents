import {Alert, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getUnixTime} from 'date-fns';
import spacingUtils from '../../common/styles/spacing';
import {useEvents, useEventsDispatch} from '../EventsContext';
import {EventsReducerActionType} from '../EventsReducer';
import Button from '../../common/components/Button';
import {RequestStatus} from '../../api/RequestReducer';
import {HttpRequestMethods} from '../../api/utils';
import useMutate from '../../api/useMutate';
import {EVENTS_API} from '../../api/Endpoints';
import {TIMESTAMPS} from '../EventsTypes';
import EventFormGroup from '../../common/components/FormGroup';
import {ChipValue, ChipValues} from '../../common/components/Chips';

type Props = {
  id: string;
  onClose: () => void;
};

function StopEventModal({id, onClose}: Props) {
  const eventsList = useEvents();
  const event = eventsList.find(event => event.id === id);
  const errorTitle = 'Cannot end event';
  const timestampOptions: ChipValues<number> = TIMESTAMPS.map(
    ({label, value}) => ({id: value.toString(), label, value}),
  );
  const [endTime, setEndTime] = useState<ChipValue<number>>(
    timestampOptions[0],
  );
  const {status, error, data, mutate} = useMutate<Event>(
    HttpRequestMethods.patch,
  );
  const dispatch = useEventsDispatch();
  const hasEndtimeSelected = endTime && endTime.value >= 0;

  function getTimeFromNow(endTimeValue: number): number {
    return getUnixTime(new Date()) - endTimeValue;
  }

  async function updateEndTime() {
    const body = {
      endTimestamp: getTimeFromNow(endTime.value),
    };
    await mutate(EVENTS_API.stop(id), body);
  }

  function validateEndTime(endTimeSelected: ChipValue<number>) {
    const unixEndTime = getTimeFromNow(endTimeSelected.value);
    const isAfterStartTime = event
      ? unixEndTime - event.startTimestamp > 0
      : false;
    if (isAfterStartTime) {
      setEndTime(endTimeSelected);
    } else {
      Alert.alert(errorTitle, 'End time is before start time', [{text: 'OK'}]);
    }
  }

  useEffect(() => {
    if (status === RequestStatus.fetched && dispatch && endTime) {
      onClose();
      // make sure this effect runs only once
      setEndTime(undefined);
      dispatch({
        type: EventsReducerActionType.updated,
        payload: data,
      });
    }
  }, [status, onClose, dispatch, data, endTime]);

  if (status === RequestStatus.error) {
    const message = error || 'Something went wrong';
    Alert.alert(errorTitle, message, [
      {text: 'OK', onPress: () => console.log(message)},
    ]);
    setEndTime(undefined);
  }

  return (
    <View style={styles.container}>
      <EventFormGroup
        groupId="selectEnd"
        label="Ended"
        selected={endTime?.id}
        options={timestampOptions}
        onPress={validateEndTime}
      />
      <View style={styles.buttonRow}>
        <Button
          label="Submit"
          disabled={!hasEndtimeSelected}
          waiting={status === RequestStatus.fetching}
          onPress={updateEndTime}
        />
      </View>
    </View>
  );
}

export default StopEventModal;

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
