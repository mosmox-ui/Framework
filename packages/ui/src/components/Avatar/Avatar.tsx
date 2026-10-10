import { useState, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import './Avatar.css';

export type AvatarSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl' | 'xxl';
export type AvatarShape = 'circle' | 'rounded' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';
export type AvatarVariant = 'solid' | 'soft' | 'outline';

export type AvatarProps = {
  'aria-label'?: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
  disableHover?: boolean;
  disabled?: boolean;
  hoverScale?: boolean;
  icon?: ReactNode;
  image?: string;
  initials?: string;
  loading?: boolean;
  name?: string;
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  shape?: AvatarShape;
  size?: AvatarSize;
  status?: AvatarStatus;
  statusLabel?: string;
  variant?: AvatarVariant;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

function initialsFromName(name?: string) {
  return name?.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || '';
}

export function Avatar({ 'aria-label': ariaLabel, alt, children, className, disableHover = false, disabled = false, hoverScale = false, icon, image, initials, loading = false, name, onClick, shape = 'circle', size = 'default', status, statusLabel, variant = 'soft' }: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const interactive = Boolean(onClick) && !disabled && !loading;
  const label = ariaLabel ?? name ?? alt;
  const fallback = initials ?? initialsFromName(name) ?? children ?? icon;
  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (interactive && onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event as unknown as MouseEvent<HTMLSpanElement>);
    }
  };
  return <span aria-busy={loading || undefined} aria-label={label} className={cx('mm-avatar', `mm-avatar--${size}`, `mm-avatar--${shape}`, `mm-avatar--${variant}`, interactive && 'mm-avatar--interactive', disableHover && 'mm-avatar--disable-hover', hoverScale && 'mm-avatar--hover-scale', disabled && 'mm-avatar--disabled', loading && 'mm-avatar--loading', className)} onClick={interactive ? onClick : undefined} onKeyDown={handleKeyDown} role={interactive ? 'button' : undefined} tabIndex={interactive ? 0 : undefined}>
    {image && !imageFailed ? <img alt={alt ?? name ?? ''} className="mm-avatar__image" onError={() => setImageFailed(true)} src={image} /> : <span aria-hidden={!label} className="mm-avatar__fallback">{loading ? <span className="mm-avatar__loader" /> : fallback || icon}</span>}
    {status && <span aria-label={statusLabel ?? status} className={`mm-avatar__status mm-avatar__status--${status}`} role="status" />}
  </span>;
}
