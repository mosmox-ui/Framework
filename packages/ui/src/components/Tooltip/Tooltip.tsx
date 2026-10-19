import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import './Tooltip.css';

export type TooltipPlacement = 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
export type TooltipSize = 'sm' | 'default' | 'lg';
export type TooltipVariant = 'dark' | 'light' | 'primary';

export type TooltipProps = {
  'aria-label'?: string;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
  closeDelay?: number;
  closeOnEscape?: boolean;
  content: ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  interactive?: boolean;
  maxWidth?: CSSProperties['maxWidth'];
  offset?: number;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  openDelay?: number;
  placement?: TooltipPlacement;
  size?: TooltipSize;
  variant?: TooltipVariant;
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export function Tooltip({
  'aria-label': ariaLabel,
  arrow = true,
  children,
  className,
  closeDelay = 80,
  closeOnEscape = true,
  content,
  defaultOpen = false,
  disabled = false,
  interactive = false,
  maxWidth = 280,
  offset = 8,
  onOpenChange,
  open: controlledOpen,
  openDelay = 160,
  placement = 'top',
  size = 'default',
  variant = 'dark',
}: TooltipProps) {
  const generatedId = useId();
  const tooltipId = `mm-tooltip-${generatedId}`;
  const rootRef = useRef<HTMLSpanElement>(null);
  const openTimerRef = useRef<number | undefined>(undefined);
  const closeTimerRef = useRef<number | undefined>(undefined);
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = !disabled && (isControlled ? controlledOpen : uncontrolledOpen);

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const clearTimers = () => {
    if (openTimerRef.current !== undefined) window.clearTimeout(openTimerRef.current);
    if (closeTimerRef.current !== undefined) window.clearTimeout(closeTimerRef.current);
    openTimerRef.current = undefined;
    closeTimerRef.current = undefined;
  };

  const show = () => {
    if (disabled) return;
    clearTimers();
    if (openDelay === 0) setOpen(true);
    else openTimerRef.current = window.setTimeout(() => setOpen(true), openDelay);
  };

  const hide = () => {
    clearTimers();
    if (closeDelay === 0) setOpen(false);
    else closeTimerRef.current = window.setTimeout(() => setOpen(false), closeDelay);
  };

  const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
    if (disabled) return;
    if (event.detail === 0) return;
    if (controlledOpen === undefined || controlledOpen) setOpen(!isOpen);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Escape' && closeOnEscape && isOpen) {
      event.preventDefault();
      hide();
    }
    if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
      event.preventDefault();
      setOpen(!isOpen);
    }
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    const handleDocumentKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleDocumentKeyDown);
    return () => document.removeEventListener('keydown', handleDocumentKeyDown);
  }, [closeOnEscape, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: globalThis.MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  const style = { '--mm-tooltip-offset': `${offset}px`, '--mm-tooltip-max-width': typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth } as CSSProperties;

  return <span
    aria-describedby={isOpen ? tooltipId : undefined}
    className={cx('mm-tooltip', isOpen && 'mm-tooltip--open', disabled && 'mm-tooltip--disabled', interactive && 'mm-tooltip--interactive', className)}
    data-mm-tooltip={typeof content === 'string' ? content : undefined}
    data-mm-tooltip-placement={placement}
    onClick={handleClick}
    onFocus={openDelay === 0 ? show : show}
    onKeyDown={handleKeyDown}
    onMouseEnter={show}
    onMouseLeave={hide}
    onPointerEnter={show}
    onPointerLeave={hide}
    ref={rootRef}
  >
    {children}
    {isOpen && <span
      aria-label={ariaLabel}
      className={cx('mm-tooltip__content', `mm-tooltip__content--${placement}`, `mm-tooltip__content--${size}`, `mm-tooltip__content--${variant}`)}
      id={tooltipId}
      onMouseEnter={interactive ? show : undefined}
      onMouseLeave={interactive ? hide : undefined}
      role="tooltip"
      style={style}
    >
      {content}
      {arrow && <span aria-hidden="true" className="mm-tooltip__arrow" />}
    </span>}
  </span>;
}
