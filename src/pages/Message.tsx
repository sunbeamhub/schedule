import Button from '@mui/material/Button';
import { PeerToPeer } from 'Message/components/PeerToPeer';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Message() {
  const [peerToPeerVisible, setPeerToPeerVisible] = useState(false);
  const { t } = useTranslation('message');

  return (
    <>
      <Button
        onClick={() => {
          if (peerToPeerVisible) {
            return;
          }

          setPeerToPeerVisible(true);
        }}
        variant="outlined"
      >
        {t('peerToPeer')}
      </Button>
      {peerToPeerVisible ? (
        <PeerToPeer closeEmit={setPeerToPeerVisible}></PeerToPeer>
      ) : (
        <></>
      )}
    </>
  );
}

export default Message;
