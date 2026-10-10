import { type LabelHTMLAttributes, type ReactNode } from 'react';
import './Label.css';

export type LabelSize = 'xs' | 'sm' | 'default' | 'lg';
export type LabelTone = 'default' | 'muted' | 'danger' | 'success' | 'warning';
export type LabelWeight = 'normal' | 'medium' | 'semibold';

export type LabelProps = Omit<LabelHTMLAttributes<HTMLLabelElement>, 'children'> & {
  children?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  error?: ReactNode;
  leadingIcon?: ReactNode;
  optional?: boolean;
  optionalLabel?: ReactNode;
  required?: boolean;
  requiredIndicator?: ReactNode;
  size?: LabelSize;
  tone?: LabelTone;
  truncate?: boolean;
  visuallyHidden?: boolean;
  weight?: LabelWeight;
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export function Label({
  children,
  className,
  description,
  disabled = false,
  error,
  leadingIcon,
  optional = false,
  optionalLabel = '(optional)',
  required = false,
  requiredIndicator = '*',
  size = 'default',
  tone = 'default',
  truncate = false,
  visuallyHidden = false,
  weight = 'medium',
  ...props
}: LabelProps) {
  const detail = error ?? description;
  return <label
    {...props}
    className={cx(
      'mm-label-field',
      `mm-label-field--${size}`,
      `mm-label-field--${tone}`,
      `mm-label-field--${weight}`,
      disabled && 'mm-label-field--disabled',
      visuallyHidden && 'mm-label-field--visually-hidden',
      className,
    )}
  >
    <span className={cx('mm-label-field__content', truncate && 'mm-label-field__content--truncate')}>
      {leadingIcon && <span aria-hidden="true" className="mm-label-field__icon">{leadingIcon}</span>}
      <span className="mm-label-field__text">{children}</span>
      {required && <span aria-hidden="true" className="mm-label-field__required">{requiredIndicator}</span>}
      {!required && optional && <span className="mm-label-field__optional">{optionalLabel}</span>}
    </span>
    {detail && <span className={cx('mm-label-field__detail', Boolean(error) && 'mm-label-field__detail--error')}>{detail}</span>}
  </label>;
}
