import { type ReactNode } from 'react';
import './Menu.css';
export type MenuSize = 'sm' | 'default' | 'lg';
export type MenuVariant = 'default' | 'compact' | 'filled';
export type MenuItem = {
    key: string;
    label: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    image?: string;
    shortcut?: ReactNode;
    disabled?: boolean;
    danger?: boolean;
    checked?: boolean;
    onClick?: () => void;
    submenu?: MenuEntry[];
};
export type MenuContentEntry = {
    type: 'content';
    key?: string;
    content: ReactNode;
};
export type MenuEntry = MenuItem | {
    type: 'divider';
    key?: string;
} | {
    type: 'label';
    key?: string;
    label: ReactNode;
} | MenuContentEntry;
export type MenuProps = {
    'aria-label'?: string;
    className?: string;
    closeSubmenusOnMouseLeave?: boolean;
    defaultSelectedKeys?: string[];
    defaultOpenKeys?: string[];
    entries: MenuEntry[];
    footer?: ReactNode;
    maxHeight?: number | string;
    onSelect?: (key: string, item: MenuItem) => void;
    onOpenChange?: (keys: string[]) => void;
    openKeys?: string[];
    role?: 'menu' | 'listbox';
    selectable?: boolean;
    selectedKeys?: string[];
    submenuCloseDelay?: number;
    size?: MenuSize;
    variant?: MenuVariant;
    width?: number | string;
};
export declare function Menu({ 'aria-label': ariaLabel, className, closeSubmenusOnMouseLeave, defaultSelectedKeys, entries, footer, maxHeight, onSelect, role, selectable, selectedKeys: controlledSelectedKeys, size, submenuCloseDelay, variant, width, defaultOpenKeys, openKeys: controlledOpenKeys, onOpenChange, }: MenuProps): import("react").JSX.Element;
