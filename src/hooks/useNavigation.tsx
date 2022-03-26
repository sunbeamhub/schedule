import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExploreIcon from '@mui/icons-material/Explore';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ExplorePage from 'components/Explore';
import MePage from 'components/Me';
import MessagePage from 'components/Message';
import SchedulePage from 'components/Schedule';
import SearchPage from 'components/Search';
import { RouteProps } from 'interface';
import { useTranslation } from 'react-i18next';

function useNavigation() {
  const { t } = useTranslation();

  const ROUTE_LIST: RouteProps[] = [
    {
      element: <ExplorePage />,
      icon: <ExploreIcon />,
      label: t('navigation.explore'),
      path: 'explore',
    },
    {
      element: <MePage />,
      icon: <PersonIcon />,
      label: t('navigation.me'),
      path: 'me',
    },
    {
      element: <MessagePage />,
      icon: <MessageIcon />,
      label: t('navigation.message'),
      path: 'message',
    },
    {
      element: <SchedulePage />,
      icon: <CalendarMonthIcon />,
      label: t('navigation.schedule'),
      path: 'schedule',
    },
    {
      element: <SearchPage />,
      hidden: true,
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
