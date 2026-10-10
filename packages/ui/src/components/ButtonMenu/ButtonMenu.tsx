import { CaretDown, CaretUp } from '../../icons';
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Button, type ButtonProps } from '../Button';
import { useConfig } from '../ConfigProvider';
import { Menu, type MenuEntry, type MenuItem, type MenuProps } from '../Menu';
import './ButtonMenu.css';

export type ButtonMenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

export type ButtonMenuProps = {
  'aria-label'?: string;
  children?: ReactNode;
  className?: string;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnSelect?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  entries: MenuEntry[];
  id?: string;
  matchTriggerWidth?: boolean;
  menuProps?: Omit<MenuProps, 'entries' | 'aria-label' | 'width'>;
  menuWidth?: number | string;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  placement?: ButtonMenuPlacement;
  triggerProps?: Omit<ButtonProps, 'children' | 'iconRight'>;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function ButtonMenu({
  'aria-label': ariaLabel = 'Open menu',
  children = 'Options',
  className,
  closeOnEscape,
  closeOnOutsideClick,
  closeOnSelect,
  defaultOpen = false,
  disabled = false,
  entries,
  id,
  matchTriggerWidth,
  menuProps,
  menuWidth,
  onOpenChange,
  open: controlledOpen,
  placement,
  triggerProps,
}: ButtonMenuProps) {
  const { components } = useConfig();
  const config = components.buttonMenu;
  const effectiveCloseOnEscape = closeOnEscape ?? config?.closeOnEscape ?? true;
  const effectiveCloseOnOutsideClick = closeOnOutsideClick ?? config?.closeOnOutsideClick ?? true;
  const effectiveCloseOnSelect = closeOnSelect ?? config?.closeOnSelect ?? true;
  const effectiveMatchTriggerWidth = matchTriggerWidth ?? config?.matchTriggerWidth ?? false;
  const effectiveMenuWidth = menuWidth ?? config?.menuWidth ?? 280;
  const effectivePlacement = placement ?? config?.placement ?? 'bottom-start';
  const generatedId = useId();
  const menuId = id ?? `mm-button-menu-${generatedId}`;
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = controlledOpen ?? uncontrolledOpen;

  const focusTrigger = () => rootRef.current?.querySelector<HTMLButtonElement>('.mm-button')?.focus();
  const setOpen = (next: boolean, restoreFocus = false) => {
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
    if (!next && restoreFocus) requestAnimationFrame(focusTrigger);
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    const handlePointerDown = (event: globalThis.MouseEvent) => {
      if (effectiveCloseOnOutsideClick && rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (effectiveCloseOnEscape && event.key === 'Escape') {
        event.preventDefault();
        setOpen(false, true);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    requestAnimationFrame(() => menuRef.current?.focus());
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [effectiveCloseOnEscape, effectiveCloseOnOutsideClick, isOpen]);

  const toggle = () => {
    if (disabled || triggerProps?.disabled) return;
    setOpen(!isOpen);
  };

  const handleSelect = (key: string, item: MenuItem) => {
    menuProps?.onSelect?.(key, item);
    if (effectiveCloseOnSelect) setOpen(false, true);
  };

  const style = {
    '--mm-button-menu-width': typeof effectiveMenuWidth === 'number' ? `${effectiveMenuWidth}px` : effectiveMenuWidth,
  } as CSSProperties;

  return (
    <div className={cx('mm-button-menu', `mm-button-menu--${effectivePlacement}`, effectiveMatchTriggerWidth && 'mm-button-menu--match-trigger', className)} ref={rootRef} style={style}>
      <Button
        {...triggerProps}
        aria-controls={isOpen ? menuId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={triggerProps?.['aria-label'] ?? ariaLabel}
        disabled={disabled || triggerProps?.disabled}
        iconRight={isOpen ? <CaretUp aria-hidden="true" /> : <CaretDown aria-hidden="true" />}
        onClick={(event) => { triggerProps?.onClick?.(event); if (!event.defaultPrevented) toggle(); }}
      >
        {children}
      </Button>
      {isOpen ? (
        <div className="mm-button-menu__popover" id={menuId} ref={menuRef}>
          <Menu
            {...menuProps}
            aria-label={ariaLabel}
            entries={entries}
            onSelect={handleSelect}
            width={effectiveMatchTriggerWidth ? '100%' : effectiveMenuWidth}
          />
        </div>
      ) : null}
    </div>
  );
}
