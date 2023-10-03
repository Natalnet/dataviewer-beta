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
      destroyCookie(null, 'nextautht1.mat')
    }

    Router.push('/')
  }

  async function updateUser(name, registrationNumber, avatar) {
    let x = {
      name: 'string(name)',
      avatar: `${avatar}`,
      registrationNumber: 'string(registrationNumber)'
    }
    console.log(x)
    const { data } = await api.patch('/users/update-account', {
      name,
      registrationNumber,
      avatar
    })
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
    console.log('Front: ' + data.user.mat)

    const token = data.accessToken
    const registrationNumber = data.user.mat

    const cookieTime = 60 * 90 * 1 //130 min

    setCookie(null, 'nextautht1.token', token, {
      maxAge: cookieTime
    })

    setCookie(null, 'nextautht1.email', email, {
      maxAge: cookieTime
    })

    setCookie(null, 'nextautht1.mat', registrationNumber, {
      maxAge: cookieTime
    })

    console.log(data.user.profile)
    if (data.user.profile == 'PROFESSOR') Router.push('/classes')
    else Router.push('/students')
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, signIn, signUp, logout, user, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
