import React, {useEffect, createContext, useReducer} from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  useHistory,
} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './index.css';

// core components

import Login from '../src/views/LoginSignUp/Login';
import 'assets/css/material-dashboard-react.css?v=1.9.0';
import ForgotPassword from '../src/views/LoginSignUp/ForgotPassword';
import BillScreen from '../src/views/BillScreen';
import BillReport from '../src/views/BillReport';
import MakePayment from '../src/views/MakePayment';
import KotScreen from 'views/KotScreen';
import NewOrder from 'views/NewOrder';
import Dashboard from '../src/views/Dashboard';

import {initialState, reducer} from './reducers/userReducer';

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('jwt');
   
    if (user !== null && token !==null) {

      history.push('/Dashboard');
      
    } else {
      history.push('/Login');
    }
  }, []);
  return (
    <Switch>
      <Route path="/Login" component={Login} />
      <Route path="/ForgotPassword" component={ForgotPassword} />
      <Route path="/BillScreen" component={BillScreen} />
      <Route path="/BillReport" component={BillReport} />
      <Route path="/MakePayment" component={MakePayment} />
      <Route path="/KotScreen" component={KotScreen} />
      <Route path="/NewOrder" component={NewOrder} />
      <Route path="/Dashboard" component={Dashboard} />
      <Redirect to="/Login" />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
