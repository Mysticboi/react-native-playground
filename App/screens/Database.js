import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { Footer, FooterTab, Button as Button2, Icon } from 'native-base';
import * as SQLite from 'expo-sqlite';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  infoText: {
    fontSize: 17,
    color: 'blue',
    fontStyle: 'italic',
    margin: 10,
  },
});
const db = SQLite.openDatabase('db.db');

export default ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'Create table if not exists Items (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT) '
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Items',
        [],
        (tx, result) => {
          console.log('Initial results', result.rows._array);
          setItems(result.rows._array);
        },
        (tx, error) => {
          console.log('Failed select');
          console.log('error', error);
        }
      );
    });
  }, []);

  const add = (text) => {
    if (text === null || text === '') {
      return false;
    }

    console.log('text', text);

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Items (value) values (?)',
        [text],
        (tx, results) => {
          console.log('Executed Inser query');
        },
        (tx, error) => {
          console.log('Could not execute insert query');
          console.log('error', error);
        }
      );
      console.log('Inserted');
      tx.executeSql('select * from items', [], (_, { rows }) => {
        console.log('rows', JSON.stringify(rows));
        setItems(rows._array);
      });
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Database Testing</Text>
      <Text style={styles.infoText}>
        Write some text in the input and it will be added to the SQLite
        Database.
      </Text>
      <Text style={styles.infoText}>
        It is stored internally on the device so if you restart the app it will
        stay there
      </Text>
      <TextInput
        value={text}
        style={styles.input}
        onChangeText={(value) => setText(value)}
      />

      <Button2
        light
        onPress={() => {
          add(text);
          setText('');
        }}
      >
        <Text>Press here to submit the text</Text>
      </Button2>
      {items.map((item) => {
        return (
          <Text style={styles.text} key={item.id}>
            {item.value}
          </Text>
        );
      })}

      <View style={styles.footer}>
        <Footer>
          <FooterTab>
            <Button2 onPress={() => navigation.push('Home')}>
              <Icon name="cash-outline" />
            </Button2>
            <Button2 onPress={() => navigation.push('Options')}>
              <Icon name="settings" />
            </Button2>
            <Button2 onPress={() => navigation.push('Profile')}>
              <Icon name="person" />
            </Button2>
            <Button2 active>
              <Icon name="cloud-upload" />
            </Button2>
          </FooterTab>
        </Footer>
      </View>
    </View>
  );
};
