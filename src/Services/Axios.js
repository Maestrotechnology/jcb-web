import axios from "axios"
import { baseUrl } from "../Utilities/Constants"
import { getCookie, setCookie } from "../Utilities/Cookies"

const instance = axios.create({
  baseURL: baseUrl,
})

instance.interceptors.request.use(
  request => {
    const userlog =
      getCookie('loginData') ? JSON.parse(getCookie('loginData')) : null
    if (userlog) {
      request.headers['Authorization'] = `Bearer ${userlog.access_token}`
    }
    return request
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error?.response?.status === 403) {
      setCookie('loginData', null, 0)
      window.location.replace('/')
    } else {
      return Promise.reject(error)
    }
  }
)
export default instance