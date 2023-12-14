import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import textVariants from '../../../../common/styles/text';
import spacingUtils from '../../../../common/styles/spacing';

type Props = {
  text: string;
  nativeID: string;
};

function Label({text, nativeID}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text nativeID={nativeID} style={styles.text}>
        {text}
      </Text>
    </View>
  );
}

export default Label;

const styles = StyleSheet.create({
  container: {
    ...spacingUtils.marginV6,
  },
  text: {
    ...textVariants.heading,
  },
});
