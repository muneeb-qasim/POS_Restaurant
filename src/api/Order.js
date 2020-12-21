import client from './client';

const getTable = (token) => {

  return client.get(
    '/api/rest/kot/get-table-list',
    {table: null},
    {
      headers: {Authorization: token},
    }
  );
};
const getKot = (token) => {

  return client.get(
    '/api/rest/kot/get-waiter',
    {table: null},
    {
      headers: {Authorization: token},
    }
  );
};
export default {
  getTable,
  getKot
};
