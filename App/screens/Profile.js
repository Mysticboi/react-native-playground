import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Avatar } from 'react-native-elements';

import { Footer, FooterTab, Button, Icon } from 'native-base';
import { ConversionContext } from '../util/ConversionContext';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#708090',
    flex: 1,
  },
  avatar: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcomeText: {
    marginTop: 20,
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Avatar
          rounded
          size="xlarge"
          onPress={() => console.log('Works!')}
          activeOpacity={0.7}
          source={require('../assets/images/profile.jpg')}
        />
      </View>

      <Text style={styles.welcomeText}>Hi Walid!</Text>

      <View style={styles.footer}>
        <Footer>
          <FooterTab>
            <Button
              onPress={() => {
                navigation.push('Home');
              }}
            >
              <Icon name="cash-outline" />
            </Button>
            <Button
              onPress={() => {
                navigation.push('Options');
              }}
            >
              <Icon name="settings" />
            </Button>
            <Button active>
              <Icon name="person" />
            </Button>
          </FooterTab>
        </Footer>
      </View>
    </View>
  );
};
