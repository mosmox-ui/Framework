import { type TextareaHTMLAttributes } from 'react';
import './Textarea.css';
export type TextareaVariant = 'outline' | 'filled';
export type TextareaResize = 'none' | 'vertical' | 'both';
export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows' | 'size'> & {
    autoResize?: boolean;
    clearable?: boolean;
    description?: string;
    error?: string;
    fullWidth?: boolean;
    label?: string;
    maxRows?: number;
    minRows?: number;
    onClear?: () => void;
    variant?: TextareaVariant;
    resize?: TextareaResize;
};
export declare function Textarea({ 'aria-describedby': ariaDescribedBy, 'aria-invalid': ariaInvalid, autoResize, className, clearable, defaultValue, description, disabled, error, fullWidth, id: providedId, label, maxLength, maxRows, minRows, onChange, onClear, readOnly, resize, value, variant, ...props }: TextareaProps): import("react").JSX.Element;
