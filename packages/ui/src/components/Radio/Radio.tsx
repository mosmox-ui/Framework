import { createContext, useContext, useId, useState, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from 'react';
import './Radio.css';

export type RadioDirection = 'horizontal' | 'vertical';
export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & { label?: ReactNode; description?: string; error?: string; className?: string; size?: 'default' | 'sm' | 'xs' };
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

type RadioContextValue = { name: string; value?: string; onChange?: RadioGroupProps['onChange'] };
const RadioContext = createContext<RadioContextValue | null>(null);
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function Radio({ className, description, error, id: providedId, label, onChange, size = 'default', ...props }: RadioProps) {
  const group = useContext(RadioContext);
  const generatedId = useId();
  const id = providedId ?? `mm-radio-${generatedId}`;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [props['aria-describedby'], descriptionId, errorId].filter(Boolean).join(' ') || undefined;
  const checked = group?.value === undefined ? props.checked : group.value === props.value;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    group?.onChange?.(String(event.target.value), event);
  };

  return (
    <div className={cx('mm-radio-field', error && 'mm-radio-field--error')}>
      <label className={cx('mm-radio', `mm-radio--${size}`, props.disabled && 'mm-radio--disabled', className)}>
        <input {...props} aria-describedby={describedBy} aria-invalid={props['aria-invalid'] ?? Boolean(error)} checked={checked} id={id} name={group?.name ?? props.name} onChange={handleChange} type="radio" />
        <span aria-hidden="true" className="mm-radio__control" />
        {label && <span className="mm-radio__label">{label}</span>}
      </label>
      {description && <p className="mm-radio-field__description" id={descriptionId}>{description}</p>}
      {error && <p className="mm-radio-field__error" id={errorId}>{error}</p>}
    </div>
  );
}

export function RadioGroup({ children, defaultValue, direction = 'vertical', error, label, name: providedName, onChange, value }: RadioGroupProps) {
  const generatedName = useId();
  const name = providedName ?? `mm-radio-group-${generatedName}`;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = value === undefined ? uncontrolledValue : value;
  const handleChange = (nextValue: string, event: ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setUncontrolledValue(nextValue);
    onChange?.(nextValue, event);
  };
  return (
    <fieldset className="mm-radio-group">
      {label && <legend className="mm-radio-group__label">{label}</legend>}
      <RadioContext.Provider value={{ name, value: currentValue, onChange: handleChange }}>
        <div className={cx('mm-radio-group__options', `mm-radio-group__options--${direction}`)}>
          {children}
        </div>
      </RadioContext.Provider>
      {error && <p className="mm-radio-group__error">{error}</p>}
    </fieldset>
  );
}
