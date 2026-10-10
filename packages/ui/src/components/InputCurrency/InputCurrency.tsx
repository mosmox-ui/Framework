import { ArrowDown, ArrowUp, X } from '../../icons';
import { useEffect, useId, useState, type ChangeEvent, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import './InputCurrency.css';

export type InputCurrencySize = 'sm' | 'default' | 'lg';
export type InputCurrencyValue = number | null;
export type InputCurrencyProps = {
  'aria-label'?: string;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  currency?: string;
  locale?: string;
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
  value?: number | null;
  defaultValue?: number;
  onChange?: (value: InputCurrencyValue, formattedValue: string) => void;
  onBlur?: (value: InputCurrencyValue) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  useGrouping?: boolean;
  signDisplay?: 'auto' | 'always' | 'exceptZero';
  controls?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  size?: InputCurrencySize;
  prefix?: ReactNode;
  suffix?: ReactNode;
  placeholder?: string;
  name?: string;
  id?: string;
  className?: string;
  style?: CSSProperties;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const finite = (value: number | null | undefined): value is number => value !== null && value !== undefined && Number.isFinite(value);

export function InputCurrency({ 'aria-label': ariaLabel, label, description, error, currency = 'USD', locale = 'en-US', currencyDisplay = 'symbol', value, defaultValue, onChange, onBlur, min, max, step = 1, precision, minFractionDigits, maxFractionDigits, useGrouping = true, signDisplay = 'auto', controls = true, clearable = false, disabled = false, readOnly = false, loading = false, size = 'default', prefix, suffix, placeholder, name, id: providedId, className, style }: InputCurrencyProps) {
  const generatedId = useId().replace(/:/g, '');
  const id = providedId ?? `mm-input-currency-${generatedId}`;
  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency, currencyDisplay, useGrouping, signDisplay, minimumFractionDigits: minFractionDigits ?? precision ?? 0, maximumFractionDigits: maxFractionDigits ?? precision ?? 2 });
  const parts = new Intl.NumberFormat(locale).formatToParts(1234.5);
  const group = parts.find((part) => part.type === 'group')?.value ?? ',';
  const decimal = parts.find((part) => part.type === 'decimal')?.value ?? '.';
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<number | null>(defaultValue ?? null);
  const currentValue = isControlled ? value ?? null : internalValue;
  const format = (next: number | null) => next === null ? '' : formatter.format(next);
  const [text, setText] = useState(format(currentValue));
  const [focused, setFocused] = useState(false);
  useEffect(() => { if (!focused) setText(format(currentValue)); }, [currentValue, focused]);
  const parse = (input: string): number | null => { const cleaned = input.replace(new RegExp(`[^0-9\\-\\${decimal}]`, 'g'), '').replace(new RegExp(`\\${group}`, 'g'), '').replace(decimal, '.'); if (!cleaned || cleaned === '-') return null; const parsed = Number(cleaned); return Number.isFinite(parsed) ? parsed : null; };
  const clamp = (next: number) => Math.min(max ?? next, Math.max(min ?? next, next));
  const emit = (next: number | null, event?: ChangeEvent<HTMLInputElement>) => { const bounded = next === null ? null : clamp(next); if (!isControlled) setInternalValue(bounded); const formatted = bounded === null ? '' : format(bounded); onChange?.(bounded, formatted); if (event && !focused) setText(formatted); };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => { const nextText = event.target.value; if (!/^[0-9\-.,\s$€£]*$/.test(nextText)) return; setText(nextText); emit(parse(nextText), event); };
  const commit = () => { const parsed = parse(text); const bounded = parsed === null ? null : clamp(parsed); if (!isControlled) setInternalValue(bounded); const formatted = format(bounded); setText(formatted); onBlur?.(bounded); };
  const stepValue = (direction: 'increment' | 'decrement') => { const next = clamp((currentValue ?? min ?? 0) + (direction === 'increment' ? step : -step)); emit(next); setText(format(next)); };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => { if (event.key === 'ArrowUp' || event.key === 'ArrowDown') { event.preventDefault(); stepValue(event.key === 'ArrowUp' ? 'increment' : 'decrement'); } };
  const decrementDisabled = disabled || loading || readOnly || (min !== undefined && (currentValue ?? min) <= min);
  const incrementDisabled = disabled || loading || readOnly || (max !== undefined && (currentValue ?? max) >= max);
  return <div className={cx('mm-input-currency-field', `mm-input-currency-field--${size}`, Boolean(error) && 'mm-input-currency-field--error', disabled && 'mm-input-currency-field--disabled', className)} style={style}>
    {label && <label className="mm-input-currency-field__label" htmlFor={id}>{label}</label>}
    {description && <p className="mm-input-currency-field__description">{description}</p>}
    <span aria-busy={loading || undefined} className="mm-input-currency" data-currency={currency}>
      {prefix && <span aria-hidden="true" className="mm-input-currency__adornment">{prefix}</span>}
      <input aria-describedby={description ? `${id}-description` : undefined} aria-invalid={Boolean(error)} aria-label={label ? undefined : ariaLabel} aria-valuemax={max} aria-valuemin={min} aria-valuenow={currentValue ?? undefined} className="mm-input-currency__control" disabled={disabled || loading} id={id} inputMode="decimal" name={name} onBlur={() => { setFocused(false); commit(); }} onChange={handleChange} onFocus={() => { setFocused(true); if (currentValue !== null) setText(String(currentValue)); }} onKeyDown={handleKeyDown} placeholder={placeholder ?? format(0)} readOnly={readOnly} role="spinbutton" value={focused ? text : format(currentValue)} />
      {suffix && <span aria-hidden="true" className="mm-input-currency__adornment">{suffix}</span>}
      {loading && <span aria-label="Loading" className="mm-input-currency__loading" role="status" />}
      {clearable && currentValue !== null && !disabled && !readOnly && <button aria-label="Clear amount" className="mm-input-currency__clear" onMouseDown={(event) => event.preventDefault()} onClick={() => { emit(null); setText(''); }} type="button"><X aria-hidden="true" size={14} /></button>}
      {controls && <span aria-label="Currency controls" className="mm-input-currency__controls"><button aria-label="Decrease amount" disabled={decrementDisabled} onClick={() => stepValue('decrement')} type="button"><ArrowDown aria-hidden="true" size={14} /></button><button aria-label="Increase amount" disabled={incrementDisabled} onClick={() => stepValue('increment')} type="button"><ArrowUp aria-hidden="true" size={14} /></button></span>}
    </span>
    {error ? <p className="mm-input-currency-field__error" role="alert">{error}</p> : description && <span id={`${id}-description`} hidden>{description}</span>}
  </div>;
}
