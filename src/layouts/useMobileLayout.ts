import React from 'react';

function useMobileLayout() {
  const [value, setValue] = React.useState(0);

  return { setValue, value };
}

export default useMobileLayout;
