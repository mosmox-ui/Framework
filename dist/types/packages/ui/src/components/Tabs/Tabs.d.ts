import { type CSSProperties, type ReactNode } from 'react';
import './Tabs.css';
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsSize = 'xs' | 'sm' | 'default';
export type TabsActivationMode = 'automatic' | 'manual';
export type TabItem = {
    key: string;
    label: ReactNode;
    content?: ReactNode;
    icon?: ReactNode;
    badge?: ReactNode;
    disabled?: boolean;
};
export type TabsProps = {
    items: TabItem[];
    activeKey?: string;
    defaultActiveKey?: string;
    onChange?: (key: string, item: TabItem) => void;
    orientation?: TabsOrientation;
    size?: TabsSize;
    activationMode?: TabsActivationMode;
    fullWidth?: boolean;
    fitted?: boolean;
    lazy?: boolean;
    keepMounted?: boolean;
    className?: string;
    style?: CSSProperties;
};
export declare function Tabs({ items, activeKey, defaultActiveKey, onChange, orientation, size, activationMode, fullWidth, fitted, lazy, keepMounted, className, style }: TabsProps): import("react").JSX.Element;
