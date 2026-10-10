import { memo, useContext, useId, useState, type ChangeEvent, type InputHTMLAttributes, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { SwitchGroupContext } from './SwitchGroup';
import './Switch.css';

export type SwitchSize = 'default' | 'sm' | 'xs';
export type SwitchTone = 'primary' | 'success' | 'warning' | 'danger';
export type SwitchStatus = 'success' | 'warning';
export type SwitchLabelPosition = 'left' | 'right';

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  checkedLabel?: ReactNode;
  description?: string;
  error?: string;
  label?: ReactNode;
  labelPosition?: SwitchLabelPosition;
  loading?: boolean;
  loadingLabel?: ReactNode;
  offIcon?: ReactNode;
  offLabel?: ReactNode;
  onIcon?: ReactNode;
  onLabel?: ReactNode;
  readOnly?: boolean;
  size?: SwitchSize;
  status?: SwitchStatus;
  tone?: SwitchTone;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export const Switch = memo(function Switch({
  'aria-describedby': ariaDescribedBy,
  'aria-readonly': ariaReadonly,
  checked: controlledChecked,
  checkedLabel,
  className,
  defaultChecked = false,
  description,
  disabled = false,
  error,
  id: providedId,
  label,
  labelPosition = 'right',
  loading = false,
  loadingLabel,
  offIcon,
  offLabel,
  onChange,
  onClick,
  onIcon,
  onKeyDown,
  onLabel,
  readOnly = false,
  size = 'default',
  status,
  tone = 'primary',
  ...props
}: SwitchProps) {
  const group = useContext(SwitchGroupContext);
  const generatedId = useId();
  const id = providedId ?? `mm-switch-${generatedId}`;
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const groupValue = group?.value;
  const hasGroupValue = groupValue !== undefined && props.value !== undefined;
  const checked = hasGroupValue ? groupValue.includes(String(props.value)) : controlledChecked === undefined ? uncontrolledChecked : controlledChecked;
  const effectiveDisabled = disabled || loading || Boolean(group?.disabled);
  const effectiveReadOnly = readOnly || Boolean(group?.readOnly);
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [ariaDescribedBy, group?.descriptionId, group?.errorId, descriptionId, errorId].filter(Boolean).join(' ') || undefined;
  const effectiveStatus = error ? undefined : status;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (effectiveReadOnly) {
      event.preventDefault();
      event.currentTarget.checked = checked;
      return;
    }
    if (hasGroupValue) {
      group?.onChange?.(String(props.value), event);
    } else if (controlledChecked === undefined) {
      setUncontrolledChecked(event.target.checked);
    }
    onChange?.(event);
  };

  const handleClick = (event: MouseEvent<HTMLInputElement>) => {
    onClick?.(event);
    if (effectiveReadOnly) event.preventDefault();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (effectiveReadOnly && event.key === ' ') event.preventDefault();
  };

  return (
    <div className={cx('mm-switch-field', className)}>
      <label className={cx('mm-switch', `mm-switch--${size}`, `mm-switch--tone-${tone}`, `mm-switch--label-${labelPosition}`, effectiveStatus && `mm-switch--${effectiveStatus}`, error && 'mm-switch--error', effectiveReadOnly && 'mm-switch--readonly', effectiveDisabled && 'mm-switch--disabled')}>
        <input
          {...props}
          aria-describedby={describedBy}
          aria-invalid={props['aria-invalid'] ?? Boolean(error)}
          aria-readonly={ariaReadonly ?? (effectiveReadOnly ? true : undefined)}
          checked={checked}
          disabled={effectiveDisabled}
          id={id}
          name={group?.name ?? props.name}
          onChange={handleChange}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          type="checkbox"
        />
        {label && <span className="mm-switch__label">{label}</span>}
        <span aria-hidden="true" className="mm-switch__control">
          <span className="mm-switch__thumb">{loading ? <span aria-hidden="true" className="mm-switch__loader" /> : (checked ? onIcon : offIcon) && <span className="mm-switch__icon">{checked ? onIcon : offIcon}</span>}</span>
        </span>
        {!loading && checked && onLabel !== undefined && <span className="mm-switch__state">{onLabel}</span>}
        {!loading && !checked && offLabel !== undefined && <span className="mm-switch__state">{offLabel}</span>}
        {!loading && checkedLabel !== undefined && checked && <span className="mm-switch__state">{checkedLabel}</span>}
        {loading && <span aria-label={loadingLabel === undefined ? 'Loading' : undefined} className="mm-switch__loading" role="status">{loadingLabel}</span>}
      </label>
      {description && <p className="mm-switch-field__description" id={descriptionId}>{description}</p>}
      {error && <p className="mm-switch-field__error" id={errorId}>{error}</p>}
    </div>
  );
});
