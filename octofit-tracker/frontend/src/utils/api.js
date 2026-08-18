/**
 * API utility functions with environment variable support
 * 
 * IMPORTANT: The VITE_CODESPACE_NAME environment variable must be defined
 * in your .env.local file for API calls to work correctly.
 * 
 * Example .env.local:
 * VITE_CODESPACE_NAME=glorious-space-guacamole-pjvwv64j4rggfrww9
 */

/**
 * Get the base API URL for the backend
 * Uses VITE_CODESPACE_NAME environment variable with fallback to localhost
 */
export function getBaseApiUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (!codespaceName) {
    console.warn(
      'VITE_CODESPACE_NAME is not set. Falling back to localhost. ' +
      'Please define VITE_CODESPACE_NAME in your .env.local file.'
    );
    return 'http://localhost:8000';
  }
  
  return `https://${codespaceName}-8000.app.github.dev`;
}

/**
 * Get the full URL for an API endpoint
 * @param endpoint - The endpoint path (e.g., '/api/activities/', '/api/leaderboard/')
 * @returns Full API URL
 */
export function getApiEndpoint(endpoint) {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${getBaseApiUrl()}${normalizedEndpoint}`;
}

/**
 * Handle API response with pagination support
 * Returns array of items (handles both paginated and direct array responses)
 */
export async function fetchApiData(endpoint) {
  try {
    const response = await fetch(getApiEndpoint(endpoint));
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Handle paginated response (with items property)
    if (data.items && Array.isArray(data.items)) {
      return data.items;
    }
    
    // Handle direct array response
    if (Array.isArray(data)) {
      return data;
    }
    
    // Fallback for single item or empty response
    return [];
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Post data to API endpoint
 */
export async function postApiData(endpoint, data) {
  try {
    const response = await fetch(getApiEndpoint(endpoint), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to post to ${endpoint}:`, error);
    throw error;
  }
}
