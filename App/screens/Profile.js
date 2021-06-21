import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { Avatar } from 'react-native-elements';

import { Footer, FooterTab, Button, Icon } from 'native-base';
import { ConversionContext } from '../util/ConversionContext';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#708090',
    flex: 1,
  },
  avatar: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcomeText: {
    marginTop: 20,
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  barCodeContainer: {
    flex: 1,
    width: 400,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barCode: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeActive, setBarcodeActive] = useState(false);
  const [type, setType] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      setType(type);
      setData(data);
      // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#708090" />
      <View style={styles.avatar}>
        <Avatar
          rounded
          size="xlarge"
          onPress={() => console.log('Works!')}
          activeOpacity={0.7}
          source={require('../assets/images/profile.jpg')}
        />
      </View>

      <Text style={styles.welcomeText}>Hi Walid!</Text>
      <View style={styles.barCode}>
        <Button light onPress={() => setBarcodeActive(!barcodeActive)}>
          <Text>
            {barcodeActive
              ? 'Tap here to close the scanner'
              : 'Tap here to start scanning'}
          </Text>
        </Button>
        {scanned && (
          <Button onPress={() => setScanned(false)}>
            <Text>Tap to scan again</Text>
          </Button>
        )}

        {scanned && (
          <Text>
            Type: {type}, code: {data}
          </Text>
        )}
      </View>

      {barcodeActive && (
        <View style={styles.barCodeContainer}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      )}

      <View style={styles.footer}>
        <Footer>
          <FooterTab>
            <Button
              onPress={() => {
                navigation.push('Home');
              }}
            >
              <Icon name="cash-outline" />
            </Button>
            <Button
              onPress={() => {
                navigation.push('Options');
              }}
            >
              <Icon name="settings" />
            </Button>
            <Button active>
              <Icon name="person" />
            </Button>
            <Button onPress={() => navigation.push('Database')}>
              <Icon name="cloud-upload" />
            </Button>
          </FooterTab>
        </Footer>
      </View>
    </View>
  );
};
