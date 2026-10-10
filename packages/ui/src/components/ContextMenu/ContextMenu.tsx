import { createPortal } from 'react-dom';
import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { Menu, type MenuEntry, type MenuItem, type MenuProps } from '../Menu';
import './ContextMenu.css';

export type ContextMenuPosition = { x: number; y: number };

export type ContextMenuProps = {
  'aria-label'?: string;
  children: ReactNode;
  className?: string;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnSelect?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  entries: MenuEntry[];
  id?: string;
  menuProps?: Omit<MenuProps, 'aria-label' | 'entries' | 'onSelect' | 'width'>;
  menuWidth?: number | string;
  offset?: number;
  onOpenChange?: (open: boolean, position?: ContextMenuPosition) => void;
  onSelect?: (key: string, item: MenuItem) => void;
  open?: boolean;
  position?: ContextMenuPosition;
  preventDefault?: boolean;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function ContextMenu({
  'aria-label': ariaLabel = 'Context menu',
  children,
  className,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  closeOnSelect = true,
  defaultOpen = false,
  disabled = false,
  entries,
  id,
  menuProps,
  menuWidth = 280,
  offset = 4,
  onOpenChange,
  onSelect,
  open: controlledOpen,
  position: controlledPosition,
  preventDefault = true,
}: ContextMenuProps) {
  const generatedId = useId();
  const menuId = id ?? `mm-context-menu-${generatedId}`;
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [internalPosition, setInternalPosition] = useState<ContextMenuPosition>({ x: 0, y: 0 });
  const [menuPosition, setMenuPosition] = useState<ContextMenuPosition>({ x: 0, y: 0 });
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const position = controlledPosition ?? internalPosition;

  const setOpen = (next: boolean, nextPosition = position) => {
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next, nextPosition);
  };

  const openAt = (nextPosition: ContextMenuPosition) => {
    if (disabled) return;
    setInternalPosition(nextPosition);
    setOpen(true, nextPosition);
  };

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (preventDefault) event.preventDefault();
    openAt({ x: event.clientX, y: event.clientY });
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled || (event.key !== 'F10' || !event.shiftKey) && event.key !== 'ContextMenu') return;
    event.preventDefault();
    const bounds = triggerRef.current?.getBoundingClientRect();
    openAt({ x: bounds?.left ?? 0, y: bounds ? bounds.bottom : 0 });
  };

  useLayoutEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    const x = Math.max(8, Math.min(position.x + offset, window.innerWidth - rect.width - 8));
    const y = Math.max(8, Math.min(position.y + offset, window.innerHeight - rect.height - 8));
    setMenuPosition({ x, y });
  }, [isOpen, menuWidth, offset, position, entries.length]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handlePointerDown = (event: globalThis.MouseEvent) => {
      if (closeOnOutsideClick && menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>('.mm-menu')?.focus());
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeOnEscape, closeOnOutsideClick, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnScroll = () => setOpen(false);
    window.addEventListener('scroll', closeOnScroll, true);
    return () => window.removeEventListener('scroll', closeOnScroll, true);
  }, [isOpen]);

  const handleSelect = (key: string, item: MenuItem) => {
    onSelect?.(key, item);
    if (closeOnSelect) setOpen(false);
  };

  const menuStyle = {
    left: `${menuPosition.x}px`,
    top: `${menuPosition.y}px`,
    '--mm-context-menu-width': typeof menuWidth === 'number' ? `${menuWidth}px` : menuWidth,
  } as CSSProperties;

  return <div aria-expanded={isOpen} aria-haspopup="menu" className={cx('mm-context-menu', disabled && 'mm-context-menu--disabled', className)} onContextMenu={handleContextMenu} onKeyDown={handleTriggerKeyDown} ref={triggerRef} tabIndex={disabled ? -1 : 0}>
    {children}
    {isOpen && createPortal(<div className="mm-context-menu__popover" id={menuId} ref={menuRef} style={menuStyle}><Menu {...menuProps} aria-label={ariaLabel} entries={entries} onSelect={handleSelect} width={menuWidth} /></div>, document.body)}
  </div>;
}
