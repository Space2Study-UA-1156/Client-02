import axios from 'axios'
import { setupCache } from 'axios-cache-interceptor'

const AXIOS_CONFIG = {
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_BASE_PATH
}

export const axiosClient = axios.create(AXIOS_CONFIG)
export const axiosClientWithCache = setupCache(axios.create(AXIOS_CONFIG))
