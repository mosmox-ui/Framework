import { type FormEvent, type FormHTMLAttributes, type ReactNode } from 'react';
import './Form.css';
export type FormLayout = 'vertical' | 'horizontal' | 'inline';
export type FormSize = 'sm' | 'default' | 'lg';
export type FormValidateTrigger = 'change' | 'blur' | 'submit' | 'change-and-blur';
export type FormValues = Record<string, unknown>;
export type FormRule = {
    required?: boolean;
    message?: string;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validator?: (value: unknown, values: FormValues) => string | undefined | Promise<string | undefined>;
};
export type FormFieldApi = {
    name: string;
    value: unknown;
    error?: string;
    touched: boolean;
    validating: boolean;
    required: boolean;
    onChange: (valueOrEvent: unknown) => void;
    onBlur: () => void;
    controlProps: {
        name: string;
        value: unknown;
        error?: string;
        required: boolean;
        'aria-invalid': boolean;
        onChange: (valueOrEvent: unknown) => void;
        onBlur: () => void;
    };
};
export type FormInstance = {
    getValues: () => FormValues;
    getFieldValue: (name: string) => unknown;
    getFieldError: (name: string) => string | undefined;
    setFieldValue: (name: string, value: unknown) => void;
    setValues: (values: FormValues) => void;
    setFieldError: (name: string, error?: string) => void;
    reset: (values?: FormValues) => void;
    validate: (names?: string[]) => Promise<boolean>;
    submit: () => Promise<boolean>;
};
export type FormProps = Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onReset' | 'children'> & {
    children: ReactNode;
    initialValues?: FormValues;
    values?: FormValues;
    layout?: FormLayout;
    size?: FormSize;
    validateOn?: FormValidateTrigger;
    disabled?: boolean;
    onValuesChange?: (values: FormValues, changedField?: string) => void;
    onSubmit?: (values: FormValues, event: FormEvent<HTMLFormElement>) => void | Promise<void>;
    onInvalid?: (errors: Record<string, string>) => void;
    onReset?: (values: FormValues) => void;
};
export type FormFieldProps = {
    name: string;
    rules?: FormRule[];
    children: (field: FormFieldApi) => ReactNode;
};
export type FormActionsProps = {
    children: ReactNode;
    align?: 'start' | 'center' | 'end' | 'between';
};
export declare const Form: import("react").ForwardRefExoticComponent<Omit<FormHTMLAttributes<HTMLFormElement>, "children" | "onReset" | "onSubmit"> & {
    children: ReactNode;
    initialValues?: FormValues;
    values?: FormValues;
    layout?: FormLayout;
    size?: FormSize;
    validateOn?: FormValidateTrigger;
    disabled?: boolean;
    onValuesChange?: (values: FormValues, changedField?: string) => void;
    onSubmit?: (values: FormValues, event: FormEvent<HTMLFormElement>) => void | Promise<void>;
    onInvalid?: (errors: Record<string, string>) => void;
    onReset?: (values: FormValues) => void;
} & import("react").RefAttributes<FormInstance>> & {
    Field: ({ name, rules: fieldRules, children }: FormFieldProps) => import("react").JSX.Element;
    Actions: ({ children, align }: FormActionsProps) => import("react").JSX.Element;
};
