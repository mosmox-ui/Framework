import { WarningCircle, CheckCircle, Info, Warning, X } from '../../icons';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from '../Button';
import './AlertInline.css';

export type AlertInlineVariant = 'neutral' | 'success' | 'warning' | 'danger';
export type AlertInlineSize = 'sm' | 'default';
export type AlertInlineDismissMode = 'icon' | 'button';
export type AlertInlineExitAnimation = 'none' | 'top' | 'bottom' | 'left' | 'right';

export type AlertInlineProps = {
  'aria-label'?: string;
  children?: ReactNode;
  className?: string;
  closeLabel?: string;
  defaultOpen?: boolean;
  dismissIcon?: ReactNode;
  dismissLabel?: ReactNode;
  dismissMode?: AlertInlineDismissMode;
  fullWidth?: boolean;
  icon?: ReactNode;
  exitAnimation?: AlertInlineExitAnimation;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  size?: AlertInlineSize;
  title?: ReactNode;
  variant?: AlertInlineVariant;
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const defaultIcons: Record<AlertInlineVariant, ReactNode> = {
  neutral: <Info aria-hidden="true" size={18} />,
  success: <CheckCircle aria-hidden="true" size={18} />,
  warning: <Warning aria-hidden="true" size={18} />,
  danger: <WarningCircle aria-hidden="true" size={18} />,
};

export function AlertInline({
  'aria-label': ariaLabel,
  children,
  className,
  closeLabel = 'Close alert',
  defaultOpen = true,
  dismissIcon,
  dismissLabel = 'OK and Close',
  dismissMode = 'icon',
  exitAnimation = 'none',
  fullWidth = false,
  icon,
  onClose,
  onOpenChange,
  open: controlledOpen,
  size = 'default',
  title,
  variant = 'neutral',
}: AlertInlineProps) {
  const isControlled = controlledOpen !== undefined;
  const [visibleOpen, setVisibleOpen] = useState(controlledOpen ?? defaultOpen);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<number | undefined>();

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== undefined) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const finishClose = () => {
    setVisibleOpen(false);
    setIsClosing(false);
    onOpenChange?.(false);
    onClose?.();
  };

  const close = () => {
    if (isClosing) return;
    if (exitAnimation === 'none') {
      finishClose();
      return;
    }
    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(finishClose, 180);
  };

  useEffect(() => {
    if (controlledOpen) {
      if (closeTimerRef.current !== undefined) window.clearTimeout(closeTimerRef.current);
      if (!visibleOpen) setVisibleOpen(true);
      if (isClosing) setIsClosing(false);
    } else if (isControlled && controlledOpen === false && visibleOpen && !isClosing) {
      close();
    }
  }, [controlledOpen, isClosing, isControlled, visibleOpen]);

  if (!visibleOpen) return null;

  return <div aria-atomic="true" aria-label={ariaLabel} className={cx('mm-alert-inline', `mm-alert-inline--${variant}`, `mm-alert-inline--${size}`, fullWidth && 'mm-alert-inline--full-width', `mm-alert-inline--dismiss-${dismissMode}`, isClosing && `mm-alert-inline--exit-${exitAnimation}`, className)} role="alert">
    <span aria-hidden="true" className="mm-alert-inline__icon">{icon !== undefined ? icon : defaultIcons[variant]}</span>
    <div className="mm-alert-inline__body">
      {title && <div className="mm-alert-inline__title">{title}</div>}
      {children && <div className="mm-alert-inline__content">{children}</div>}
      {dismissMode === 'button' && <Button className="mm-alert-inline__action" iconLeft={dismissIcon} onClick={close} size="sm" variant="dashed">{dismissLabel}</Button>}
    </div>
    {dismissMode === 'icon' && <Button aria-label={closeLabel} className="mm-alert-inline__close" iconOnly iconLeft={<X aria-hidden="true" size={size === 'sm' ? 14 : 16} />} onClick={close} size="xs" variant="text" />}
  </div>;
}
