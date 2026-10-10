import { Fragment, useEffect, useId, useRef, useState, type ClipboardEvent, type KeyboardEvent, type ReactNode } from 'react';
import type { InputSize, InputVariant } from '../Input';
import './InputOTP.css';

export type InputOTPProps = {
  'aria-describedby'?: string;
  'aria-label'?: string;
  autoFocus?: boolean;
  className?: string;
  defaultValue?: string;
  description?: string;
  disabled?: boolean;
  error?: string;
  fullWidth?: boolean;
  id?: string;
  inputMode?: 'decimal' | 'email' | 'numeric' | 'tel' | 'text';
  label?: ReactNode;
  length?: number;
  mask?: string;
  name?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  onPaste?: (value: string) => void;
  pattern?: string;
  placeholder?: string;
  readOnly?: boolean;
  selectOnFocus?: boolean;
  separator?: ReactNode;
  size?: InputSize;
  validateChar?: (character: string) => boolean;
  value?: string;
  variant?: InputVariant;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

function clampLength(length: number) {
  return Math.min(12, Math.max(1, Math.floor(length) || 6));
}

export function InputOTP({
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  autoFocus = false,
  className,
  defaultValue = '',
  description,
  disabled = false,
  error,
  fullWidth = false,
  id: providedId,
  inputMode = 'numeric',
  label,
  length: requestedLength = 6,
  mask,
  name,
  onChange,
  onComplete,
  onPaste,
  pattern,
  placeholder,
  readOnly = false,
  selectOnFocus = true,
  separator,
  size = 'default',
  validateChar,
  value,
  variant = 'outline',
}: InputOTPProps) {
  const length = clampLength(requestedLength);
  const generatedId = useId();
  const id = providedId ?? `mm-input-otp-${generatedId}`;
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = isControlled ? value! : uncontrolledValue;
  const digits = Array.from({ length }, (_, index) => currentValue[index] ?? '');
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const isAllowed = (character: string) => {
    if (validateChar && !validateChar(character)) return false;
    if (inputMode === 'numeric' && !/^\d$/.test(character)) return false;
    if (pattern && !new RegExp(`^(?:${pattern})$`).test(character)) return false;
    return true;
  };

  const sanitize = (input: string) => Array.from(input).filter(isAllowed).slice(0, length);

  const updateValue = (nextDigits: string[], focusIndex?: number) => {
    const nextValue = nextDigits.join('').slice(0, length);
    if (!isControlled) setUncontrolledValue(nextValue);
    onChange?.(nextValue);
    if (nextValue.length === length && nextValue !== currentValue) onComplete?.(nextValue);
    if (focusIndex !== undefined && !disabled && !readOnly) {
      requestAnimationFrame(() => inputRefs.current[focusIndex]?.focus());
    }
  };

  const replaceFrom = (index: number, input: string) => {
    const chars = sanitize(input);
    if (chars.length === 0) {
      const next = [...digits];
      next[index] = '';
      updateValue(next);
      return;
    }
    const next = [...digits];
    chars.forEach((character, offset) => {
      if (index + offset < length) next[index + offset] = character;
    });
    const nextIndex = Math.min(index + chars.length, length - 1);
    updateValue(next, nextIndex);
  };

  const handleChange = (index: number, input: string) => replaceFrom(index, input.slice(-1));

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      event.preventDefault();
      const next = [...digits];
      next[index - 1] = '';
      updateValue(next, index - 1);
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === 'ArrowRight' && index < length - 1) {
      event.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;
    event.preventDefault();
    const pasted = event.clipboardData.getData('text');
    const chars = sanitize(pasted);
    onPaste?.(chars.join(''));
    replaceFrom(index, pasted);
  };

  const handleFocus = (input: HTMLInputElement) => {
    if (selectOnFocus) input.select();
  };

  return (
    <div className={cx('mm-input-otp-field', fullWidth && 'mm-input-otp-field--full-width', className)}>
      {label && <label className="mm-input-otp-field__label" htmlFor={`${id}-0`}>{label}</label>}
      <div
        aria-describedby={describedBy}
        aria-label={ariaLabel ?? (typeof label === 'string' ? label : 'One-time password')}
        className={cx('mm-input-otp', `mm-input-otp--${size}`, `mm-input-otp--${variant}`, error && 'mm-input-otp--error', disabled && 'mm-input-otp--disabled', readOnly && 'mm-input-otp--readonly')}
        role="group"
      >
        {digits.map((digit, index) => (
          <Fragment key={index}>
            <span className="mm-input-otp__unit">
            <input
              aria-invalid={Boolean(error)}
              aria-label={`Character ${index + 1} of ${length}`}
              autoComplete={index === 0 ? 'one-time-code' : 'off'}
              autoFocus={autoFocus && index === 0}
              className="mm-input-otp__control"
              disabled={disabled}
              id={`${id}-${index}`}
              inputMode={inputMode}
              maxLength={1}
              onChange={(event) => handleChange(index, event.target.value)}
              onFocus={(event) => handleFocus(event.currentTarget)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              onPaste={(event) => handlePaste(index, event)}
              placeholder={placeholder}
              readOnly={readOnly}
              ref={(element) => { inputRefs.current[index] = element; }}
              type={mask ? 'password' : 'text'}
              value={mask && digit ? mask : digit}
            />
            </span>
            {separator && index === Math.ceil(length / 2) - 1 && <span aria-hidden="true" className="mm-input-otp__separator">{separator}</span>}
          </Fragment>
        ))}
      </div>
      {name && <input name={name} type="hidden" value={currentValue} />}
      {description && <p className="mm-input-otp-field__description" id={descriptionId}>{description}</p>}
      {error && <p className="mm-input-otp-field__error" id={errorId}>{error}</p>}
    </div>
  );
}
