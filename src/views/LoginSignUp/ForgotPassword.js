import React, {useState} from 'react';

import {Link, useHistory} from 'react-router-dom';

import AuthApi from '../../api/Auth';
import Alert from '@material-ui/lab/Alert';

import CircularProgress from '@material-ui/core/CircularProgress';
export default function ForgotPassword() {
  const history = useHistory();
  const [tenantID, setTenantID] = useState();
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [alertState, setAlertState] = useState();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState();

  const [dbName, setDbName] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tenantID === undefined || userId === undefined || dbName === undefined) {
      return setError(!error);
    }

    setError(false);

    setLoading(true);
    const result = await AuthApi.forgotPassword(tenantID, userId, dbName);

    setLoading(false);
    if (result.ok) {
      setShow(true);
      setAlertState(result.data);
    }
  };

  return (
    <div className="container inner outer col-sm-8 col-md-6 col-lg-4">
      <form onSubmit={handleSubmit}>
        <h3 className="title">Forgot Password</h3>
        <div className="form-group ">
          <label>Restaurant ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Restaurant ID"
            value={tenantID}
            onChange={(e) => setTenantID(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter User Name"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Company"
            value={dbName}
            onChange={(e) => setDbName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn  btn-lg btn-block">
          Get Password
        </button>
        <p className="forgot-password text-right">
          <Link to="/Login">Back to Login</Link>
        </p>
      </form>

      {loading && (
        <CircularProgress style={{alignSelf: 'center'}} color="secondary" />
      )}
      {error && (
        <Alert severity="warning">Please provide the missing Fields!</Alert>
      )}
      {show && <Alert severity="error">{alertState}</Alert>}
    </div>
  );
}
