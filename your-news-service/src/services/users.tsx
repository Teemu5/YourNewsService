import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

let token: string
const setToken = (newToken: any) => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response: { data: any }) => response.data)
}

const create = async (newObject: any) => {
  const config = {
    headers: { 'Access-Control-Allow-Credentials': '*', Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const del = async (id: any) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(token)
  const res = await axios.delete(`${ baseUrl }/${id}`, config)
  return res.data
}
const update = async (id: any, newObject: any) => {
  const res = await axios.put(`${ baseUrl }/${id}`, newObject)
  return res.data
}
const updateAll = async (newObject: any) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.put(`${ baseUrl }`, newObject, config)
  return res.data
}
// userService
export default { setToken, getAll, create, updateAll, update, del }