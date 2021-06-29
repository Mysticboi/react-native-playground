import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 20,
    position: 'absolute',
    bottom: 100,
    left: 50,
  },
  container: {
    backgroundColor: 'gray',
    flex: 1,
  },
});

export default ({ navigation }) => {
  const [text, setText] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.button}>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>

      <Pressable
        onPressIn={() => setText('Pressing...')}
        onPress={() => setText('Pressed Out')}
        onPressOut={() => setText('Pressed Out')}
        onLongPress={() => setText('Long Pressing...(500ms+)')}
      >
        <Text> Press me</Text>
      </Pressable>

      <Text>{text}</Text>
    </SafeAreaView>
  );
};
