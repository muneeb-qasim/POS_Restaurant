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
const getCategory = (token) => {
  return client.get(
    '/api/rest/kot/get-category',
    {table: null},
    {
      headers: {Authorization: token},
    }
  );
};
const getItem = (token, branch) => {
  return client.get(
    `/api/rest/kot/get-item-list?branchID=${branch}`,
    {table: null},
    {
      headers: {Authorization: token},
    }
  );
};
const saveKot = (token, kotData) => {
  return client.post('/api/rest/kot/save-kot', kotData, {
    headers: {Authorization: token},
  });
};
const getBillDetails = (token, tableName) => {
  return client.get(
    `/api/rest/kot-bill/get-item-from-table?tableName=${tableName}`,
    {table: null},
    {
      headers: {Authorization: token},
    }
  );
};
export default {
  getTable,
  getKot,
  getCategory,
  getItem,
  saveKot,
  getBillDetails
};
