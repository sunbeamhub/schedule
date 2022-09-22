import ClearIcon from '@mui/icons-material/Clear';
import FaceIcon from '@mui/icons-material/Face';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigation } from 'common/hooks/useNavigation';
import { RouteProps } from 'common/interface';
import { Setting } from 'me/components/Setting';
import React, { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, LinkProps, Outlet, useLocation } from 'react-router-dom';

function ListItemLink(props: RouteProps) {
  const { icon, label, path } = props;
  const location = useLocation();

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'>>(
        (itemProps, ref) => <Link to={path} ref={ref} {...itemProps} />
      ),
    [path]
  );

  return (
    <ListItemButton
      component={renderLink}
      selected={path === location.pathname.slice(1)}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={label} />
    </ListItemButton>
  );
}

function Laptop() {
  const location = useLocation();
  const { ROUTE_LIST, ROUTE_LIST_MAP } = useNavigation();
  const [settingDrawerOpen, setSettingDrawerOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Stack sx={{ height: 1 }}>
      <AppBar elevation={3} enableColorOnDark position="sticky">
        <Toolbar>
          <Typography variant="h6">
            {ROUTE_LIST_MAP[location.pathname.slice(1)].label}
          </Typography>
          <Box sx={{ flex: 1 }} />
          <IconButton aria-label={t('laptop.search')} color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton aria-label={t('laptop.notification')} color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton
            aria-label={t('laptop.setting')}
            color="inherit"
            onClick={() => {
              setSettingDrawerOpen(true);
            }}
            sx={{ mr: 1 }}
          >
            <SettingsIcon />
          </IconButton>
          <Chip color="info" icon={<FaceIcon />} label={t('laptop.login')} />
        </Toolbar>
      </AppBar>
      <Stack direction="row" sx={{ flex: 1 }}>
        <Paper elevation={1}>
          <List sx={{ height: 1 }}>
            {ROUTE_LIST.filter((route) => route.menus?.includes('laptop')).map(
              (route, index) => (
                <ListItemLink
                  icon={route.icon}
                  key={index}
                  label={route.label}
                  path={route.path}
                />
              )
            )}
          </List>
        </Paper>
        <Box
          sx={{
            flex: 1,
            mt: 2.5,
            overflow: 'hidden',
            pb: 1,
            pl: 2,
            pr: 2,
            width: '100%',
          }}
        >
          <Suspense fallback="">
            <Outlet />
          </Suspense>
        </Box>
      </Stack>
      <Drawer
        anchor="right"
        onClose={() => {
          setSettingDrawerOpen(false);
        }}
        open={settingDrawerOpen}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            pb: 1,
            pl: 2,
            pr: 1,
            pt: 1,
            width: 360,
          }}
        >
          <Typography variant="h6">{t('laptop.setting')}</Typography>
          <IconButton
            aria-label={t('laptop.close')}
            color="inherit"
            onClick={() => {
              setSettingDrawerOpen(false);
            }}
          >
            <ClearIcon />
          </IconButton>
        </Box>
        <Divider />
        <Setting />
      </Drawer>
    </Stack>
  );
}

export default Laptop;
