import { X } from '../../icons';
import { useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import './Tag.css';

export type TagSize = 'xs' | 'sm' | 'default' | 'lg';
export type TagTone = 'neutral' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type TagVariant = 'solid' | 'soft' | 'outline' | 'light';
export type TagShape = 'rounded' | 'pill' | 'square';

export type TagProps = {
  'aria-label'?: string;
  avatar?: ReactNode;
  children?: ReactNode;
  className?: string;
  closeIcon?: ReactNode;
  disabled?: boolean;
  href?: string;
  icon?: ReactNode;
  id?: string;
  loading?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onRemove?: (event: MouseEvent<HTMLButtonElement>) => void;
  onSelectedChange?: (selected: boolean) => void;
  removable?: boolean;
  removeLabel?: string;
  selectable?: boolean;
  selected?: boolean;
  defaultSelected?: boolean;
  shape?: TagShape;
  size?: TagSize;
  style?: CSSProperties;
  title?: string;
  tone?: TagTone;
  truncate?: boolean;
  variant?: TagVariant;
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export function Tag({
  'aria-label': ariaLabel,
  avatar,
  children,
  className,
  closeIcon,
  defaultSelected = false,
  disabled = false,
  href,
  icon,
  id,
  loading = false,
  onClick,
  onRemove,
  onSelectedChange,
  removable = false,
  removeLabel = 'Remove tag',
  selectable = false,
  selected,
  shape = 'pill',
  size = 'default',
  style,
  title,
  tone = 'neutral',
  truncate = false,
  variant = 'soft',
}: TagProps) {
  const isControlled = selected !== undefined;
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const activeSelected = selected ?? internalSelected;
  const isBusy = loading;
  const isInteractive = Boolean(onClick || selectable || href) && !disabled && !isBusy;

  const activate = (event: MouseEvent<HTMLElement>) => {
    if (!isInteractive) return;
    if (selectable) {
      const nextSelected = !activeSelected;
      if (!isControlled) setInternalSelected(nextSelected);
      onSelectedChange?.(nextSelected);
    }
    onClick?.(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!isInteractive || href) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activate(event as unknown as MouseEvent<HTMLElement>);
    }
  };

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!disabled && !isBusy) onRemove?.(event);
  };

  const content = <>
    {isBusy && <span aria-label="Loading" className="mm-tag__spinner" role="status" />}
    {!isBusy && avatar && <span aria-hidden="true" className="mm-tag__avatar">{avatar}</span>}
    {!isBusy && !avatar && icon && <span aria-hidden="true" className="mm-tag__icon">{icon}</span>}
    <span className={cx('mm-tag__content', truncate && 'mm-tag__content--truncate')}>{children}</span>
    {removable && <button aria-label={removeLabel} className="mm-tag__remove" disabled={disabled || isBusy} onClick={handleRemove} type="button">{closeIcon ?? <X aria-hidden="true" />}</button>}
  </>;

  const classes = cx('mm-tag', `mm-tag--${size}`, `mm-tag--${tone}`, `mm-tag--${variant}`, `mm-tag--${shape}`, activeSelected && 'mm-tag--selected', isInteractive && 'mm-tag--interactive', (disabled || isBusy) && 'mm-tag--disabled', className);
  if (href) return <a aria-label={ariaLabel} className={classes} href={href} id={id} onClick={activate} style={style} title={title}>{content}</a>;
  return <span aria-label={ariaLabel} aria-pressed={selectable ? activeSelected : undefined} className={classes} id={id} onClick={isInteractive ? activate : undefined} onKeyDown={handleKeyDown} role={isInteractive ? 'button' : undefined} style={style} tabIndex={isInteractive ? 0 : undefined} title={title}>{content}</span>;
}
