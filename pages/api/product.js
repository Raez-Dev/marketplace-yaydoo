const endpoint = 'http://localhost:5000/api';

let productEndpoints = {
  post: `${endpoint}/products`,
  getByUser: `${endpoint}/products/user/:userId`,
  getByAdminUser: `${endpoint}/products/adm/:userAdmId/user/:userId`,
  getList: `${endpoint}/products/:name/:sku/:priceLow/:priceHigh`,
};

const getByUser = async (userId, token) => {
  const response = await fetch(
    productEndpoints.getByUser.replace(':userId', userId),
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => {
    return res.json();
  });

  return response;
};

const getByAdminUser = async ({ userAdmId, userId }) => {
  const response = await fetch(
    productEndpoints.getByAdminUser
      .replace(':userAdmId', userAdmId)
      .replace(':userId', userId),
    {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => {
    return res.json();
  });

  return response;
};

//customers
const getList = async (name, sku, priceLow, priceHigh) => {
  const response = await fetch(
    productEndpoints.getList
      .replace(':name', name === '' ? ' ' : name)
      .replace(':sku', sku === '' ? ' ' : sku)
      .replace(':priceLow', priceLow)
      .replace(':priceHigh', priceHigh),
    {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => {
    return res.json();
  });

  return response;
};

const post = async (product) => {
  const response = await fetch(productEndpoints.post, {
    method: 'POST',
    body: JSON.stringify(product),
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
  getByUser,
  getByAdminUser,
  getList,
  post,
};
