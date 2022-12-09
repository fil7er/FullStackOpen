import axios from 'axios'
import { loginUrl } from '../util/config'

const baseUrl = loginUrl+'/api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }