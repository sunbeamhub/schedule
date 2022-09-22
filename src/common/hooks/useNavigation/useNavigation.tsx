import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExploreIcon from '@mui/icons-material/Explore';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { RouteProps } from 'common/interface';
import ExplorePage from 'pages/Explore';
import LoginPage from 'pages/Login';
import MePage from 'pages/Me';
import MessagePage from 'pages/Message';
import SchedulePage from 'pages/Schedule';
import SearchPage from 'pages/Search';
import { useTranslation } from 'react-i18next';

function useNavigation() {
  const { t } = useTranslation();

  const ROUTE_LIST: RouteProps[] = [
    {
      element: <ExplorePage />,
      hasLayout: true,
      icon: <ExploreIcon />,
      label: t('navigation.explore'),
      menus: ['mobile', 'laptop'],
      path: 'explore',
    },
    {
      element: <LoginPage />,
      icon: <AccountCircleIcon />,
      label: t('navigation.login'),
      path: 'login',
    },
    {
      element: <MePage />,
      hasLayout: true,
      icon: <PersonIcon />,
      label: t('navigation.me'),
      menus: ['mobile'],
      path: 'me',
    },
    {
      element: <MessagePage />,
      hasLayout: true,
      icon: <MessageIcon />,
      label: t('navigation.message'),
      menus: ['mobile', 'laptop'],
      path: 'message',
    },
    {
      element: <SchedulePage />,
      hasLayout: true,
      icon: <CalendarMonthIcon />,
      label: t('navigation.schedule'),
      menus: ['mobile', 'laptop'],
      path: 'schedule',
    },
    {
      element: <SearchPage />,
      icon: <SearchIcon />,
      label: t('navigation.search'),
      path: 'search',
    },
  ];

  const ROUTE_LIST_MAP: { [key: string]: any } = ROUTE_LIST.reduce(
    (previous, current) => ({ ...previous, [current.path]: current }),
    {}
  );

  return { ROUTE_LIST, ROUTE_LIST_MAP };
}

export default useNavigation;
