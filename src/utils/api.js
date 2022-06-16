const apiUrl = "https://norma.nomoreparties.space/api/ingredients";
const postUrl = "https://norma.nomoreparties.space/api/orders";

export const fetchData = async () => {
  const res = await fetch(apiUrl);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const apiPostOrder = async (orderData) => {
  const response = await fetch(postUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      { 
        "ingredients": orderData
      } 
    ) 
  });
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}