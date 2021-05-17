import React, { createContext, useState } from 'react';

export const ConversionContext = createContext();

export const ConversionContextProvider = ({ children }) => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [quoteCurrency, setQuoteCurrency] = useState('EUR');
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
  };
  return (
    <ConversionContext.Provider value={conversionContext}>
      {children}
    </ConversionContext.Provider>
  );
};
