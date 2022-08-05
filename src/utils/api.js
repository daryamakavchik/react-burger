import {
  getCookie
} from "../services/actions/auth";

export const baseUrl = "https://norma.nomoreparties.space/api/";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then(err => Promise.reject(err));
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
  }).then((res) => checkResponse(res));
};

export const apiPasswordSave = async (password, token) => {
  return await fetch(`${baseUrl}password-reset/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  }).then((res) => checkResponse(res));
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
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then((res) => checkResponse(res))
};

export const apiRefreshToken = async (refreshToken) => {
  return await fetch(`${baseUrl}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then((res) => checkResponse(res));
};

export const apiUpdateUser = async (email, name) => {
  return await fetch(`${baseUrl}auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({ email, name }),
  }).then((res) => checkResponse(res));
};


export const getCorrectOrders = (orders, data) => {
  const correctOrders = [];
  orders.forEach((order) => {
    const { ingredients, ...rest } = order;
    const correctIngredients = getIngredients(order.ingredients, data);
    if (correctIngredients && correctIngredients.length) {
      correctOrders.push({ ...rest, ingredients: correctIngredients });
    }
  });
  return correctOrders;
};

export const getDoneInProgressOrders = (orders) => {
  const done = [];
  const inProgress = [];
  orders.forEach((order) => {
    if (order.status === 'done') {
      done.push(order.number);
    } else {
      inProgress.push(order.number);
    }
  });
  return { done, inProgress };
};


export const getIngredients = (ids, data) => {
  const result = [];

  const ingredients = new Map();
  const buns = new Set();

  ids.forEach((id) => {
    const count = ingredients.get(id);
    if (count) {
      ingredients.set(id, count + 1);
    } else {
      ingredients.set(id, 1);
    }
  });

  if (data.length) {
    for (let [id, count] of ingredients) {
      data.forEach((ingredient) => {
        if (ingredient._id === id) {
          if (ingredient.type === 'bun') {
            buns.add(id);
            count = 2;
          }
          result.push({ ...ingredient, quantity: count });
        }
      });
    }
  }
  if (buns.size === 1) {
    return result;
  }
  return [];
};