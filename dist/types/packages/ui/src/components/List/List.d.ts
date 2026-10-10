import { type HTMLAttributes, type ReactNode } from 'react';
import './List.css';
export type ListSize = 'sm' | 'default' | 'lg';
export type ListVariant = 'plain' | 'divided' | 'bordered' | 'card';
export type ListSelectionMode = 'none' | 'single' | 'multiple';
export type ListItem<T = unknown> = {
    key: string;
    title: ReactNode;
    description?: ReactNode;
    content?: ReactNode;
    leading?: ReactNode;
    trailing?: ReactNode;
    meta?: ReactNode;
    href?: string;
    disabled?: boolean;
    data?: T;
};
export type ListRenderState = {
    selected: boolean;
    disabled: boolean;
    index: number;
};
export type ListProps<T = unknown> = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> & {
    items?: ListItem<T>[];
    children?: ReactNode;
    renderItem?: (item: ListItem<T>, state: ListRenderState) => ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
    size?: ListSize;
    variant?: ListVariant;
    selectionMode?: ListSelectionMode;
    selectedKeys?: string[];
    defaultSelectedKeys?: string[];
    onSelectionChange?: (keys: string[], item?: ListItem<T>) => void;
    onItemClick?: (item: ListItem<T>, index: number) => void;
    gap?: number | string;
};
export declare function List<T = unknown>({ items, children, renderItem, header, footer, size, variant, selectionMode, selectedKeys, defaultSelectedKeys, onSelectionChange, onItemClick, gap, className, style, ...rest }: ListProps<T>): import("react").JSX.Element;
