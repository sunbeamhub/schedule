import React from 'react';

export interface RouteProps {
  element?: React.ReactElement;
  hidden?: boolean;
  icon?: React.ReactElement;
  label: string;
  path: string;
}
