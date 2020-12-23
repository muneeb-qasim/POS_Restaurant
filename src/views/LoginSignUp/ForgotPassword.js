import React, {Component} from 'react';

import {Link, useHistory} from 'react-router-dom';
export default class ForgotPassword extends Component {
  render() {
    return (
      <div className="container inner outer col-sm-4 col-md-6 col-lg-4">
        <form>
          <h3 className="title">Forgot Password</h3>
          <div className="form-group ">
            <label>Restaurant ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Restaurant ID"
            />
          </div>
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter User Name"
            />
          </div>

          <button type="submit" className="btn  btn-lg btn-block">
            Get Password
          </button>
          <p className="forgot-password text-right">
            <Link to="/Login">Back to Login</Link>
          </p>
        </form>
      </div>
    );
  }
}
