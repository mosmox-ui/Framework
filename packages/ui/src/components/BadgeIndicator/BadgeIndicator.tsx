import type { ReactNode } from 'react';
import { Badge, type BadgeProps } from '../Badge';
import './BadgeIndicator.css';

export type BadgeIndicatorPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export type BadgeIndicatorProps = Omit<BadgeProps, 'children' | 'className'> & {
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
  hidden?: boolean;
  pulse?: boolean;
  position?: BadgeIndicatorPosition;
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export function BadgeIndicator({
  badge,
  children,
  className,
  hidden = false,
  pulse = false,
  position = 'top-right',
  ...badgeProps
}: BadgeIndicatorProps) {
  const hasBadge = badge !== undefined || badgeProps.dot || badgeProps.count !== undefined;

  return <span className={cx('mm-badge-indicator', className)}>
    {children}
    {!hidden && hasBadge && <span className={cx('mm-badge-indicator__badge', `mm-badge-indicator__badge--${position}`, pulse && 'mm-badge-indicator__badge--pulse')}>
      {badge ?? <Badge {...badgeProps} />}
    </span>}
  </span>;
}
