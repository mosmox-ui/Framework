import { Fragment, useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { CaretDown, CaretRight } from '../../icons';
import { useConfig } from '../ConfigProvider';
import { Tooltip } from '../Tooltip';
import './NavigationMenu.css';

export type NavigationMenuOrientation = 'horizontal' | 'vertical';
export type NavigationMenuSize = 'xs' | 'sm' | 'default' | 'lg';
export type NavigationMenuVariant = 'plain' | 'soft';
export type NavigationMenuSubmenuBehavior = 'click' | 'hover';

export type NavigationMenuMegaGroup = {
  key?: string;
  label?: ReactNode;
  items: NavigationMenuItem[];
};

export type NavigationMenuMegaAside = {
  side: 'left' | 'right';
  width: number | string;
  backgroundColor?: string;
  content: ReactNode;
};

export type NavigationMenuGroup = {
  key?: string;
  label: ReactNode;
  items: NavigationMenuItem[];
};

export type NavigationMenuItem = {
  key: string;
  label: ReactNode;
  href?: string;
  icon?: ReactNode;
  iconSize?: number | string;
  image?: string;
  imageAspectRatio?: number | string;
  imageShape?: 'square' | 'circle';
  badge?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  external?: boolean;
  onClick?: (item: NavigationMenuItem) => void;
  children?: NavigationMenuItem[];
  megaMenu?: NavigationMenuMegaGroup[];
  megaMenuFullWidth?: boolean;
  megaMenuAside?: NavigationMenuMegaAside;
  megaMenuFooter?: ReactNode;
};

export type NavigationMenuProps = {
  'aria-label'?: string;
  className?: string;
  closeSubmenusOnMouseLeave?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  collapseBreakpoint?: number;
  collapsedWidth?: number | string;
  onCollapsedChange?: (collapsed: boolean) => void;
  items?: NavigationMenuItem[];
  groups?: NavigationMenuGroup[];
  separator?: ReactNode;
  gap?: number | string;
  orientation?: NavigationMenuOrientation;
  size?: NavigationMenuSize;
  variant?: NavigationMenuVariant;
  activeKey?: string;
  defaultActiveKey?: string;
  openKeys?: string[];
  defaultOpenKeys?: string[];
  onActiveChange?: (key: string, item: NavigationMenuItem) => void;
  onOpenChange?: (keys: string[]) => void;
  onItemClick?: (key: string, item: NavigationMenuItem) => void;
  submenuBehavior?: NavigationMenuSubmenuBehavior;
  submenuCloseDelay?: number;
  collapseSubmenus?: boolean;
  wrap?: boolean;
  fullWidth?: boolean;
  maxHeight?: number | string;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const hasChildren = (item: NavigationMenuItem) => Boolean(item.children?.length);
const hasMegaMenu = (item: NavigationMenuItem) => Boolean(item.megaMenu?.length);

export function NavigationMenu({
  'aria-label': ariaLabel = 'Primary navigation', className, closeSubmenusOnMouseLeave: propCloseSubmenusOnMouseLeave, collapsed: controlledCollapsed, defaultCollapsed = false, collapseBreakpoint, collapsedWidth = 32, onCollapsedChange, items, separator, gap: propGap, orientation: propOrientation,
  size: propSize, variant: propVariant, activeKey: controlledActiveKey, defaultActiveKey,
  openKeys: controlledOpenKeys, defaultOpenKeys = [], onActiveChange, onOpenChange, onItemClick,
  submenuBehavior: propSubmenuBehavior, submenuCloseDelay: propSubmenuCloseDelay, collapseSubmenus: propCollapseSubmenus, wrap = false, fullWidth = false, maxHeight, groups,
}: NavigationMenuProps) {
  const id = useId();
  const { components } = useConfig();
  const config = components.navigationMenu;
  const orientation = propOrientation ?? config?.orientation ?? 'horizontal';
  const size = propSize ?? config?.size ?? 'default';
  const variant = propVariant ?? config?.variant ?? 'plain';
  const gap = propGap ?? config?.gap;
  const submenuBehavior = propSubmenuBehavior ?? config?.submenuBehavior ?? 'hover';
  const closeSubmenusOnMouseLeave = propCloseSubmenusOnMouseLeave ?? config?.closeSubmenusOnMouseLeave ?? true;
  const submenuCloseDelay = propSubmenuCloseDelay ?? config?.submenuCloseDelay ?? 10;
  const collapseSubmenus = propCollapseSubmenus ?? config?.collapseSubmenus ?? false;
  const [activeKey, setActiveKey] = useState(defaultActiveKey);
  const [openKeys, setOpenKeys] = useState(defaultOpenKeys);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const navigationRef = useRef<HTMLElement>(null);
  const submenuCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentActiveKey = controlledActiveKey ?? activeKey;
  const currentOpenKeys = controlledOpenKeys ?? openKeys;
  const currentCollapsed = controlledCollapsed ?? collapsed;

  useEffect(() => {
    if (controlledCollapsed !== undefined || collapseBreakpoint === undefined || !navigationRef.current) return undefined;
    const resizeTarget = navigationRef.current.parentElement ?? navigationRef.current;
    const observer = new ResizeObserver(([entry]) => {
      const next = entry.contentRect.width <= collapseBreakpoint;
      setCollapsed((previous) => {
        if (previous !== next) onCollapsedChange?.(next);
        return next;
      });
    });
    observer.observe(resizeTarget);
    return () => observer.disconnect();
  }, [collapseBreakpoint, controlledCollapsed, onCollapsedChange]);

  const clearSubmenuCloseTimer = () => {
    if (submenuCloseTimerRef.current !== null) {
      clearTimeout(submenuCloseTimerRef.current);
      submenuCloseTimerRef.current = null;
    }
  };

  const scheduleSubmenuClose = () => {
    clearSubmenuCloseTimer();
    if (!closeSubmenusOnMouseLeave || !currentOpenKeys.length) return;
    submenuCloseTimerRef.current = setTimeout(() => {
      if (controlledOpenKeys === undefined) setOpenKeys([]);
      onOpenChange?.([]);
      submenuCloseTimerRef.current = null;
    }, Math.max(0, submenuCloseDelay) * 1000);
  };

  useEffect(() => () => clearSubmenuCloseTimer(), []);

  const resolvedItems = items ?? [];
  const verticalGroups = orientation === 'vertical' && Boolean(groups?.length);
  const groupedItems = groups ?? [];
  const allItems = verticalGroups ? groupedItems.flatMap((group) => group.items) : resolvedItems;

  useEffect(() => {
    if (currentActiveKey && !findItem(allItems, currentActiveKey)) setActiveKey(undefined);
  }, [allItems, currentActiveKey]);

  useEffect(() => {
    if (!currentOpenKeys.length) return undefined;
    const handlePointerDown = (event: PointerEvent) => {
      if (!navigationRef.current?.contains(event.target as Node)) {
        if (controlledOpenKeys === undefined) setOpenKeys([]);
        onOpenChange?.([]);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [controlledOpenKeys, currentOpenKeys, onOpenChange]);

  const updateOpen = (key: string, open: boolean) => {
    const next = open ? [...currentOpenKeys.filter((itemKey) => itemKey !== key), key] : currentOpenKeys.filter((itemKey) => itemKey !== key);
    if (controlledOpenKeys === undefined) setOpenKeys(next);
    onOpenChange?.(next);
  };

  const activate = (item: NavigationMenuItem) => {
    if (item.disabled) return;
    if (controlledActiveKey === undefined) setActiveKey(item.key);
    item.onClick?.(item);
    onItemClick?.(item.key, item);
    onActiveChange?.(item.key, item);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>('[data-navigation-key]:not([aria-disabled="true"])'));
    const current = document.activeElement as HTMLAnchorElement | null;
    const index = current ? links.indexOf(current) : -1;
    const forward = orientation === 'horizontal' ? event.key === 'ArrowRight' : event.key === 'ArrowDown';
    const backward = orientation === 'horizontal' ? event.key === 'ArrowLeft' : event.key === 'ArrowUp';
    if (forward || backward) { event.preventDefault(); links[(index + (forward ? 1 : -1) + links.length) % links.length]?.focus(); }
    else if (event.key === 'House') { event.preventDefault(); links[0]?.focus(); }
    else if (event.key === 'End') { event.preventDefault(); links[links.length - 1]?.focus(); }
    else if (event.key === 'Escape' && currentOpenKeys.length) { event.preventDefault(); currentOpenKeys.forEach((key) => updateOpen(key, false)); }
  };

  const renderMegaMenu = (groups: NavigationMenuMegaGroup[], fullWidth = false, aside?: NavigationMenuMegaAside, footer?: ReactNode): ReactNode => <div aria-label="Mega menu" className={cx('mm-navigation-menu__mega-menu', fullWidth && 'mm-navigation-menu__mega-menu--full-width')} role="menu"><div className="mm-navigation-menu__mega-body">{aside?.side === 'left' ? <aside className="mm-navigation-menu__mega-aside" style={{ backgroundColor: aside.backgroundColor ?? 'var(--mm-color-control-filled)', width: typeof aside.width === 'number' ? `${aside.width}px` : aside.width }}>{aside.content}</aside> : null}<div className="mm-navigation-menu__mega-content">{groups.map((group, groupIndex) => <div className="mm-navigation-menu__mega-group" key={group.key ?? `mega-group-${groupIndex}`}>{group.label ? <div className="mm-navigation-menu__mega-heading">{group.label}</div> : null}{group.items.map((item) => <a aria-disabled={item.disabled || undefined} className={cx('mm-navigation-menu__item', 'mm-navigation-menu__link', 'mm-navigation-menu__mega-item', item.disabled && 'mm-navigation-menu__item--disabled')} data-navigation-key={item.key} href={item.href ?? '#'} key={item.key} onClick={(event) => { if (item.disabled || !item.href) event.preventDefault(); if (!item.disabled) activate(item); }} rel={item.external ? 'noreferrer' : undefined} tabIndex={item.disabled ? -1 : undefined} target={item.external ? '_blank' : undefined}>{item.image ? <img alt="" className={cx('mm-navigation-menu__image', item.imageShape === 'circle' && 'mm-navigation-menu__image--circle')} src={item.image} style={{ aspectRatio: item.imageShape === 'circle' ? '1' : item.imageAspectRatio }} /> : item.icon ? <span className="mm-navigation-menu__icon" style={{ '--mm-navigation-menu-icon-size': typeof item.iconSize === 'number' ? `${item.iconSize}px` : item.iconSize } as CSSProperties}>{item.icon}</span> : null}<span className="mm-navigation-menu__content"><span className="mm-navigation-menu__label">{item.label}</span>{item.description ? <span className="mm-navigation-menu__description">{item.description}</span> : null}</span>{item.badge ? <span className="mm-navigation-menu__badge">{item.badge}</span> : null}</a>)}</div>)}</div>{aside?.side === 'right' ? <aside className="mm-navigation-menu__mega-aside" style={{ backgroundColor: aside.backgroundColor ?? 'var(--mm-color-control-filled)', width: typeof aside.width === 'number' ? `${aside.width}px` : aside.width }}>{aside.content}</aside> : null}</div>{footer ? <div className="mm-navigation-menu__mega-footer">{footer}</div> : null}</div>;

  const renderItems = (entries: NavigationMenuItem[], depth = 1): ReactNode => entries.map((item, index) => {
    const mega = depth === 1 && hasMegaMenu(item);
    const nested = (hasChildren(item) || mega) && depth < 3;
    const open = currentOpenKeys.includes(item.key);
    const active = currentActiveKey === item.key || Boolean(item.children?.some((child) => containsKey(child, currentActiveKey)));
    const handleItemClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (item.disabled || nested || !item.href) event.preventDefault();
      if (item.disabled) return;
      if (nested) updateOpen(item.key, !open);
      else activate(item);
    };
    const itemLabel = typeof item.label === 'string' ? item.label : undefined;
    const content = <a aria-current={active && !nested ? 'page' : undefined} aria-disabled={item.disabled || undefined} aria-expanded={nested ? open : undefined} aria-haspopup={nested ? 'menu' : undefined} aria-label={currentCollapsed ? itemLabel : undefined} className={cx('mm-navigation-menu__item', 'mm-navigation-menu__link', active && 'mm-navigation-menu__item--active', item.disabled && 'mm-navigation-menu__item--disabled')} data-navigation-key={item.key} href={item.href ?? '#'} onClick={handleItemClick} onMouseEnter={() => { if (submenuBehavior === 'hover' && nested) updateOpen(item.key, true); }} rel={item.external ? 'noreferrer' : undefined} tabIndex={item.disabled ? -1 : undefined} target={item.external ? '_blank' : undefined}>{item.icon ? <span className="mm-navigation-menu__icon">{item.icon}</span> : null}<span className="mm-navigation-menu__content"><span className="mm-navigation-menu__label">{item.label}</span>{item.description ? <span className="mm-navigation-menu__description">{item.description}</span> : null}</span>{item.badge ? <span className="mm-navigation-menu__badge">{item.badge}</span> : null}{nested ? <span aria-hidden="true" className="mm-navigation-menu__arrow">{orientation === 'horizontal' || depth > 1 ? <CaretDown size={14} /> : <CaretRight size={14} />}</span> : null}</a>;
    const renderedContent = currentCollapsed && itemLabel ? <Tooltip aria-label={itemLabel} content={itemLabel} placement="right" variant="dark">{content}</Tooltip> : content;
    return <Fragment key={`${id}-${item.key}`}>{separator && index > 0 ? <span aria-hidden="true" className="mm-navigation-menu__separator">{separator}</span> : null}<div className={cx('mm-navigation-menu__group', open && 'mm-navigation-menu__group--open', mega && item.megaMenuFullWidth && 'mm-navigation-menu__group--mega-full-width')}>{renderedContent}{nested && open ? (mega ? renderMegaMenu(item.megaMenu ?? [], item.megaMenuFullWidth, item.megaMenuAside, item.megaMenuFooter) : <div aria-label={`${String(item.label)} submenu`} className="mm-navigation-menu__submenu" role="menu">{renderItems(item.children ?? [], depth + 1)}</div>) : null}</div></Fragment>;
  });

  const renderSections = () => {
    if (!verticalGroups) return renderItems(resolvedItems);
    return groupedItems.map((group, index) => <Fragment key={group.key ?? `${id}-navigation-group-${index}`}>
      {index > 0 ? <span aria-hidden="true" className="mm-navigation-menu__group-separator" /> : null}
      <div aria-label={typeof group.label === 'string' ? group.label : undefined} className="mm-navigation-menu__section">
        <div aria-hidden={currentCollapsed || undefined} className="mm-navigation-menu__section-heading">{group.label}</div>
        {renderItems(group.items)}
      </div>
    </Fragment>);
  };

  return <nav ref={navigationRef} aria-label={ariaLabel} className={cx('mm-navigation-menu', `mm-navigation-menu--${orientation}`, `mm-navigation-menu--${size}`, `mm-navigation-menu--${variant}`, currentCollapsed && 'mm-navigation-menu--collapsed', verticalGroups && 'mm-navigation-menu--grouped', wrap && 'mm-navigation-menu--wrap', fullWidth && 'mm-navigation-menu--full-width', collapseSubmenus && 'mm-navigation-menu--collapse-submenus', maxHeight !== undefined && 'mm-navigation-menu--scrollable', className)} onKeyDown={handleKeyDown} onMouseEnter={clearSubmenuCloseTimer} onMouseLeave={scheduleSubmenuClose} style={{ '--mm-navigation-menu-collapsed-width': typeof collapsedWidth === 'number' ? `${collapsedWidth}px` : collapsedWidth, '--mm-navigation-menu-max-height': typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight, '--mm-navigation-menu-gap': typeof gap === 'number' ? `${gap}px` : gap } as CSSProperties}><div className="mm-navigation-menu__list" role="menubar">{renderSections()}</div></nav>;
}

function findItem(items: NavigationMenuItem[], key: string): NavigationMenuItem | undefined { for (const item of items) { if (item.key === key) return item; const found = item.children && findItem(item.children, key); if (found) return found; } return undefined; }
function containsKey(item: NavigationMenuItem, key: string | undefined): boolean { return item.key === key || Boolean(item.children?.some((child) => containsKey(child, key))); }
