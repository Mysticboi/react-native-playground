import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

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
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    maxHeight: 30,
  },
  cross: {
    position: 'absolute',
    right: 10,
  },
  button: {
    marginVertical: 10,
    marginLeft: 100,
  },
});
const db = SQLite.openDatabase('database.db');

export default ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'Create table if not exists Items (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT) '
      );
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
        setItems(rows._array);
      });
    });
  };

  const remove = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM Items WHERE id = ?',
        [id],
        (tx, results) => {
          console.log('Executed Delete query');
        },
        (tx, error) => {
          console.log('Could not execute Delete query');
          console.log('DeleteError', error);
        }
      );
      tx.executeSql('select * from items', [], (_, { rows }) => {
        setItems(rows._array);
      });
    });
  };
  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.button}>
        <Button2
          light
          onPress={() => {
            add(text);
            setText('');
          }}
        >
          <Text>Press here to submit the text</Text>
        </Button2>
      </View>
      {items.map((item) => {
        return (
          <View style={styles.itemContainer} key={item.id}>
            <Text style={styles.text}>{item.value}</Text>
            <TouchableOpacity
              style={styles.cross}
              onPress={() => remove(item.id)}
            >
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
          </View>
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
    </SafeAreaView>
  );
};
