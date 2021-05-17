import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  separator: {
    backgroundColor: 'black',
    height: StyleSheet.hairlineWidth,
    marginLeft: 20,
  },
});

export const RowItem = (props) => {
  return (
    <TouchableOpacity style={styles.row} onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
      <Entypo name={props.iconName} size={20} color="blue" />
      {props.rightIcon}
    </TouchableOpacity>
  );
};

export const RowSeparator = () => {
  return <View style={styles.separator} />;
};
