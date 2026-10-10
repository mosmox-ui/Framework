import { createContext, forwardRef, useContext, useEffect, useId, useImperativeHandle, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react';
import { CaretDown, CaretUp, DotsSixVertical } from '../../icons';
import { Button, type ButtonProps, type ButtonVariant } from '../Button';
import { useConfig } from '../ConfigProvider';
import { Menu, type MenuEntry, type MenuSize, type MenuVariant } from '../Menu';
import { Tooltip, type TooltipPlacement, type TooltipSize, type TooltipVariant } from '../Tooltip';
import './Toolbar.css';

export type ToolbarOrientation = 'horizontal' | 'vertical';
export type ToolbarSize = 'sm' | 'default';
export type ToolbarVariant = 'surface' | 'bordered' | 'floating' | 'plain' | ButtonVariant;
export type ToolbarDensity = 'compact' | 'comfortable';
export type ToolbarPosition = { top: number | string; left: number | string };

export type ToolbarProps = {
  children: ReactNode;
  'aria-label'?: string;
  className?: string;
  density?: ToolbarDensity;
  disabled?: boolean;
  draggable?: boolean;
  fullWidth?: boolean;
  floating?: boolean;
  columns?: number;
  rows?: number;
  iconOnly?: boolean;
  initialPosition?: ToolbarPosition;
  style?: CSSProperties;
  title?: ReactNode;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  orientation?: ToolbarOrientation;
  rovingFocus?: boolean;
  size?: ToolbarSize;
  sticky?: boolean;
  variant?: ToolbarVariant;
  wrap?: boolean;
};

export type ToolbarTooltipProps = { tooltip?: ReactNode; tooltipCloseDelay?: number; tooltipOpenDelay?: number; tooltipPlacement?: TooltipPlacement; tooltipSize?: TooltipSize; tooltipVariant?: TooltipVariant };
export type ToolbarItemProps = Omit<ButtonProps, 'size'> & ToolbarTooltipProps & { size?: ToolbarSize };
export type ToolbarGroupProps = { children: ReactNode; 'aria-label'?: string; className?: string };
export type ToolbarSeparatorProps = { orientation?: ToolbarOrientation; className?: string };
export type ToolbarMenuProps = Omit<ToolbarItemProps, 'children' | 'iconRight'> & {
  label: ReactNode;
  entries: MenuEntry[];
  menuAriaLabel?: string;
  menuMaxHeight?: number | string;
  menuSize?: MenuSize;
  menuVariant?: MenuVariant;
  menuWidth?: number | string;
  onMenuSelect?: (key: string) => void;
};

type ToolbarContextValue = { disabled: boolean; iconOnly: boolean; openMenuKey: string | null; orientation: ToolbarOrientation; setOpenMenuKey: (key: string | null) => void; size: ToolbarSize };
const ToolbarContext = createContext<ToolbarContextValue>({ disabled: false, iconOnly: false, openMenuKey: null, orientation: 'horizontal', setOpenMenuKey: () => undefined, size: 'default' });
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

function ToolbarItem({ className, disabled, hoverScale, size, variant, ...props }: ToolbarItemProps) {
  const context = useContext(ToolbarContext);
  const resolvedSize = size ?? context.size;
  const buttonSize = resolvedSize;
  const { tooltip, tooltipCloseDelay, tooltipOpenDelay, tooltipPlacement, tooltipSize, tooltipVariant, ...buttonProps } = props;
  const button = <Button {...buttonProps} data-mm-toolbar-item="true" className={cx('mm-toolbar__item', className)} disabled={context.disabled || disabled} hoverScale={hoverScale ?? true} iconOnly={context.iconOnly || props.iconOnly} size={buttonSize} title={typeof tooltip === 'string' ? tooltip : buttonProps.title} variant={variant ?? 'text'} />;
  return tooltip === undefined ? button : <Tooltip closeDelay={tooltipCloseDelay} content={tooltip} openDelay={tooltipOpenDelay ?? 0} placement={tooltipPlacement} size={tooltipSize} variant={tooltipVariant}>{button}</Tooltip>;
}

function ToolbarGroup({ children, 'aria-label': ariaLabel, className }: ToolbarGroupProps) {
  return <div aria-label={ariaLabel} className={cx('mm-toolbar__group', className)} role="group">{children}</div>;
}

function ToolbarSeparator({ orientation = 'horizontal', className }: ToolbarSeparatorProps) {
  return <span aria-hidden="true" className={cx('mm-toolbar__separator', `mm-toolbar__separator--${orientation}`, className)} />;
}

function ToolbarMenu({ className, disabled, entries, label, menuAriaLabel, menuMaxHeight, menuSize = 'default', menuVariant = 'default', menuWidth = 240, onClick, onMenuSelect, size, tooltip, tooltipCloseDelay, tooltipOpenDelay, tooltipPlacement, tooltipSize, tooltipVariant, variant, ...props }: ToolbarMenuProps) {
  const context = useContext(ToolbarContext);
  const menuKey = useId();
  const open = context.openMenuKey === menuKey;
  const resolvedSize = size ?? context.size;
  const button = <Button {...props} aria-expanded={open} aria-haspopup="menu" className={cx('mm-toolbar__item', className)} disabled={context.disabled || disabled} hoverScale={false} iconRight={<CaretDown aria-hidden="true" size={14} />} onClick={(event) => { onClick?.(event); context.setOpenMenuKey(open ? null : menuKey); }} size={resolvedSize} title={typeof tooltip === 'string' ? tooltip : props.title} variant={variant ?? 'text'}>{label}</Button>;
  return <div className="mm-toolbar__menu">
    {tooltip === undefined ? button : <Tooltip closeDelay={tooltipCloseDelay} content={tooltip} openDelay={tooltipOpenDelay ?? 0} placement={tooltipPlacement} size={tooltipSize} variant={tooltipVariant}>{button}</Tooltip>}
    {open ? <div className="mm-toolbar__menu-popover"><Menu aria-label={menuAriaLabel ?? `${String(label)} menu`} entries={entries} maxHeight={menuMaxHeight} onSelect={(key) => { onMenuSelect?.(key); context.setOpenMenuKey(null); }} size={menuSize} variant={menuVariant} width={menuWidth} /></div> : null}
  </div>;
}

function ToolbarSpacer() {
  return <span aria-hidden="true" className="mm-toolbar__spacer" />;
}

const ToolbarRoot = forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar({ children, 'aria-label': ariaLabel = 'Toolbar', className, collapsed, collapsible = false, columns, defaultCollapsed = false, density, disabled = false, draggable = false, floating = false, fullWidth = false, iconOnly = false, initialPosition, onCollapsedChange, orientation, rovingFocus = true, rows, size, sticky = false, title, variant, wrap = false, style, ...props }, ref) {
  const { components } = useConfig();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<ToolbarPosition>(initialPosition ?? { top: 24, left: 24 });
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startY: number; startLeft: number; startTop: number } | null>(null);
  const resolvedOrientation = orientation ?? components.toolbar?.orientation ?? 'horizontal';
  const resolvedSize = size ?? components.toolbar?.size ?? 'default';
  const resolvedVariant = variant ?? components.toolbar?.variant ?? 'surface';
  const resolvedDensity = density ?? components.toolbar?.density ?? 'comfortable';
  const resolvedColumns = columns && Math.max(1, Math.floor(columns));
  const resolvedRows = rows && Math.max(1, Math.floor(rows));
  const canDrag = floating && draggable;
  const isCollapsed = collapsed ?? internalCollapsed;
  const showHeader = floating && (title !== undefined || draggable || collapsible);
  useImperativeHandle(ref, () => toolbarRef.current as HTMLDivElement, []);
  useEffect(() => {
    if (!openMenuKey) return undefined;
    const handleOutsidePointerDown = (event: globalThis.PointerEvent) => {
      if (!toolbarRef.current?.contains(event.target as Node)) setOpenMenuKey(null);
    };
    document.addEventListener('pointerdown', handleOutsidePointerDown);
    return () => document.removeEventListener('pointerdown', handleOutsidePointerDown);
  }, [openMenuKey]);
  const moveFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!rovingFocus) return;
    const items = Array.from(toolbarRef.current?.querySelectorAll<HTMLButtonElement>('[data-mm-toolbar-item]:not([disabled])') ?? []);
    const current = items.indexOf(document.activeElement as HTMLButtonElement);
    if (current < 0 || items.length < 2) return;
    const forward = resolvedOrientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
    const backward = resolvedOrientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
    if (![forward, backward, 'House', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'House' ? 0 : event.key === 'End' ? items.length - 1 : (current + (event.key === forward ? 1 : -1) + items.length) % items.length;
    items[next]?.focus();
  };
  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!canDrag || event.button !== 0 || (event.target as HTMLElement).closest('button, a, input, select, textarea, [data-mm-toolbar-item]')) return;
    const rect = toolbarRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, startLeft: rect.left, startTop: rect.top };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const drag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;
    const rect = toolbarRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({ left: Math.max(0, Math.min(window.innerWidth - rect.width, dragRef.current.startLeft + event.clientX - dragRef.current.startX)), top: Math.max(0, Math.min(window.innerHeight - rect.height, dragRef.current.startTop + event.clientY - dragRef.current.startY)) });
  };
  const stopDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
  };
  const toggleCollapsed = () => {
    const next = !isCollapsed;
    if (collapsed === undefined) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };
  const toolbarStyle = {
    ...style,
    ...(floating ? { left: position.left, top: position.top } : {}),
    ...(resolvedColumns ? { '--mm-toolbar-columns': resolvedColumns } : {}),
    ...(resolvedRows ? { '--mm-toolbar-rows': resolvedRows } : {}),
  } as CSSProperties;
  return <ToolbarContext.Provider value={{ disabled, iconOnly, openMenuKey, orientation: resolvedOrientation, setOpenMenuKey, size: resolvedSize }}><div {...props} ref={toolbarRef} aria-disabled={disabled || undefined} aria-label={ariaLabel} aria-orientation={resolvedOrientation} className={cx('mm-toolbar', `mm-toolbar--${resolvedOrientation}`, `mm-toolbar--${resolvedSize}`, `mm-toolbar--${resolvedVariant}`, `mm-toolbar--${resolvedDensity}`, Boolean(resolvedColumns || resolvedRows) && 'mm-toolbar--grid', showHeader && 'mm-toolbar--has-header', floating && 'mm-toolbar--fixed', canDrag && 'mm-toolbar--draggable', isCollapsed && 'mm-toolbar--collapsed', wrap && 'mm-toolbar--wrap', fullWidth && 'mm-toolbar--full-width', sticky && 'mm-toolbar--sticky', disabled && 'mm-toolbar--disabled', className)} onKeyDown={moveFocus} onPointerDown={startDrag} onPointerMove={drag} onPointerUp={stopDrag} role="toolbar" style={toolbarStyle}>{showHeader && <div className="mm-toolbar__header" data-mm-toolbar-drag-handle="true"><span className="mm-toolbar__title">{draggable && <DotsSixVertical aria-hidden="true" size={16} />}{title ?? ariaLabel}</span>{collapsible && <button aria-expanded={!isCollapsed} aria-label={isCollapsed ? 'Expand toolbar' : 'Collapse toolbar'} className="mm-toolbar__collapse" onClick={toggleCollapsed} type="button">{isCollapsed ? <CaretDown aria-hidden="true" size={16} /> : <CaretUp aria-hidden="true" size={16} />}</button>}</div>}{!isCollapsed && children}</div></ToolbarContext.Provider>;
});

export const Toolbar = Object.assign(ToolbarRoot, { Item: ToolbarItem, Menu: ToolbarMenu, Group: ToolbarGroup, Separator: ToolbarSeparator, Spacer: ToolbarSpacer });
export { ToolbarGroup, ToolbarItem, ToolbarMenu, ToolbarSeparator, ToolbarSpacer };
