import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Linking,
  Alert,
  StatusBar,
} from 'react-native';
import { RowItem, RowSeparator } from '../components/RowItem';

const openUrl = (url) => {
  return Linking.openURL(url).catch(() => {
    Alert.alert('Sorry, something went wrong.', 'Please try again later');
  });
};
export default () => {
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
    </SafeAreaView>
  );
};
