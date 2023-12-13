import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import spacingUtils from '../../../common/styles/spacing';
import containerUtils from '../../../common/styles/containers';
import ButtonIcon from '../../../common/components/ButtonIcon';
import EventForm from './components/EventForm';
import {EVENTS_API} from '../../../api/Endpoints';
import usePost from '../../../api/PostRequest';
import {RequestStatus} from '../../../api/RequestTypes';
import {Event} from '../../EventsTypes';

type Props = {onClose: () => void};

function EventModal({onClose}: Props): React.JSX.Element {
  const {status, error, post} = usePost(EVENTS_API.add);

  async function addEvent(data: Event) {
    await post(data);
  }

  if (status === RequestStatus.fetched) {
    onClose();
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
