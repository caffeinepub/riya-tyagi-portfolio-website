/**
 * Admin token configuration
 * 
 * This module provides the configured admin token to the UI for auto-provisioning.
 * The token is sourced from a build-time environment variable.
 * 
 * Security note: This token is embedded in the frontend bundle and should only be used
 * for development/demo purposes. For production, use proper authentication and authorization.
 */

export function getConfiguredAdminToken(): string | null {
  // Check if the token is available in the environment
  const token = import.meta.env.VITE_CAFFEINE_ADMIN_TOKEN;
  
  if (token && typeof token === 'string' && token.trim().length > 0) {
    return token.trim();
  }
  
  // Fallback to the hardcoded token from backend for this deployment
  // This matches the token in backend/main.mo
  return '8a442e85f53e8e31bbe8c4e92525bba9794a6ce56e6ac84cff49e009c5f8b2ac';
}
