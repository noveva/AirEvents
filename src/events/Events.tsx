import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {getUnixTime, startOfDay, isToday} from 'date-fns';
import {palette} from '../common/styles/colors';
import ButtonIcon from '../common/components/ButtonIcon';
import containerUtils from '../common/styles/containers';
import spacingUtils from '../common/styles/spacing';
import {EVENTS_API} from '../api/Endpoints';
import useFetch from '../api/useFetch';
import {iconSize} from '../common/styles/iconSize';
import ModalWrapper from '../common/components/ModalWrapper';
import AddEventModal from './components/AddEventModal';
import EventList from './components/EventList/EventList';
import {Event, EventModalStateString, EventModals} from './EventsTypes';
import {EventsProvider, useEventsDispatch} from './EventsContext';
import {EventsReducerActionType} from './EventsReducer';
import StopEventModal from './components/StopEventModal';

type FetchEventsParams = {
  timestamp: Date;
  fetchUrl: string;
};

function Events(): React.JSX.Element {
  const [{timestamp, fetchUrl}, setFetchUrl] = useState(getUrl());
  const {status, error, data} = useFetch<Event[]>(fetchUrl);
  const [isModalOpen, setModalState] = useState<EventModalStateString>();
  const dispatch = useEventsDispatch();
  const [eventId, setEventId] = useState<string>();
  const canAddEvents = timestamp ? isToday(timestamp) : false;

  useEffect(() => {
    if (dispatch) {
      dispatch({type: EventsReducerActionType.loaded, payload: data || []});
    }
  }, [data, dispatch]);

  function toggleModal(modalId: EventModalStateString) {
    setModalState(isModalOpen === modalId ? undefined : modalId);
  }

  function fetchList(fetchTo?: Date) {
    setFetchUrl(getUrl(fetchTo));
  }

  function getUrl(fetchTo?: Date): FetchEventsParams {
    const timestampTo = fetchTo ? new Date(fetchTo) : new Date();
    const midnight = startOfDay(timestampTo);
    return {
      timestamp: timestampTo,
      fetchUrl: EVENTS_API.fetch(
        getUnixTime(midnight),
        getUnixTime(timestampTo),
      ),
    };
  }

  function openCustomStopTimes(id: string) {
    toggleModal(EventModals.stopTime);
    setEventId(id);
  }

  return (
    <View style={styles.main}>
      <EventsProvider>
        <EventList
          status={status}
          error={error}
          timestamp={timestamp}
          refresh={fetchList}
          onEventPress={openCustomStopTimes}
        />
        <>
          {canAddEvents && (
            <ButtonIcon
              icon="add"
              size={iconSize.large}
              style={styles.addButton}
              onPress={() => toggleModal(EventModals.addEvent)}
            />
          )}
        </>
        <ModalWrapper
          isVisible={isModalOpen === EventModals.addEvent}
          onClose={() => toggleModal(EventModals.addEvent)}>
          <AddEventModal onClose={() => toggleModal(EventModals.addEvent)} />
        </ModalWrapper>
        <ModalWrapper
          isVisible={isModalOpen === EventModals.stopTime}
          onClose={() => toggleModal(EventModals.stopTime)}>
          <StopEventModal
            id={eventId as string}
            onClose={() => toggleModal(EventModals.stopTime)}
          />
        </ModalWrapper>
      </EventsProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  modal: {
    ...containerUtils.main,
    ...spacingUtils.margin0,
  },
  addButton: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: palette.orange,
    position: 'absolute',
    bottom: spacingUtils.marginR18.marginRight,
    right: spacingUtils.marginR18.marginRight,
  },
});

export default Events;
