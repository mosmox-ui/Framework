import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { Alert, type AlertProps } from './Alert';

export type AlertRequest = Omit<AlertProps, 'defaultOpen' | 'onOpenChange' | 'open'>;
type PendingAlert = { id: number; options: AlertRequest; resolve: (confirmed: boolean) => void };
type AlertContextValue = { show: (options: AlertRequest) => Promise<boolean> };
const AlertContext = createContext<AlertContextValue | null>(null);

export function AlertProvider({ children }: { children?: ReactNode }) {
  const [queue, setQueue] = useState<PendingAlert[]>([]);
  const nextId = useRef(0);
  const confirmedId = useRef<number | null>(null);
  const finish = useCallback((id: number, result: boolean) => setQueue((current) => { const item = current[0]; if (!item || item.id !== id) return current; item.resolve(result); return current.slice(1); }), []);
  const show = useCallback((options: AlertRequest) => new Promise<boolean>((resolve) => { const id = ++nextId.current; setQueue((current) => [...current, { id, options, resolve }]); }), []);
  const active = queue[0];
  const handleOpenChange = (open: boolean) => { if (!active || open) return; const confirmed = confirmedId.current === active.id; confirmedId.current = null; finish(active.id, confirmed); };
  const handleConfirm = () => { if (active) confirmedId.current = active.id; };
  const value = { show };
  return <AlertContext.Provider value={value}>{children}{active && <Alert {...active.options} onClose={active.options.onClose} onConfirm={handleConfirm} onOpenChange={handleOpenChange} open />}</AlertContext.Provider>;
}

export function useAlert() { const context = useContext(AlertContext); if (!context) throw new Error('useAlert must be used within AlertProvider'); return context; }
