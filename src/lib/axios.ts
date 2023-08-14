import axios from 'axios'
import { useRefreshAccessToken } from '../hooks/useRefreshAccessToken'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
})

export const apiPrivate = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
})

apiPrivate.interceptors.response.use(
  (response) => response,

  async (error) => {
    const prevRequest = error?.config

    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true
      const newAccessToken = await useRefreshAccessToken()
      prevRequest.headers.Authorization = `Bearer ${newAccessToken}`
      return apiPrivate(prevRequest)
    }

    return Promise.reject(error)
  },
)
