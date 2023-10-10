'use client'

import { useRouter, usePathname } from 'next/navigation'
import {
  useCallback,
  useState,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { client } from '../../lib/api'

interface AuthContextValues {
  isLogin: boolean
  login: (email: string, password: string) => Promise<unknown>
  logout: () => void
}

const AuthContext = createContext<AuthContextValues | null>(null)

function useAuthContext() {
  const context = useContext(AuthContext)
  return context!
}

const tokenKey = 'token'

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [isLogin, setIsLogin] = useState(() => {
    return typeof window === 'undefined'
      ? false
      : Boolean(window.localStorage.getItem(tokenKey))
  })

  const pathname = usePathname()
  const { replace } = useRouter()

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await client.login({ email, password })
      if (response.data.accessToken) {
        window.localStorage.setItem(tokenKey, response.data.accessToken)
        // client.setAuthHeader(response.data.accessToken);
        setIsLogin(true)
      } else {
        // handle error
        console.error('Error')
      }
    } catch (error) {
      // handle error
      console.error(error)
    }
  }, [])

  const logout = useCallback(() => {
    setIsLogin(false)
    window.localStorage.removeItem(tokenKey)
  }, [])

  useEffect(() => {
    if (!isLogin && pathname !== '/login') {
      replace('/login')
    }
  }, [isLogin, pathname, replace])

  console.log(pathname)

  const memoizedValue = useMemo(
    () => ({
      isLogin,
      login,
      logout,
    }),
    [isLogin, login, logout],
  )

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider, useAuthContext }
