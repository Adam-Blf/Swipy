import { useState, useEffect, useCallback } from 'react';

interface NetworkStatus {
  isOnline: boolean;
  wasOffline: boolean;
  effectiveType: '4g' | '3g' | '2g' | 'slow-2g' | 'unknown';
  downlink: number | null;
  rtt: number | null;
  saveData: boolean;
}

interface NetworkInformation extends EventTarget {
  effectiveType: '4g' | '3g' | '2g' | 'slow-2g';
  downlink: number;
  rtt: number;
  saveData: boolean;
  addEventListener(type: 'change', listener: () => void): void;
  removeEventListener(type: 'change', listener: () => void): void;
}

declare global {
  interface Navigator {
    connection?: NetworkInformation;
    mozConnection?: NetworkInformation;
    webkitConnection?: NetworkInformation;
  }
}

export function useNetworkStatus(): NetworkStatus {
  const getConnection = (): NetworkInformation | undefined => {
    return navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  };

  const [status, setStatus] = useState<NetworkStatus>(() => {
    const connection = getConnection();
    return {
      isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
      wasOffline: false,
      effectiveType: connection?.effectiveType || 'unknown',
      downlink: connection?.downlink || null,
      rtt: connection?.rtt || null,
      saveData: connection?.saveData || false,
    };
  });

  const updateNetworkStatus = useCallback(() => {
    const connection = getConnection();
    const isOnline = navigator.onLine;

    setStatus((prev) => ({
      isOnline,
      wasOffline: !isOnline || prev.wasOffline,
      effectiveType: connection?.effectiveType || 'unknown',
      downlink: connection?.downlink || null,
      rtt: connection?.rtt || null,
      saveData: connection?.saveData || false,
    }));
  }, []);

  const handleOnline = useCallback(() => {
    setStatus((prev) => ({
      ...prev,
      isOnline: true,
    }));
  }, []);

  const handleOffline = useCallback(() => {
    setStatus((prev) => ({
      ...prev,
      isOnline: false,
      wasOffline: true,
    }));
  }, []);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const connection = getConnection();
    if (connection) {
      connection.addEventListener('change', updateNetworkStatus);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);

      const conn = getConnection();
      if (conn) {
        conn.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, [handleOnline, handleOffline, updateNetworkStatus]);

  return status;
}

// Hook to show offline toast/notification
export function useOfflineNotification(callback: (isOffline: boolean) => void) {
  const { isOnline, wasOffline } = useNetworkStatus();

  useEffect(() => {
    if (!isOnline) {
      callback(true);
    } else if (wasOffline) {
      callback(false);
    }
  }, [isOnline, wasOffline, callback]);

  return { isOnline, wasOffline };
}

// Utility to check if should use low-bandwidth mode
export function useLowBandwidthMode(): boolean {
  const { effectiveType, saveData } = useNetworkStatus();

  // Enable low bandwidth mode for slow connections or data saver
  return saveData || effectiveType === 'slow-2g' || effectiveType === '2g';
}
