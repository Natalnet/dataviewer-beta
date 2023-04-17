import { createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { api } from '../utils/http'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState({})
  const isAuthenticated = false

  useEffect(() => {
    console.log('Necessário recuperar as informações dos usuários!')
    const { 'nextautht1.token': userCookie } = parseCookies()

    if (userCookie) {
      console.log('userCookie ' + userCookie)
      api.get('/users/profile').then(response => {
        console.log('useEffect: ', response.data)
        setUser(response.data)
      })
    }
  }, [])

  function logout() {
    //TODO: apagar o cookie / token
  }

  async function signUp(email, password) {
    //TODO: é necessário gerar um link de validação do e-mail
    const { data } = await api.post('/users', { email, password })

    setUser(data.user)

    Router.push('/')
  }

  async function signIn(email, password) {
    //TODO: realizar tratamento de erros
    const { data } = await api.post('/auth/login', { email, password })

    setUser(data.user)

    const token = data.accessToken
    setCookie(null, 'nextautht1.token', token, {
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
