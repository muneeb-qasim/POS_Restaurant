import {create} from 'apisauce';

const apiClient = create({
  baseURL: 'https://billtronapi.hellopatna.com',
});

export default apiClient;
