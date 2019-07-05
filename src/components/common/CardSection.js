import React from 'react';
import { View } from 'react-native';

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: '#ddd',
    position: 'relative',
  },
};

const CardSection = props => (
  <View style={[styles.containerStyle, props.style]}>
    {props.children}
  </View>
);

export { CardSection };
