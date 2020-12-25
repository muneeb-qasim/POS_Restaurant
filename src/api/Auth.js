import client from './client';

const login = (TenantID, UserId, UserPassword, FYID, DBName) =>
  client.post('/api/Token', {
    TenantID,
    UserId,
    UserPassword,
    FYID,
    DBName,
  });
  
const forgotPassword = (tenantID, userId, dbName) =>
  client.post('/api/Token/forget-password', {
    tenantID,
    userId,
    dbName,
  });

export default {
  login,
  forgotPassword
};
