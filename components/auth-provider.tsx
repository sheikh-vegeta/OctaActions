"use client"

import React, { createContext, useContext, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { CustomAuth0Provider } from "@/components/auth/auth0-provider"
import { UnifiedAuthProvider, useUnifiedAuth } from "@/components/auth/unified-auth-provider"

interface AuthContextType {
  isAuthenticated: boolean
  user: any
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <CustomAuth0Provider>
      <UnifiedAuthProvider>
        <InternalAuthProvider>{children}</InternalAuthProvider>
      </UnifiedAuthProvider>
    </CustomAuth0Provider>
  )
}

function InternalAuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isLoading } = useUnifiedAuth()

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
