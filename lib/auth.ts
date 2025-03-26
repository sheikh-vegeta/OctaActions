/**
 * Authentication utilities for API routes
 */

import { auth } from "@clerk/nextjs";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

/**
 * Get the authenticated user from the request
 * Supports both Clerk and NextAuth authentication methods
 */
export async function getAuthUser(req: NextRequest): Promise<AuthUser | null> {
  // Try Clerk authentication first
  try {
    const { userId } = auth();
    
    if (userId) {
      // This is a simplified implementation as we don't have direct access to Clerk user data
      // In a real implementation, you would fetch more user details from Clerk
      return {
        id: userId,
        email: `user-${userId}@example.com`, // Placeholder
      };
    }
  } catch (error) {
    console.error("Error with Clerk authentication:", error);
  }

  // Fall back to NextAuth
  try {
    const token = await getToken({
      req: req as any,
      secret: process.env.AUTH0_SECRET || process.env.NEXTAUTH_SECRET,
    });

    if (token?.sub) {
      return {
        id: token.sub,
        email: token.email as string,
        name: token.name as string || undefined,
        image: token.picture as string || undefined,
      };
    }
  } catch (error) {
    console.error("Error with NextAuth authentication:", error);
  }

  return null;
}

/**
 * Check if the request is authenticated
 */
export async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const user = await getAuthUser(req);
  return !!user;
}

/**
 * Get GitHub token from environment variables
 */
export function getGitHubToken(): string | null {
  return process.env.GITHUB_TOKEN || null;
}

/**
 * Get the user's GitHub token if available
 * For now, we're using a global token from environment variables
 * In a real application, you would store user-specific tokens
 */
export async function getUserGitHubToken(req: NextRequest): Promise<string | null> {
  // For now, just return the global token
  // In a real application, you would get the user's specific token
  return getGitHubToken();
}
