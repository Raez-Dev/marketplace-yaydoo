const endpoint = 'http://localhost:5000/api';

const userEndpoints = {
  login: `${endpoint}/login`,
  user: `${endpoint}/user`,
  getSeller: `${endpoint}/sellers`,
};

const login = async (userLogin) => {
  const response = await fetch(userEndpoints.login, {
    method: 'POST',
    body: JSON.stringify(userLogin),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    return res.json();
  });

  return response;
};

const user = async (user) => {
  const response = await fetch(userEndpoints.user, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    return res.json();
  });

  return response;
};

const getSeller = async () => {
  const response = await fetch(
    userEndpoints.getSeller,
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


module.exports = {
  login,
  user,
  getSeller,
};
