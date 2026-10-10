import { type CSSProperties, type ReactNode } from 'react';
import type { ToastNotificationPosition } from './ToastNotification';
import './ToastNotification.css';

export type ToastNotificationStackProps = {
  children?: ReactNode;
  className?: string;
  maxWidth?: number | string;
  position?: ToastNotificationPosition;
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export function ToastNotificationStack({ children, className, maxWidth, position = 'bottom-right' }: ToastNotificationStackProps) {
  const style = maxWidth === undefined ? undefined : { '--mm-toast-stack-width': typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth } as CSSProperties;
  return <div aria-live="polite" className={cx('mm-toast-stack', `mm-toast-stack--${position}`, className)} style={style}>{children}</div>;
}
