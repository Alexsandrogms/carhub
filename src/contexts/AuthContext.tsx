import { ReactNode, createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { api } from '../services/api'

type SignInParams = {
  email: string
  password: string
}

type SignUpParams = {
  name: string
  email: string
  password: string
}

type User = {
  id: number
  name: string
  email: string
}

type AuthContextData = {
  user?: User | null
  isAuthenticated: boolean
  signIn: (data: SignInParams) => Promise<void>
  signUp: (data: SignUpParams) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  async function signIn({ email, password }: SignInParams) {
    const { data } = await api.get(`/users?${email}&${password}`)

    if (!data.length) {
      throw new Error('E-mail or password incorrect!')
    }

    await AsyncStorage.setItem('hasAuthenticated', JSON.stringify(data[0].id))

    setIsAuthenticated(true)
  }

  async function signUp({ name, email, password }: SignUpParams) {
    await api.post('/users', { name, email, password })
  }

  async function signOut() {
    await AsyncStorage.removeItem('hasAuthenticated')
    setIsAuthenticated(false)
  }

  async function validateHasAuthenticated() {
    const result = await AsyncStorage.getItem('hasAuthenticated')

    if (result) {
      const { data } = await api.get(`/users/${result}`)
      setUser(JSON.parse(JSON.stringify(data)))
      setIsAuthenticated(true)
    }
  }

  useEffect(() => {
    validateHasAuthenticated()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
