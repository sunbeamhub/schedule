import CheckIcon from '@mui/icons-material/Check';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import { ModeContext } from 'common/context/modeContext';
import { Fragment, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidV4 } from 'uuid';

function Setting() {
  const { mode: muiMode, setMode: setMuiMode } = useContext(ModeContext);
  const [notificationPermission, setNotificationPermission] = useState(
    'Notification' in window ? Notification.permission === 'granted' : false
  );
  const { i18n, t } = useTranslation('me');

  const languageList: Array<{ [key: string]: any }> = [
    {
      icon: <LanguageIcon />,
      id: uuidV4(),
      lng: 'zh',
      locales: ['zh', 'zh-CN', 'zh-Hans', 'zh-Hans-CN'],
      primary: t('setting.language.chinese'),
    },
    {
      icon: <LanguageIcon />,
      id: uuidV4(),
      lng: 'en',
      locales: ['en'],
      primary: t('setting.language.english'),
    },
  ];

  const modeList: Array<{ [key: string]: any }> = [
    {
      icon: <LightModeIcon />,
      id: uuidV4(),
      mode: 'lightMode',
      primary: t('setting.mode.lightMode'),
    },
    {
      icon: <SettingsBrightnessIcon />,
      id: uuidV4(),
      mode: 'system',
      primary: t('setting.mode.system'),
    },
    {
      icon: <DarkModeIcon />,
      id: uuidV4(),
      mode: 'darkMode',
      primary: t('setting.mode.darkMode'),
    },
  ];

  return (
    <List>
      <ListSubheader>{t('setting.mode.mode')}</ListSubheader>
      {modeList.map(({ icon, id, mode, primary }, index) => (
        <Fragment key={id}>
          <ListItemButton
            onClick={() => {
              setMuiMode(mode);
            }}
            selected={muiMode === mode}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={primary}></ListItemText>
            {muiMode === mode ? <CheckIcon /> : <></>}
          </ListItemButton>
          {index < modeList.length - 1 ? <Divider /> : <></>}
        </Fragment>
      ))}
      <ListSubheader>{t('setting.language.language')}</ListSubheader>
      {languageList.map(({ icon, id, lng, locales, primary }, index) => (
        <Fragment key={id}>
          <ListItemButton
            onClick={() => {
              i18n.changeLanguage(lng);
            }}
            selected={locales.includes(i18n.language)}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={primary}></ListItemText>
            {locales.includes(i18n.language) ? <CheckIcon /> : <></>}
          </ListItemButton>
          {index < languageList.length - 1 ? <Divider /> : <></>}
        </Fragment>
      ))}
      <ListSubheader>{t('setting.notification.notification')}</ListSubheader>
      <ListItem>
        <ListItemIcon>
          <NotificationsIcon />
        </ListItemIcon>
        <ListItemText
          id="notification-permission"
          primary={t('setting.notification.permission')}
        />
        <Switch
          checked={notificationPermission}
          disabled={
            'Notification' in window
              ? Notification.permission !== 'default'
              : true
          }
          edge="end"
          inputProps={{ 'aria-labelledby': 'notification-permission' }}
          onChange={() => {
            if (!('Notification' in window)) {
              console.error('Notification API not supported!');
              return;
            }

            Notification.requestPermission((permission) => {
              setNotificationPermission(permission === 'granted');
            });
          }}
        />
      </ListItem>
    </List>
  );
}

export default Setting;
