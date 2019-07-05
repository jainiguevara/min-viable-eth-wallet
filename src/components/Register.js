import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, TextField, Button, Spinner } from './common';

import { UserContext } from './../contexts/UserContext';

const styles = {
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
  }
};

const LoginForm = () => {
  const {
    email,
    password,
    message,
    success,
    loading,
    handleEmailChange,
    handlePasswordChange,
    submitForm,
  } = useContext(UserContext)

  const onEmailChange = text => {
    handleEmailChange(text);
  };

  const onPasswordChange = text => {
    handlePasswordChange(text);
  };

  const onButtonPress = () => {
    submitForm();
  };

  const renderButton = () => {
    if (loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={onButtonPress}>
        Register
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
    </Card>
  );
};

export default LoginForm;
