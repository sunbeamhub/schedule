import { useUserMedia } from 'Message/hooks';
import { IVideoChatProps } from 'Message/interface/IVideoChatProps';
import { useRef } from 'react';

function VideoChat(props?: IVideoChatProps) {
  const { constraints } = props || {};
  const { stream } = useUserMedia({
    constraints,
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  if (
    stream &&
    videoRef.current &&
    (!videoRef.current.srcObject ||
      (videoRef.current.srcObject as MediaStream).id !== stream.id)
  ) {
    videoRef.current.srcObject = stream;
  }

  return (
    <video
      autoPlay={true}
      controls={false}
      height="100%"
      playsInline={true}
      ref={videoRef}
      width="100%"
    ></video>
  );
}

export default VideoChat;
