import { type ChangeEvent, type InputHTMLAttributes, type ReactNode } from 'react';
import './Radio.css';
export type RadioDirection = 'horizontal' | 'vertical';
export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
    label?: ReactNode;
    description?: string;
    error?: string;
    className?: string;
    size?: 'default' | 'sm' | 'xs';
};
export type RadioGroupProps = {
    children: ReactNode;
    direction?: RadioDirection;
    error?: string;
    label?: ReactNode;
    name?: string;
    onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    defaultValue?: string;
};
export declare function Radio({ className, description, error, id: providedId, label, onChange, size, ...props }: RadioProps): import("react").JSX.Element;
export declare function RadioGroup({ children, defaultValue, direction, error, label, name: providedName, onChange, value }: RadioGroupProps): import("react").JSX.Element;
