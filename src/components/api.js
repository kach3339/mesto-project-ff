const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27',
  headers: {
    authorization: 'a5b41191-4295-4942-b6d9-1f6a428d0b55',
    'Content-Type': 'application/json'
  }
}

const request = ({route, method, body}) => {
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

export const fetchUser = () => {
  return request({
    route: 'users/me',
    method: 'GET',
  });
}

export const fetchInitialCards = () => {
  return request({
    route: 'cards',
    method: 'GET',
  })
}

export const submitUserInfo = (nameInputText,jobInputText) => {
  return request({
    route: 'users/me',
    method: 'PATCH',
    body: {
      name: nameInputText,
      about: jobInputText
    }
  })
}

export const submitUserAvatar = (avatarInputLink) => {
  return request({
    route: 'users/me/avatar',
    method: 'PATCH',
    body: {
      avatar: avatarInputLink
    }
  })
}

export const submitNewCard = (cardName, cardLink) => {
  return request({
    route: 'cards',
    method: 'POST',
    body: {
      name: cardName,
      link: cardLink
    }
  });
}

export const deleteCardById = (cardId) => {
  return request({
    route: `cards/${cardId}`,
    method: 'DELETE'
  })
}

export const addLikeByCardId = (cardId) => {
  return request({
    route: `cards/likes/${cardId}`,
    method: 'PUT',
  })
}

export const deleteLikeByCardId = (cardId) => {
  return request({
    route: `cards/likes/${cardId}`,
    method: 'DELETE',
  })
}
