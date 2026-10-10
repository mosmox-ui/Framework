import { X } from '../../icons';
import { createPortal } from 'react-dom';
import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from '../Button';
import './Drawer.css';

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left';
export type DrawerSize = 'sm' | 'default' | 'lg' | 'xl';
export type DrawerAnimation = 'none' | 'slide' | 'fade' | 'scale';
export type DrawerActionsAlign = 'start' | 'center' | 'end' | 'between';

export type DrawerAction = {
  'aria-label'?: string;
  disabled?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
  loading?: boolean;
  loadingLabel?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  size?: ButtonSize;
  type?: ButtonProps['type'];
  variant?: ButtonVariant;
};

export type DrawerActions = {
  align?: DrawerActionsAlign;
  cancel?: DrawerAction | false;
  confirm?: DrawerAction | false;
  order?: Array<'cancel' | 'confirm'>;
};

export type DrawerProps = {
  'aria-label'?: string;
  actions?: DrawerActions;
  actionsAlign?: DrawerActionsAlign;
  animation?: DrawerAnimation;
  children?: ReactNode;
  className?: string;
  closeButton?: boolean;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  defaultOpen?: boolean;
  description?: ReactNode;
  footer?: ReactNode;
  footerAside?: ReactNode;
  header?: ReactNode;
  id?: string;
  modal?: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  placement?: DrawerPlacement;
  showActions?: boolean;
  size?: DrawerSize;
  title?: ReactNode;
  titleIcon?: ReactNode;
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export function Drawer({
  'aria-label': ariaLabel,
  actions,
  actionsAlign = 'end',
  animation = 'slide',
  children,
  className,
  closeButton = true,
  closeOnEscape = true,
  closeOnOverlayClick = true,
  defaultOpen = false,
  description,
  footer,
  footerAside,
  header,
  id: providedId,
  modal = true,
  onClose,
  onOpenChange,
  open: controlledOpen,
  placement = 'right',
  showActions = false,
  size = 'default',
  title,
  titleIcon,
}: DrawerProps) {
  const generatedId = useId();
  const id = providedId ?? `mm-drawer-${generatedId}`;
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
    if (!nextOpen) onClose?.();
  };

  const close = () => setOpen(false);
  const actionConfig = actions ?? (showActions ? {} : undefined);
  const actionOrder = actionConfig?.order ?? ['cancel', 'confirm'];
  const effectiveActionsAlign = actionConfig?.align ?? actionsAlign;

  const renderActions = () => {
    if (!actionConfig) return null;
    const cancel = actionConfig.cancel === false ? undefined : actionConfig.cancel ?? {};
    const confirm = actionConfig.confirm === false ? undefined : actionConfig.confirm ?? {};
    const actionByName = { cancel, confirm };
    return <div className={cx('mm-drawer__actions', `mm-drawer__actions--${effectiveActionsAlign}`)}>
      {actionOrder.map((name) => {
        const action = actionByName[name];
        if (!action) return null;
        const isCancel = name === 'cancel';
        return <Button
          aria-label={action['aria-label']}
          disabled={action.disabled}
          iconLeft={action.icon}
          key={name}
          loading={action.loading}
          loadingLabel={action.loadingLabel}
          onClick={(event) => action.onClick ? action.onClick(event) : close()}
          size={action.size ?? (size === 'sm' ? 'sm' : undefined)}
          type={action.type ?? 'button'}
          variant={action.variant ?? (isCancel ? 'outline' : 'primary')}
        >{action.label ?? (isCancel ? 'Cancel' : 'OK')}</Button>;
      })}
    </div>;
  };

  useEffect(() => {
    if (!isOpen) return;
    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusFrame = requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }));
    const previousOverflow = document.body.style.overflow;
    if (modal) document.body.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(focusFrame);
      if (modal) document.body.style.overflow = previousOverflow;
      requestAnimationFrame(() => restoreFocusRef.current?.focus({ preventScroll: true }));
    };
  }, [isOpen, modal]);

  useEffect(() => {
    if (!isOpen || !modal) return;
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'));
      if (focusable.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEscape, isOpen, modal]);

  if (!isOpen || typeof document === 'undefined') return null;

  const handlePanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && closeOnEscape && !modal) {
      event.preventDefault();
      close();
    }
  };

  return createPortal(
    <div className={cx('mm-drawer-layer', modal && 'mm-drawer-layer--modal', `mm-drawer-layer--${placement}`)}>
      {modal && <button aria-label="Close drawer" className="mm-drawer-backdrop" onClick={closeOnOverlayClick ? close : undefined} tabIndex={-1} type="button" />}
      <div
        aria-describedby={description ? descriptionId : undefined}
        aria-label={ariaLabel}
        aria-labelledby={header === undefined && title ? titleId : undefined}
        aria-modal={modal || undefined}
        className={cx('mm-drawer', `mm-drawer--${placement}`, `mm-drawer--${size}`, `mm-drawer--animation-${animation}`, className)}
        onKeyDown={handlePanelKeyDown}
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        {header !== undefined ? <div className="mm-drawer__header mm-drawer__header--custom">{header}</div> : (title || description || closeButton) && <div className="mm-drawer__header">
          <div className="mm-drawer__heading">
            {title && <div className="mm-drawer__title-row">{titleIcon && <span aria-hidden="true" className="mm-drawer__title-icon">{titleIcon}</span>}<h2 className="mm-drawer__title" id={titleId}>{title}</h2></div>}
            {description && <p className="mm-drawer__description" id={descriptionId}>{description}</p>}
          </div>
          {closeButton && <button aria-label="Close drawer" className="mm-drawer__close" onClick={close} type="button"><X size={18} /></button>}
        </div>}
        <div className="mm-drawer__content">{children}</div>
        {(footer || actionConfig) && <div className={cx('mm-drawer__footer', footer ? 'mm-drawer__footer--custom' : false)}>{footer ?? <div className={cx('mm-drawer__footer-layout', effectiveActionsAlign === 'start' && 'mm-drawer__footer-layout--actions-start')}>
          {effectiveActionsAlign === 'start' ? <>{renderActions()}{footerAside && <div className="mm-drawer__footer-aside">{footerAside}</div>}</> : <>{footerAside && <div className="mm-drawer__footer-aside">{footerAside}</div>}{renderActions()}</>}
        </div>}</div>}
      </div>
    </div>,
    document.body,
  );
}
