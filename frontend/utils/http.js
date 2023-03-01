import axios from "axios"
import { parseCookies } from "nookies"

const { "nextautht1.token": token } = parseCookies()

export const http = axios.create({
   baseURL: "https://api-dataviewer-44gqlaax2a-uc.a.run.app",
})

if (token) {
   http.defaults.headers["Authoriation"] = `Bearer ${token}`
}
