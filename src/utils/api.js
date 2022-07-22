const baseUrl = "https://norma.nomoreparties.space/api/";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};


export const fetchData = async () => {
  return fetch(`${baseUrl}ingredients`).then(res => 
  checkResponse(res));
};

export const apiPostOrder = async (orderData) => {
  return await fetch(`${baseUrl}orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "ingredients": orderData
    }),
  }).then(res => 
  checkResponse(res));
};

export const apiPasswordReset = async (email, redirectFunc) => {
  return await fetch(`${baseUrl}password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "email": email
    }),
  }).then(res => 
  checkResponse(res)).then((fin) => fin.success && redirectFunc());
};

export const apiPasswordSave = async (password, token) => {
  return await fetch(`${baseUrl}password-reset/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "password": password,
      "token": token
    }),
  }).then(res => 
  checkResponse(res)).then((fin) => console.log(fin));
};

export const apiLoginUser = async (email, password) => {
  return await fetch(`${baseUrl}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "email": email, 
      "password": password
  }),
  }).then(res => checkResponse(res))
}

export const apiRegisterUser= async (name, email, password) => {
  return await fetch(`${baseUrl}auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "email": email, 
      "password": password,
      "name": name
  }),
  }).then(res => 
  checkResponse(res))
};

export const apiUserRequest = async (token) =>
  await fetch(`${baseUrl}auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }).then((res) => checkResponse(res)); 

  export const apiRefreshToken = async (token) => {
    await fetch(`${baseUrl}auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        "token": token
      }
  })
}