import { useLocation } from "react-router-dom";
import { getCookie, setCookie, deleteCookie, refreshTokenAction } from "../services/actions/auth";

const baseUrl = "https://norma.nomoreparties.space/api/";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const fetchData = async () => {
  return fetch(`${baseUrl}ingredients`).then((res) => checkResponse(res));
};

export const apiPostOrder = async (orderData) => {
  return await fetch(`${baseUrl}orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: orderData,
    }),
  }).then((res) => checkResponse(res));
};

export const apiPasswordReset = async (email) => {
  return await fetch(`${baseUrl}password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then((res) => checkResponse(res))
};

export const apiPasswordSave = async (password, token) => {
  return await fetch(`${baseUrl}password-reset/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  })
    .then((res) => checkResponse(res))
};

export const apiLoginUser = async (email, password) => {
  return await fetch(`${baseUrl}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((res) => checkResponse(res));
};

export const apiLogoutUser = async (token) => {
  return await fetch(`${baseUrl}auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  }).then((res) => checkResponse(res));
};

export const apiRegisterUser = async (name, email, password) => {
  return await fetch(`${baseUrl}auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  }).then((res) => checkResponse(res));
};

export const apiUserRequest = async () => {
  return await fetch(`${baseUrl}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie('token'),
    },
  })
  .then((res) => checkResponse(res))
  .catch((err) => { 
    if (err) {
          apiRefreshToken().then(res => checkResponse(res))
          .then((fin) => {
              return fetch(`${baseUrl}auth/user`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: fin.accessToken
                },
              })
            })
              .then((res) => checkResponse(res))
        } else {
          deleteCookie('token');
          localStorage.removeItem('refreshToken');
          // eslint-disable-next-line
          // location.reload()
          // return Promise.reject(err)
        }
      })
  }

export const apiRefreshToken = async () => {
  console.log(localStorage.getItem('refreshToken'));
  console.log(localStorage);
  return await fetch(`${baseUrl}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then((res) => checkResponse(res));
};

export const apiUpdateUser = async (email, name) => {
  return await fetch(`${baseUrl}auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie('token'),
    },
    body: JSON.stringify({ email, name }),
  }).then((res) => checkResponse(res));
};
