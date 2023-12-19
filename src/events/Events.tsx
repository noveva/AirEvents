import React, {useEffect, useReducer, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {getUnixTime, startOfDay, isToday} from 'date-fns';
import {palette} from '../common/styles/colors';
import ButtonIcon from '../common/components/ButtonIcon';
import containerUtils from '../common/styles/containers';
import spacingUtils from '../common/styles/spacing';
import {EVENTS_API} from '../api/Endpoints';
import useFetch from '../api/useFetch';
import EventModal from './components/EventModal/EventModal';
import EventList from './components/EventList/EventList';
import {
  Event,
  EventModalState,
  EventModalStateString,
  EventModals,
} from './EventsTypes';
import {EventsDispatchContext} from './EventsContext';
import {EventsReducerActionType, eventsReducer} from './EventsReducer';

type FetchEventsParams = {
  timestamp: Date;
  fetchUrl: string;
};

function Events(): React.JSX.Element {
  const [{timestamp, fetchUrl}, setFetchUrl] = useState(getUrl());
  const {status, error, data} = useFetch<Event[]>(fetchUrl);
  const [modalIds, setModalState] = useState<EventModalState>({});
  const [eventsList, dispatch] = useReducer(eventsReducer, []);
  const isTimestampToday = timestamp ? isToday(timestamp) : false;

  useEffect(() => {
    dispatch({type: EventsReducerActionType.loaded, payload: data || []});
  }, [data]);

  function toggleModal(id: EventModalStateString) {
    const toggledModal = {[id]: !modalIds[id]};
    setModalState({...modalIds, ...toggledModal});
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

  return (
    <View style={styles.main}>
      <EventsDispatchContext.Provider value={dispatch}>
        <EventList
          status={status}
          error={error}
          data={eventsList}
          timestamp={timestamp}
          refresh={fetchList}
        />
        {isTimestampToday && (
          <ButtonIcon
            icon="add"
            size={40}
            style={styles.addButton}
            onPress={() => toggleModal(EventModals.addEvent)}
          />
        )}
        <Modal
          style={styles.modal}
          isVisible={modalIds[EventModals.addEvent]}
          animationIn="slideInRight"
          animationOut="slideOutRight"
          animationInTiming={800}
          animationOutTiming={800}
          hasBackdrop={false}>
          {modalIds[EventModals.addEvent] && (
            <EventModal onClose={() => toggleModal(EventModals.addEvent)} />
          )}
        </Modal>
      </EventsDispatchContext.Provider>
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
