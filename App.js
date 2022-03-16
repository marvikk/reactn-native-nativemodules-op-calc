/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  NativeModules,
  Platform
} from 'react-native';

const App = () => {
  const { IOSCalcResult, AndroidCalcResult } = NativeModules;

  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [operationResult, setOperationResult] = useState('');

  const operations = ["Addition", "Subtraction", "Multiplication", "Division"]

  const onFirstInputChange = input => {
    const validatedInput = input.replace(/[^0-9]/g, '')

    if (validatedInput != 'undefined' && firstNumber.length < 2) {
      setFirstNumber(validatedInput)
    }
  }

  const onSecondInputChange = input => {
    const validatedInput = input.replace(/[^0-9]/g, '')

    if (validatedInput != 'undefined' && secondNumber.length < 2) {
      setSecondNumber(validatedInput)
    }
  }


  onFirstInputDelete = (e) => {
    console.log(e.nativeEvent.key)
    if (e.nativeEvent.key === 'Backspace') {
      firstNumber ? setFirstNumber(firstNumber.substring(0, firstNumber.length - 1)) : null;
    }
  }

  onSecondInputDelete = (e) => {
    console.log(e.nativeEvent.key)
    if (e.nativeEvent.key === 'Backspace') {
      secondNumber ? setSecondNumber(secondNumber.substring(0, secondNumber.length - 1)) : null;
    }
  }

  const performRandomOparation = () => {

    let selectedOperatorIndex = Math.floor(Math.random() * operations.length);
    let rolledOperation = operations[selectedOperatorIndex];

    setOperation(rolledOperation);

    if (Platform.OS === 'android') {
      AndroidCalcResult.performCalc(parseInt(firstNumber), parseInt(secondNumber), rolledOperation, (res) => {
        setOperationResult(res)
      });
    }

    else if (Platform.OS === 'ios')
      IOSCalcResult.performCalc(parseInt(firstNumber), parseInt(secondNumber), rolledOperation, (res) => {
        setOperationResult(res);
      })

  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.main}>
        <Text style={styles.inputText}>Please enter two Numbers</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={firstNumber}
            style={styles.input}
            onChangeText={onFirstInputChange}
            onKeyPress={e => onFirstInputDelete(e)}
          />
          <TextInput
            value={secondNumber}
            style={styles.input}
            onChangeText={onSecondInputChange}
            onKeyPress={onSecondInputDelete}
          />

        </View>
        <Pressable
          color='#f194ff'
          title="Calculate"
          style={[styles.button, { opacity: !firstNumber || !secondNumber ? 0.2 : 1 }]}
          onPress={performRandomOparation}
          disabled={!firstNumber || !secondNumber}
        >
          <Text style={styles.buttonText}>Calculate</Text>
        </Pressable>

        <Text style={{ fontSize: 30, textAlign: 'center', color: 'green', marginBottom: 25 }}>Result</Text>
        <Text style={{ fontSize: 25, textAlign: 'center', marginBottom: 25 }}>Operation: {operation}</Text>
        <Text style={{ fontSize: 25, textAlign: 'center' }}>Result: {operationResult}</Text>

      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  inputContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  main: {
    paddingTop: 50,
  },
  inputText: {
    fontSize: 25,
    textAlign: 'center',
    color: 'blue',
    marginBottom: 25
  },
  input: {
    width: '30%',
    backgroundColor: 'lightgrey',
    padding: 15,
    fontSize: 30,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5
  },
  button: {
    alignSelf: 'center',
    width: '50%',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 45
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25
  }
})

export default App;
