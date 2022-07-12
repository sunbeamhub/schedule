import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import RefreshIcon from '@mui/icons-material/Refresh';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
      divider: true,
      icon: <RefreshIcon />,
      onClick: () => {
        navigate(0);
        setMoreAnchorElement(null);
      },
      text: t('operation.refresh'),
    },
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
      divider: true,
      icon: <ImportExportIcon />,
      onClick: () => {
        setMoreAnchorElement(null);
      },
      text: t('operation.export'),
    },
    {
      icon: <MonitorHeartIcon />,
      onClick: () => {
        setMoreAnchorElement(null);
      },
      text: t('operation.log'),
    },
  ];

  return (
    <Menu
      anchorEl={moreAnchorElement}
      id="more-menu"
      MenuListProps={{ sx: { minWidth: 140 } }}
      onClose={() => {
        setMoreAnchorElement(null);
      }}
      open={Boolean(moreAnchorElement)}
    >
      {scheduleOperationList.map((operation, index) => (
        <MenuItem
          divider={operation.divider}
          key={index}
          onClick={operation.onClick}
        >
          <ListItemIcon>{operation.icon}</ListItemIcon>
          <ListItemText>{operation.text}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default OperationMenus;
