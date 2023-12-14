import React, {useEffect} from 'react';
import {Alert, SafeAreaView, StyleSheet, View} from 'react-native';
import spacingUtils from '../../../common/styles/spacing';
import containerUtils from '../../../common/styles/containers';
import ButtonIcon from '../../../common/components/ButtonIcon';
import EventForm from './components/EventForm';
import {EVENTS_API} from '../../../api/Endpoints';
import useMutate from '../../../api/useMutate';
import {RequestStatus} from '../../../api/RequestReducer';
import {HttpRequestMethods} from '../../../api/Utils';
import {Event} from '../../EventsTypes';

type Props = {onClose: () => void};

function EventModal({onClose}: Props): React.JSX.Element {
  const {status, error, mutate} = useMutate(HttpRequestMethods.post);

  async function addEvent(data: Event) {
    await mutate(EVENTS_API.add, data);
  }

  useEffect(() => {
    if (status === RequestStatus.fetched) {
      onClose();
    }
  }, [status, onClose]);

  if (status === RequestStatus.error) {
    const message = error || 'Something went wrong';
    Alert.alert('Could not create event', message, [
      {text: 'OK', onPress: () => console.log(message)},
    ]);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.wrapper}>
        <ButtonIcon
          icon="arrow-back"
          size={28}
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
