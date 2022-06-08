import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigation } from 'common/hooks/useNavigation';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function Mobile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ROUTE_LIST, ROUTE_LIST_MAP } = useNavigation();
  const { t } = useTranslation();

  return (
    <Stack sx={{ height: 1 }}>
      <AppBar color="default" elevation={0} enableColorOnDark position="sticky">
        <Toolbar variant="dense">
          <Typography
            sx={{
              left: '50%',
              position: 'absolute',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            variant="h6"
          >
            {ROUTE_LIST_MAP[location.pathname.slice(1)].label}
          </Typography>
          <Box sx={{ flex: 1 }} />
          <IconButton
            aria-label={t('mobile.search')}
            color="inherit"
            onClick={(event) => {
              navigate('search');
            }}
          >
            <SearchIcon />
          </IconButton>
          <IconButton aria-label={t('mobile.more')} color="inherit" edge="end">
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1, mt: 1, pb: 1, pl: 2, pr: 2 }}>
        <Outlet />
      </Box>
      <Paper elevation={3} sx={{ pb: 'env(safe-area-inset-bottom, 20px)' }}>
        <BottomNavigation
          onChange={(event, value) => {
            navigate(value);
          }}
          showLabels
          value={location.pathname.slice(1)}
        >
          {ROUTE_LIST.filter((route) => !route.hidden).map((route, index) => (
            <BottomNavigationAction
              icon={route.icon}
              key={index}
              label={route.label}
              value={route.path}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Stack>
  );
}

export default Mobile;
