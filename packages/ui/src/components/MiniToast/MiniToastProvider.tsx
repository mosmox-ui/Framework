import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { MiniToast, type MiniToastProps, MiniToastStack } from './MiniToast';

export type MiniToastRequest = Omit<MiniToastProps, 'defaultOpen' | 'onClose' | 'onOpenChange' | 'open'>;
type MiniItem = { id: string; options: MiniToastRequest; open: boolean };
type MiniContextValue = { show: (options: MiniToastRequest) => string; close: (id: string) => void; closeAll: () => void };
const MiniContext = createContext<MiniContextValue | null>(null);

export function MiniToastProvider({ children }: { children?: ReactNode }) {
  const [items, setItems] = useState<MiniItem[]>([]);
  const show = useCallback((options: MiniToastRequest) => { const id = `mini-toast-${Date.now()}-${Math.random().toString(36).slice(2)}`; setItems((current) => [...current, { id, options, open: true }]); return id; }, []);
  const close = useCallback((id: string) => setItems((current) => current.map((item) => item.id === id ? { ...item, open: false } : item)), []);
  const closeAll = useCallback(() => setItems((current) => current.map((item) => ({ ...item, open: false }))), []);
  const positions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const;
  const value = { show, close, closeAll };
  return <MiniContext.Provider value={value}>{children}{positions.map((position) => { const positionItems = items.filter((item) => (item.options.position ?? 'bottom-right') === position); return positionItems.length ? <MiniToastStack key={position} position={position}>{positionItems.map((item) => <MiniToast {...item.options} key={item.id} onClose={() => setItems((current) => current.filter((candidate) => candidate.id !== item.id))} onOpenChange={(open) => { if (!open) setItems((current) => current.filter((candidate) => candidate.id !== item.id)); }} open={item.open} />)}</MiniToastStack> : null; })}</MiniContext.Provider>;
}

export function useMiniToast() { const context = useContext(MiniContext); if (!context) throw new Error('useMiniToast must be used within MiniToastProvider'); return context; }
