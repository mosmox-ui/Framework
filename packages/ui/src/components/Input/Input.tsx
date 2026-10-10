import { memo, useId, useState, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from 'react';
import { LockKey, X } from '../../icons';
import './Input.css';

export type InputSize = 'xs' | 'sm' | 'default';
export type InputVariant = 'outline' | 'filled';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  clearable?: boolean;
  description?: string;
  error?: string;
  fullWidth?: boolean;
  inputClassName?: string;
  label?: string;
  leadingIcon?: ReactNode;
  loading?: boolean;
  onClear?: () => void;
  prefix?: ReactNode;
  size?: InputSize;
  suffix?: ReactNode;
  trailingActions?: ReactNode;
  trailingIcon?: ReactNode;
  variant?: InputVariant;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export const Input = memo(function Input({
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  className,
  clearable = false,
  defaultValue,
  description,
  disabled = false,
  error,
  fullWidth = false,
  id: providedId,
  inputClassName,
  label,
  leadingIcon,
  loading = false,
  maxLength,
  onChange,
  onClear,
  placeholder,
  prefix,
  required = false,
  readOnly = false,
  size = 'default',
  suffix,
  trailingActions,
  trailingIcon,
  value,
  variant = 'outline',
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = providedId ?? `mm-input-${generatedId}`;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue === undefined ? '' : String(defaultValue));
  const currentValue = value === undefined ? uncontrolledValue : String(value);
  const hasError = Boolean(error);
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined;
  const canClear = clearable && currentValue.length > 0 && !disabled && !loading && !readOnly;
  const hasLeadingIcon = Boolean(leadingIcon || prefix);
  const hasTrailingIcon = Boolean(readOnly || suffix || canClear || trailingActions || (!canClear && trailingIcon));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setUncontrolledValue(event.target.value);
    onChange?.(event);
  };

  const handleClear = () => {
    onClear?.();
    if (value === undefined) setUncontrolledValue('');
  };

  return (
    <div className={cx('mm-input-field', fullWidth && 'mm-input-field--full-width', className)}>
      {label && <label className="mm-input-field__label" htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>}
      {description && <p className="mm-input-field__description" id={descriptionId}>{description}</p>}
      <span className={cx('mm-input', `mm-input--${size}`, `mm-input--${variant}`, hasError && 'mm-input--error', loading && 'mm-input--loading', disabled && 'mm-input--disabled', readOnly && 'mm-input--readonly', hasLeadingIcon && 'mm-input--has-leading-icon', hasTrailingIcon && 'mm-input--has-trailing-icon')}>
        {leadingIcon && <span aria-hidden="true" className="mm-input__icon mm-input__icon--leading">{leadingIcon}</span>}
        {prefix && <span aria-hidden="true" className="mm-input__adornment mm-input__adornment--prefix">{prefix}</span>}
        <input
          {...props}
          aria-describedby={describedBy}
          aria-invalid={ariaInvalid ?? hasError}
          className={cx('mm-input__control', inputClassName)}
          defaultValue={defaultValue}
          disabled={disabled || loading}
          id={id}
          onChange={handleChange}
          placeholder={placeholder}
          readOnly={readOnly}
          maxLength={maxLength}
          required={required}
          value={value}
        />
        {loading && <span aria-label="Loading" className="mm-input__loader" role="status" />}
        {suffix && <span aria-hidden="true" className="mm-input__adornment mm-input__adornment--suffix">{suffix}</span>}
        {trailingActions && <span className="mm-input__actions">{trailingActions}</span>}
        {canClear && <button aria-label="Clear input" className="mm-input__action" onClick={handleClear} type="button"><X size={16} /></button>}
        {readOnly && <span aria-label="Read-only" className="mm-input__icon mm-input__icon--trailing" role="img"><LockKey size={16} /></span>}
        {!canClear && !readOnly && trailingIcon && <span aria-hidden="true" className="mm-input__icon mm-input__icon--trailing mm-input__icon--interactive">{trailingIcon}</span>}
      </span>
      {maxLength !== undefined && <p aria-live="polite" className="mm-input-field__counter">{currentValue.length} / {maxLength}</p>}
      {error && <p className="mm-input-field__error" id={errorId}>{error}</p>}
    </div>
  );
});
