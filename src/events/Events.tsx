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
import {Event} from './EventsTypes';
import {EventsDispatchContext} from './EventsContext';
import {EventsReducerActionType, eventsReducer} from './EventsReducer';

type FetchEventsParams = {
  timestamp: Date;
  fetchUrl: string;
};

function Events(): React.JSX.Element {
  const [{timestamp, fetchUrl}, setFetchUrl] = useState(getUrl());
  const {status, error, data} = useFetch<Event[]>(fetchUrl);
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventsList, dispatch] = useReducer(eventsReducer, []);
  const isTimestampToday = timestamp ? isToday(timestamp) : false;

  useEffect(() => {
    dispatch({type: EventsReducerActionType.loaded, payload: data || []});
  }, [data]);

  function toggleModal() {
    setModalVisible(!isModalVisible);
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

  function fetchList(fetchTo?: Date) {
    setFetchUrl(getUrl(fetchTo));
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
            onPress={toggleModal}
          />
        )}
        <Modal
          style={styles.modal}
          isVisible={isModalVisible}
          animationIn="slideInRight"
          animationOut="slideOutRight"
          animationInTiming={800}
          animationOutTiming={800}
          hasBackdrop={false}>
          {isModalVisible && <EventModal onClose={toggleModal} />}
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
