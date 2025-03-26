"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'

interface Auth0ContextType {
  isAuthenticated: boolean
  user: any
  login: () => void
  logout: () => void
  isLoading: boolean
}

const Auth0Context = createContext<Auth0ContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
})

export function CustomAuth0Provider({ children }: { children: React.ReactNode }) {
  // Get the Auth0 configuration from environment variables
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''
  const redirectUri = process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI || typeof window !== 'undefined' ? window.location.origin : ''

  // Only render the Auth0Provider if we're in the browser
  if (typeof window === 'undefined') {
    return <>{children}</>
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
    >
      <Auth0ContextProvider>{children}</Auth0ContextProvider>
    </Auth0Provider>
  )
}

function Auth0ContextProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, loginWithRedirect, logout: auth0Logout, isLoading } = useAuth0()

  const login = () => {
    loginWithRedirect()
  }

  const logout = () => {
    auth0Logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}

export const useAuth0Context = () => useContext(Auth0Context)
