import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {palette} from './colors';
import spacingUtils from './spacing';

const containerUtils: {[key: string]: ViewStyle | TextStyle | ImageStyle} = {
  main: {
    flex: 1,
    backgroundColor: palette.blue95,
  },
  withPadding: {
    ...spacingUtils.paddingH12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export default containerUtils;
