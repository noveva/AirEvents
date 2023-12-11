import {palette} from './colors';
import spacingUtils from './spacing';

const containerUtils = {
  main: {
    flex: 1,
    backgroundColor: palette.lightBlue,
  },
  withPadding: {
    ...spacingUtils.padding12,
  },
};

export default containerUtils;
