import axios from "axios"
import { parseCookies } from "nookies"

export function getAPIClient(context) {
   const { "nextautht1.token": token } = parseCookies(context)

   const api = axios.create({
      //baseURL: "https://api-dataviewer-44gqlaax2a-uc.a.run.app",
      baseURL: "http://localhost:3333",
   })

   if (token) {
      api.defaults.headers["Authorization"] = `Bearer ${token}`
   }

   return api
}