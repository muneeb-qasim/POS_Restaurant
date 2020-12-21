import client from './client';

const getCustomer = (token,number) => {

  return client.get(
    `/api/rest/kot-bill/get-customer-details?mobile=${number}`,
    {table: null},
    {
      headers: {Authorization: token},
    }
  );
};
export default {
  getCustomer
};
