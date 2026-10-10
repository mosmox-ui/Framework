import { type ReactNode } from 'react';
import { type ToastNotificationProps } from './ToastNotification';
export type ToastNotificationRequest = Omit<ToastNotificationProps, 'defaultOpen' | 'id' | 'onClose' | 'onOpenChange' | 'open'>;
type ToastContextValue = {
    show: (options: ToastNotificationRequest) => string;
    success: (message: ReactNode, options?: Omit<ToastNotificationRequest, 'children' | 'variant'>) => string;
    info: (message: ReactNode, options?: Omit<ToastNotificationRequest, 'children' | 'variant'>) => string;
    warning: (message: ReactNode, options?: Omit<ToastNotificationRequest, 'children' | 'variant'>) => string;
    danger: (message: ReactNode, options?: Omit<ToastNotificationRequest, 'children' | 'variant'>) => string;
    close: (id: string) => void;
    closeAll: () => void;
};
export declare function ToastNotificationProvider({ children }: {
    children?: ReactNode;
}): import("react").JSX.Element;
export declare function useToastNotification(): ToastContextValue;
export {};
