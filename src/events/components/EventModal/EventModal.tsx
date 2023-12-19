import React, {useContext, useEffect, useState} from 'react';
import {Alert, SafeAreaView, StyleSheet, View} from 'react-native';
import spacingUtils from '../../../common/styles/spacing';
import containerUtils from '../../../common/styles/containers';
import ButtonIcon from '../../../common/components/ButtonIcon';
import EventForm from './components/EventForm';
import {EVENTS_API} from '../../../api/Endpoints';
import useMutate from '../../../api/useMutate';
import {RequestStatus} from '../../../api/RequestReducer';
import {HttpRequestMethods} from '../../../api/utils';
import {Event} from '../../EventsTypes';
import {EventsDispatchContext} from '../../EventsContext';
import {EventsReducerActionType} from '../../EventsReducer';
import {iconSize} from '../../../common/styles/iconSize';

type Props = {onClose: () => void};

function EventModal({onClose}: Props): React.JSX.Element {
  const {status, error, data, mutate} = useMutate<{id: string}>(
    HttpRequestMethods.post,
  );
  const [eventData, setEventData] = useState<Event>();
  const dispatch = useContext(EventsDispatchContext);

  async function addEvent(eventFormData: Event) {
    await mutate(EVENTS_API.add, eventFormData);
    setEventData(eventFormData);
  }

  useEffect(() => {
    if (status === RequestStatus.fetched && dispatch && eventData && data) {
      onClose();
      dispatch({
        type: EventsReducerActionType.added,
        payload: {...eventData, ...data}, //assign event id to form data
      });
    }
  }, [status, onClose, dispatch, eventData, data]);

  if (status === RequestStatus.error) {
    const message = error || 'Something went wrong';
    Alert.alert('Could not create event', message, [
      {text: 'OK', onPress: () => console.log(message)},
    ]);
    setEventData(undefined);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.wrapper}>
        <ButtonIcon
          icon="arrow-back"
          size={iconSize.medium}
          style={styles.backButton}
          onPress={onClose}
        />
        <EventForm status={status} onSubmit={addEvent} />
      </View>
    </SafeAreaView>
  );
}

export default EventModal;

const styles = StyleSheet.create({
  modal: {
    ...containerUtils.main,
    ...spacingUtils.margin0,
  },
  safeArea: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    ...containerUtils.withPadding,
  },
  backButton: {
    alignSelf: 'flex-start',
    ...spacingUtils.paddingT6,
  },
});
