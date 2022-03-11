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

export const ROUTE_LIST: RouteProps[] = [
  {
    element: <SearchPage />,
    hidden: true,
    icon: <SearchIcon />,
    label: '搜索',
    path: 'search',
  },
  {
    element: <SchedulePage />,
    icon: <CalendarMonthIcon />,
    label: '值班',
    path: 'schedule',
  },
  {
    element: <MessagePage />,
    icon: <MessageIcon />,
    label: '消息',
    path: 'message',
  },
  {
    element: <ExplorePage />,
    icon: <ExploreIcon />,
    label: '发现',
    path: 'explore',
  },
  { element: <MePage />, icon: <PersonIcon />, label: '我的', path: 'me' },
];

export const ROUTE_LIST_MAP: { [key: string]: any } = ROUTE_LIST.reduce(
  (previous, current) => ({ ...previous, [current.path]: current }),
  {}
);
