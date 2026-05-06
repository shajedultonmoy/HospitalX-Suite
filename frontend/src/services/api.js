const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
};

export const fetchWithFallback = async (endpoint, fallback) => {
  try {
    return await apiRequest(endpoint);
  } catch (error) {
    return fallback;
  }
};
