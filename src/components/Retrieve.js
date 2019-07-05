import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Card, CardSection, TextField, Button, Spinner } from './common';

import { UserContext } from './../contexts/UserContext';

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  successTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'green'
  },
  errorSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  keySection: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  keyLabel: {
    height: 45,
    fontSize: 25,
    fontWeight: '400',
    padding: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  keyText: {
    height: 45,
    padding: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  keyTextAlt: {
    height: 45,
    padding: 5,
    backgroundColor: '#eeee',
    flexWrap: 'wrap',
    flexDirection: 'row',
  }
});

const Retrieve = () => {
  const {
    email,
    password,
    message,
    success,
    loading,
    handleEmailChange,
    handlePasswordChange,
    loadKeys,
  } = useContext(UserContext)
  const [keys, setKeys] = useState([])

  const onEmailChange = text => {
    handleEmailChange(text);
  };

  const onPasswordChange = text => {
    handlePasswordChange(text);
  };

  const onButtonPress = async () => {
    const array = await loadKeys(email, password);
    setKeys(array);
  };

  const renderButton = () => {
    if (loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={onButtonPress}>
        Retrieve
      </Button>
    );
  };

  const renderMessage = () => {
    if (message) {
      return (
        <CardSection style={styles.errorSection}>
          <Text style={success ? styles.successTextStyle : styles.errorTextStyle}>
            {message}
          </Text>
        </CardSection>
      );
    }
    return (
      <CardSection>
        <Text style={styles.errorTextStyle}>
            &nbsp;
          </Text>
      </CardSection>
    )
  };

  return (
    <Card>
      {renderMessage()}
      <CardSection>
        <TextField
          label="Email"
          placeholder="email@email.com"
          onChangeText={onEmailChange}
          value={email}
        />
      </CardSection>
      <CardSection> 
        <TextField
          secureTextEntry
          label="Password"
          placeholder="password"
          onChangeText={onPasswordChange}
          value={password}
        /> 
      </CardSection>
      <CardSection>
        {renderButton()}
      </CardSection>
      <CardSection>
        <View style={styles.keySection}>
          <Text style={styles.keyLabel}>PRIVATE KEY/S:</Text>
          {keys.map((k, i) => {
            return (
              <Text
                style={i % 2 === 0 ?
                  styles.keyTextAlt :
                  styles.keyText}
                key={k.private}
              >
                {k.private}
              </Text>
            )
          })}
        </View>
      </CardSection>
    </Card>
  );
};

export default Retrieve;
