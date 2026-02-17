const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  headers: {
    authorization: '20389e0b-9993-4520-b6f8-0f06772eecf1',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res)=> {
    if(res.ok){
      return res.json();
    }
    return Promise.reject(res.status);
  })
}

export const postCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
  .then((res)=> {
    if(res.ok){
      return res.json();
    }
    return Promise.reject(res.status);
  })
}

export const getInitialUser = () =>{
    return fetch(`${config.baseUrl}/users/me`,{
        headers: config.headers
    })
    .then((res)=> {
        if(res.ok){
         return res.json();
        }
        return Promise.reject(res.status);
    })
}

export const patchUser = (name, about) => {
      return fetch(`${config.baseUrl}/users/me`,{
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then((res)=> {
        if(res.ok){
         return res.json();
        }
        return Promise.reject(res.status);
      })
}

export const patchAvatar = (avatar) => {
      return fetch(`${config.baseUrl}/users/me/avatar`,{
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          avatar: avatar
        })
      })
      .then((res)=> {
        if(res.ok){
         return res.json();
        }
        return Promise.reject(res.status);
      })
}

export const deleteCardRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`,{
        method: 'DELETE',
        headers: config.headers
  })
  .then((res)=> {
        if(res.ok){
         return res.json();
        }
        return Promise.reject(res.status);
  })
  
}


export const putLikeRequest = (cardId) => {
      return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
        method: 'PUT',
        headers: config.headers,
      })
      .then((res)=> {
        if(res.ok){
         return res.json();
        }
        return Promise.reject(res.status);
      })
}


export const deleteLikeRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
        method: 'DELETE',
        headers: config.headers
  })
  .then((res)=> {
        if(res.ok){
         return res.json();
        }
        return Promise.reject(res.status);
  })
  
}


