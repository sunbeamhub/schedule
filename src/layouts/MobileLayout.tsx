import ArchiveIcon from '@mui/icons-material/Archive';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestoreIcon from '@mui/icons-material/Restore';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import React from 'react';
import { Outlet } from 'react-router-dom';
import useMobileLayout from './useMobileLayout';

function MobileLayout() {
  const { setValue, value } = useMobileLayout();

  return (
    <>
      <Outlet />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction icon={<RestoreIcon />} label="Recents" />
          <BottomNavigationAction icon={<FavoriteIcon />} label="Favorites" />
          <BottomNavigationAction icon={<ArchiveIcon />} label="Archive" />
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default MobileLayout;
