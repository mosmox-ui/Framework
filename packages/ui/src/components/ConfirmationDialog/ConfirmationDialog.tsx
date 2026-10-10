import { Warning, Check, X } from '../../icons';
import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Button } from '../Button';
import { useConfig, type Locale } from '../ConfigProvider';
import { Dialog, type DialogSize } from '../Dialog';
import './ConfirmationDialog.css';

export type ConfirmationDialogIntent = 'default' | 'warning' | 'danger';
export type ConfirmationDialogProps = {
  'aria-label'?: string;
  cancelIcon?: ReactNode;
  cancelLabel?: ReactNode;
  cancelDisabled?: boolean;
  children?: ReactNode;
  closeButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnConfirm?: boolean;
  confirmIcon?: ReactNode;
  confirmLabel?: ReactNode;
  confirmDisabled?: boolean;
  confirmLoading?: boolean;
  defaultOpen?: boolean;
  description?: ReactNode;
  footerAside?: ReactNode;
  id?: string;
  intent?: ConfirmationDialogIntent;
  locale?: Locale;
  onCancel?: () => void;
  onConfirm?: () => void | Promise<void>;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  size?: DialogSize;
  width?: number | string;
  title?: ReactNode;
};

const translations = {
  en: { cancel: 'Cancel', close: 'Close dialog', confirm: 'OK', question: 'Are you sure?' },
  uk: { cancel: 'Скасувати', close: 'Закрити діалог', confirm: 'Підтвердити', question: 'Ви впевнені?' },
  fr: { cancel: 'Annuler', close: 'Fermer la boîte de dialogue', confirm: 'OK', question: 'Êtes-vous sûr ?' },
  de: { cancel: 'Abbrechen', close: 'Dialog schließen', confirm: 'OK', question: 'Sind Sie sicher?' },
} as const;

export function ConfirmationDialog({
  'aria-label': ariaLabel,
  cancelIcon = <X aria-hidden="true" size={16} />,
  cancelLabel,
  cancelDisabled = false,
  children,
  closeButton,
  closeOnOverlayClick,
  closeOnConfirm = true,
  confirmIcon = <Check aria-hidden="true" size={16} />,
  confirmLabel,
  confirmDisabled = false,
  confirmLoading = false,
  defaultOpen = false,
  description,
  footerAside,
  id,
  intent,
  locale: providedLocale,
  onCancel,
  onConfirm,
  onOpenChange,
  open: controlledOpen,
  size,
  width,
  title,
}: ConfirmationDialogProps) {
  const { locale: providerLocale, components } = useConfig();
  const copy = translations[providedLocale ?? providerLocale];
  const config = components.confirmationDialog;
  const effectiveSize = size ?? config?.size ?? 'sm';
  const effectiveCloseButton = closeButton ?? config?.closeButton ?? true;
  const effectiveCloseOnOverlayClick = closeOnOverlayClick ?? config?.closeOnOverlayClick ?? false;
  const effectiveIntent = intent ?? config?.intent ?? 'default';
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [internalLoading, setInternalLoading] = useState(false);
  const suppressCancelRef = useRef(false);
  const isOpen = controlledOpen ?? internalOpen;
  const isLoading = confirmLoading || internalLoading;
  const effectiveConfirmLabel = confirmLabel ?? config?.confirmLabel ?? copy.confirm;
  const effectiveCancelLabel = cancelLabel ?? config?.cancelLabel ?? copy.cancel;
  const dialogStyle = width === undefined ? undefined : { '--mm-confirmation-dialog-width': typeof width === 'number' ? `${width}px` : width } as CSSProperties;

  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };
  const handleCancel = () => { onCancel?.(); setOpen(false); };
  const handleOpenChange = (next: boolean) => {
    if (!next && !suppressCancelRef.current) onCancel?.();
    suppressCancelRef.current = false;
    setOpen(next);
  };
  const handleConfirm = async () => {
    if (!onConfirm) { if (closeOnConfirm) { suppressCancelRef.current = true; setOpen(false); } return; }
    setInternalLoading(true);
    try {
      await onConfirm();
      if (closeOnConfirm) { suppressCancelRef.current = true; setOpen(false); }
    } finally {
      setInternalLoading(false);
    }
  };

  const header = <div className="mm-confirmation-dialog__header"><div className="mm-confirmation-dialog__heading"><span className={`mm-confirmation-dialog__icon mm-confirmation-dialog__icon--${effectiveIntent}`}><Warning aria-hidden="true" size={18} /></span><div><h2>{title ?? copy.question}</h2>{description && <p>{description}</p>}</div></div>{effectiveCloseButton && <Button aria-label={copy.close} iconOnly variant="text" onClick={handleCancel}><X aria-hidden="true" size={18} /></Button>}</div>;

  return <Dialog aria-label={ariaLabel ?? String(title ?? copy.question)} className="mm-confirmation-dialog" closeButton={false} closeOnOverlayClick={effectiveCloseOnOverlayClick} id={id} modal onOpenChange={handleOpenChange} open={isOpen} size={effectiveSize} style={dialogStyle} header={header} footerAside={footerAside} actions={{ cancel: { label: effectiveCancelLabel, icon: cancelIcon, disabled: cancelDisabled || isLoading, onClick: handleCancel }, confirm: { label: effectiveConfirmLabel, icon: confirmIcon, disabled: confirmDisabled || isLoading, loading: isLoading, variant: effectiveIntent === 'danger' ? 'danger' : effectiveIntent === 'warning' ? 'secondary' : 'primary', onClick: handleConfirm } }}>{children}</Dialog>;
}
