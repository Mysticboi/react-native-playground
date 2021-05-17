import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Options from '../screens/Options';
import CurrencyList from '../screens/CurrencyList';
import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { ConversionContextProvider } from '../util/ConversionContext';

const MainStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator
      // headerMode="none"
      initialRouteName="Home"
    >
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <MainStack.Screen name="Options" component={Options} />
      <MainStack.Screen
        name="CurrencyList"
        component={CurrencyList}
        options={({ route, navigation }) => ({
          title: route.params.title,
          headerLeft: null,
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.pop()}
              style={{ marginHorizontal: 10 }}
            >
              <Entypo name="cross" size={30} color="#708090" />
            </TouchableOpacity>
          ),
        })}
      />
    </MainStack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <ConversionContextProvider>
        <MainStackScreen />
      </ConversionContextProvider>
    </NavigationContainer>
  );
};
