import { createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'
import { api } from '../utils/http'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState({})
  const isAuthenticated = false

  useEffect(() => {
    const { 'nextautht1.token': userCookie } = parseCookies()

    if (userCookie) {
      api.get('/users/info').then(response => {
        setUser(response.data)
      })
    }
  }, [])

  function logout() {
    //TODO: apagar o cookie / token

    const { 'nextautht1.token': userCookie } = parseCookies()

    if (!userCookie) {
      return
    }

    if (userCookie) {
      destroyCookie(null, 'nextautht1.token')
      destroyCookie(null, 'nextautht1.email')
    }

    Router.push('/')
  }

  async function signUp(name, email, password) {
    //TODO: é necessário gerar um link de validação do e-mail
    const { data } = await api.post('/users', { name, email, password })

    setUser(data.user)

    Router.push('/')
  }

  async function signIn(email, password) {
    //TODO: realizar tratamento de erros
    const { data } = await api.post('/auth/login', { email, password })

    setUser(data.user)
    console.log('Front: ' + data.user.name)

    const token = data.accessToken

    setCookie(null, 'nextautht1.token', token, {
      maxAge: 60 * 90 * 1 //130 min
    })

    setCookie(null, 'nextautht1.email', email, {
      maxAge: 60 * 90 * 1 //130 min
    })

    Router.push('/classes')
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, signIn, signUp, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  )
}
