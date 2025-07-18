import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Test hook to check API connectivity using clusters endpoint
export const useApiTest = () => {
  return useQuery({
    queryKey: ['api-test'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/clusters', { 
          timeout: 5000,
          withCredentials: true
        });
        return { status: 'success', data: response.data };
      } catch (error: any) {
        console.error('API Test Error:', error);
        return { 
          status: 'error', 
          message: error.message,
          code: error.code,
          statusCode: error.response?.status,
          response: error.response?.data 
        };
      }
    },
    retry: false,
    staleTime: 30 * 1000, // 30 seconds
  });
};

// Custom hook for fetching clusters data
export const useClusters = () => {
  return useQuery({
    queryKey: ['clusters'],
    queryFn: async () => {
      const response = await axios.get('/api/clusters', { 
        withCredentials: true 
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook for fetching specific cluster data
export const useCluster = (clusterId: string) => {
  return useQuery({
    queryKey: ['cluster', clusterId],
    queryFn: async () => {
      const response = await axios.get(`/api/clusters/clusterId/${clusterId}`);
      return response.data;
    },
    enabled: !!clusterId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook for fetching contacts data
export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await axios.get('/api/contacts', { 
        withCredentials: true 
      });
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}; 