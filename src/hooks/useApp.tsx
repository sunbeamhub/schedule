import createTheme from '@mui/material/styles/createTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import Laptop from 'components/Laptop';
import Mobile from 'components/Mobile';
import { ROUTE_LIST, ROUTE_LIST_MAP } from 'config';
import React from 'react';
import { useRoutes } from 'react-router-dom';

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

function useApp() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
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
        palette: { mode: prefersDarkMode ? 'dark' : 'light' },
      }),
    [prefersDarkMode]
  );

  const isMobile = useMediaQuery(theme.breakpoints.between('mobile', 'tablet'));
  const isTablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));
  const isLaptop = useMediaQuery(theme.breakpoints.up('laptop'));

  const routes = useRoutes(
    isMobile
      ? [
          {
            children: ROUTE_LIST.filter(
              (route) => !['search'].includes(route.path)
            ).map((route) => ({
              element: route.element,
              path: route.path,
            })),
            element: <Mobile />,
          },
          { element: ROUTE_LIST_MAP['search'].element, path: 'search' },
        ]
      : isTablet
      ? [{ element: <></>, path: '*' }]
      : isLaptop
      ? [
          {
            children: ROUTE_LIST.filter(
              (route) => !['search'].includes(route.path)
            ).map((route) => ({
              element: route.element,
              path: route.path,
            })),
            element: <Laptop />,
          },
        ]
      : [{ element: <></>, path: '*' }]
  );

  return { theme, routes };
}

export default useApp;
