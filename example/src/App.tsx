import React from 'react';
import { Alert, Button, Text, View } from 'react-native';

import * as C72RfidScanner from 'react-native-chainway-rfid';

const App = () => {
  const [isReading, setIsReading] = React.useState(false);

  const [powerState, setPowerState] = React.useState('');

  const [tags, setTags] = React.useState([]);

  const showAlert = (title, data) => {
    Alert.alert(
      title,
      data,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };

  const powerListener = (data) => {
    //console.log(data);
    setPowerState(data);
  };

  const tagListener = (data) => {
    //rssi = data[1] epc = data[0] //Iam only interested in the EPC tag
    setTags((tags) => tags.concat(data[0]));
  };

  React.useEffect(() => {
    const scanner = C72RfidScanner;
    scanner.initializeReader();
    scanner.powerListener(powerListener);
    scanner.tagListener(tagListener);
    return () => scanner.deInitializeReader();
  }, []);

  const readPower = async () => {
    try {
      let result = await C72RfidScanner.readPower();
      showAlert('SUCCESS', `The result is ${result}`);
      console.log(result);
    } catch (error) {
      showAlert('FAILED', error.message);
    }
  };

  const changePower = async () => {
    try {
      let result = await C72RfidScanner.changePower(10);
      showAlert('SUCCESS', `The result is ${result}`);
      console.log(result);
    } catch (error) {
      showAlert('FAILED', error.message);
    }
  };

  const scanSingleTag = async () => {
    try {
      let result = await C72RfidScanner.readSingleTag();
      showAlert('SUCCESS', `The result is ${result}`);
      console.log(result);
    } catch (error) {
      showAlert('FAILED', error.message);
    }
  };


  const startReading = () => {
    C72RfidScanner.startReadingTags(function success(message) {
      setIsReading(message);
    });
  };

  const stopReading = () => {
    C72RfidScanner.stopReadingTags(function success(message) {
      setIsReading(false);
    });

    /**
     * When I stop scanning I immediately return the tags in my state
     * (You could render a view or do whatever you want with the data)
     */
    console.log(tags);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text>{powerState}</Text>
      </View>

      <View style={{ marginVertical: 20 }}>
        <Button
          style={{ margin: 10 }}
          onPress={() => readPower()}
          title="Read Power"
        />
      </View>
      <View style={{ marginVertical: 20 }}>
        <Button
          style={{ margin: 10 }}
          onPress={() => changePower()}
          title="Change Power to 10"
        />
      </View>
      <View style={{ marginVertical: 20 }}>
        <Button
          style={{ margin: 10 }}
          onPress={() => changePower()}
          title="Write EPC"
        />
      </View>
      <View style={{ marginVertical: 20 }}>
        <Button
          style={{ margin: 10 }}
          onPress={() => scanSingleTag()}
          title="Read Single Tag"
        />
      </View>

      <View style={{ marginVertical: 20 }}>
        <Button
          disabled={isReading}
          style={{ margin: 10 }}
          onPress={() => startReading()}
          title="Start Bulk Scan"
        />
      </View>

      <View style={{ marginVertical: 20 }}>
        <Button
          disabled={!isReading}
          style={{ margin: 10 }}
          onPress={() => stopReading()}
          title="Stop Bulk Scan"
        />
      </View>
    </View>
  );
};

export default App;
