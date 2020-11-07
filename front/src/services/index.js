import axios from 'axios';
import constants from './constants';

export async function login (info){
    let response = await axios({
        method: 'post',
        url: `${constants.url}/users/login`,
        data: info,
        headers: {
          'Content-Type': `application/json`,
        }
      });

    return response
}

export async function getAds (query, own){
  let response = await axios({
      method: 'get',
      url: `${constants.url}/advrs/${own?"own/":""}?${query}`,
      headers: {
        'Content-Type': `application/json`,
        "authorization": constants.storageToken
      }
    });

  return response
}

export async function getByRoute (route){
  let response = await axios({
      method: 'get',
      url: `${constants.url}${route}`,
      headers: {
        'Content-Type': `application/json`,
        "authorization": constants.storageToken
      }
    });

  return response
}

export async function updateByRoute (id,data,route){
  let response = await axios({
      method: 'put',
      url: `${constants.url}${route}/update/${id}`,
      data,
      headers: {
        'Content-Type': `application/json`,
        "authorization": constants.storageToken
      }
    });

  return response
}

export async function addByRoute (data,route){
  let response = await axios({
      method: 'post',
      url: `${constants.url}${route}/add`,
      data,
      headers: {
        'Content-Type': `application/json`,
        "authorization": constants.storageToken
      }
    });

  return response
}

export async function deletebyId (id, route){
  let response = await axios({
      method: 'delete',
      url: `${constants.url}${route}/delete/${id}`,
      headers: {
        'Content-Type': `application/json`,
        "authorization": constants.storageToken
      }
    });

  return response
}

export async function getCats (){
  let response = await axios({
      method: 'get',
      url: `${constants.url}/cats/`,
      headers: {
        'Content-Type': `application/json`,
        "authorization": constants.storageToken
      }
    });

  return response.data
}

export async function getTags (){
  let response = await axios({
      method: 'get',
      url: `${constants.url}/tags/`,
      headers: {
        'Content-Type': `application/json`,
        "authorization": constants.storageToken
      }
    });
  return response.data
}

export async function getAdvertisiers (){
  let response = await axios({
      method: 'get',
      url: `${constants.url}/users/advertisiers`,
      headers: {
        'Content-Type': `application/json`,
        "authorization": constants.storageToken
      }
    });

  return response.data
}


export async function editAdvr(id, updatedData) {
  let formData = new FormData();
  formData.append('data', JSON.stringify(updatedData));

  if (updatedData.photo)
    formData.append('photo', updatedData.photo);

  let res = await axios({
    url: `${constants.url}/advrs/update/${id}`,
    method: "put",
    data: formData,
    headers: {
      'accept': `application/json`,
      'content-type': `multipart/form-data`,
      "authorization": constants.storageToken
    },
  });

  return res
}


export async function addAdvr(data) {
  let formData = new FormData();
  formData.append('data', JSON.stringify(data));

  if (data.photo)
    formData.append('photo', data.photo);

  return await axios({
    url: `${constants.url}/advrs/add`,
    method: "post",
    data: formData,
    headers: {
      'accept': `application/json`,
      'content-type': `multipart/form-data`,
      "authorization": constants.storageToken

    },
  });
}


export async function addOrder (orderData){
  let response = await axios({
      method: 'post',
      url: `${constants.url}/orders/add`,
      data: orderData,
      headers: {
        'Content-Type': `application/json`,
        "authorization": constants.storageToken
      }
    });

  return response
}

export async function getRole (){
  let id = constants.storageToken;
  let response = await axios({
      method: 'get',
      url: `${constants.url}/login/getRole/${id}`,
      headers: {
        'Content-Type': `application/json`,
        "authorization": constants.storageToken
      }
    });

  return response
}


export async function getFirstLastId (){
  let response = await axios({
      method: 'get',
      url: `${constants.url}/orders/getFistAndLastId/`,
      headers: {
        'Content-Type': `application/json`,
        "authorization": constants.storageToken
      }
    });

  return response
}


export async function getOrders (queryString=""){
  let response = await axios({
      method: 'get',
      url: `${constants.url}/orders?${queryString}`,
      headers: {
        'Content-Type': `application/json`,
        "authorization": constants.storageToken
      }
    });

  return response
}