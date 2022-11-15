import { IUserMediaProps } from 'Message/interface';
import { useEffect, useState } from 'react';
import 'webrtc-adapter';

function useUserMedia(props?: IUserMediaProps) {
  const { constraints = { audio: true, video: true } } = props || {};
  const [stream, setStream] = useState<MediaStream>();

  useEffect(() => {
    if (!stream || !stream.active) {
      navigator.mediaDevices
        .getUserMedia(constraints)
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

export default useUserMedia;
