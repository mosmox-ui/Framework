import { X } from '../../icons';
import { type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import './Badge.css';

export type BadgeSize = 'xs' | 'sm' | 'default' | 'lg';
export type BadgeTone = 'neutral' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type BadgeVariant = 'solid' | 'soft' | 'outline' | 'light';
export type BadgeShape = 'rounded' | 'pill' | 'square';

export type BadgeProps = {
  'aria-label'?: string;
  className?: string;
  count?: number | string;
  dot?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  loading?: boolean;
  max?: number;
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  onRemove?: (event: MouseEvent<HTMLButtonElement>) => void;
  removable?: boolean;
  showZero?: boolean;
  shape?: BadgeShape;
  size?: BadgeSize;
  tone?: BadgeTone;
  variant?: BadgeVariant;
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

function formatCount(count: number | string, max?: number) {
  if (typeof count !== 'number' || max === undefined || count <= max) return String(count);
  return `${max}+`;
}

export function Badge({
  'aria-label': ariaLabel,
  className,
  count,
  dot = false,
  disabled = false,
  icon,
  loading = false,
  max,
  onClick,
  onRemove,
  removable = false,
  showZero = false,
  shape = 'pill',
  size = 'default',
  tone = 'neutral',
  variant = 'soft',
}: BadgeProps) {
  const countIsZero = count === 0 || (typeof count === 'string' && count === '0');
  const hasCount = count !== undefined && (showZero || !countIsZero);
  const hasContent = hasCount;
  const isInteractive = Boolean(onClick) && !disabled && !loading;
  const isBusy = loading;

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (!isInteractive || !onClick) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(event as unknown as MouseEvent<HTMLSpanElement>);
    }
  };

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled || isBusy) return;
    onRemove?.(event);
  };

  if (!hasContent && !dot) return null;

  return <span
    aria-busy={isBusy || undefined}
    aria-label={ariaLabel}
    className={cx(
      'mm-badge',
      `mm-badge--${size}`,
      `mm-badge--${tone}`,
      `mm-badge--${variant}`,
      `mm-badge--${shape}`,
      dot && 'mm-badge--dot',
      isInteractive && 'mm-badge--interactive',
      (disabled || isBusy) && 'mm-badge--disabled',
      className,
    )}
    onClick={isInteractive ? onClick : undefined}
    onKeyDown={handleKeyDown}
    role={isInteractive ? 'button' : undefined}
    tabIndex={isInteractive ? 0 : undefined}
  >
    {isBusy && <span aria-label={loading ? 'Loading' : 'Removing'} className="mm-badge__spinner" role="status" />}
    {!isBusy && icon && <span aria-hidden="true" className="mm-badge__icon">{icon}</span>}
    {!isBusy && dot && <span aria-hidden="true" className="mm-badge__dot" />}
    {!isBusy && hasContent && <span className="mm-badge__content">{formatCount(count!, max)}</span>}
    {removable && <button aria-label="Remove badge" className="mm-badge__remove" disabled={disabled || isBusy} onClick={handleRemove} type="button"><X aria-hidden="true" /></button>}
  </span>;
}
