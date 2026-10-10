import { type InputHTMLAttributes, type ReactNode } from 'react';
import './Checkbox.css';
export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
    description?: string;
    error?: string;
    checkedIcon?: ReactNode;
    indeterminate?: boolean;
    indeterminateIcon?: ReactNode;
    label?: ReactNode;
    loading?: boolean;
    size?: 'default' | 'sm' | 'xs';
};
export declare function Checkbox({ 'aria-describedby': ariaDescribedBy, className, checkedIcon, description, error, id: providedId, indeterminate, label, indeterminateIcon, loading, size, ...props }: CheckboxProps): import("react").JSX.Element;
