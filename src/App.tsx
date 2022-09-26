import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Laptop } from 'common/components/Laptop';
import { Mobile } from 'common/components/Mobile';
import { ModeContext } from 'common/context/modeContext';
import { useStickyState } from 'common/hooks';
import { useIdbProvider } from 'common/hooks/useIdbProvider';
import { useNavigation } from 'common/hooks/useNavigation';
import mock from 'mock';
import { useEffect, useMemo } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { SWRConfig } from 'swr';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
  }
}

function App() {
  const { idbProvider } = useIdbProvider({
    dbName: 'schedule-db',
    storeName: 'schedule-store',
  });
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { ROUTE_LIST, ROUTE_LIST_MAP } = useNavigation();
  const [mode, setMode] = useStickyState<'darkMode' | 'lightMode' | 'system'>(
    'system',
    'schedule_mode'
  );

  useEffect(() => {
    if (!('Notification' in window)) {
      console.error('Notification API not supported!');
      return;
    }

    if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        breakpoints: {
          values: {
            mobile: 320,
            tablet: 768,
            laptop: 1024,
          },
        },
        components: {
          MuiUseMediaQuery: {
            defaultProps: { noSsr: true },
          },
        },
        palette: {
          mode:
            (mode === 'system' && prefersDarkMode) || mode === 'darkMode'
              ? 'dark'
              : 'light',
        },
      }),
    [mode, prefersDarkMode]
  );

  const isMobile = useMediaQuery(theme.breakpoints.between('mobile', 'tablet'));
  const isTablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));
  const isLaptop = useMediaQuery(theme.breakpoints.up('laptop'));

  const routes = useRoutes(
    isMobile
      ? [
          { element: <Navigate replace to="schedule" />, path: '/' },
          {
            children: ROUTE_LIST.filter((route) => route.hasLayout).map(
              (route) => ({
                element: route.element,
                path: route.path,
              })
            ),
            element: <Mobile />,
          },
          { element: ROUTE_LIST_MAP['login'].element, path: 'login' },
          { element: ROUTE_LIST_MAP['search'].element, path: 'search' },
        ]
      : isTablet
      ? [{ element: <></>, path: '*' }]
      : isLaptop
      ? [
          { element: <Navigate replace to="schedule" />, path: '/' },
          {
            children: ROUTE_LIST.filter((route) => route.hasLayout).map(
              (route) => ({
                element: route.element,
                path: route.path,
              })
            ),
            element: <Laptop />,
          },
          { element: ROUTE_LIST_MAP['login'].element, path: 'login' },
        ]
      : [{ element: <></>, path: '*' }]
  );

  if (!idbProvider) {
    return <></>;
  }

  return (
    <SWRConfig
      value={{
        fetcher: (url, ...args) => mock[url].apply(null, args),
        provider: idbProvider,
        suspense: true,
      }}
    >
      <ModeContext.Provider value={{ mode, setMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {routes}
        </ThemeProvider>
      </ModeContext.Provider>
    </SWRConfig>
  );
}

export default App;
