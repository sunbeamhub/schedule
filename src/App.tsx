import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Laptop } from 'common/components/Laptop';
import { Mobile } from 'common/components/Mobile';
import { ModeContext } from 'common/context/modeContext';
import { useStickyState } from 'common/hooks';
import { useNavigation } from 'common/hooks/useNavigation';
import { useMemo } from 'react';
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

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { ROUTE_LIST, ROUTE_LIST_MAP } = useNavigation();
  const [mode, setMode] = useStickyState<'darkMode' | 'lightMode' | 'system'>(
    'system',
    'schedule_mode'
  );

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

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {routes}
      </ThemeProvider>
    </ModeContext.Provider>
  );
}

export default App;
