import client from './client';

const login = (TenantID, UserId, UserPassword, FYID, DBName) =>
  client.post('/api/Token', {
    TenantID,
    UserId,
    UserPassword,
    FYID,
    DBName,
  });

export default {
  login,
};
