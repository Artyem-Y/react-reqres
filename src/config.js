const env = process.env.REACT_APP_ENV || 'local';

const ENDPOINTS = {
 local: process.env.REACT_APP_API
};

const getEndpoint = () => {
 return {
  api: `${ENDPOINTS[env]}`
 };
};

const endpoint = getEndpoint();

export default endpoint;
