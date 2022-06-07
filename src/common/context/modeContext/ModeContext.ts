import { createContext } from 'react';

const ModeContext = createContext<{
  mode: 'darkMode' | 'lightMode' | 'system';
  setMode: (mode: 'darkMode' | 'lightMode' | 'system') => void;
}>({
  mode: 'system',
  setMode: () => {},
});

export default ModeContext;
