import { WarningCircle, CheckCircle, Warning } from '../../icons';
import { Children, cloneElement, isValidElement, useEffect, useRef, useState, type ReactNode, type ReactElement } from 'react';
import { Dialog } from '../Dialog';
import './Alert.css';

export type AlertVariant = 'neutral' | 'success' | 'warning' | 'danger';
export type AlertPlacement = 'top' | 'center';
export type AlertSize = 'sm' | 'default';
export type AlertExitAnimation = 'none' | 'top' | 'bottom' | 'left' | 'right';

export type AlertProps = {
  'aria-label'?: string;
  children?: ReactNode;
  className?: string;
  confirmIcon?: ReactNode;
  confirmLabel?: ReactNode;
  defaultOpen?: boolean;
  exitAnimation?: AlertExitAnimation;
  icon?: ReactNode;
  id?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  placement?: AlertPlacement;
  size?: AlertSize;
  title?: ReactNode;
  variant?: AlertVariant;
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const forceArrowSquareOuts = (node: ReactNode): ReactNode => Children.map(node, (child) => {
  if (!isValidElement(child)) return child;
  const element = child as ReactElement<{ children?: ReactNode; rel?: string; target?: string }>;
  const nextChildren = element.props.children === undefined ? undefined : forceArrowSquareOuts(element.props.children);
  const nextProps: { children?: ReactNode; rel?: string; target?: string } = {};
  if (nextChildren !== undefined) nextProps.children = nextChildren;
  if (element.type === 'a') {
    nextProps.rel = 'noopener noreferrer';
    nextProps.target = '_blank';
  }
  return cloneElement(element, nextProps);
});

const defaultIcons: Record<AlertVariant, ReactNode> = {
  neutral: null,
  success: <CheckCircle aria-hidden="true" size={20} />,
  warning: <Warning aria-hidden="true" size={20} />,
  danger: <WarningCircle aria-hidden="true" size={20} />,
};

export function Alert({
  'aria-label': ariaLabel,
  children,
  className,
  confirmIcon,
  confirmLabel = 'OK and Close',
  defaultOpen = false,
  exitAnimation = 'none',
  icon,
  id,
  onClose,
  onConfirm,
  onOpenChange,
  open,
  placement = 'top',
  size = 'default',
  title,
  variant = 'neutral',
}: AlertProps) {
  const [visibleOpen, setVisibleOpen] = useState(open ?? defaultOpen);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<number | undefined>(undefined);
  const isControlled = open !== undefined;

  const beginClose = (afterClose?: () => void) => {
    if (isClosing) return;
    if (exitAnimation === 'none') {
      setVisibleOpen(false);
      afterClose?.();
      onOpenChange?.(false);
      onClose?.();
      return;
    }
    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setVisibleOpen(false);
      setIsClosing(false);
      afterClose?.();
      onOpenChange?.(false);
      onClose?.();
    }, 180);
  };

  useEffect(() => () => {
    if (closeTimerRef.current !== undefined) window.clearTimeout(closeTimerRef.current);
  }, []);

  useEffect(() => {
    if (open) {
      if (closeTimerRef.current !== undefined) window.clearTimeout(closeTimerRef.current);
      if (!visibleOpen) setVisibleOpen(true);
      if (isClosing) setIsClosing(false);
    } else if (isControlled && open === false && visibleOpen && !isClosing) {
      beginClose();
    }
  }, [isControlled, isClosing, open, visibleOpen]);

  const handleConfirm = () => {
    beginClose(onConfirm);
  };

  return <Dialog
    aria-label={ariaLabel}
    actions={{ align: 'center', cancel: false, confirm: { icon: confirmIcon, label: confirmLabel, onClick: handleConfirm, size: size === 'sm' ? 'sm' : undefined, variant: 'dashed' } }}
    className={cx('mm-alert', `mm-alert--${variant}`, `mm-alert--${size}`, isClosing && `mm-alert--exit-${exitAnimation}`, className)}
    closeButton={false}
    closeOnEscape={false}
    closeOnOverlayClick={false}
    defaultOpen={defaultOpen}
    id={id}
    modal
    onClose={onClose}
    onOpenChange={(nextOpen) => { if (!nextOpen) beginClose(); else onOpenChange?.(true); }}
    open={visibleOpen}
    placement={placement}
    size={size === 'sm' ? 'sm' : 'default'}
    title={title}
    titleIcon={icon !== undefined ? icon : defaultIcons[variant]}
  >
    {forceArrowSquareOuts(children)}
  </Dialog>;
}
