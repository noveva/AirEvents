import React, {useEffect, useReducer, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {palette} from '../common/styles/colors';
import ButtonIcon from '../common/components/ButtonIcon';
import containerUtils from '../common/styles/containers';
import spacingUtils from '../common/styles/spacing';
import {getUnixNow} from '../common/utils';
import {EVENTS_API} from '../api/Endpoints';
import useFetch from '../api/useFetch';
import EventModal from './components/EventModal/EventModal';
import EventList from './components/EventList/EventList';
import {Event} from './EventsTypes';
import {EventsDispatchContext} from './EventsContext';

function Events(): React.JSX.Element {
  const [fetchUrl, setFetchUrl] = useState(getUrl());
  const {status, error, data} = useFetch<Event[]>(fetchUrl);
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventsList, dispatch] = useReducer(eventsReducer, []);

  useEffect(() => {
    dispatch({type: EventsReducerActionType.loaded, payload: data || []});
  }, [data]);

  function toggleModal(refresh: boolean) {
    setModalVisible(!isModalVisible);
    if (refresh) {
      fetchList();
    }
  }

  function getUrl() {
    const toNow = getUnixNow();
    const from24hrsAgo = toNow - 24 * 60 * 60;
    return EVENTS_API.fetch(from24hrsAgo, toNow);
  }

  function fetchList() {
    setFetchUrl(getUrl());
  }

  return (
    <View style={styles.main}>
      <EventsDispatchContext.Provider value={dispatch}>
        <EventList
          status={status}
          error={error}
          data={eventsList}
          refresh={fetchList}
        />
        <ButtonIcon
          icon="add"
          size={40}
          style={styles.addButton}
          onPress={() => toggleModal(false)}
        />
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
    ...containerUtils.withPadding,
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

export enum EventsReducerActionType {
  loaded = 'loaded',
  added = 'added',
  updated = 'updated',
}

export type EventsReducerActionLoaded = {
  type: EventsReducerActionType.loaded;
  payload: Event[];
};

export type EventsReducerActionAdded = {
  type: EventsReducerActionType.added;
  payload: Event;
};

export type EventsReducerActionUpdated = {
  type: EventsReducerActionType.updated;
  payload: Event;
};

export type EventsReducerAction =
  | EventsReducerActionLoaded
  | EventsReducerActionAdded
  | EventsReducerActionUpdated;

export type EventsReducerState = Event[];

function sortEvents(events: Event[] = []) {
  return events.sort(
    (eventA, eventB) => eventB.startTimestamp - eventA.startTimestamp,
  ); //latest events first
}

function eventsReducer(events: Event[], action: EventsReducerAction) {
  let list = [];
  switch (action.type) {
    case 'loaded': {
      list = action.payload;
      break;
    }
    case 'added': {
      list = events.concat(action.payload);
      break;
    }
    case 'updated': {
      list = events.map(event => {
        if (action.payload && event.id === action.payload.id) {
          return action.payload;
        }
        return event;
      });
      break;
    }
    default:
      list = events;
  }
  console.log(
    `ACTION ${action.type}, payload: ${JSON.stringify(action.payload)}`,
  );
  return sortEvents(list);
}

export default Events;
