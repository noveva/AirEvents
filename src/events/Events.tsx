import React, {useState} from 'react';
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

function Events(): React.JSX.Element {
  const [fetchUrl, setFetchUrl] = useState(getUrl());
  const {status, error, data = []} = useFetch<Event[]>(fetchUrl);
  const [isModalVisible, setModalVisible] = useState(false);

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
      <EventList
        status={status}
        error={error}
        data={data}
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
