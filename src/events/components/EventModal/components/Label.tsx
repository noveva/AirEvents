import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import textVariants from '../../../../common/styles/text';

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
  text: {
    ...textVariants.heading,
  },
});
