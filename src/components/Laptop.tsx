import FaceIcon from '@mui/icons-material/Face';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ROUTE_LIST, ROUTE_LIST_MAP } from 'config';
import { RouteProps } from 'interface';
import React from 'react';
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

  return (
    <Stack sx={{ height: 1 }}>
      <AppBar elevation={3} enableColorOnDark position="sticky">
        <Toolbar>
          <Typography variant="h6">
            {ROUTE_LIST_MAP[location.pathname.slice(1)].label}
          </Typography>
          <Box sx={{ flex: 1 }} />
          <IconButton aria-label="搜索" color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton aria-label="通知" color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton aria-label="设置" color="inherit" sx={{ mr: 1 }}>
            <SettingsIcon />
          </IconButton>
          <Chip color="info" icon={<FaceIcon />} label="登录" />
        </Toolbar>
      </AppBar>
      <Stack direction="row" sx={{ flex: 1 }}>
        <Paper elevation={1}>
          <List sx={{ height: 1 }}>
            {ROUTE_LIST.filter((route) => !route.hidden).map((route, index) => (
              <ListItemLink
                icon={route.icon}
                key={index}
                label={route.label}
                path={route.path}
              />
            ))}
          </List>
        </Paper>
        <Box sx={{ flex: 1, mt: 2.5, pb: 1, pl: 2, pr: 2 }}>
          <Outlet />
        </Box>
      </Stack>
    </Stack>
  );
}

export default Laptop;
