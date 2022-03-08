import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileLayout from 'layouts/MobileLayout';
import Rota from 'pages/Rota';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

declare module '@mui/material/styles' {
  interface Theme {
    breakpoints: {
      values: {
        mobile: number;
        tablet: number;
        laptop: number;
      };
    };
  }
  interface ThemeOptions {
    breakpoints?: {
      values?: {
        mobile?: number;
        tablet?: number;
        laptop?: number;
      };
    };
  }
}

function App() {
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
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <React.StrictMode>
      <BrowserRouter basename="schedule">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<MobileLayout />}>
              <Route path="rota" element={<Rota />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
