import type { ReactNode } from 'react';
import { type BadgeProps } from '../Badge';
import './BadgeIndicator.css';
export type BadgeIndicatorPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export type BadgeIndicatorProps = Omit<BadgeProps, 'children' | 'className'> & {
    badge?: ReactNode;
    children: ReactNode;
    className?: string;
    hidden?: boolean;
    pulse?: boolean;
    position?: BadgeIndicatorPosition;
};
export declare function BadgeIndicator({ badge, children, className, hidden, pulse, position, ...badgeProps }: BadgeIndicatorProps): import("react").JSX.Element;
