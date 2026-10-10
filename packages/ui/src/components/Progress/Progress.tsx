import { useId, type CSSProperties, type ReactNode } from 'react';
import './Progress.css';

export type ProgressVariant = 'bar' | 'circle';
export type ProgressSize = 'sm' | 'default' | 'lg';
export type ProgressTone = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'inherit';
export type ProgressLabelPosition = 'above' | 'below' | 'inside';
export type ProgressLabelAlign = 'start' | 'center' | 'end' | 'progress';

export type ProgressProps = {
  'aria-label'?: string;
  animated?: boolean;
  className?: string;
  indeterminate?: boolean;
  label?: ReactNode;
  labelAlign?: ProgressLabelAlign;
  labelPosition?: ProgressLabelPosition;
  max?: number;
  min?: number;
  showValue?: boolean;
  size?: ProgressSize;
  striped?: boolean;
  thickness?: number;
  tone?: ProgressTone;
  value?: number;
  valueFormatter?: (value: number, percentage: number) => ReactNode;
  variant?: ProgressVariant;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function Progress({ 'aria-label': ariaLabel = 'Progress', animated = false, className, indeterminate = false, label, labelAlign = 'start', labelPosition = 'above', max = 100, min = 0, showValue = false, size = 'default', striped = false, thickness = 8, tone = 'primary', value = min, valueFormatter, variant = 'bar' }: ProgressProps) {
  const generatedId = useId();
  const labelId = `mm-progress-label-${generatedId.replace(/:/g, '')}`;
  const range = Math.max(1, max - min);
  const boundedValue = Math.min(max, Math.max(min, value));
  const percentage = Math.round(((boundedValue - min) / range) * 100);
  const valueContent = valueFormatter ? valueFormatter(boundedValue, percentage) : `${percentage}%`;
  const accessibleValue = indeterminate ? undefined : `${percentage}%`;
  const style = { '--mm-progress-value': `${percentage}%`, '--mm-progress-thickness': `${Math.max(2, thickness)}px`, '--mm-progress-dashoffset': `${264 - (264 * percentage) / 100}` } as CSSProperties;
  const visibleLabel = label ?? (showValue ? valueContent : null);
  const commonProps = { 'aria-busy': indeterminate || percentage < 100, 'aria-describedby': visibleLabel ? labelId : undefined, 'aria-label': visibleLabel ? undefined : ariaLabel, 'aria-valuemax': indeterminate ? undefined : max, 'aria-valuemin': indeterminate ? undefined : min, 'aria-valuenow': indeterminate ? undefined : boundedValue, className: cx('mm-progress', `mm-progress--${variant}`, `mm-progress--${size}`, `mm-progress--${tone}`, Boolean(visibleLabel) && `mm-progress--label-${labelPosition}`, Boolean(visibleLabel) && `mm-progress--label-align-${labelAlign}`, striped && 'mm-progress--striped', animated && 'mm-progress--animated', indeterminate && 'mm-progress--indeterminate', className), role: indeterminate ? 'progressbar' : 'progressbar', style };

  if (variant === 'circle') return <div {...commonProps}><div aria-hidden="true" className="mm-progress__circle"><svg className="mm-progress__svg" viewBox="0 0 100 100"><circle className="mm-progress__circle-track" cx="50" cy="50" r="42" /><circle className="mm-progress__circle-value" cx="50" cy="50" r="42" /></svg>{visibleLabel && <span className="mm-progress__circle-label">{visibleLabel}</span>}</div>{label && labelPosition !== 'inside' && <span className="mm-progress__label" id={labelId}>{label}</span>}</div>;
  return <div {...commonProps}>{labelPosition === 'above' && visibleLabel && <div className="mm-progress__header"><span className="mm-progress__label" id={labelId}>{label ?? 'Progress'}</span>{showValue && <span className="mm-progress__value">{valueContent}</span>}</div>}<div className="mm-progress__track" aria-hidden="true"><span className="mm-progress__fill">{labelPosition === 'inside' && visibleLabel && <span className="mm-progress__inside-label">{visibleLabel}</span>}</span></div>{labelPosition === 'below' && visibleLabel && <div className="mm-progress__footer"><span className="mm-progress__label" id={labelId}>{label}</span>{showValue && <span className="mm-progress__value">{valueContent}</span>}</div>}</div>;
}
