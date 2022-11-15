import { IDisplayMediaProps } from 'Message/interface';
import { useEffect, useState } from 'react';
import 'webrtc-adapter';

function useDisplayMedia(props?: IDisplayMediaProps) {
  const { constraints } = props || {};
  const [stream, setStream] = useState<MediaStream>();

  useEffect(() => {
    if (!stream) {
      navigator.mediaDevices
        .getDisplayMedia(constraints)
        .then((stream) => {
          setStream(stream);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [constraints, stream]);

  return { stream };
}

export default useDisplayMedia;
