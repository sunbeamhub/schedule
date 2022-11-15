import { useDisplayMedia } from 'Message/hooks';
import { useRef } from 'react';

function WindowShare() {
  const { stream } = useDisplayMedia();
  const videoRef = useRef<HTMLVideoElement>(null);

  if (stream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = stream;
  }

  return (
    <video
      autoPlay={true}
      controls={false}
      playsInline={true}
      ref={videoRef}
      width="100%"
    ></video>
  );
}

export default WindowShare;
