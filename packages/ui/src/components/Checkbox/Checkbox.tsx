import { useEffect, useId, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import './Checkbox.css';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  description?: string;
  error?: string;
  checkedIcon?: ReactNode;
  indeterminate?: boolean;
  indeterminateIcon?: ReactNode;
  label?: ReactNode;
  loading?: boolean;
  size?: 'default' | 'sm' | 'xs';
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function Checkbox({
  'aria-describedby': ariaDescribedBy,
  className,
  checkedIcon,
  description,
  error,
  id: providedId,
  indeterminate = false,
  label,
  indeterminateIcon,
  loading = false,
  size = 'default',
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const id = providedId ?? `mm-checkbox-${generatedId}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div className={cx('mm-checkbox-field', className)}>
      <label className={cx('mm-checkbox', `mm-checkbox--${size}`, error && 'mm-checkbox--error', (props.disabled || loading) && 'mm-checkbox--disabled', loading && 'mm-checkbox--loading')}>
        <input {...props} aria-describedby={describedBy} aria-invalid={props['aria-invalid'] ?? Boolean(error)} disabled={props.disabled || loading} id={id} ref={inputRef} type="checkbox" />
        <span aria-hidden="true" className={cx('mm-checkbox__control', indeterminate && 'mm-checkbox__control--indeterminate', Boolean(checkedIcon || indeterminateIcon) && 'mm-checkbox__control--custom')}>
          {loading ? <span className="mm-checkbox__loader" /> : indeterminate ? indeterminateIcon : checkedIcon}
        </span>
        {label && <span className="mm-checkbox__label">{label}{props.required && <span aria-hidden="true"> *</span>}</span>}
      </label>
      {description && <p className="mm-checkbox-field__description" id={descriptionId}>{description}</p>}
      {error && <p className="mm-checkbox-field__error" id={errorId}>{error}</p>}
    </div>
  );
}
