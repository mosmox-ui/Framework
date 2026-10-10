import { WarningCircle, CheckCircle, Info, Warning, X } from '../../icons';
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { Button } from '../Button';
import { useConfig } from '../ConfigProvider';
import './Banner.css';

export type BannerVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type BannerSize = 'sm' | 'default' | 'lg';
export type BannerLayout = 'inline' | 'stacked';
export type BannerPosition = 'static' | 'sticky-top' | 'sticky-bottom';
export type BannerDismissMode = 'icon' | 'button';

export type BannerProps = {
  'aria-label'?: string;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  closeLabel?: string;
  defaultOpen?: boolean;
  dismissible?: boolean;
  dismissIcon?: ReactNode;
  dismissLabel?: ReactNode;
  dismissMode?: BannerDismissMode;
  fullWidth?: boolean;
  icon?: ReactNode;
  id?: string;
  layout?: BannerLayout;
  loading?: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  position?: BannerPosition;
  size?: BannerSize;
  style?: CSSProperties;
  title?: ReactNode;
  variant?: BannerVariant;
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const defaultIcons: Record<BannerVariant, ReactNode> = {
  neutral: <Info aria-hidden="true" size={20} />,
  info: <Info aria-hidden="true" size={20} />,
  success: <CheckCircle aria-hidden="true" size={20} />,
  warning: <Warning aria-hidden="true" size={20} />,
  danger: <WarningCircle aria-hidden="true" size={20} />,
};

export function Banner({
  'aria-label': ariaLabel,
  actions,
  children,
  className,
  closeLabel = 'Close banner',
  defaultOpen = true,
  dismissible = true,
  dismissIcon,
  dismissLabel = 'Dismiss',
  dismissMode = 'icon',
  fullWidth = false,
  icon,
  id,
  layout,
  loading = false,
  onClose,
  onOpenChange,
  open,
  position,
  size,
  style,
  title,
  variant,
}: BannerProps) {
  const { components } = useConfig();
  const config = components.banner;
  const activeLayout = layout ?? config?.layout ?? 'inline';
  const activePosition = position ?? config?.position ?? 'static';
  const activeSize = size ?? config?.size ?? 'default';
  const activeVariant = variant ?? config?.variant ?? 'neutral';
  const isControlled = open !== undefined;
  const [visibleOpen, setVisibleOpen] = useState(open ?? defaultOpen);

  useEffect(() => {
    if (isControlled) setVisibleOpen(Boolean(open));
  }, [isControlled, open]);

  const close = () => {
    if (isControlled) onOpenChange?.(false);
    else setVisibleOpen(false);
    onClose?.();
  };

  if (!visibleOpen) return null;

  return <aside aria-atomic="true" aria-label={ariaLabel} className={cx('mm-banner', `mm-banner--${activeVariant}`, `mm-banner--${activeSize}`, `mm-banner--${activeLayout}`, `mm-banner--${activePosition}`, !title && 'mm-banner--message', fullWidth && 'mm-banner--full-width', loading && 'mm-banner--loading', className)} id={id} role={activeVariant === 'danger' || activeVariant === 'warning' ? 'alert' : 'status'} style={style}>
    <span aria-hidden="true" className="mm-banner__icon">{icon !== undefined ? icon : defaultIcons[activeVariant]}</span>
    <div className="mm-banner__body">
      {title && <div className="mm-banner__title">{title}</div>}
      {children && <div className="mm-banner__content">{children}</div>}
    </div>
    {(actions || loading) && <div className="mm-banner__actions">{loading ? <span aria-label="Loading" className="mm-banner__spinner" role="status" /> : actions}</div>}
    {dismissible && (dismissMode === 'button' ? <Button className="mm-banner__dismiss-button" disabled={loading} iconLeft={dismissIcon} onClick={close} size={activeSize === 'lg' ? 'default' : 'sm'} variant="outline">{dismissLabel}</Button> : <Button aria-label={closeLabel} className="mm-banner__close" disabled={loading} iconOnly iconLeft={dismissIcon ?? <X aria-hidden="true" size={activeSize === 'sm' ? 14 : 16} />} onClick={close} size="xs" variant="text" />)}
  </aside>;
}
