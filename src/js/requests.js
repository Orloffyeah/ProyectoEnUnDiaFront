import axios from 'axios'

// Assets
import { BASE_URL } from './assets'

const POST = (url, data) => {
  return axios({
    url,
    method: 'post',
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

const GET = (url, params = {}) => {
  return axios({
    url,
    method: 'get',
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

const POST_AUTH = (url, data) => {
  return axios({
    url,
    method: 'post',
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('spToken')}`
    },
    data
  })
}

const GET_AUTH = (url, params = {}) => {
  return axios({
    url,
    method: 'get',
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('spToken')}`
    },
    params
  })
}

const PATCH = (url, data) => {
  return axios({
    url,
    method: 'patch',
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('spToken')}`
    },
    data
  })
}

const FPATCH = (url, data) => {
  return axios({
    url,
    method: 'patch',
    baseURL: BASE_URL,
    data
  })
}

const DEL_AUTH = (url, params = {}) => {
  return axios({
    url,
    method: 'delete',
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('spToken')}`
    },
    params
  })
}

export { POST, GET, POST_AUTH, GET_AUTH, PATCH, FPATCH, DEL_AUTH, BASE_URL }
