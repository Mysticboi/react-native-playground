import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { api } from './api';

export const ConversionContext = createContext();

export const ConversionContextProvider = ({ children }) => {
  const [baseCurrency, _setBaseCurrency] = useState('USD');
  const [quoteCurrency, setQuoteCurrency] = useState('EUR');
  const [date, setDate] = useState();
  const [rates, setRates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [actualScreen, setActualScreen] = useState('Profile');

  const setBaseCurrency = async (currency) => {
    setIsLoading(true);
    try {
      const response = await api(`/latest?base=${currency}`);
      // console.log('response', response);
      _setBaseCurrency(currency);
      setDate(response.date);
      setRates(response.rates);
    } catch (e) {
      console.log('error', e);
      Alert.alert('Something went wrong', e);
    } finally {
      setIsLoading(false);
    }
  };

  const swapCurrencies = () => {
    const currency = baseCurrency;
    setBaseCurrency(quoteCurrency);
    setQuoteCurrency(currency);
  };

  const conversionContext = {
    baseCurrency,
    quoteCurrency,
    setBaseCurrency,
    setQuoteCurrency,
    swapCurrencies,
    date,
    rates,
    isLoading,
  };

  useEffect(() => {
    setBaseCurrency('USD');
  }, []);
  return (
    <ConversionContext.Provider value={conversionContext}>
      {children}
    </ConversionContext.Provider>
  );
};
