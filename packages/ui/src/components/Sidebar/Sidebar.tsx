import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import './Sidebar.css';

export type SidebarContentPosition = 'top' | 'center' | 'bottom';
export type SidebarSize = 'sm' | 'default' | 'lg';
export type SidebarVariant = 'plain' | 'bordered' | 'soft';

export type SidebarProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  contentPosition?: SidebarContentPosition;
  size?: SidebarSize;
  variant?: SidebarVariant;
  width?: number | string;
  minHeight?: number | string;
  fullHeight?: boolean;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const cssLength = (value: number | string) => typeof value === 'number' ? `${value}px` : value;

export function Sidebar({
  children, header, footer, contentPosition = 'top', size = 'default', variant = 'plain', width = '100%', minHeight = '100%', fullHeight = true, className, style, ...rest
}: SidebarProps) {
  const sidebarStyle = {
    ...style,
    '--mm-sidebar-width': cssLength(width),
    '--mm-sidebar-min-height': cssLength(minHeight),
  } as CSSProperties;
  return <aside {...rest} className={cx('mm-sidebar', `mm-sidebar--${size}`, `mm-sidebar--${variant}`, `mm-sidebar--content-${contentPosition}`, fullHeight && 'mm-sidebar--full-height', className)} style={sidebarStyle}>
    {header !== undefined ? <header className="mm-sidebar__header">{header}</header> : null}
    <div className="mm-sidebar__content">{children}</div>
    {footer !== undefined ? <footer className="mm-sidebar__footer">{footer}</footer> : null}
  </aside>;
}
