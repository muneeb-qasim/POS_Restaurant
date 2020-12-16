import React, { Component } from "react";

export default class SignUp extends Component {
  render() {
    return (
      <div className="container inner outer">
        <form>
          <h3 className="title">Add New Customer</h3>

          <div className="form-group">
            <label>Customer name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer name"
            />
          </div>
          <div className="form-group">
            <label>Mobile</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Mobile"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label>GST number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter GST Number"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" className="form-control" placeholder="Address" />
          </div>

          <button type="submit" className="btn btn-dark btn-lg btn-block">
            Register
          </button>
          <p className="forgot-password text-right">
            Already registered <a href="#">log in?</a>
          </p>
        </form>
      </div>
    );
  }
}
