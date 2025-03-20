import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  params: { i: '90a218c1eac4c020', l: 'en_US' },
  headers: {
    'x-rapidapi-host': 'soccer-football-info.p.rapidapi.com',
    'x-rapidapi-key': process.env.VUE_APP_API_KEY,
  },
})

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
