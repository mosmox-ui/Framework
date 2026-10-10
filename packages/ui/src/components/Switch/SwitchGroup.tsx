import { createContext, useId, useState, type ChangeEvent, type ReactNode } from 'react';
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

export const SwitchGroupContext = createContext<SwitchGroupContextValue | null>(null);

export function SwitchGroup({ children, className, defaultValue = [], description, disabled = false, error, label, name: providedName, onChange, readOnly = false, value }: SwitchGroupProps) {
  const generatedId = useId();
  const name = providedName ?? `mm-switch-group-${generatedId}`;
  const descriptionId = description ? `${name}-description` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = value ?? uncontrolledValue;
  const handleItemChange = (nextValue: string, event: ChangeEvent<HTMLInputElement>) => {
    const next = currentValue.includes(nextValue) ? currentValue.filter((item) => item !== nextValue) : [...currentValue, nextValue];
    if (value === undefined) setUncontrolledValue(next);
    onChange?.(next, event);
  };

  return (
    <fieldset aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined} aria-invalid={error ? true : undefined} className={className ? `mm-switch-group ${className}` : 'mm-switch-group'}>
      {label && <legend className="mm-switch-group__label">{label}</legend>}
      <SwitchGroupContext.Provider value={{ descriptionId, disabled, errorId, name, onChange: handleItemChange, readOnly, value: currentValue }}>
        <div className="mm-switch-group__options">{children}</div>
      </SwitchGroupContext.Provider>
      {description && <p className="mm-switch-group__description" id={descriptionId}>{description}</p>}
      {error && <p className="mm-switch-group__error" id={errorId}>{error}</p>}
    </fieldset>
  );
}
