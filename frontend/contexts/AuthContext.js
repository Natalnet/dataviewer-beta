import { createContext, useEffect, useState } from "react"
import { setCookie, parseCookies, destroyCookie } from "nookies"

import Router from "next/router"
import { api } from "../utils/http"

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState({})
  const isAuthenticated = false

  useEffect(() => {
    const { "nextautht1.token": userCookie } = parseCookies()

    if (userCookie) {
      api.get("/users/info").then((response) => {
        setUser(response.data)
      })
    }
    console.log("Update user data from '/user/info")
  }, [])

  function logout() {
    //TODO: apagar o cookie / token

    const { "nextautht1.token": userCookie } = parseCookies()

    if (!userCookie) {
      return
    } else {
      destroyCookie(null, "nextautht1.token", { path: "/" })
      destroyCookie(null, "nextautht1.token", { path: "/students" })
      destroyCookie(null, "nextautht1.email", { path: "/" })
      destroyCookie(null, "nextautht1.mat", { path: "/" })
      destroyCookie(null, "nextautht1.lastClassCode", { path: "/" })
      destroyCookie(null, "nextautht1.lastClassCode", { path: "/classes" })
      console.log("Logout, cookies apagados!")
    }

    Router.push("/")
  }

  async function updateUser(name, registrationNumber, avatar) {
    const { data } = await api.patch("/users/update-account", {
      name,
      registrationNumber,
      avatar,
    })
  }

  async function signUp(name, email, password, registrationNumber) {
    //TODO: é necessário gerar um link de validação do e-mail
    const { data } = await api.post("/users", {
      name,
      email,
      password,
      registrationNumber,
    })

    setUser(data.user)
  }

  async function signIn(email, password) {
    //TODO: realizar tratamento de erros
    const { data } = await api.post("/auth/login", { email, password })

    setUser(data.user)
    console.log("Front: " + data.user.mat)

    const token = data.accessToken
    const registrationNumber = data.user.mat

    const cookieTime = 60 * 90 * 1 //130 min

    setCookie(null, "nextautht1.token", token, {
      maxAge: cookieTime,
      path: "/",
    })

    setCookie(null, "nextautht1.email", email, {
      maxAge: cookieTime,
      path: "/",
    })

    setCookie(null, "nextautht1.mat", registrationNumber, {
      maxAge: cookieTime,
      path: "/",
    })

    console.log(data.user.profile)
    if (data.user.profile == "PROFESSOR") Router.push("/classes")
    else Router.push("/students")
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, signIn, signUp, logout, user, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
