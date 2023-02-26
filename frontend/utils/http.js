import axios from "axios"
import { parseCookies } from "nookies"

const { "nextautht1.token": token } = parseCookies()

export const http = axios.create({ baseURL: "http://localhost:3333" })

if (token) {
   http.defaults.headers["Authoriation"] = `Bearer ${token}`
}
