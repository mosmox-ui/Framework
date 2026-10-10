import { Children, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import './Masonry.css';

export type MasonryBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type MasonryColumns = number | Partial<Record<MasonryBreakpoint, number>>;
export type MasonryElement = 'div' | 'section' | 'main' | 'ul' | 'ol';
export type MasonryItemElement = 'div' | 'article' | 'li';

export type MasonryProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  children?: ReactNode;
  columns?: MasonryColumns;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  minColumnWidth?: number | string;
  as?: MasonryElement;
  itemAs?: MasonryItemElement;
  itemClassName?: string;
  itemStyle?: CSSProperties;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const cssLength = (value?: number | string) => typeof value === 'number' ? String(value) + 'px' : value;
const breakpoints: MasonryBreakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
const clampColumns = (value: number) => Math.max(1, Math.min(12, Math.round(value)));

export function Masonry({
  children,
  columns = 3,
  gap = 16,
  rowGap,
  columnGap,
  minColumnWidth,
  as = 'div',
  itemAs = 'div',
  itemClassName,
  itemStyle,
  className,
  style,
  ...rest
}: MasonryProps) {
  const responsiveColumns = typeof columns === 'number' ? {} : columns;
  const baseColumns = typeof columns === 'number' ? columns : responsiveColumns.xs ?? 1;
  let currentColumns = clampColumns(baseColumns);
  const responsiveStyles = breakpoints.reduce((variables, breakpoint) => {
    if (responsiveColumns[breakpoint] !== undefined) currentColumns = clampColumns(responsiveColumns[breakpoint] as number);
    variables['--mm-masonry-' + breakpoint + '-columns'] = currentColumns;
    return variables;
  }, {} as Record<string, number>);
  const variables = {
    '--mm-masonry-columns': clampColumns(baseColumns),
    '--mm-masonry-gap': cssLength(gap),
    '--mm-masonry-row-gap': cssLength(rowGap ?? gap),
    '--mm-masonry-column-gap': cssLength(columnGap ?? gap),
    ...(minColumnWidth !== undefined && { '--mm-masonry-column-width': cssLength(minColumnWidth) }),
    ...responsiveStyles,
    ...style,
  } as CSSProperties;
  const Component = as;
  const Item = itemAs;

  return <Component className={cx('mm-masonry', minColumnWidth !== undefined && 'mm-masonry--width-driven', className)} style={variables} {...rest}>
    {Children.toArray(children).map((child, index) => <Item className={cx('mm-masonry__item', itemClassName)} key={'masonry-item-' + index} style={itemStyle}>{child}</Item>)}
  </Component>;
}
