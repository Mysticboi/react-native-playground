import React, { useContext } from 'react';
import { StatusBar, View, ScrollView, StyleSheet } from 'react-native';

import currencies from '../data/currencies.json';
import { RowItem, RowSeparator } from '../components/RowItem';
import { Entypo } from '@expo/vector-icons';
import { ConversionContext } from '../util/ConversionContext';

const styles = StyleSheet.create({
  icon: {
    backgroundColor: '#708090',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ({ navigation, route }) => {
  const { baseCurrency, quoreCurrency, setBaseCurrency, setQuoteCurrency } =
    useContext(ConversionContext);

  const selected = (currency) => {
    if (route.params.isBaseCurrency) return currency === baseCurrency;
    else return currency === quoreCurrency;
  };
  return (
    <ScrollView>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {currencies.map((currency, i) => (
        <View style={{ marginBottom: 1 }} key={currency}>
          <RowItem
            key={currency}
            text={currency}
            onPress={() => {
              if (route.params.isBaseCurrency) {
                setBaseCurrency(currency);
              } else {
                setQuoteCurrency(currency);
              }
              navigation.pop();
            }}
            rightIcon={
              selected(currency) && (
                <View style={styles.icon}>
                  <Entypo name="check" size={20} color="white" />
                </View>
              )
            }
          />
          <RowSeparator key={i} />
        </View>
      ))}
    </ScrollView>
  );
};

/*import React from 'react';
import { StatusBar, FlatList, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import currencies from '../data/currencies.json';
import { RowItem, RowSeparator } from '../components/RowItem';

export default ({ navigation }) => {
  const insets = useSafeArea();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <FlatList
        data={currencies}
        renderItem={({ item }) => {
          return (
            <RowItem
              text={item}
              onPress={() => {
                navigation.pop();
              }}
            />
          );
        }}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <RowSeparator />}
        ListFooterComponent={() => (
          <View style={{ paddingBottom: insets.bottom }} />
        )}
      />
    </View>
  );
};
*/
