import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import useApp from 'hooks/useApp';
import React from 'react';

function App() {
  const { theme, routes } = useApp();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routes}
    </ThemeProvider>
  );
}

export default App;
