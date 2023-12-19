import { AxiosError } from 'axios'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

export type User = {
  email: string
  permissions: string[]
  roles: string[]
}

export type SignInCredentials = {
  email: string
  password: string
}

export type AuthContextData = {
  user?: User
  cid?: number
  isAuthenticated: boolean
  loadingUserData: boolean
  setCid: Dispatch<SetStateAction<number>>
  signIn: (credentials: SignInCredentials) => Promise<void | AxiosError>
  signOut: () => void
}

const AuthContext = createContext({} as AuthContextData)

export default AuthContext
