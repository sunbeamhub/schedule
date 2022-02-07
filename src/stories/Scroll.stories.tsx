import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Scroll } from './Scroll';

export default {
  title: 'Example/Scroll',
  component: Scroll,
} as ComponentMeta<typeof Scroll>;

const Template: ComponentStory<typeof Scroll> = (args) => (
  <Scroll {...args}></Scroll>
);

export const Unsplash = Template.bind({});
Unsplash.args = {
  itemList: [
    {
      alt: '点击打开详情页',
      figcaption: '一只小猫',
      src: './cat/amber-kipp-75715CVEJhI-unsplash.jpg',
    },
    {
      alt: '点击打开详情页',
      figcaption: '一只小猫',
      src: './cat/hang-niu-Tn8DLxwuDMA-unsplash.jpg',
    },
    {
      alt: '点击打开详情页',
      figcaption: '一只小猫',
      src: './cat/kanashi-BLW_KQ0Rkn0-unsplash.jpg',
    },
    {
      alt: '点击打开详情页',
      figcaption: '一只小猫',
      src: './cat/ludemeula-fernandes-9UUoGaaHtNE-unsplash.jpg',
    },
    {
      alt: '点击打开详情页',
      figcaption: '一只小猫',
      src: './cat/michael-sum-LEpfefQf4rU-unsplash.jpg',
    },
    {
      alt: '点击打开详情页',
      figcaption: '一只小猫',
      src: './cat/mikhail-vasilyev-NodtnCsLdTE-unsplash.jpg',
    },
    {
      alt: '点击打开详情页',
      figcaption: '一座大山',
      src: './mountain/benjamin-voros-phIFdC6lA4E-unsplash.jpg',
    },
    {
      alt: '点击打开详情页',
      figcaption: '一座大山',
      src: './mountain/guillaume-briard-lSXpV8bDeMA-unsplash.jpg',
    },
    {
      alt: '点击打开详情页',
      figcaption: '一座大山',
      src: './mountain/jeremy-bishop-dR_q93lfaTw-unsplash.jpg',
    },
    {
      alt: '点击打开详情页',
      figcaption: '一座大山',
      src: './mountain/johannes-ludwig-8dejZGw3Hec-unsplash.jpg',
    },
    {
      alt: '点击打开详情页',
      figcaption: '一座大山',
      src: './mountain/kurt-cotoaga-cqbLg3lZEpk-unsplash.jpg',
    },
    {
      alt: '点击打开详情页',
      figcaption: '一座大山',
      src: './mountain/matteo-catanese-4KrQq8Z6Y5c-unsplash.jpg',
    },
    {
      alt: '点击打开详情页',
      figcaption: '一座大山',
      src: './mountain/rohit-tandon-9wg5jCEPBsw-unsplash.jpg',
    },
    {
      alt: '点击打开详情页',
      figcaption: '一座大山',
      src: './mountain/tobias-keller-73F4pKoUkM0-unsplash.jpg',
    },
  ],
};
