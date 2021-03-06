import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Text,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { ConversionInput } from '../components/ConversionInput';
import { format } from 'date-fns';
import { Button } from '../components/Button';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ConversionContext } from '../util/ConversionContext';

import { Footer, FooterTab, Button as Button2, Icon } from 'native-base';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#708090',
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSquare: {
    width: screen.width * 0.45,
    height: screen.height * 0.45,
  },
  logo: {
    position: 'absolute',
    width: screen.width * 0.2,
    height: screen.height * 0.2,
  },
  textHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginVertical: 10,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },
  header: {
    alignItems: 'flex-end',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
export default ({ navigation }) => {
  const [value, setValue] = useState('100');
  const {
    baseCurrency,
    quoteCurrency,
    swapCurrencies,
    date,
    rates,
    isLoading,
  } = useContext(ConversionContext);

  const conversionRate = rates[quoteCurrency];
  console.log('date', date);
  console.log('rates', rates);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      setScrollEnabled(true);
    });

    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setScrollEnabled(false);
    });
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView scrollEnabled={scrollEnabled}>
        <StatusBar barStyle="light-content" backgroundColor="#708090" />
        {/*
          <SafeAreaView style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.push('Options');
              }}
            >
              <Entypo name="cog" size={32} color="white" />
            </TouchableOpacity>
          </SafeAreaView>
          */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/background.png')}
            style={styles.logoSquare}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.textHeader}>Currency Converter</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <>
            <ConversionInput
              text={baseCurrency}
              value={value}
              onButtonPress={() =>
                navigation.push('CurrencyList', {
                  title: 'Base Currency',
                  isBaseCurrency: true,
                })
              }
              onChangeText={(text) => setValue(text)}
              keyboardType="numeric"
            />
            <ConversionInput
              text={quoteCurrency}
              value={
                value && `${(parseFloat(value) * conversionRate).toFixed(2)}`
              }
              onButtonPress={() =>
                navigation.push('CurrencyList', {
                  title: 'Quote Currency',
                  isBaseCurrency: false,
                })
              }
              onChangeText={(text) => console.log('text', text)}
              keyboardType="numeric"
              editable={false}
            />
            <Text
              style={styles.text}
            >{`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${
              date && format(new Date(date), 'MMMM do, yyyy')
            }`}</Text>
            <Button
              text="Reverse Currencies"
              onPress={() => swapCurrencies()}
            />
          </>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <Footer>
          <FooterTab>
            <Button2 active>
              <Icon name="cash-outline" />
            </Button2>
            <Button2 onPress={() => navigation.push('Options')}>
              <Icon name="settings" />
            </Button2>
            <Button2 onPress={() => navigation.push('Profile')}>
              <Icon name="person" />
            </Button2>
            <Button2 onPress={() => navigation.push('Database')}>
              <Icon name="cloud-upload" />
            </Button2>
          </FooterTab>
        </Footer>
      </View>
    </View>
  );
};
