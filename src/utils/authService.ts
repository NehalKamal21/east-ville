import axios from 'axios';
import Cookies from 'js-cookie';

// API base URL - use environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication interfaces
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
  error?: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

// Authentication service functions
export const authService = {
  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Register user
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/register', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // Logout user
  async logout(): Promise<void> {
    try {
      // Call logout endpoint to clear server-side cookie
      await apiClient.post('/api/auth/logout');
    } catch (error) {
      // Log error but don't throw - we still want to clear local token
      console.warn('Logout API call failed:', error);
    } finally {
      // Always clear local token regardless of API call success
      Cookies.remove('token');
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!Cookies.get('token');
  },

  // Get current user token
  getToken(): string | undefined {
    return Cookies.get('token');
  },

  // Set auth token
  setToken(token: string): void {
    Cookies.set('token', token, { expires: 7 });
  },

  // Get user profile
  async getProfile(): Promise<any> {
    try {
      const response = await apiClient.get('/api/auth/profile');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get profile');
    }
  },

  // Update user profile
  async updateProfile(profileData: any): Promise<any> {
    try {
      const response = await apiClient.put('/api/auth/profile', profileData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },

  // Change password
  async changePassword(passwordData: { currentPassword: string; newPassword: string }): Promise<any> {
    try {
      const response = await apiClient.put('/api/auth/change-password', passwordData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  },

  // Verify token with backend
  async verifyToken(): Promise<boolean> {
    try {
      const response = await apiClient.get('/api/auth/profile');
      return !!response.data.user;
    } catch (error) {
      return false;
    }
  },

  // Refresh token
  async refreshToken(): Promise<string | null> {
    try {
      const response = await apiClient.post<{ token: string }>('/api/auth/refresh-token');
      const { token } = response.data;
      this.setToken(token);
      return token;
    } catch (error) {
      return null;
    }
  }
};

// Export the API client for other services
export { apiClient };

// Export default auth service
export default authService; 