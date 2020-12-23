import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './index.css';
// core components
import Admin from 'layouts/Admin.js';
import RTL from 'layouts/RTL.js';
import Login from '../src/views/LoginSignUp/Login';

import 'assets/css/material-dashboard-react.css?v=1.9.0';
import SignUp from '../src/views/LoginSignUp/SignUp';
import ForgotPassword from '../src/views/LoginSignUp/ForgotPassword';
import BillScreen from '../src/views/BillScreen';
import BillReport from '../src/views/BillReport';
import MakePayment from '../src/views/MakePayment';

import KotScreen from "views/KotScreen";
import NewOrder from "views/NewOrder";
import Dashboard from "views/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/addCustomer" component={SignUp} />
        <Route path="/ForgotPassword" component={ForgotPassword} />

        <Route path="/BillScreen" component={BillScreen} />
        <Route path="/BillReport" component={BillReport} />
        <Route path="/MakePayment" component={MakePayment} />
        <Route path="/KotScreen" component={KotScreen} />
      <Route path="/NewOrder" component={NewOrder} />
      <Route path="/Dashboard" component={Dashboard} />
{/* 
        <Route path="/admin" component={Admin} />
       <Route path="/rtl" component={RTL} /> */}
        <Redirect to="/Dashboard" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
