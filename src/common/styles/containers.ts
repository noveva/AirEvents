import {palette} from './colors';
import spacingUtils from './spacing';

const containerUtils = {
  main: {
    flex: 1,
    backgroundColor: palette.blue95,
  },
  withPadding: {
    ...spacingUtils.paddingH12,
  },
};

export default containerUtils;
