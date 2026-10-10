import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { ConfirmationDialog, type ConfirmationDialogProps } from './ConfirmationDialog';

export type ConfirmationDialogRequest = Omit<ConfirmationDialogProps, 'defaultOpen' | 'onOpenChange' | 'open'> & {
  onConfirm?: ConfirmationDialogProps['onConfirm'];
};

type PendingConfirmation = {
  id: number;
  options: ConfirmationDialogRequest;
  resolve: (confirmed: boolean) => void;
  reject: (error: unknown) => void;
};

type ConfirmationDialogContextValue = {
  confirm: (options: ConfirmationDialogRequest) => Promise<boolean>;
};

const ConfirmationDialogContext = createContext<ConfirmationDialogContextValue | null>(null);

export function ConfirmationDialogProvider({ children }: { children?: ReactNode }) {
  const [queue, setQueue] = useState<PendingConfirmation[]>([]);
  const nextId = useRef(0);
  const confirmedId = useRef<number | null>(null);
  const cancelledId = useRef<number | null>(null);

  const finish = useCallback((id: number, result: boolean) => {
    setQueue((current) => {
      const pending = current[0];
      if (!pending || pending.id !== id) return current;
      pending.resolve(result);
      return current.slice(1);
    });
  }, []);

  const confirm = useCallback((options: ConfirmationDialogRequest) => new Promise<boolean>((resolve, reject) => {
    const id = ++nextId.current;
    setQueue((current) => [...current, { id, options, reject, resolve }]);
  }), []);

  const active = queue[0];
  const value = { confirm };
  const handleOpenChange = (open: boolean) => {
    if (!active || open) return;
    const confirmed = confirmedId.current === active.id;
    const cancelled = cancelledId.current === active.id;
    confirmedId.current = null;
    cancelledId.current = null;
    finish(active.id, confirmed && !cancelled);
  };
  const handleConfirm = async () => {
    if (!active) return;
    try {
      await active.options.onConfirm?.();
      if (active.options.closeOnConfirm === false) {
        finish(active.id, true);
      } else {
        confirmedId.current = active.id;
      }
    } catch (error) {
      active.reject(error);
      setQueue((current) => current.filter((item) => item.id !== active.id));
    }
  };
  const handleCancel = () => {
    if (active) {
      active.options.onCancel?.();
      cancelledId.current = active.id;
    }
  };

  return <ConfirmationDialogContext.Provider value={value}>
    {children}
    {active && <ConfirmationDialog {...active.options} onCancel={handleCancel} onConfirm={handleConfirm} onOpenChange={handleOpenChange} open />}
  </ConfirmationDialogContext.Provider>;
}

export function useConfirmationDialog() {
  const context = useContext(ConfirmationDialogContext);
  if (!context) throw new Error('useConfirmationDialog must be used within ConfirmationDialogProvider');
  return context;
}
