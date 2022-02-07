const env = process.env.REACT_APP_ENV || 'local';

const ENDPOINTS = {
 local: 'http://localhost:3000'
};

const getEndpoint = () => {
 return {
  api: `${ENDPOINTS[env]}`
 };
};

const endpoint = getEndpoint();

export default endpoint;
