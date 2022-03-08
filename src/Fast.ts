import {
  fastBreadcrumb,
  fastBreadcrumbItem,
  fastButton,
  fastCard,
  fastDivider,
  provideFASTDesignSystem,
} from '@microsoft/fast-components';
import { provideReactWrapper } from '@microsoft/fast-react-wrapper';
import React from 'react';

const { wrap } = provideReactWrapper(React, provideFASTDesignSystem());

export const FastBreadcrumb = wrap(fastBreadcrumb());
export const FastBreadcrumbItem = wrap(fastBreadcrumbItem());
export const FastButton = wrap(fastButton());
export const FastCard = wrap(fastCard());
export const FastDivider = wrap(fastDivider());
