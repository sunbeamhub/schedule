import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import RefreshIcon from '@mui/icons-material/Refresh';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MoreAnchorElementContext } from 'common/context/moreAnchorElementContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function OperationMenus() {
  const { moreAnchorElement, setMoreAnchorElement } = useContext(
    MoreAnchorElementContext
  );
  const navigate = useNavigate();
  const { t } = useTranslation('schedule');

  const scheduleOperationList = [
    {
      icon: <AddIcon />,
      onClick: () => {
        setMoreAnchorElement(null);
      },
      text: t('operation.add'),
    },
    {
      icon: <EditIcon />,
      onClick: () => {
        setMoreAnchorElement(null);
      },
      text: t('operation.edit'),
    },
    {
      icon: <DeleteIcon />,
      onClick: () => {
        setMoreAnchorElement(null);
      },
      text: t('operation.delete'),
    },
    {
      icon: <ShareIcon />,
      onClick: () => {
        setMoreAnchorElement(null);
      },
      text: t('operation.share'),
    },
    {
      icon: <VisibilityIcon />,
      onClick: () => {
        setMoreAnchorElement(null);
      },
      text: t('operation.visibility'),
    },
    {
      icon: <ImportExportIcon />,
      onClick: () => {
        setMoreAnchorElement(null);
      },
      text: t('operation.export'),
    },
  ];

  return (
    <Menu
      anchorEl={moreAnchorElement}
      id="more-menu"
      MenuListProps={{ dense: true }}
      onClose={() => {
        setMoreAnchorElement(null);
      }}
      open={Boolean(moreAnchorElement)}
    >
      <MenuItem
        onClick={() => {
          navigate(0);
          setMoreAnchorElement(null);
        }}
      >
        <ListItemIcon>
          <RefreshIcon />
        </ListItemIcon>
        <ListItemText>{t('operation.refresh')}</ListItemText>
      </MenuItem>
      <Divider />
      {scheduleOperationList.map((operation, index) => (
        <MenuItem key={index} onClick={operation.onClick}>
          <ListItemIcon>{operation.icon}</ListItemIcon>
          <ListItemText>{operation.text}</ListItemText>
        </MenuItem>
      ))}
      <Divider />
      <MenuItem
        onClick={() => {
          setMoreAnchorElement(null);
        }}
      >
        <ListItemIcon>
          <MonitorHeartIcon />
        </ListItemIcon>
        <ListItemText>{t('operation.log')}</ListItemText>
      </MenuItem>
    </Menu>
  );
}

export default OperationMenus;
