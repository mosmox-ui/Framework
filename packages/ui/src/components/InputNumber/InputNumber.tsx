import { ArrowDown, ArrowUp } from '../../icons';
import { useEffect, useId, useRef, useState, type ChangeEvent, type CSSProperties, type FocusEvent, type InputHTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import './InputNumber.css';

export type InputNumberSize = 'xs' | 'sm' | 'default';
export type InputNumberVariant = 'outline' | 'filled';
export type InputNumberValue = number | undefined;

export type InputNumberProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'onChange' | 'size' | 'value' | 'type'> & {
  clampOnBlur?: boolean;
  controls?: boolean;
  defaultValue?: number;
  description?: string;
  error?: string;
  fullWidth?: boolean;
  label?: string;
  leadingIcon?: ReactNode;
  loading?: boolean;
  maxWidth?: CSSProperties['maxWidth'];
  minWidth?: CSSProperties['minWidth'];
  max?: number;
  min?: number;
  onChange?: (value: InputNumberValue, event: ChangeEvent<HTMLInputElement>) => void;
  onStep?: (value: number, direction: 'increment' | 'decrement') => void;
  precision?: number;
  prefix?: ReactNode;
  readOnly?: boolean;
  resettable?: boolean;
  size?: InputNumberSize;
  step?: number;
  suffix?: ReactNode;
  trailingIcon?: ReactNode;
  value?: number | null;
  variant?: InputNumberVariant;
  width?: CSSProperties['width'];
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const numericPattern = /^-?(?:\d+(?:\.\d*)?|\.\d*)?$/;

function precisionOf(value: number) {
  const text = String(value);
  return text.includes('.') ? text.split('.')[1].length : 0;
}

function formatNumber(value: number, precision?: number) {
  const resolved = precision === undefined ? value : Number(value.toFixed(Math.max(0, precision)));
  return String(resolved);
}

export function InputNumber({
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  clampOnBlur = true,
  className,
  controls = true,
  defaultValue,
  description,
  disabled = false,
  error,
  fullWidth = false,
  id: providedId,
  label,
  leadingIcon,
  loading = false,
  max,
  maxWidth,
  min,
  minWidth,
  onBlur,
  onChange,
  onKeyDown,
  onStep,
  placeholder,
  precision,
  prefix,
  readOnly = false,
  resettable = false,
  size = 'default',
  step = 1,
  suffix,
  trailingIcon,
  value,
  variant = 'outline',
  width,
  ...props
}: InputNumberProps) {
  const generatedId = useId();
  const id = providedId ?? `mm-input-number-${generatedId}`;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined;
  const isControlled = value !== undefined;
  const initialValueRef = useRef<number | undefined>(value ?? defaultValue);
  const initialValue = defaultValue === undefined ? '' : formatNumber(defaultValue, precision);
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    if (isControlled) setInputValue(value === null ? '' : value === undefined ? '' : formatNumber(value, precision));
    if (initialValueRef.current === undefined && value !== undefined && value !== null) initialValueRef.current = value;
  }, [isControlled, precision, value]);

  const parseValue = (text: string): InputNumberValue => {
    if (text.trim() === '' || text === '-') return undefined;
    const parsed = Number(text);
    return Number.isFinite(parsed) ? parsed : undefined;
  };

  const clamp = (next: number) => Math.min(max ?? next, Math.max(min ?? next, next));

  const emitChange = (next: InputNumberValue, event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(next, event);
  };

  const setNumber = (next: number, event?: ChangeEvent<HTMLInputElement>, direction?: 'increment' | 'decrement') => {
    const bounded = clamp(next);
    const formatted = formatNumber(bounded, precision);
    setInputValue(formatted);
    emitChange(bounded, event as ChangeEvent<HTMLInputElement>);
    onStep?.(bounded, direction ?? (bounded >= next ? 'increment' : 'decrement'));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextText = event.target.value.replace(',', '.');
    if (!numericPattern.test(nextText)) return;
    setInputValue(nextText);
    emitChange(parseValue(nextText), event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const parsed = parseValue(inputValue);
    if (parsed === undefined) {
      if (inputValue !== '') setInputValue('');
    } else if (clampOnBlur) {
      setInputValue(formatNumber(clamp(parsed), precision));
    }
    onBlur?.(event);
  };

  const handleStep = (direction: 'increment' | 'decrement') => {
    const current = parseValue(inputValue) ?? min ?? 0;
    const next = current + (direction === 'increment' ? step : -step);
    setNumber(next, undefined, direction);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      handleStep(event.key === 'ArrowUp' ? 'increment' : 'decrement');
    }
    onKeyDown?.(event);
  };

  const decrementDisabled = disabled || loading || readOnly || (min !== undefined && (parseValue(inputValue) ?? min) <= min);
  const incrementDisabled = disabled || loading || readOnly || (max !== undefined && (parseValue(inputValue) ?? max) >= max);

  const fieldStyle: CSSProperties = fullWidth
    ? { maxWidth: 'none', minWidth: 0, width: '100%' }
    : { maxWidth, minWidth, width };

  return <div className={cx('mm-input-number-field', fullWidth && 'mm-input-number-field--full-width', className)} style={fieldStyle}>
    {label && <div className="mm-input-number-field__label-row"><label className="mm-input-number-field__label" htmlFor={id}>{label}</label>{resettable && <button aria-label={`Reset ${label}`} className="mm-input-number-field__reset" disabled={disabled || loading} onClick={() => { const next = initialValueRef.current ?? 0; setInputValue(formatNumber(next, precision)); onChange?.(next, undefined as never); }} type="button">Reset</button>}</div>}
    {description && <p className="mm-input-number-field__description" id={descriptionId}>{description}</p>}
    <span aria-busy={loading || undefined} className={cx('mm-input-number', `mm-input-number--${size}`, `mm-input-number--${variant}`, error && 'mm-input-number--error', disabled && 'mm-input-number--disabled', loading && 'mm-input-number--loading', readOnly && 'mm-input-number--readonly')}>
      {leadingIcon && <span aria-hidden="true" className="mm-input-number__icon">{leadingIcon}</span>}
      {prefix && <span aria-hidden="true" className="mm-input-number__adornment">{prefix}</span>}
      <input
        {...props}
        {...(min !== undefined ? { min } : {})}
        {...(max !== undefined ? { max } : {})}
        aria-describedby={describedBy}
        aria-invalid={ariaInvalid ?? Boolean(error)}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={parseValue(inputValue)}
        className="mm-input-number__control"
        disabled={disabled || loading}
        id={id}
        inputMode={precision === 0 ? 'numeric' : 'decimal'}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        readOnly={readOnly}
        role="spinbutton"
        value={inputValue}
      />
      {suffix && <span aria-hidden="true" className="mm-input-number__adornment">{suffix}</span>}
      {trailingIcon && <span aria-hidden="true" className="mm-input-number__icon">{trailingIcon}</span>}
      {loading && <span aria-label="Loading" className="mm-input-number__loading" role="status" />}
      {controls && <span aria-label="Number controls" className="mm-input-number__controls">
        <button aria-label="Decrease value" disabled={decrementDisabled} onClick={() => handleStep('decrement')} type="button"><ArrowDown aria-hidden="true" strokeWidth={1.7} /></button>
        <button aria-label="Increase value" disabled={incrementDisabled} onClick={() => handleStep('increment')} type="button"><ArrowUp aria-hidden="true" strokeWidth={1.7} /></button>
      </span>}
    </span>
    {error && <p className="mm-input-number-field__error" id={errorId}>{error}</p>}
  </div>;
}

export { precisionOf };
