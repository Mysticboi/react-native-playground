import React, { useState } from 'react';

import {
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
  },
  containerDisabled: {
    backgroundColor: '#f0f0f0',
  },
  button: {
    padding: 15,
    borderRightColor: '#708090',
    borderRightWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    color: '#708090',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    textDecorationColor: 'white',
    padding: 10,
    color: 'black',
  },
});
export const ConversionInput = (props) => {
  const containerStyles = [styles.container];
  if (props.editable === false) {
    containerStyles.push(styles.containerDisabled);
  }
  return (
    <View style={containerStyles}>
      <TouchableOpacity onPress={props.onButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>{props.text}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={props.value}
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        editable={props.editable}
      />
    </View>
  );
};
