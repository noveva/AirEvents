import {StyleSheet} from 'react-native';
import {palette} from './colors';

const textVariants = StyleSheet.create({
  body: {
    fontSize: 16,
    color: palette.white,
  },
  heading: {
    fontSize: 20,
    color: palette.white,
  },
  headingSmall: {
    fontSize: 18,
    color: palette.white,
  },
  caption: {
    fontSize: 14,
    color: palette.white,
  },
});

export default textVariants;
