"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useClerk, useUser } from '@clerk/nextjs'
import { useAuth0Context } from './auth0-provider'

type AuthProvider = 'clerk' | 'auth0'

interface UnifiedAuthContextType {
  isAuthenticated: boolean
  user: any
  login: () => void
  logout: () => void
  isLoading: boolean
  provider: AuthProvider
  switchProvider: (provider: AuthProvider) => void
}

const UnifiedAuthContext = createContext<UnifiedAuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
  provider: 'clerk',
  switchProvider: () => {},
})

export function UnifiedAuthProvider({ children }: { children: React.ReactNode }) {
  // Default to Clerk as the provider
  const [authProvider, setAuthProvider] = useState<AuthProvider>('clerk')
  
  // Get authentication state from both providers
  const { isSignedIn, user: clerkUser, isLoaded: clerkLoaded } = useUser()
  const { signOut } = useClerk()
  const { isAuthenticated: auth0IsAuthenticated, user: auth0User, login: auth0Login, logout: auth0Logout, isLoading: auth0Loading } = useAuth0Context()

  // Combine auth state based on the selected provider
  const isAuthenticated = authProvider === 'clerk' ? !!isSignedIn : auth0IsAuthenticated
  const user = authProvider === 'clerk' ? clerkUser : auth0User
  const isLoading = authProvider === 'clerk' ? !clerkLoaded : auth0Loading

  const login = () => {
    if (authProvider === 'clerk') {
      // Redirect to sign-in page for Clerk
      window.location.href = '/login'
    } else {
      auth0Login()
    }
  }

  const logout = () => {
    if (authProvider === 'clerk') {
      signOut()
    } else {
      auth0Logout()
    }
  }

  const switchProvider = (provider: AuthProvider) => {
    // Logout from the current provider if authenticated
    if (isAuthenticated) {
      logout()
    }
    setAuthProvider(provider)
  }

  // Check localStorage for saved provider preference
  useEffect(() => {
    const savedProvider = localStorage.getItem('authProvider') as AuthProvider
    if (savedProvider && (savedProvider === 'clerk' || savedProvider === 'auth0')) {
      setAuthProvider(savedProvider)
    }
  }, [])

  // Save provider preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('authProvider', authProvider)
  }, [authProvider])

  return (
    <UnifiedAuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isLoading,
        provider: authProvider,
        switchProvider,
      }}
    >
      {children}
    </UnifiedAuthContext.Provider>
  )
}

export const useUnifiedAuth = () => useContext(UnifiedAuthContext)
