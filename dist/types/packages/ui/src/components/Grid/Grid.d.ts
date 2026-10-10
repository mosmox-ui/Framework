import { type HTMLAttributes, type ReactNode } from 'react';
import './Grid.css';
export type GridBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type GridAlign = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
export type GridJustify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
export type GridGutter = number | string | [number | string, number | string];
export type GridColConfig = {
    span?: number;
    offset?: number;
    order?: number;
    pull?: number;
    push?: number;
    flex?: string | number;
    hidden?: boolean;
};
export type GridResponsive = number | GridColConfig;
export type GridProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: ReactNode;
    fluid?: boolean;
    maxWidth?: number | string;
};
export type RowProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: ReactNode;
    gutter?: GridGutter;
    align?: GridAlign;
    justify?: GridJustify;
    wrap?: boolean;
};
export type ColProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: ReactNode;
    span?: number;
    offset?: number;
    order?: number;
    pull?: number;
    push?: number;
    flex?: string | number;
    xs?: GridResponsive;
    sm?: GridResponsive;
    md?: GridResponsive;
    lg?: GridResponsive;
    xl?: GridResponsive;
    xxl?: GridResponsive;
};
export declare function Grid({ children, fluid, maxWidth, className, style, ...rest }: GridProps): import("react").JSX.Element;
export declare function Row({ children, gutter, align, justify, wrap, className, style, ...rest }: RowProps): import("react").JSX.Element;
export declare function Col({ children, span, offset, order, pull, push, flex, xs, sm, md, lg, xl, xxl, className, style, ...rest }: ColProps): import("react").JSX.Element;
