import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CookieBanner, type CookieBannerProps } from './CookieBanner';

export type CookieBannerAction = 'accept' | 'reject' | 'preferences' | 'close';
export type CookieBannerResult = { action: CookieBannerAction; categoryKeys: string[] };
export type CookieBannerRequest = Omit<CookieBannerProps, 'defaultOpen' | 'onOpenChange' | 'open'>;
type CookieContextValue = { open: (options?: CookieBannerRequest) => Promise<CookieBannerResult>; close: () => void };
const CookieContext = createContext<CookieContextValue | null>(null);

export function CookieBannerProvider({ children }: { children?: ReactNode }) {
  const [request, setRequest] = useState<{ options: CookieBannerRequest; resolve: (result: CookieBannerResult) => void } | null>(null);
  const open = useCallback((options: CookieBannerRequest = {}) => new Promise<CookieBannerResult>((resolve) => setRequest({ options, resolve })), []);
  const close = useCallback(() => setRequest((current) => { current?.resolve({ action: 'close', categoryKeys: [] }); return null; }), []);
  const finish = (action: CookieBannerAction, keys: string[]) => setRequest((current) => { current?.resolve({ action, categoryKeys: keys }); return null; });
  const value = { open, close };
  return <CookieContext.Provider value={value}>{children}{request && <CookieBanner {...request.options} onAcceptAll={(keys) => { request.options.onAcceptAll?.(keys); finish('accept', keys); }} onClose={() => finish('close', [])} onConsentChange={request.options.onConsentChange} onOpenChange={(isOpen) => { if (!isOpen) finish('close', []); }} onRejectAll={(keys) => { request.options.onRejectAll?.(keys); finish('reject', keys); }} onSavePreferences={(keys) => { request.options.onSavePreferences?.(keys); finish('preferences', keys); }} open />}</CookieContext.Provider>;
}

export function useCookieBanner() { const context = useContext(CookieContext); if (!context) throw new Error('useCookieBanner must be used within CookieBannerProvider'); return context; }
