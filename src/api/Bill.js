import client from './client';

const getCustomer = (token, number) => {
  return client.get(
    `/api/rest/kot-bill/get-customer-details?mobile=${number}`,
    {table: null},
    {
      headers: {Authorization: token},
    }
  );
};
const addCustomer = (
  token,
  customerName,
  address1,
  address2,
  mobile,
  email,
  gstNumber
) => {
  return client.post(
    '/api/rest/kot-bill/insert-customer-details',
    {customerName, address1, address2, mobile, email, gstNumber},
    {
      headers: {Authorization: token},
    }
  );
};
const makePay = (token, payData) => {
  return client.post('/api/rest/kot/make-payment', payData, {
    headers: {Authorization: token},
  });
};
export default {
  getCustomer,
  addCustomer,
  makePay,
};
