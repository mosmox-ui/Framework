import { useId, useState, type CSSProperties, type MouseEvent, type ReactNode, type KeyboardEvent } from 'react';
import './Rating.css';

export type RatingSize = 'xs' | 'sm' | 'default';
export type RatingTone = 'primary' | 'warning' | 'success' | 'danger' | 'inherit';
export type RatingProps = {
  'aria-label'?: string;
  max?: number;
  value?: number | null;
  defaultValue?: number;
  onChange?: (value: number | null) => void;
  onHover?: (value: number | null) => void;
  allowHalf?: boolean;
  allowClear?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: RatingSize;
  tone?: RatingTone;
  icon?: ReactNode;
  emptyIcon?: ReactNode;
  label?: ReactNode;
  showValue?: boolean;
  valueFormatter?: (value: number, max: number) => ReactNode;
  className?: string;
  style?: CSSProperties;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function Rating({ 'aria-label': ariaLabel = 'Rating', max = 5, value, defaultValue = 0, onChange, onHover, allowHalf = false, allowClear = true, readOnly = false, disabled = false, loading = false, size = 'default', tone = 'warning', icon = '★', emptyIcon = '☆', label, showValue = false, valueFormatter = (current, total) => `${current} / ${total}`, className, style }: RatingProps) {
  const id = useId().replace(/:/g, '');
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const currentValue = clamp(value === undefined ? internalValue : (value ?? 0), 0, max);
  const displayValue = hoverValue ?? currentValue;
  const precision = allowHalf ? 0.5 : 1;
  const interactive = !disabled && !readOnly && !loading;
  const select = (next: number) => { const selected = allowClear && next === currentValue ? null : next; if (value === undefined) setInternalValue(selected ?? 0); onChange?.(selected); };
  const valueFromPointer = (event: MouseEvent<HTMLButtonElement> | null, index: number) => { if (!interactive || !allowHalf || !event) return index + 1; const rect = event.currentTarget.getBoundingClientRect(); return index + (event.clientX - rect.left < rect.width / 2 ? 0.5 : 1); };
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => { if (!interactive) return; let next: number | undefined; if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = clamp(currentValue + precision, 0, max); if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = clamp(currentValue - precision, 0, max); if (event.key === 'Home') next = 0; if (event.key === 'End') next = max; if (next !== undefined) { event.preventDefault(); select(next); } if (event.key === ' ') { event.preventDefault(); select(index + 1); } };
  const showStar = (index: number) => { const fill = clamp(displayValue - index, 0, 1) * 100; return <span aria-hidden="true" className="mm-rating__icon-wrap"><span className="mm-rating__icon-empty">{emptyIcon}</span><span className="mm-rating__icon-fill" style={{ width: `${fill}%` }}>{icon}</span></span>; };
  return <div aria-label={ariaLabel} className={cx('mm-rating', `mm-rating--${size}`, `mm-rating--${tone}`, (disabled || loading) && 'mm-rating--disabled', readOnly && 'mm-rating--readonly', className)} style={style}>
    <div aria-label={ariaLabel} className="mm-rating__control" onMouseLeave={() => { setHoverValue(null); onHover?.(null); }} role="radiogroup">
      {Array.from({ length: max }, (_, index) => <button aria-checked={currentValue === index + 1} aria-label={`${index + 1} of ${max}`} className={cx('mm-rating__star', displayValue > index && 'mm-rating__star--active')} disabled={!interactive} key={`${id}-${index}`} onClick={(event) => select(valueFromPointer(event, index))} onKeyDown={(event) => handleKeyDown(event, index)} onMouseEnter={(event) => { if (!interactive) return; const next = valueFromPointer(event, index); setHoverValue(next); onHover?.(next); }} onMouseMove={(event) => { if (!interactive) return; const next = valueFromPointer(event, index); setHoverValue(next); onHover?.(next); }} role="radio" type="button">{showStar(index)}</button>)}
    </div>
    {(label || showValue) && <span className="mm-rating__label" id={`${id}-label`}>{label}{showValue && <span className="mm-rating__value">{valueFormatter(currentValue, max)}</span>}</span>}
    {loading && <span aria-label="Loading" className="mm-rating__loading" role="status" />}
  </div>;
}
