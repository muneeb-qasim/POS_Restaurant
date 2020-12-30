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
const getItemOutBranch = (token) => {
  return client.get(
    '/api/rest/kot/get-item-list',
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

const saveBill = (token, billData) => {
  return client.post('/api/rest/kot-bill/save-bill', billData, {
    headers: {Authorization: token},
  });
};
const getBillID = (token, tableData) => {
  return client.post(
    `/api/rest/kot/get-billdetails-table?tableName=${tableData}`,
    null,
    {
      headers: {Authorization: token},
    }
  );
};
const makePay = (token, mokData) => {
  return client.post(
'/api/rest/kot/make-payment',
mokData,
    {
      headers: {Authorization: token},
    }
  );
};
const getMOP = (token) => {
  return client.get(
    'api/rest/kot/get-mop-master',
    {table: null},
    {
      headers: {Authorization: token},
    }
  );
};
const getTotSale = (token) => {
  return client.get(
    '/api/rest/kot-bill/get-total-sale-day',
    {table: null},
    {
      headers: {Authorization: token},
    }
  );
};
const getBillReport = (token,startDate,endDate) => {
  return client.post(
    '/api/rest/kot-bill/get-bill-report',
    {startDate,endDate},
    {
      headers: {Authorization: token}
      
    }
  );
};
export default {
  getTable,
  getKot,
  getCategory,
  getItem,
  saveKot,
  getBillDetails,
  saveBill,
  getMOP,
  getBillID,
  makePay,
  getTotSale,
  getBillReport,
  getItemOutBranch
};
