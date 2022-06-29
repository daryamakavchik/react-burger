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

export const apiPostOrder = (orderData) => {
  return fetch(`${baseUrl}orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: orderData,
    }),
  }).then(res => 
  checkResponse(res));
};