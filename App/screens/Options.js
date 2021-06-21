import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Linking,
  Alert,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { RowItem, RowSeparator } from '../components/RowItem';

import { Footer, FooterTab, Button, Icon } from 'native-base';

const openUrl = (url) => {
  return Linking.openURL(url).catch(() => {
    Alert.alert('Sorry, something went wrong.', 'Please try again later');
  });
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
export default ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView>
        <RowItem
          text="Theme"
          iconName="chevron-right"
          separator="1"
          onPress={() => alert('To do')}
        />

        <RowSeparator />

        <RowItem
          text="Google"
          iconName="export"
          separator="1"
          onPress={() => openUrl('https://google.com')}
        />

        <RowSeparator />

        <RowItem
          text="Facebook"
          iconName="export"
          onPress={() => openUrl('https://facebook.com')}
        />
      </ScrollView>
      <View style={styles.footer}>
        <Footer>
          <FooterTab>
            <Button onPress={() => navigation.push('Home')}>
              <Icon name="cash-outline" />
            </Button>
            <Button active>
              <Icon name="settings" />
            </Button>
            <Button onPress={() => navigation.push('Profile')}>
              <Icon name="person" />
            </Button>
            <Button onPress={() => navigation.push('Database')}>
              <Icon name="cloud-upload" />
            </Button>
          </FooterTab>
        </Footer>
      </View>
    </SafeAreaView>
  );
};
