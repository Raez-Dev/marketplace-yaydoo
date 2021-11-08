const endpoint = 'https://api-marketplace-yaydoo.herokuapp.com:5000/api';

let brandEndpoints = {
  get: `${endpoint}/brand`,
};

const get = async () => {
  const response = await fetch(brandEndpoints.get, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    return res.json();
  });

  return response;
};

module.exports = {
  get,
};
