import BlurOffIcon from '@mui/icons-material/BlurOff';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import CallEndIcon from '@mui/icons-material/CallEnd';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { VideoChat } from 'Message/components/VideoChat';
import { useEnumerateDevices } from 'Message/hooks';
import { IPeerToPeerProps } from 'Message/interface/IPeerToPeerProps';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const VideoChatMemo = memo(VideoChat);

function PeerToPeer(props: IPeerToPeerProps) {
  const { closeEmit = () => {}, minimumEmit = () => {} } = props;

  const { devices } = useEnumerateDevices();
  const videoDeviceList = devices.filter((item) => item.kind === 'videoinput');

  const [aspectRatio] = useState<number | undefined>(
    window.innerWidth / window.innerHeight
  );
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('user');
  const [constraints, setConstraints] = useState<MediaStreamConstraints>({
    audio: true,
    video: { aspectRatio, facingMode },
  });

  const [blur, setBlur] = useState(false);
  const [mic, setMic] = useState(true);
  const [minimum, setMinimum] = useState(false);
  const [video, setVideo] = useState(true);
  const [volume, setVolume] = useState(true);

  const { t } = useTranslation('message');

  return (
    <Paper
      elevation={24}
      sx={
        minimum
          ? {
              height: '38.2vh',
              position: 'fixed',
              right: 16,
              top: 56,
              width: '38.2vw',
              zIndex: 1101,
            }
          : {
              height: '100vh',
              left: 0,
              position: 'fixed',
              top: 0,
              width: '100vw',
              zIndex: 1101,
            }
      }
    >
      <Box
        onClick={() => {
          if (!minimum) {
            return;
          }

          setMinimum(false);
        }}
        sx={{
          cursor: 'pointer',
          height: '100%',
          position: 'absolute',
          width: '100%',
        }}
      >
        <VideoChatMemo constraints={constraints} />
      </Box>
      {minimum ? (
        <></>
      ) : (
        <Box
          sx={{
            alignItems: 'start',
            display: 'flex',
            justifyContent: 'space-between',
            pl: 2,
            position: 'absolute',
            pr: 2,
            pt: 2,
            width: '100%',
          }}
        >
          <Fab
            onClick={() => {
              setMinimum(true);
              minimumEmit(false);
            }}
            size="small"
            sx={{ background: 'rgba(0,0,0,0.5)', color: '#ffffff' }}
          >
            <CloseFullscreenIcon />
          </Fab>
          <Typography></Typography>
          <Paper
            elevation={24}
            sx={{
              height: '38.2vh',
              width: '38.2vw',
            }}
          ></Paper>
        </Box>
      )}
      {minimum ? (
        <></>
      ) : (
        <Box
          sx={{
            bottom: 0,
            left: '50%',
            maxWidth: 600,
            pb: 4,
            pl: 4,
            position: 'absolute',
            pr: 4,
            transform: 'translateX(-50%)',
            width: '100%',
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-around',
              mb: 4,
              width: '100%',
            }}
          >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Fab
                onClick={() => {
                  if (mic) {
                    setConstraints({ ...constraints, audio: false });
                  } else {
                    setConstraints({ ...constraints, audio: true });
                  }
                  setMic(!mic);
                }}
                sx={
                  mic ? {} : { background: 'rgba(0,0,0,0.5)', color: '#ffffff' }
                }
              >
                {mic ? <MicIcon /> : <MicOffIcon />}
              </Fab>
              <Typography color="#ffffff" sx={{ mt: 1 }}>
                {t('mic')}
                {mic ? t('open') : t('closable')}
              </Typography>
            </Box>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Fab
                onClick={() => {
                  setVolume(!volume);
                }}
                sx={
                  volume
                    ? {}
                    : { background: 'rgba(0,0,0,0.5)', color: '#ffffff' }
                }
              >
                {volume ? <VolumeDownIcon /> : <VolumeOffIcon />}
              </Fab>
              <Typography color="#ffffff" sx={{ mt: 1 }}>
                {t('volume')}
                {volume ? t('open') : t('closable')}
              </Typography>
            </Box>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Fab
                onClick={() => {
                  if (video) {
                    setConstraints({ ...constraints, video: false });
                  } else {
                    setConstraints({
                      ...constraints,
                      video: { aspectRatio, facingMode },
                    });
                  }
                  setVideo(!video);
                }}
                sx={
                  video
                    ? {}
                    : { background: 'rgba(0,0,0,0.5)', color: '#ffffff' }
                }
              >
                {video ? <VideocamIcon /> : <VideocamOffIcon />}
              </Fab>
              <Typography color="#ffffff" sx={{ mt: 1 }}>
                {t('video')}
                {video ? t('open') : t('closable')}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-around',
              width: '100%',
            }}
          >
            <Fab
              onClick={() => {
                setBlur(!blur);
              }}
              sx={
                blur ? { background: 'rgba(0,0,0,0.5)', color: '#ffffff' } : {}
              }
            >
              {blur ? <BlurOffIcon /> : <BlurOnIcon />}
            </Fab>
            <Fab
              color="error"
              onClick={() => {
                closeEmit(false);
              }}
            >
              <CallEndIcon />
            </Fab>
            <Fab
              disabled={videoDeviceList.length <= 1}
              onClick={() => {
                const nextFacingMode =
                  facingMode === 'environment' ? 'user' : 'environment';

                setFacingMode(nextFacingMode);

                setConstraints({
                  ...constraints,
                  video:
                    constraints.video && typeof constraints.video !== 'boolean'
                      ? {
                          ...constraints.video,
                          facingMode: nextFacingMode,
                        }
                      : {},
                });
              }}
            >
              <CameraswitchIcon />
            </Fab>
          </Box>
        </Box>
      )}
    </Paper>
  );
}

export default PeerToPeer;
