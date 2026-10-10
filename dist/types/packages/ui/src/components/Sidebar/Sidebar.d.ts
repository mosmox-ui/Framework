import type { HTMLAttributes, ReactNode } from 'react';
import './Sidebar.css';
export type SidebarContentPosition = 'top' | 'center' | 'bottom';
export type SidebarSize = 'sm' | 'default' | 'lg';
export type SidebarVariant = 'plain' | 'bordered' | 'soft';
export type SidebarProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    children?: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
    contentPosition?: SidebarContentPosition;
    size?: SidebarSize;
    variant?: SidebarVariant;
    width?: number | string;
    minHeight?: number | string;
    fullHeight?: boolean;
};
export declare function Sidebar({ children, header, footer, contentPosition, size, variant, width, minHeight, fullHeight, className, style, ...rest }: SidebarProps): import("react").JSX.Element;
