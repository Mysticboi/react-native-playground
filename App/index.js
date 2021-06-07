import React from 'react';
import Navigation from './config/Navigation';

// For react-native-elements
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default () => (
  <SafeAreaProvider>
    <Navigation />
  </SafeAreaProvider>
);
