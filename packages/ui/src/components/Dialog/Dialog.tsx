import { X } from '../../icons';
import { createPortal } from 'react-dom';
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from '../Button';
import './Dialog.css';

export type DialogSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl' | 'full';
export type DialogPlacement = 'center' | 'top' | 'bottom';
export type DialogActionsAlign = 'start' | 'center' | 'end' | 'between';
export type DialogAnimation = 'none' | 'top' | 'bottom' | 'left' | 'right' | 'scale';

export type DialogAction = {
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

export type DialogActions = {
  align?: DialogActionsAlign;
  cancel?: DialogAction | false;
  confirm?: DialogAction | false;
  order?: Array<'cancel' | 'confirm'>;
};

export type DialogProps = {
  'aria-label'?: string;
  children?: ReactNode;
  className?: string;
  closeButton?: boolean;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  defaultOpen?: boolean;
  description?: ReactNode;
  actions?: DialogActions;
  actionsAlign?: DialogActionsAlign;
  animation?: DialogAnimation;
  footerAside?: ReactNode;
  footer?: ReactNode;
  header?: ReactNode;
  titleIcon?: ReactNode;
  id?: string;
  modal?: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  placement?: DialogPlacement;
  size?: DialogSize;
  showActions?: boolean;
  style?: CSSProperties;
  title?: ReactNode;
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export function Dialog({
  'aria-label': ariaLabel,
  children,
  className,
  closeButton = true,
  closeOnEscape = true,
  closeOnOverlayClick = true,
  defaultOpen = false,
  description,
  actions,
  actionsAlign = 'end',
  animation = 'none',
  footerAside,
  footer,
  header,
  titleIcon,
  id: providedId,
  modal = false,
  onClose,
  onOpenChange,
  open: controlledOpen,
  placement = 'center',
  size = 'default',
  showActions = false,
  style,
  title,
}: DialogProps) {
  const generatedId = useId();
  const id = providedId ?? `mm-dialog-${generatedId}`;
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const showDescription = size !== 'xs';
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
    return <div className={cx('mm-dialog__actions', `mm-dialog__actions--${effectiveActionsAlign}`)}>
      {actionOrder.map((name) => {
        const action = actionByName[name];
        if (!action) return null;
        const isCancel = name === 'cancel';
        const defaultLabel = isCancel ? 'Cancel' : 'OK';
        const defaultVariant: ButtonVariant = isCancel ? 'outline' : 'primary';
        return <Button
          aria-label={action['aria-label']}
          disabled={action.disabled}
          iconLeft={action.icon}
          key={name}
          loading={action.loading}
          loadingLabel={action.loadingLabel}
          onClick={(event) => action.onClick ? action.onClick(event) : close()}
          size={action.size ?? (size === 'xs' || size === 'sm' ? size : undefined)}
          type={action.type ?? 'button'}
          variant={action.variant ?? defaultVariant}
        >{action.label ?? defaultLabel}</Button>;
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
    <div className={cx('mm-dialog-layer', modal && 'mm-dialog-layer--modal', `mm-dialog-layer--${placement}`)}>
      {modal && <button aria-label="Close dialog" className="mm-dialog-backdrop" onClick={closeOnOverlayClick ? close : undefined} tabIndex={-1} type="button" />}
      <div
        aria-describedby={showDescription && description ? descriptionId : undefined}
        aria-label={ariaLabel}
        aria-labelledby={header === undefined && title ? titleId : undefined}
        aria-modal={modal || undefined}
        className={cx('mm-dialog', `mm-dialog--${size}`, `mm-dialog--animation-${animation}`, className)}
        onKeyDown={handlePanelKeyDown}
        ref={panelRef}
        role="dialog"
        style={style}
        tabIndex={-1}
      >
        {header !== undefined ? <div className="mm-dialog__header mm-dialog__header--custom">{header}</div> : (title || (showDescription && description) || closeButton) && <div className="mm-dialog__header">
          <div className="mm-dialog__heading">
            {title && <div className="mm-dialog__title-row">{titleIcon && <span aria-hidden="true" className="mm-dialog__title-icon">{titleIcon}</span>}<h2 className="mm-dialog__title" id={titleId}>{title}</h2></div>}
            {showDescription && description && <p className="mm-dialog__description" id={descriptionId}>{description}</p>}
          </div>
          {closeButton && <button aria-label="Close dialog" className="mm-dialog__close" onClick={close} type="button"><X size={18} /></button>}
        </div>}
        <div className="mm-dialog__content">{children}</div>
        {(footer || actionConfig) && <div className={cx('mm-dialog__footer', footer ? 'mm-dialog__footer--custom' : false)}>{footer ?? <div className={cx('mm-dialog__footer-layout', effectiveActionsAlign === 'start' && 'mm-dialog__footer-layout--actions-start')}>
          {effectiveActionsAlign === 'start' ? <>{renderActions()}{footerAside && <div className="mm-dialog__footer-aside">{footerAside}</div>}</> : <>{footerAside && <div className="mm-dialog__footer-aside">{footerAside}</div>}{renderActions()}</>}
        </div>}</div>}
      </div>
    </div>,
    document.body,
  );
}
