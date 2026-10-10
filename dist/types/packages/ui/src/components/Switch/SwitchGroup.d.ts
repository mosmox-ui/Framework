import { type ChangeEvent, type ReactNode } from 'react';
import './SwitchGroup.css';
export type SwitchGroupChangeHandler = (value: string[], event: ChangeEvent<HTMLInputElement>) => void;
export type SwitchGroupProps = {
    children: ReactNode;
    className?: string;
    defaultValue?: string[];
    description?: string;
    disabled?: boolean;
    error?: string;
    label?: ReactNode;
    name?: string;
    onChange?: SwitchGroupChangeHandler;
    readOnly?: boolean;
    value?: string[];
};
export type SwitchGroupContextValue = {
    disabled?: boolean;
    descriptionId?: string;
    errorId?: string;
    name: string;
    onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    value: string[];
};
export declare const SwitchGroupContext: import("react").Context<SwitchGroupContextValue | null>;
export declare function SwitchGroup({ children, className, defaultValue, description, disabled, error, label, name: providedName, onChange, readOnly, value }: SwitchGroupProps): import("react").JSX.Element;
