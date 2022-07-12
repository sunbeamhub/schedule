import { createContext } from 'react';

const MoreAnchorElementContext = createContext<{
  moreAnchorElement: (EventTarget & HTMLButtonElement) | null;
  setMoreAnchorElement: (
    moreAnchorElement: (EventTarget & HTMLButtonElement) | null
  ) => void;
}>({
  moreAnchorElement: null,
  setMoreAnchorElement: () => {},
});

export default MoreAnchorElementContext;
