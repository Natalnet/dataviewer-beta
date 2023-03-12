import { createContext, useEffect, useState } from "react"
import { setCookie, parseCookies } from "nookies"
import Router from "next/router"
import { api } from "../utils/http"

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
   const [user, setUser] = useState({})
   const isAuthenticated = false

   useEffect(() => {
      console.log("Necessário recuperar as informações dos usuários!")
      const { "nextautht1.token": userCookie } = parseCookies()
      /* TODOD
      const { "nextautht1.email": userCookie } = parseCookies()
      if (userCookie) {
         console.log("nextautht1.email " + userCookie)
         setUser(userCookie)
      }*/
   }, [])

   async function signIn(email, password) {
      //TODO: realizar tratamento de erros
      const { data } = await api.post("/auth/login", { email, password })

      console.log("Dados do Usuário: ")
      console.log(data)

      setUser(data.user)

      const token = data.accessToken
      setCookie(null, "nextautht1.token", token, {
         maxAge: 60 * 90 * 1, //130 min
      })

      Router.push("/classes")
   }
   return (
      <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
         {children}
      </AuthContext.Provider>
   )
}
