// @flow

import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

const create = async (newObject: { title: string, author: string, url: string }) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id: string, newObject: { title: string, author: string, url: string, likes: Number, user: {}, id: string, comments: Array<string> }) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
    .then(response => response.data)
}

const remove = async (id: string) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const comment = (id: string, comments: Array<String> ) => {
  console.log('Service: commenting blog with id ', id, ' with comments: ', comments)
  return axios.post(`${baseUrl}/${id}/comments`, { comments } )
    .then(response => response.data)
}

export default { getAll, setToken, create, update, remove, comment }