import { type ReactNode } from 'react';
import { type AlertProps } from './Alert';
export type AlertRequest = Omit<AlertProps, 'defaultOpen' | 'onOpenChange' | 'open'>;
type AlertContextValue = {
    show: (options: AlertRequest) => Promise<boolean>;
};
export declare function AlertProvider({ children }: {
    children?: ReactNode;
}): import("react").JSX.Element;
export declare function useAlert(): AlertContextValue;
export {};
