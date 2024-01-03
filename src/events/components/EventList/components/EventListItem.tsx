import React, {useEffect} from 'react';
import {Text, StyleSheet, Alert, View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getUnixTime, fromUnixTime, isToday} from 'date-fns';
import Card from '../../../../common/components/Card';
import textVariants from '../../../../common/styles/text';
import useMutate from '../../../../api/useMutate';
import {HttpRequestMethods} from '../../../../api/utils';
import {RequestStatus} from '../../../../api/RequestReducer';
import {EVENTS_API} from '../../../../api/Endpoints';
import spacingUtils from '../../../../common/styles/spacing';
import {palette} from '../../../../common/styles/colors';
import ButtonIcon from '../../../../common/components/ButtonIcon';
import containerUtils from '../../../../common/styles/containers';
import {formatHHmm} from '../../../../common/utils';
import {Event, LocationIcons} from '../../../EventsTypes';
import {useEventsDispatch} from '../../../EventsContext';
import {EventsReducerActionType} from '../../../EventsReducer';
import {iconSize} from '../../../../common/styles/iconSize';
import {EventListProps} from '../EventList';

function EventListItem({
  id,
  eventType,
  locationId,
  startTimestamp,
  endTimestamp,
  onEventPress,
}: Event & Pick<EventListProps, 'onEventPress'>): React.JSX.Element {
  const dispatch = useEventsDispatch();
  const startTime = formatEventTime(startTimestamp);
  const endTime = endTimestamp && formatEventTime(endTimestamp);
  const canStopEvent = isToday(fromUnixTime(startTimestamp));
  const {status, error, data, mutate} = useMutate<Event>(
    HttpRequestMethods.patch,
  );

  function formatEventTime(unixTimestamp: number): string {
    return formatHHmm(fromUnixTime(unixTimestamp));
  }

  async function stop() {
    await mutate(EVENTS_API.stop(id as string), {
      endTimestamp: getUnixTime(new Date()),
    });
  }

  function handlePress() {
    // open stop event modal only if there is no end time
    if (!endTimestamp) {
      onEventPress(id as string);
    }
  }

  if (status === RequestStatus.error) {
    const message = error || 'Something went wrong';
    Alert.alert('Could not stop event', message, [
      {text: 'OK', onPress: () => console.log(message)},
    ]);
  }

  useEffect(() => {
    if (status === RequestStatus.fetched && data && dispatch) {
      dispatch({type: EventsReducerActionType.updated, payload: data});
    }
  }, [status, data, dispatch]);

  return (
    <Pressable
      onPress={handlePress}
      style={({pressed}) =>
        pressed && !endTime
          ? {
              opacity: 0.5,
            }
          : {}
      }>
      <Card style={{...styles.row, ...styles.rowFixedHeight}}>
        <View style={[styles.cell, styles.row]}>
          <View style={styles.icon}>
            <Icon
              name={LocationIcons[locationId]}
              size={iconSize.medium}
              color={palette.white}
              allowFontScaling={false}
            />
          </View>
          <Text style={[styles.textWithPadding, styles.heading]}>
            {eventType}
          </Text>
        </View>
        <Text style={[styles.textWithPadding, styles.text]}>{startTime}</Text>
        <View style={[styles.row, styles.lastCell]}>
          {endTime ? (
            <Text style={[styles.text]}>{endTime}</Text>
          ) : canStopEvent ? (
            <ButtonIcon
              icon="stop"
              size={iconSize.small}
              style={styles.stopButton}
              onPress={stop}
            />
          ) : (
            <Text style={[styles.text]}>-</Text>
          )}
        </View>
      </Card>
    </Pressable>
  );
}

export default EventListItem;

const styles = StyleSheet.create({
  row: {
    ...containerUtils.row,
  },
  rowFixedHeight: {
    minHeight: 70,
  },
  cell: {
    flex: 1,
  },
  lastCell: {
    width: 68,
    justifyContent: 'center',
  },
  text: {
    ...textVariants.body,
  },
  textWithPadding: {
    ...spacingUtils.paddingH12,
  },
  heading: {
    ...textVariants.headingSmall,
  },
  stopButton: {
    backgroundColor: palette.blue63,
    borderRadius: 20,
    padding: 12,
  },
  icon: {
    // vertically align icon with text in row
    height: iconSize.medium - 4,
  },
});
