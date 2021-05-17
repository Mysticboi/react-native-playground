import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  ProgressViewIOSComponent,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonIcon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
export const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Image
        source={require('../assets/images/reverse.png')}
        style={styles.buttonIcon}
        resizeMode="contain"
      />
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
};
