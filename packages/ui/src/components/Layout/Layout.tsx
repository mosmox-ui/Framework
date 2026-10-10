import { useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import './Layout.css';

export type LayoutContentPosition = 'top' | 'center' | 'bottom';
export type LayoutContentAlign = 'center' | 'start';
export type LayoutWidthMode = 'full' | 'constrained';
export type LayoutDashboardMode = 'header-sidebar-footer' | 'sidebar-header-footer';
export type LayoutContentWidth = 'full' | 'constrained';

export type LayoutProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: ReactNode;
  contentPosition?: LayoutContentPosition;
  contentAlign?: LayoutContentAlign;
  fullWidth?: boolean;
  widthMode?: LayoutWidthMode;
  maxWidth?: number | string;
  header?: ReactNode;
  footer?: ReactNode;
  stickyHeader?: boolean;
  sidebar?: ReactNode;
  sidebarWidth?: number | string;
  rightSidebar?: ReactNode;
  rightSidebarWidth?: number | string;
  dashboardMode?: LayoutDashboardMode;
  contentWidth?: LayoutContentWidth;
  contentMaxWidth?: number | string;
  sidebarCollapsible?: boolean;
  sidebarToggleLabel?: string;
  defaultSidebarOpen?: boolean;
  sidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
  height?: number | string;
  minHeight?: number | string;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const cssLength = (value: number | string) => typeof value === 'number' ? `${value}px` : value;

export function Layout({
  children,
  contentPosition = 'center',
  contentAlign = 'center',
  fullWidth = true,
  widthMode,
  maxWidth,
  header,
  footer,
  stickyHeader = false,
  sidebar,
  sidebarWidth,
  rightSidebar,
  rightSidebarWidth,
  dashboardMode,
  contentWidth = 'full',
  contentMaxWidth,
  sidebarCollapsible = true,
  sidebarToggleLabel = 'Toggle sidebar',
  defaultSidebarOpen = false,
  sidebarOpen,
  onSidebarOpenChange,
  height,
  minHeight,
  className,
  style,
  ...rest
}: LayoutProps) {
  const layoutStyle = {
    ...style,
    ...(height !== undefined ? { '--mm-layout-height': cssLength(height) } : {}),
    ...(minHeight !== undefined ? { '--mm-layout-min-height': cssLength(minHeight) } : {}),
    ...(height !== undefined && minHeight === undefined ? { '--mm-layout-min-height': '0px' } : {}),
    ...(maxWidth !== undefined ? { '--mm-layout-max-width': cssLength(maxWidth) } : {}),
    ...(sidebarWidth !== undefined ? { '--mm-layout-sidebar-width': cssLength(sidebarWidth) } : {}),
    ...(rightSidebarWidth !== undefined ? { '--mm-layout-right-sidebar-width': cssLength(rightSidebarWidth) } : {}),
    ...(contentMaxWidth !== undefined ? { '--mm-layout-content-max-width': cssLength(contentMaxWidth) } : {}),
  } as CSSProperties;

  const activeWidthMode = widthMode ?? (fullWidth ? 'full' : 'constrained');
  const [internalSidebarOpen, setInternalSidebarOpen] = useState(defaultSidebarOpen);
  const isSidebarOpen = sidebarOpen ?? internalSidebarOpen;
  const toggleSidebar = () => { const next = !isSidebarOpen; if (sidebarOpen === undefined) setInternalSidebarOpen(next); onSidebarOpenChange?.(next); };
  const contentClassName = cx('mm-layout__content-inner', `mm-layout__content-inner--${contentWidth}`, `mm-layout__content-inner--${contentPosition}`, `mm-layout__content-inner--${contentAlign}`);
  const content = <main className="mm-layout__content"><button aria-expanded={isSidebarOpen} aria-label={sidebarToggleLabel} className="mm-layout__sidebar-toggle" onClick={toggleSidebar} type="button">☰</button><div className={contentClassName}>{children}</div></main>;
  const sidebarElement = sidebar !== undefined && <aside className={cx('mm-layout__sidebar', isSidebarOpen && 'mm-layout__sidebar--open')}>{sidebar}</aside>;
  const rightSidebarElement = rightSidebar !== undefined && <aside className="mm-layout__right-sidebar">{rightSidebar}</aside>;
  const dashboard = dashboardMode !== undefined;
  return <div {...rest} className={cx('mm-layout', `mm-layout--${contentPosition}`, `mm-layout--${contentAlign}`, `mm-layout--${activeWidthMode}`, dashboard && 'mm-layout--dashboard', dashboard && `mm-layout--dashboard-${dashboardMode}`, rightSidebar !== undefined && 'mm-layout--has-right-sidebar', !sidebarCollapsible && 'mm-layout--sidebar-always-open', stickyHeader && 'mm-layout--sticky-header', className)} style={layoutStyle}>
    {dashboard ? (dashboardMode === 'header-sidebar-footer' ? <>
      {header !== undefined && <header className="mm-layout__header">{header}</header>}
      <div className="mm-layout__dashboard-body">{sidebarElement}<div className="mm-layout__dashboard-main">{content}</div>{rightSidebarElement}</div>
      {footer !== undefined && <footer className="mm-layout__footer">{footer}</footer>}
    </> : <div className="mm-layout__dashboard-body">{sidebarElement}<div className="mm-layout__dashboard-main">{header !== undefined && <header className="mm-layout__header">{header}</header>}{content}{footer !== undefined && <footer className="mm-layout__footer">{footer}</footer>}</div>{rightSidebarElement}</div>) : <>
      {header !== undefined && <header className="mm-layout__header">{header}</header>}
      {content}
      {footer !== undefined && <footer className="mm-layout__footer">{footer}</footer>}
    </>}
  </div>;
}
