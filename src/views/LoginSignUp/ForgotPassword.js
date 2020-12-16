import React, { Component } from "react";
export default class ForgotPassword extends Component {
  render() {
    return (
      <div className="container inner outer">
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
        </form>
      </div>
    );
  }
}
