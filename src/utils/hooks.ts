import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useEffect } from 'react';

// Test hook to check local data connectivity using clusters endpoint
export const useApiTest = () => {
  return useQuery({
    queryKey: ['api-test'],
    queryFn: async () => {
      try {
        const response = await fetch('/data/clusters.json');
        const data = await response.json();
        return { status: 'success', data: data };
      } catch (error: any) {
        console.error('Local Data Test Error:', error);
        return { 
          status: 'error', 
          message: error.message,
          code: error.code
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
      const response = await fetch('/data/clusters.json');
      const data = await response.json();
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook for fetching specific cluster data
export const useCluster = (clusterId: string) => {
  return useQuery({
    queryKey: ['cluster', clusterId],
    queryFn: async () => {
      const response = await fetch('/data/clusters.json');
      const data = await response.json();
      const cluster = data.find((cluster: any) => cluster.clusterId === clusterId);
      if (!cluster) {
        throw new Error(`Cluster with ID ${clusterId} not found`);
      }
      return cluster;
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

// Device type enum
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// Generic hook for detecting device type automatically
export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      
      if (width <= 768) {
        setDeviceType('mobile');
      } else if (width <= 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);

    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  return deviceType;
};

// Convenience hooks for specific device types
export const useIsMobile = () => {
  const deviceType = useDeviceType();
  return deviceType === 'mobile';
};

export const useIsTablet = () => {
  const deviceType = useDeviceType();
  return deviceType === 'tablet';
};

export const useIsDesktop = () => {
  const deviceType = useDeviceType();
  return deviceType === 'desktop';
};

// Hook to get current screen dimensions
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
}; 