import { type ReactNode } from 'react';
import { type MiniToastProps } from './MiniToast';
export type MiniToastRequest = Omit<MiniToastProps, 'defaultOpen' | 'onClose' | 'onOpenChange' | 'open'>;
type MiniContextValue = {
    show: (options: MiniToastRequest) => string;
    close: (id: string) => void;
    closeAll: () => void;
};
export declare function MiniToastProvider({ children }: {
    children?: ReactNode;
}): import("react").JSX.Element;
export declare function useMiniToast(): MiniContextValue;
export {};
