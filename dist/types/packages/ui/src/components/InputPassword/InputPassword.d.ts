import { type ReactNode } from 'react';
import { type InputProps } from '../Input';
import './InputPassword.css';
export type PasswordGeneratorOptions = {
    charset?: string;
    maxLength?: number;
    minLength?: number;
};
export type PasswordRequirement = {
    id?: string;
    label: ReactNode;
    test: (value: string) => boolean;
};
export type PasswordStrength = 'empty' | 'weak' | 'fair' | 'good' | 'strong';
export type InputPasswordProps = Omit<InputProps, 'trailingActions' | 'type'> & {
    generateButton?: boolean;
    generatorOptions?: PasswordGeneratorOptions;
    onGenerate?: (password: string) => void;
    requirements?: PasswordRequirement[];
    showStrength?: boolean;
};
export declare function InputPassword({ 'aria-describedby': ariaDescribedBy, className, defaultValue, disabled, generateButton, generatorOptions, id: providedId, loading, onChange, onClear, onGenerate, readOnly, requirements, showStrength, value, ...inputProps }: InputPasswordProps): import("react").JSX.Element;
