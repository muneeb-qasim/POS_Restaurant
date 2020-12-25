import React, {useState} from 'react';
import AuthApi from '../../api/Auth';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

import {Link, useHistory} from 'react-router-dom';
function Login() {
  const history = useHistory();
  const [tenantID, setTenantID] = useState();
  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState();
  const [dbName, setDbName] = useState();
  const [userPassword, setUserPassword] = useState();
  const FYID = 1;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      tenantID === undefined ||
      userId === undefined ||
      userPassword === undefined ||
      dbName === undefined
    ) {
      return setError(!error);
    }

    setError(false);

    setLoading(true);
    const result = await AuthApi.login(
      tenantID,
      userId,
      userPassword,
      FYID,
      dbName
    );

    setLoading(false);
    if (result.ok) {
      setError1(false);
      localStorage.setItem('jwt', result.data.token);
      localStorage.setItem('user', result.data.username);
      history.push('/Dashboard');
    } else {
      setError1(true);
    }
  };
  return (
    <div className="container inner outer col-sm-8 col-md-6 col-lg-4">
      <form onSubmit={handleSubmit}>
        <h3 className="title">Log in</h3>

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
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn  btn-lg btn-block">
          Sign in
        </button>
        <p className="forgot-password text-right">
          <Link to="/ForgotPassword">Forgot password?</Link>
        </p>
      </form>
      {loading && (
        <CircularProgress style={{alignSelf: 'center'}} color="secondary" />
      )}
      {error && (
        <Alert severity="warning">Please provide the missing Fields!</Alert>
      )}
      {error1 && <Alert severity="error">User Not Found!</Alert>}
    </div>
  );
}

export default Login;
