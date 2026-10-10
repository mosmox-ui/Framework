import { type ReactNode } from 'react';
import type { ToastNotificationPosition } from './ToastNotification';
import './ToastNotification.css';
export type ToastNotificationStackProps = {
    children?: ReactNode;
    className?: string;
    maxWidth?: number | string;
    position?: ToastNotificationPosition;
};
export declare function ToastNotificationStack({ children, className, maxWidth, position }: ToastNotificationStackProps): import("react").JSX.Element;
