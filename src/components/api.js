const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27',
  headers: {
    authorization: 'a5b41191-4295-4942-b6d9-1f6a428d0b55',
    'Content-Type': 'application/json'
  }
}

export const request = ({route, method, body}) => {
  return fetch(`${config.baseUrl}/${route}`, {
    method,
    headers: config.headers,
    body: body ? JSON.stringify(body) : undefined
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}