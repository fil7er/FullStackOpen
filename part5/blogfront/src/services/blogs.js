import axios from 'axios'
const url = process.env.REACT_APP_URL
const baseUrl = url+'/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll }