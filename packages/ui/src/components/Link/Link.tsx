import { ArrowSquareOut, SpinnerGap } from '../../icons';
import type { AnchorHTMLAttributes, CSSProperties, MouseEvent, ReactNode } from 'react';
import './Link.css';

export type LinkVariant = 'default' | 'subtle' | 'muted' | 'underline';
export type LinkSize = 'sm' | 'default' | 'lg';
export type LinkExternalIcon = 'auto' | 'always' | 'never';
export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & { children?: ReactNode; color?: string; disabled?: boolean; external?: boolean; externalIcon?: LinkExternalIcon; iconLeft?: ReactNode; iconRight?: ReactNode; loading?: boolean; newTab?: boolean; size?: LinkSize; variant?: LinkVariant };

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function Link({ children, className, color, disabled = false, external = false, externalIcon = 'auto', iconLeft, iconRight, loading = false, newTab = false, onClick, rel, size = 'default', style, tabIndex, target, variant = 'default', ...rest }: LinkProps) {
  const showExternalIcon = externalIcon === 'always' || (externalIcon === 'auto' && external);
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => { if (disabled || loading) { event.preventDefault(); return; } onClick?.(event); };
  const linkStyle = color ? { ...style, '--mm-link-color': color } as CSSProperties : style;
  return <a aria-busy={loading || undefined} aria-disabled={disabled || undefined} className={cx('mm-link', `mm-link--${size}`, `mm-link--${variant}`, disabled && 'mm-link--disabled', loading && 'mm-link--loading', className)} onClick={handleClick} rel={external || newTab ? (rel ?? 'noreferrer') : rel} style={linkStyle} target={external || newTab ? (target ?? '_blank') : target} tabIndex={disabled ? -1 : tabIndex} {...rest}>
    {loading ? <SpinnerGap aria-hidden="true" className="mm-link__loader" size={15} /> : iconLeft}
    <span>{children}</span>
    {iconRight ?? (showExternalIcon && <ArrowSquareOut aria-hidden="true" size={15} />)}
  </a>;
}
