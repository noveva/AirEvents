import {Alert, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {getUnixTime} from 'date-fns';
import spacingUtils from '../../common/styles/spacing';
import {EventsDispatchContext} from '../EventsContext';
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

function StopEventForm({id, onClose}: Props) {
  const timestampOptions: ChipValues<number> = TIMESTAMPS.map(
    ({label, value}) => ({id: value.toString(), label, value}),
  );
  const [endTime, setEndTime] = useState<ChipValue<number>>(
    timestampOptions[0],
  );
  const {status, error, data, mutate} = useMutate<Event>(
    HttpRequestMethods.patch,
  );
  const dispatch = useContext(EventsDispatchContext);
  const hasEndtimeSelected = endTime && endTime.value >= 0;

  async function updateEndTime() {
    const body = {
      endTimestamp: getUnixTime(new Date()) - endTime.value,
    };
    await mutate(EVENTS_API.stop(id), body);
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
    Alert.alert('Could not create event', message, [
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
        onPress={setEndTime}
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

export default StopEventForm;

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
