import { type ReactNode } from 'react';
import { type ConfirmationDialogProps } from './ConfirmationDialog';
export type ConfirmationDialogRequest = Omit<ConfirmationDialogProps, 'defaultOpen' | 'onOpenChange' | 'open'> & {
    onConfirm?: ConfirmationDialogProps['onConfirm'];
};
type ConfirmationDialogContextValue = {
    confirm: (options: ConfirmationDialogRequest) => Promise<boolean>;
};
export declare function ConfirmationDialogProvider({ children }: {
    children?: ReactNode;
}): import("react").JSX.Element;
export declare function useConfirmationDialog(): ConfirmationDialogContextValue;
export {};
