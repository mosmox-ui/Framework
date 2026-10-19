import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { ToastNotificationPosition } from '../ToastNotification';
import './MiniToast.css';

export type MiniToastProps = {
  actionIcon?: ReactNode;
  actionLabel?: ReactNode;
  ariaLabel?: string;
  children?: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  duration?: number | false;
  icon?: ReactNode;
  onAction?: () => void;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  position?: ToastNotificationPosition;
  showAction?: boolean;
  size?: MiniToastSize;
  style?: CSSProperties;
  width?: CSSProperties['width'];
};

export type MiniToastSize = 'sm' | 'default';

export type MiniToastStackProps = {
  children?: ReactNode;
  className?: string;
  position?: ToastNotificationPosition;
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export function MiniToast({
  actionIcon,
  actionLabel = 'Cancel',
  ariaLabel,
  children,
  className,
  defaultOpen = true,
  duration = false,
  icon,
  onAction,
  onClose,
  onOpenChange,
  open,
  position = 'bottom-right',
  showAction = true,
  size = 'default',
  style,
  width = 350,
}: MiniToastProps) {
  const controlled = open !== undefined;
  const effectiveDuration = !showAction
    ? (typeof duration === 'number' && duration > 0 ? duration : 10000)
    : duration;
  const [visible, setVisible] = useState(open ?? defaultOpen);
  const [closing, setClosing] = useState(false);
  const [remaining, setRemaining] = useState(typeof effectiveDuration === 'number' ? effectiveDuration : 0);
  const exitTimerRef = useRef<number | undefined>(undefined);

  const finishClose = useCallback(() => {
    if (!visible || !closing) return;
    setVisible(false);
    setClosing(false);
    onOpenChange?.(false);
    onClose?.();
  }, [closing, onClose, onOpenChange, visible]);

  const close = useCallback(() => {
    if (!visible || closing) return;
    setClosing(true);
  }, [closing, visible]);

  useEffect(() => {
    if (!controlled) return;
    if (open) {
      if (exitTimerRef.current !== undefined) window.clearTimeout(exitTimerRef.current);
      setVisible(true);
      setClosing(false);
    } else if (visible) setClosing(true);
  }, [controlled, open, visible]);
  useEffect(() => { if (typeof effectiveDuration === 'number') setRemaining(effectiveDuration); }, [effectiveDuration, open]);
  useEffect(() => {
    if (!visible || typeof effectiveDuration !== 'number' || effectiveDuration <= 0) return undefined;
    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      const next = Math.max(0, effectiveDuration - (Date.now() - startedAt));
      setRemaining(next);
      if (next <= 0) {
        window.clearInterval(interval);
        close();
      }
    }, 100);
    return () => window.clearInterval(interval);
  }, [close, effectiveDuration, visible]);

  useEffect(() => () => {
    if (exitTimerRef.current !== undefined) window.clearTimeout(exitTimerRef.current);
  }, []);

  useEffect(() => {
    if (!closing) return undefined;
    exitTimerRef.current = window.setTimeout(finishClose, 700);
    return () => {
      if (exitTimerRef.current !== undefined) window.clearTimeout(exitTimerRef.current);
    };
  }, [closing, finishClose]);

  if (!visible) return null;
  const hasCountdown = typeof effectiveDuration === 'number' && effectiveDuration > 0;
  const seconds = Math.ceil(remaining / 1000);
  const progress = hasCountdown ? `${Math.max(0, Math.min(1, remaining / effectiveDuration!)) * 360}deg` : '360deg';
  const countdownStyle = { '--mm-mini-toast-progress': progress, '--mm-mini-toast-width': typeof width === 'number' ? `${width}px` : width } as CSSProperties;

  return <div aria-label={ariaLabel} className={cx('mm-mini-toast', `mm-mini-toast--${position}`, `mm-mini-toast--${size}`, hasCountdown && 'mm-mini-toast--countdown', !showAction && 'mm-mini-toast--countdown-only', closing && 'mm-mini-toast--closing', className)} onAnimationEnd={(event) => { if (closing && event.animationName.startsWith('mm-mini-toast-exit-')) finishClose(); }} style={{ ...style, ...countdownStyle }}>
    <span aria-hidden="true" className="mm-mini-toast__icon">{icon}</span>
    <span className="mm-mini-toast__message">{children}</span>
    {hasCountdown && <span aria-label={`${seconds} seconds remaining`} className="mm-mini-toast__countdown" role="timer"><span>{seconds}</span></span>}
    {showAction && <><span className="mm-mini-toast__divider" aria-hidden="true" /><button aria-label={typeof actionLabel === 'string' ? actionLabel : 'Cancel'} className={cx('mm-mini-toast__action', !actionLabel && 'mm-mini-toast__action--icon-only')} onClick={() => { onAction?.(); close(); }} type="button">
      {actionIcon}{actionLabel && <span>{actionLabel}</span>}
    </button></>}
  </div>;
}

export function MiniToastStack({ children, className, position = 'bottom-right' }: MiniToastStackProps) {
  return <div aria-live="polite" className={cx('mm-mini-toast-stack', `mm-mini-toast-stack--${position}`, className)}>{children}</div>;
}
