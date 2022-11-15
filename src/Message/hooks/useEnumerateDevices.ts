import { useEffect, useState } from 'react';
import 'webrtc-adapter';

function useEnumerateDevices() {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setDevices(devices);
    });
  }, []);

  useEffect(() => {
    navigator.mediaDevices.addEventListener('devicechange', () => {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        setDevices(devices);
      });
    });
  }, []);

  return { devices };
}

export default useEnumerateDevices;
