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