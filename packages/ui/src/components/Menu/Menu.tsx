import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import './Menu.css';

export type MenuSize = 'sm' | 'default' | 'lg';
export type MenuVariant = 'default' | 'compact' | 'filled';

export type MenuItem = {
  key: string;
  label: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  image?: string;
  shortcut?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  checked?: boolean;
  onClick?: () => void;
  submenu?: MenuEntry[];
};

export type MenuContentEntry = { type: 'content'; key?: string; content: ReactNode };
export type MenuEntry = MenuItem | { type: 'divider'; key?: string } | { type: 'label'; key?: string; label: ReactNode } | MenuContentEntry;

export type MenuProps = {
  'aria-label'?: string;
  className?: string;
  closeSubmenusOnMouseLeave?: boolean;
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
  entries: MenuEntry[];
  footer?: ReactNode;
  maxHeight?: number | string;
  onSelect?: (key: string, item: MenuItem) => void;
  onOpenChange?: (keys: string[]) => void;
  openKeys?: string[];
  role?: 'menu' | 'listbox';
  selectable?: boolean;
  selectedKeys?: string[];
  submenuCloseDelay?: number;
  size?: MenuSize;
  variant?: MenuVariant;
  width?: number | string;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const isItem = (entry: MenuEntry): entry is MenuItem => !('type' in entry);

export function Menu({
  'aria-label': ariaLabel = 'Menu', className, closeSubmenusOnMouseLeave = false, defaultSelectedKeys = [], entries, footer, maxHeight, onSelect,
  role = 'menu', selectable = false, selectedKeys: controlledSelectedKeys, size = 'default', submenuCloseDelay = 10000, variant = 'default', width = 280,
  defaultOpenKeys = [], openKeys: controlledOpenKeys, onOpenChange,
}: MenuProps) {
  const id = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const submenuCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedKeys, setSelectedKeys] = useState(defaultSelectedKeys);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [openKeys, setOpenKeys] = useState(defaultOpenKeys);
  const itemIndexes = useMemo(() => entries.map((entry, index) => isItem(entry) && !entry.disabled ? index : -1).filter((index) => index >= 0), [entries]);
  const currentSelectedKeys = controlledSelectedKeys ?? selectedKeys;
  const currentOpenKeys = controlledOpenKeys ?? openKeys;
  const hasSubmenus = entries.some((entry) => isItem(entry) && Boolean(entry.submenu?.length));

  const clearSubmenuCloseTimer = () => {
    if (submenuCloseTimerRef.current !== null) {
      clearTimeout(submenuCloseTimerRef.current);
      submenuCloseTimerRef.current = null;
    }
  };

  const scheduleSubmenuClose = () => {
    clearSubmenuCloseTimer();
    if (!closeSubmenusOnMouseLeave || !hasSubmenus || !currentOpenKeys.length) return;
    submenuCloseTimerRef.current = setTimeout(() => {
      if (controlledOpenKeys === undefined) setOpenKeys([]);
      onOpenChange?.([]);
      submenuCloseTimerRef.current = null;
    }, Math.max(0, submenuCloseDelay));
  };

  useEffect(() => () => clearSubmenuCloseTimer(), []);

  useEffect(() => {
    if (!currentOpenKeys.length) return undefined;
    const handleOutsidePointerDown = (event: globalThis.PointerEvent) => {
      if (menuRef.current?.contains(event.target as Node)) return;
      if (controlledOpenKeys === undefined) setOpenKeys([]);
      onOpenChange?.([]);
    };
    document.addEventListener('pointerdown', handleOutsidePointerDown);
    return () => document.removeEventListener('pointerdown', handleOutsidePointerDown);
  }, [controlledOpenKeys, currentOpenKeys.length, onOpenChange]);

  useEffect(() => {
    if (activeIndex >= 0 && !itemIndexes.includes(activeIndex)) setActiveIndex(-1);
  }, [activeIndex, itemIndexes]);

  const activate = (index: number) => {
    const entry = entries[index];
    if (!entry || !isItem(entry) || entry.disabled) return;
    setActiveIndex(index);
    if (selectable) {
      const next = currentSelectedKeys.includes(entry.key) ? currentSelectedKeys.filter((key) => key !== entry.key) : [...currentSelectedKeys, entry.key];
      if (controlledSelectedKeys === undefined) setSelectedKeys(next);
    }
    entry.onClick?.();
    onSelect?.(entry.key, entry);
  };

  const toggleSubmenu = (key: string) => {
    const next = currentOpenKeys.includes(key) ? currentOpenKeys.filter((itemKey) => itemKey !== key) : [...currentOpenKeys, key];
    if (controlledOpenKeys === undefined) setOpenKeys(next);
    onOpenChange?.(next);
  };

  const renderEntries = (items: MenuEntry[], depth = 0): ReactNode => items.map((entry, index) => {
    if ('type' in entry && entry.type === 'divider') return <div aria-hidden="true" className="mm-menu__divider" key={entry.key ?? `${id}-divider-${depth}-${index}`} />;
    if ('type' in entry && entry.type === 'label') return <div className="mm-menu__label" key={entry.key ?? `${id}-label-${depth}-${index}`}>{entry.label}</div>;
    if ('type' in entry && entry.type === 'content') return <div className="mm-menu__content-entry" key={entry.key ?? `${id}-content-${depth}-${index}`}>{entry.content}</div>;
    if (!isItem(entry)) return null;
    const selected = currentSelectedKeys.includes(entry.key);
    const checked = selected || entry.checked === true;
    const hasSubmenu = Boolean(entry.submenu?.length);
    const open = currentOpenKeys.includes(entry.key);
    const item = <button aria-checked={selectable ? checked : undefined} aria-disabled={entry.disabled || undefined} aria-expanded={hasSubmenu ? open : undefined} aria-haspopup={hasSubmenu ? 'menu' : undefined} className={cx('mm-menu__item', activeIndex === index && depth === 0 && 'mm-menu__item--active', checked && 'mm-menu__item--selected', entry.danger && 'mm-menu__item--danger', entry.disabled && 'mm-menu__item--disabled')} disabled={entry.disabled} key={entry.key} onClick={() => hasSubmenu ? toggleSubmenu(entry.key) : depth === 0 ? activate(index) : (entry.onClick?.(), onSelect?.(entry.key, entry))} onMouseEnter={() => { if (hasSubmenu && !entry.disabled && !open) toggleSubmenu(entry.key); }} role={role === 'listbox' ? 'option' : 'menuitem'} type="button">
      {entry.image ? <img alt="" className="mm-menu__image" src={entry.image} /> : entry.icon ? <span className="mm-menu__icon">{entry.icon}</span> : null}
      <span className="mm-menu__content"><span className="mm-menu__label-text">{entry.label}</span>{entry.description ? <span className="mm-menu__description">{entry.description}</span> : null}</span>
      {entry.shortcut ? <span className="mm-menu__shortcut">{entry.shortcut}</span> : null}
      {hasSubmenu ? <span aria-hidden="true" className="mm-menu__submenu-arrow">›</span> : checked ? <span aria-hidden="true" className="mm-menu__check">✓</span> : null}
    </button>;
    return hasSubmenu ? <div className={cx('mm-menu__submenu-group', open && 'mm-menu__submenu-group--open')} key={entry.key}>{item}{open ? <div className="mm-menu__submenu" role="menu">{renderEntries(entry.submenu ?? [], depth + 1)}</div> : null}</div> : item;
  });

  const move = (direction: 1 | -1) => {
    if (!itemIndexes.length) return;
    const position = itemIndexes.indexOf(activeIndex);
    const nextPosition = position < 0 ? (direction === 1 ? 0 : itemIndexes.length - 1) : (position + direction + itemIndexes.length) % itemIndexes.length;
    setActiveIndex(itemIndexes[nextPosition]);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('.mm-menu__content-entry')) return;
    if (event.key === 'ArrowDown') { event.preventDefault(); move(1); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); move(-1); }
    else if (event.key === 'Home') { event.preventDefault(); setActiveIndex(itemIndexes[0] ?? -1); }
    else if (event.key === 'End') { event.preventDefault(); setActiveIndex(itemIndexes[itemIndexes.length - 1] ?? -1); }
    else if ((event.key === 'Enter' || event.key === ' ') && activeIndex >= 0) { event.preventDefault(); activate(activeIndex); }
  };

  return <div aria-label={ariaLabel} className={cx('mm-menu', `mm-menu--${size}`, `mm-menu--${variant}`, className)} onKeyDown={handleKeyDown} onPointerEnter={clearSubmenuCloseTimer} onPointerLeave={scheduleSubmenuClose} ref={menuRef} role={role} style={{ '--mm-menu-width': typeof width === 'number' ? `${width}px` : width, '--mm-menu-max-height': typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight } as CSSProperties} tabIndex={0}>
    <div className="mm-menu__list">
      {renderEntries(entries)}
    </div>
    {footer ? <div className="mm-menu__footer">{footer}</div> : null}
  </div>;
}
