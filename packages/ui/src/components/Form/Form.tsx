import { createContext, forwardRef, useCallback, useContext, useImperativeHandle, useMemo, useRef, useState, type FormEvent, type FormHTMLAttributes, type MutableRefObject, type ReactNode } from 'react';
import { useConfig } from '../ConfigProvider';
import './Form.css';

export type FormLayout = 'vertical' | 'horizontal' | 'inline';
export type FormSize = 'sm' | 'default' | 'lg';
export type FormValidateTrigger = 'change' | 'blur' | 'submit' | 'change-and-blur';
export type FormValues = Record<string, unknown>;
export type FormRule = { required?: boolean; message?: string; minLength?: number; maxLength?: number; pattern?: RegExp; validator?: (value: unknown, values: FormValues) => string | undefined | Promise<string | undefined> };

export type FormFieldApi = {
  name: string;
  value: unknown;
  error?: string;
  touched: boolean;
  validating: boolean;
  required: boolean;
  onChange: (valueOrEvent: unknown) => void;
  onBlur: () => void;
  controlProps: { name: string; value: unknown; error?: string; required: boolean; 'aria-invalid': boolean; onChange: (valueOrEvent: unknown) => void; onBlur: () => void };
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

export type FormFieldProps = { name: string; rules?: FormRule[]; children: (field: FormFieldApi) => ReactNode };
export type FormActionsProps = { children: ReactNode; align?: 'start' | 'center' | 'end' | 'between' };

type ContextValue = { form: FormInstance; values: FormValues; errors: Record<string, string>; touched: Record<string, boolean>; validating: Record<string, boolean>; rules: MutableRefObject<Record<string, FormRule[]>>; validateOn: FormValidateTrigger; disabled: boolean; version: number; markTouched: (name: string) => void };
const FormContext = createContext<ContextValue | null>(null);

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const readValue = (valueOrEvent: unknown) => {
  if (valueOrEvent && typeof valueOrEvent === 'object' && 'target' in valueOrEvent) {
    const target = (valueOrEvent as { target: { type?: string; checked?: boolean; value?: unknown } }).target;
    return target.type === 'checkbox' ? Boolean(target.checked) : target.value;
  }
  return valueOrEvent;
};

async function validateValue(value: unknown, values: FormValues, rules: FormRule[]) {
  for (const rule of rules) {
    const empty = value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
    if (rule.required && empty) return rule.message ?? 'This field is required.';
    if (empty) continue;
    if (rule.minLength !== undefined && String(value).length < rule.minLength) return rule.message ?? `Use at least ${rule.minLength} characters.`;
    if (rule.maxLength !== undefined && String(value).length > rule.maxLength) return rule.message ?? `Use no more than ${rule.maxLength} characters.`;
    if (rule.pattern && !rule.pattern.test(String(value))) return rule.message ?? 'Enter a valid value.';
    if (rule.validator) { const error = await rule.validator(value, values); if (error) return error; }
  }
  return undefined;
}

export const Form = Object.assign(forwardRef<FormInstance, FormProps>(function Form({ children, initialValues = {}, values: controlledValues, layout, size, validateOn, disabled = false, onValuesChange, onSubmit, onInvalid, onReset, className, ...props }, ref) {
  const { components } = useConfig();
  const resolvedLayout = layout ?? components.form?.layout ?? 'vertical';
  const resolvedSize = size ?? components.form?.size ?? 'default';
  const resolvedValidateOn = validateOn ?? components.form?.validateOn ?? 'submit';
  const initialRef = useRef(initialValues);
  const valuesRef = useRef<FormValues>(controlledValues ?? initialValues);
  const errorsRef = useRef<Record<string, string>>({});
  const rules = useRef<Record<string, FormRule[]>>({});
  const [internalValues, setInternalValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [validating, setValidating] = useState<Record<string, boolean>>({});
  const [version, setVersion] = useState(0);
  const currentValues = controlledValues ?? internalValues;
  valuesRef.current = currentValues;
  errorsRef.current = errors;

  const bump = () => setVersion((value) => value + 1);
  const markTouched = useCallback((name: string) => { setTouched((state) => ({ ...state, [name]: true })); bump(); }, []);
  const setValues = useCallback((next: FormValues, changedField?: string) => { if (controlledValues === undefined) setInternalValues(next); valuesRef.current = next; onValuesChange?.(next, changedField); bump(); }, [controlledValues, onValuesChange]);
  const validateField = useCallback(async (name: string) => {
    const fieldRules = rules.current[name] ?? [];
    if (!fieldRules.length) return true;
    setValidating((state) => ({ ...state, [name]: true }));
    const error = await validateValue(valuesRef.current[name], valuesRef.current, fieldRules);
    setErrors((state) => { const next = { ...state }; if (error) next[name] = error; else delete next[name]; errorsRef.current = next; return next; });
    setValidating((state) => ({ ...state, [name]: false }));
    bump();
    return !error;
  }, []);
  const form = useMemo<FormInstance>(() => ({
    getValues: () => ({ ...valuesRef.current }),
    getFieldValue: (name) => valuesRef.current[name],
    getFieldError: (name) => errorsRef.current[name],
    setFieldValue: (name, value) => setValues({ ...valuesRef.current, [name]: value }, name),
    setValues: (next) => setValues({ ...next }),
    setFieldError: (name, error) => { setErrors((state) => { const next = { ...state }; if (error) next[name] = error; else delete next[name]; errorsRef.current = next; return next; }); bump(); },
    reset: (next = initialRef.current) => { setValues({ ...next }); setErrors({}); setTouched({}); },
    validate: async (names) => { const fields = names ?? Object.keys(rules.current); const result = await Promise.all(fields.map(validateField)); return result.every(Boolean); },
    submit: async () => { const valid = await Promise.all(Object.keys(rules.current).map(validateField)).then((result) => result.every(Boolean)); if (valid) await onSubmit?.(valuesRef.current, new Event('submit') as unknown as FormEvent<HTMLFormElement>); return valid; },
  }), [onSubmit, setValues, validateField]);
  useImperativeHandle(ref, () => form, [form]);
  const context = useMemo(() => ({ form, values: currentValues, errors, touched, validating, rules, validateOn: resolvedValidateOn, disabled, version, markTouched }), [form, currentValues, errors, touched, validating, resolvedValidateOn, disabled, version, markTouched]);
  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const valid = await form.validate(); if (!valid) onInvalid?.(errorsRef.current); else await onSubmit?.(valuesRef.current, event); };
  const reset = () => { form.reset(); onReset?.(valuesRef.current); };
  return <FormContext.Provider value={context}><form {...props} aria-busy={Object.values(validating).some(Boolean) ? true : undefined} className={cx('mm-form', `mm-form--${resolvedLayout}`, `mm-form--${resolvedSize}`, disabled && 'mm-form--disabled', className)} onReset={reset} onSubmit={submit}>{children}</form></FormContext.Provider>;
}), {
  Field: function FormField({ name, rules: fieldRules = [], children }: FormFieldProps) {
    const context = useContext(FormContext);
    if (!context) throw new Error('Form.Field must be used inside Form.');
    context.rules.current[name] = fieldRules;
    const value = context.values[name];
    const error = context.errors[name];
    const touched = Boolean(context.touched[name]);
    const validating = Boolean(context.validating[name]);
    const required = fieldRules.some((rule) => rule.required);
    const onChange = (valueOrEvent: unknown) => { context.form.setFieldValue(name, readValue(valueOrEvent)); context.markTouched(name); if (context.validateOn === 'change' || context.validateOn === 'change-and-blur') void context.form.validate([name]); };
    const onBlur = () => { context.markTouched(name); if (context.validateOn === 'blur' || context.validateOn === 'change-and-blur') void context.form.validate([name]); };
    const field: FormFieldApi = { name, value, error, touched, validating, required, onChange, onBlur, controlProps: { name, value, error, required, 'aria-invalid': Boolean(error), onChange, onBlur } };
    return <>{children(field)}</>;
  },
  Actions: function FormActions({ children, align = 'end' }: FormActionsProps) { return <div className={`mm-form__actions mm-form__actions--${align}`}>{children}</div>; },
});

Form.displayName = 'Form';
