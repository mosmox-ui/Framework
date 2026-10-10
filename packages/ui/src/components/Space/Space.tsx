import { Children, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import './Space.css';

export type SpaceDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type SpaceAlign = 'normal' | 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
export type SpaceJustify = 'normal' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch';
export type SpaceWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type SpaceTag = 'div' | 'span' | 'section' | 'nav' | 'ul' | 'ol';

export type SpaceProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  children?: ReactNode;
  direction?: SpaceDirection;
  align?: SpaceAlign;
  justify?: SpaceJustify;
  wrap?: SpaceWrap;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  inline?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  flex?: string | number;
  grow?: number;
  shrink?: number;
  basis?: number | string;
  separator?: ReactNode;
  separatorAriaHidden?: boolean;
  as?: SpaceTag;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const cssLength = (value?: number | string) => typeof value === 'number' ? `${value}px` : value;

export function Space({ children, direction = 'row', align = 'center', justify = 'flex-start', wrap = 'nowrap', gap, rowGap, columnGap, inline = false, fullWidth = false, fullHeight = false, flex, grow, shrink, basis, separator, separatorAriaHidden = true, as = 'div', className, style, ...rest }: SpaceProps) {
  const items = Children.toArray(children);
  const Component = as;
  const variables = {
    ...(gap !== undefined && { '--mm-space-gap': cssLength(gap) }),
    ...(rowGap !== undefined && { '--mm-space-row-gap': cssLength(rowGap) }),
    ...(columnGap !== undefined && { '--mm-space-column-gap': cssLength(columnGap) }),
    ...(flex !== undefined && { '--mm-space-flex': typeof flex === 'number' ? String(flex) : flex }),
    ...(grow !== undefined && { '--mm-space-grow': grow }),
    ...(shrink !== undefined && { '--mm-space-shrink': shrink }),
    ...(basis !== undefined && { '--mm-space-basis': cssLength(basis) }),
    ...style,
  } as CSSProperties;
  return <Component className={cx('mm-space', `mm-space--${direction}`, `mm-space--align-${align}`, `mm-space--justify-${justify}`, `mm-space--${wrap}`, inline && 'mm-space--inline', fullWidth && 'mm-space--full-width', fullHeight && 'mm-space--full-height', Boolean(separator) && 'mm-space--with-separator', className)} style={variables} {...rest}>
    {items.map((child, index) => <span className="mm-space__item" key={`space-item-${index}`}>{child}{separator && index < items.length - 1 ? <span aria-hidden={separatorAriaHidden} className="mm-space__separator">{separator}</span> : null}</span>)}
  </Component>;
}
