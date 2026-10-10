import { type ReactNode } from 'react';
import { type MenuEntry, type MenuItem, type MenuProps } from '../Menu';
import './ContextMenu.css';
export type ContextMenuPosition = {
    x: number;
    y: number;
};
export type ContextMenuProps = {
    'aria-label'?: string;
    children: ReactNode;
    className?: string;
    closeOnEscape?: boolean;
    closeOnOutsideClick?: boolean;
    closeOnSelect?: boolean;
    defaultOpen?: boolean;
    disabled?: boolean;
    entries: MenuEntry[];
    id?: string;
    menuProps?: Omit<MenuProps, 'aria-label' | 'entries' | 'onSelect' | 'width'>;
    menuWidth?: number | string;
    offset?: number;
    onOpenChange?: (open: boolean, position?: ContextMenuPosition) => void;
    onSelect?: (key: string, item: MenuItem) => void;
    open?: boolean;
    position?: ContextMenuPosition;
    preventDefault?: boolean;
};
export declare function ContextMenu({ 'aria-label': ariaLabel, children, className, closeOnEscape, closeOnOutsideClick, closeOnSelect, defaultOpen, disabled, entries, id, menuProps, menuWidth, offset, onOpenChange, onSelect, open: controlledOpen, position: controlledPosition, preventDefault, }: ContextMenuProps): import("react").JSX.Element;
