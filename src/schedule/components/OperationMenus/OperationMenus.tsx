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
import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const MenuItemMemo = memo(MenuItem);

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
      id: 'refresh',
      onClick: () => {
        navigate(0);
        setMoreAnchorElement(null);
      },
      text: t('operation.refresh'),
    },
    {
      icon: <AddIcon />,
      id: 'add',
      onClick: () => {
        setMoreAnchorElement(null);
      },
      text: t('operation.add'),
    },
    {
      icon: <EditIcon />,
      id: 'edit',
      onClick: () => {
        setMoreAnchorElement(null);
      },
      text: t('operation.edit'),
    },
    {
      icon: <DeleteIcon />,
      id: 'delete',
      onClick: () => {
        setMoreAnchorElement(null);
      },
      text: t('operation.delete'),
    },
    {
      icon: <ShareIcon />,
      id: 'share',
      onClick: () => {
        setMoreAnchorElement(null);
      },
      text: t('operation.share'),
    },
    {
      icon: <VisibilityIcon />,
      id: 'visibility',
      onClick: () => {
        setMoreAnchorElement(null);
      },
      text: t('operation.visibility'),
    },
    {
      divider: true,
      icon: <ImportExportIcon />,
      id: 'export',
      onClick: () => {
        setMoreAnchorElement(null);
      },
      text: t('operation.export'),
    },
    {
      icon: <MonitorHeartIcon />,
      id: 'log',
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
      {scheduleOperationList.map((operation) => (
        <MenuItemMemo
          divider={operation.divider}
          key={operation.id}
          onClick={operation.onClick}
        >
          <ListItemIcon>{operation.icon}</ListItemIcon>
          <ListItemText>{operation.text}</ListItemText>
        </MenuItemMemo>
      ))}
    </Menu>
  );
}

export default OperationMenus;
