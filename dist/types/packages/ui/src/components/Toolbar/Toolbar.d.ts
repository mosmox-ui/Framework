import { type CSSProperties, type ReactNode } from 'react';
import { type ButtonProps, type ButtonVariant } from '../Button';
import { type MenuEntry, type MenuSize, type MenuVariant } from '../Menu';
import { type TooltipPlacement, type TooltipSize, type TooltipVariant } from '../Tooltip';
import './Toolbar.css';
export type ToolbarOrientation = 'horizontal' | 'vertical';
export type ToolbarSize = 'sm' | 'default';
export type ToolbarVariant = 'surface' | 'bordered' | 'floating' | 'plain' | ButtonVariant;
export type ToolbarDensity = 'compact' | 'comfortable';
export type ToolbarPosition = {
    top: number | string;
    left: number | string;
};
export type ToolbarProps = {
    children: ReactNode;
    'aria-label'?: string;
    className?: string;
    density?: ToolbarDensity;
    disabled?: boolean;
    draggable?: boolean;
    fullWidth?: boolean;
    floating?: boolean;
    columns?: number;
    rows?: number;
    iconOnly?: boolean;
    initialPosition?: ToolbarPosition;
    style?: CSSProperties;
    title?: ReactNode;
    collapsible?: boolean;
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    orientation?: ToolbarOrientation;
    rovingFocus?: boolean;
    size?: ToolbarSize;
    sticky?: boolean;
    variant?: ToolbarVariant;
    wrap?: boolean;
};
export type ToolbarTooltipProps = {
    tooltip?: ReactNode;
    tooltipCloseDelay?: number;
    tooltipOpenDelay?: number;
    tooltipPlacement?: TooltipPlacement;
    tooltipSize?: TooltipSize;
    tooltipVariant?: TooltipVariant;
};
export type ToolbarItemProps = Omit<ButtonProps, 'size'> & ToolbarTooltipProps & {
    size?: ToolbarSize;
};
export type ToolbarGroupProps = {
    children: ReactNode;
    'aria-label'?: string;
    className?: string;
};
export type ToolbarSeparatorProps = {
    orientation?: ToolbarOrientation;
    className?: string;
};
export type ToolbarMenuProps = Omit<ToolbarItemProps, 'children' | 'iconRight'> & {
    label: ReactNode;
    entries: MenuEntry[];
    menuAriaLabel?: string;
    menuMaxHeight?: number | string;
    menuSize?: MenuSize;
    menuVariant?: MenuVariant;
    menuWidth?: number | string;
    onMenuSelect?: (key: string) => void;
};
declare function ToolbarItem({ className, disabled, hoverScale, size, variant, ...props }: ToolbarItemProps): import("react").JSX.Element;
declare function ToolbarGroup({ children, 'aria-label': ariaLabel, className }: ToolbarGroupProps): import("react").JSX.Element;
declare function ToolbarSeparator({ orientation, className }: ToolbarSeparatorProps): import("react").JSX.Element;
declare function ToolbarMenu({ className, disabled, entries, label, menuAriaLabel, menuMaxHeight, menuSize, menuVariant, menuWidth, onClick, onMenuSelect, size, tooltip, tooltipCloseDelay, tooltipOpenDelay, tooltipPlacement, tooltipSize, tooltipVariant, variant, ...props }: ToolbarMenuProps): import("react").JSX.Element;
declare function ToolbarSpacer(): import("react").JSX.Element;
export declare const Toolbar: import("react").ForwardRefExoticComponent<ToolbarProps & import("react").RefAttributes<HTMLDivElement>> & {
    Item: typeof ToolbarItem;
    Menu: typeof ToolbarMenu;
    Group: typeof ToolbarGroup;
    Separator: typeof ToolbarSeparator;
    Spacer: typeof ToolbarSpacer;
};
export { ToolbarGroup, ToolbarItem, ToolbarMenu, ToolbarSeparator, ToolbarSpacer };
