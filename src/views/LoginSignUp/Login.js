import React, { Component } from "react";
export default class Login extends Component {
  render() {
    return (
      <div className="container inner outer">
        <form>
          <h3 className="title">Log in</h3>

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
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
            />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input "
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <button type="submit" className="btn  btn-lg btn-block">
            Sign in
          </button>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </form>
      </div>
    );
  }
}
