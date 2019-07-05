
import React from 'react';
import Router from './Router'
import { UserProvider } from './contexts/UserContext'

const App = () => {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
};

export default App;
