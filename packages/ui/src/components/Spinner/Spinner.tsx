import { useId, type CSSProperties, type ReactNode } from 'react';
import './Spinner.css';

export type SpinnerSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';
export type SpinnerVariant = 'ring' | 'dots' | 'bars' | 'pulse';
export type SpinnerTone = 'primary' | 'secondary' | 'success' | 'danger' | 'light' | 'inherit';
export type SpinnerLabelPosition = 'inline' | 'below';

export type SpinnerProps = {
  'aria-label'?: string;
  className?: string;
  label?: ReactNode;
  labelPosition?: SpinnerLabelPosition;
  max?: number;
  min?: number;
  overlay?: boolean;
  size?: SpinnerSize;
  speed?: number;
  thickness?: number;
  tone?: SpinnerTone;
  track?: boolean;
  value?: number;
  variant?: SpinnerVariant;
  fullscreen?: boolean;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function Spinner({ 'aria-label': ariaLabel = 'Loading', className, label, labelPosition = 'inline', max = 100, min = 0, overlay = false, size = 'default', speed = 1, thickness = 3, tone = 'primary', track = true, value, variant = 'ring', fullscreen = false }: SpinnerProps) {
  const generatedId = useId();
  const labelId = `mm-spinner-label-${generatedId.replace(/:/g, '')}`;
  const determinate = value !== undefined;
  const boundedValue = Math.min(max, Math.max(min, value ?? min));
  const range = Math.max(1, max - min);
  const progress = ((boundedValue - min) / range) * 100;
  const style = { '--mm-spinner-speed': `${Math.max(0.1, speed)}s`, '--mm-spinner-thickness': `${Math.max(1, thickness)}px`, '--mm-spinner-progress': `${progress}%` } as CSSProperties;
  const content = <span aria-busy={!determinate || progress < 100} aria-describedby={label ? labelId : undefined} aria-label={label ? undefined : ariaLabel} aria-valuemax={determinate ? max : undefined} aria-valuemin={determinate ? min : undefined} aria-valuenow={determinate ? boundedValue : undefined} className={cx('mm-spinner', `mm-spinner--${variant}`, `mm-spinner--${size}`, `mm-spinner--${tone}`, Boolean(label) && `mm-spinner--label-${labelPosition}`, overlay && 'mm-spinner--overlay', fullscreen && 'mm-spinner--fullscreen', className)} role={determinate ? 'progressbar' : 'status'} style={style}>
    <span aria-hidden="true" className={cx('mm-spinner__visual', !track && 'mm-spinner__visual--no-track')}>
      {variant === 'dots' && <><span /><span /><span /></>}
      {variant === 'bars' && <><span /><span /><span /><span /></>}
      {variant === 'pulse' && <span />}
    </span>
    {label && <span className="mm-spinner__label" id={labelId}>{label}</span>}
  </span>;
  return content;
}
