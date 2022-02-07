import React from 'react';
import { useRovingIndex } from 'roving-ux-react';
import './scroll.scss';

interface ScrollProps {
  /**
   * Item content
   */
  itemList: Array<{
    alt: string;
    figcaption: string;
    src: string;
    [key: string]: any;
  }>;
}

export const Scroll = ({ itemList = [] }: ScrollProps) => {
  const { roverProps, getTargetProps } = useRovingIndex();

  return (
    <ul className="storybook-scroll-horizontal-media-scroller" {...roverProps}>
      {itemList.map((item, index) => (
        <li key={item.id || index} {...getTargetProps(index)}>
          <a href="#">
            <figure>
              <picture>
                <img alt={item.alt} loading="lazy" src={item.src}></img>
              </picture>
              <figcaption>{item.figcaption}</figcaption>
            </figure>
          </a>
        </li>
      ))}
    </ul>
  );
};
