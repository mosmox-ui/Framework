import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { ToastNotification, type ToastNotificationProps, type ToastNotificationVariant } from './ToastNotification';
import { ToastNotificationStack } from './ToastNotificationStack';

export type ToastNotificationRequest = Omit<ToastNotificationProps, 'defaultOpen' | 'id' | 'onClose' | 'onOpenChange' | 'open'>;
type ToastItem = { id: string; options: ToastNotificationRequest; open: boolean };
type ToastContextValue = { show: (options: ToastNotificationRequest) => string; success: (message: ReactNode, options?: Omit<ToastNotificationRequest, 'children' | 'variant'>) => string; info: (message: ReactNode, options?: Omit<ToastNotificationRequest, 'children' | 'variant'>) => string; warning: (message: ReactNode, options?: Omit<ToastNotificationRequest, 'children' | 'variant'>) => string; danger: (message: ReactNode, options?: Omit<ToastNotificationRequest, 'children' | 'variant'>) => string; close: (id: string) => void; closeAll: () => void };
const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastNotificationProvider({ children }: { children?: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const show = useCallback((options: ToastNotificationRequest) => { const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`; setItems((current) => [...current, { id, options, open: true }]); return id; }, []);
  const close = useCallback((id: string) => setItems((current) => current.map((item) => item.id === id ? { ...item, open: false } : item)), []);
  const closeAll = useCallback(() => setItems((current) => current.map((item) => ({ ...item, open: false }))), []);
  const semantic = (variant: ToastNotificationVariant) => (message: ReactNode, options: Omit<ToastNotificationRequest, 'children' | 'variant'> = {}) => show({ ...options, children: message, variant });
  const value = { show, success: semantic('success'), info: semantic('info'), warning: semantic('warning'), danger: semantic('danger'), close, closeAll };
  const positions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const;
  return <ToastContext.Provider value={value}>{children}{positions.map((position) => { const positionItems = items.filter((item) => (item.options.position ?? 'bottom-right') === position); return positionItems.length ? <ToastNotificationStack key={position} position={position}>{positionItems.map((item) => <ToastNotification {...item.options} id={item.id} key={item.id} onClose={() => setItems((current) => current.filter((candidate) => candidate.id !== item.id))} onOpenChange={(open) => { if (!open) setItems((current) => current.filter((candidate) => candidate.id !== item.id)); }} open={item.open} />)}</ToastNotificationStack> : null; })}</ToastContext.Provider>;
}

export function useToastNotification() { const context = useContext(ToastContext); if (!context) throw new Error('useToastNotification must be used within ToastNotificationProvider'); return context; }
