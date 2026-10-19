import { WarningCircle, CheckCircle, Info, Warning, X } from '../../icons';
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import { Button } from '../Button';
import './ToastNotification.css';

export type ToastNotificationVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type ToastNotificationPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export type ToastNotificationSize = 'sm' | 'default' | 'lg';
export type ToastNotificationLayout = 'inline' | 'stacked';
export type ToastNotificationTheme = 'light' | 'dark';

export type ToastNotificationProps = {
  'aria-label'?: string;
  actions?: ReactNode;
  actionsLabel?: string;
  avatar?: ReactNode;
  badge?: ReactNode;
  children?: ReactNode;
  className?: string;
  closeLabel?: string;
  closable?: boolean;
  defaultOpen?: boolean;
  duration?: number | false;
  href?: string;
  icon?: ReactNode;
  id?: string;
  layout?: ToastNotificationLayout;
  loading?: boolean;
  maxWidth?: number | string;
  onClick?: () => void;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  onRead?: () => void;
  open?: boolean;
  pauseOnFocus?: boolean;
  pauseOnHover?: boolean;
  position?: ToastNotificationPosition;
  progress?: boolean;
  read?: boolean;
  role?: 'alert' | 'status';
  size?: ToastNotificationSize;
  style?: CSSProperties;
  theme?: ToastNotificationTheme;
  timestamp?: ReactNode;
  title?: ReactNode;
  unread?: boolean;
  variant?: ToastNotificationVariant;
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');
const defaultIcons: Record<ToastNotificationVariant, ReactNode> = {
  neutral: null,
  info: <Info aria-hidden="true" size={20} />,
  success: <CheckCircle aria-hidden="true" size={20} />,
  warning: <Warning aria-hidden="true" size={20} />,
  danger: <WarningCircle aria-hidden="true" size={20} />,
};

export function ToastNotification({
  'aria-label': ariaLabel, actions, actionsLabel, avatar, badge, children, className,
  closeLabel = 'Close notification', closable = true, defaultOpen = true, duration = 5000,
  href, icon, id, layout = 'inline', loading = false, maxWidth, onClick, onClose,
  onOpenChange, onRead, open, pauseOnFocus = true, pauseOnHover = true,
  position = 'bottom-right', progress = true, read = false, role, size = 'default',
  style, theme = 'light', timestamp, title, unread = false, variant = 'neutral',
}: ToastNotificationProps) {
  const isControlled = open !== undefined;
  const [visible, setVisible] = useState(open ?? defaultOpen);
  const [closing, setClosing] = useState(false);
  const [paused, setPaused] = useState(false);
  const [remaining, setRemaining] = useState(typeof duration === 'number' ? duration : 0);
  const startedAtRef = useRef<number | undefined>(undefined);
  const timerRef = useRef<number | undefined>(undefined);
  const exitTimerRef = useRef<number | undefined>(undefined);

  const finishClose = useCallback(() => {
    if (!visible || !closing) return;
    setVisible(false); setClosing(false); onOpenChange?.(false); onClose?.();
  }, [closing, onClose, onOpenChange, visible]);
  const close = useCallback(() => {
    if (!visible || closing || loading) return;
    if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);
    setClosing(true);
  }, [closing, loading, visible]);

  useEffect(() => {
    if (!isControlled) return;
    if (open) {
      if (exitTimerRef.current !== undefined) window.clearTimeout(exitTimerRef.current);
      setVisible(true); setClosing(false);
    } else if (visible) setClosing(true);
  }, [isControlled, open, visible]);
  useEffect(() => { if (open && typeof duration === 'number') setRemaining(duration); }, [duration, open]);
  useEffect(() => {
    if (typeof duration !== 'number' || duration <= 0 || !visible || closing || paused) return undefined;
    if (remaining <= 0) { close(); return undefined; }
    startedAtRef.current = Date.now();
    timerRef.current = window.setTimeout(close, remaining);
    return () => {
      if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);
      if (startedAtRef.current !== undefined) setRemaining((value) => Math.max(0, value - (Date.now() - startedAtRef.current!)));
    };
  }, [close, closing, duration, paused, remaining, visible]);
  useEffect(() => () => {
    if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);
    if (exitTimerRef.current !== undefined) window.clearTimeout(exitTimerRef.current);
  }, []);
  useEffect(() => {
    if (!closing) return undefined;
    exitTimerRef.current = window.setTimeout(finishClose, 700);
    return () => { if (exitTimerRef.current !== undefined) window.clearTimeout(exitTimerRef.current); };
  }, [closing, finishClose]);

  if (!visible) return null;
  const activeRole = role ?? (variant === 'danger' || variant === 'warning' ? 'alert' : 'status');
  const activeProgress = typeof duration === 'number' && duration > 0 && progress;
  const interactive = Boolean((onClick || onRead || href) && !loading);
  const handleClick = () => { if (unread && !read) onRead?.(); onClick?.(); };
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handleClick(); }
  };
  const toastStyle = maxWidth === undefined ? style : { ...style, '--mm-toast-max-width': typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth } as CSSProperties;
  const content = <>
    <span aria-hidden="true" className={cx('mm-toast__icon', Boolean(avatar) && 'mm-toast__icon--avatar')}>{avatar ?? (icon !== undefined ? icon : defaultIcons[variant])}</span>
    <div className="mm-toast__body">
      {(title || badge || (unread && !read)) && <div className="mm-toast__heading"><strong className="mm-toast__title">{title}</strong>{badge}{unread && !read && <span aria-label="Unread" className="mm-toast__unread" />}</div>}
      {children && <div className="mm-toast__content">{children}</div>}
      {timestamp && <time className="mm-toast__timestamp">{timestamp}</time>}
      {actions && <div aria-label={actionsLabel} className="mm-toast__actions" onClick={(event) => event.stopPropagation()}>{actions}</div>}
    </div>
    {loading && <span aria-label="Loading" className="mm-toast__spinner" role="status" />}
    {closable && <Button aria-label={closeLabel} className="mm-toast__close" disabled={loading} iconOnly iconLeft={<X aria-hidden="true" size={size === 'sm' ? 12 : 16} />} onClick={(event) => { event.stopPropagation(); close(); }} size="xs" variant="text" />}
    {activeProgress && <span aria-hidden="true" className="mm-toast__progress" style={{ animationDuration: `${duration}ms` }} />}
  </>;
  const commonClassName = cx('mm-toast', `mm-toast--${variant}`, `mm-toast--${size}`, `mm-toast--${layout}`, `mm-toast--${position}`, `mm-toast--${theme}`, `mm-toast--${activeProgress ? 'progress' : 'static'}`, `mm-toast--${paused ? 'paused' : ''}`, unread && !read && 'mm-toast--unread', interactive && 'mm-toast--interactive', loading && 'mm-toast--loading', closing && 'mm-toast--closing', className);
  const commonProps = {
    'aria-atomic': true, 'aria-label': ariaLabel, className: commonClassName, id,
    onBlur: pauseOnFocus ? () => setPaused(false) : undefined,
    onFocus: pauseOnFocus ? () => setPaused(true) : undefined,
    onMouseEnter: pauseOnHover ? () => setPaused(true) : undefined,
    onMouseLeave: pauseOnHover ? () => setPaused(false) : undefined,
    onAnimationEnd: (event: React.AnimationEvent<HTMLElement>) => { if (closing && event.animationName.startsWith('mm-toast-exit-')) finishClose(); },
    style: toastStyle,
  };
  if (href) return <a {...commonProps} href={href} onClick={interactive ? handleClick : undefined}>{content}</a>;
  return <article {...commonProps} onClick={interactive ? handleClick : undefined} onKeyDown={interactive ? handleKeyDown : undefined} role={interactive ? 'button' : activeRole} tabIndex={interactive ? 0 : undefined}>{content}</article>;
}
