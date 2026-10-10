import { type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
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
export declare function Masonry({ children, columns, gap, rowGap, columnGap, minColumnWidth, as, itemAs, itemClassName, itemStyle, className, style, ...rest }: MasonryProps): import("react").JSX.Element;
