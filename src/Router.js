import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

import Register from './components/Register';
import Retrieve from './components/Retrieve';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="main">
          <Scene
            rightTitle="Retrieve"
            onRight={() => { Actions.retrieve(); }}
            key="register"
            component={Register}
            title="Please Register"
            initial
          />
          <Scene
            key="retrieve"
            component={Retrieve}
            title="Retrieve"
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
