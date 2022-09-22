import React from 'react';

export interface RouteProps {
  element?: React.ReactElement;
  hasLayout?: boolean;
  icon?: React.ReactElement;
  label: string;
  menus?: Array<'laptop' | 'mobile' | 'tablet'>;
  path: string;
}
