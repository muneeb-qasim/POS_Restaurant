/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from 'history';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './index.css';
// core components
import Admin from 'layouts/Admin.js';
import RTL from 'layouts/RTL.js';
import Login from '../src/views/LoginSignUp/Login';

import 'assets/css/material-dashboard-react.css?v=1.9.0';
import SignUp from 'views/LoginSignUp/SignUp';
import ForgotPassword from 'views/LoginSignUp/ForgotPassword';
import BillScreen from '../src/views/BillScreen';
import BillReport from 'views/BillReport';
import MakePayment from 'views/MakePayment';
import App from './App';
const hist = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
