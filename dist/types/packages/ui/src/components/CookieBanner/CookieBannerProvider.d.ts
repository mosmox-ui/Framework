import { type ReactNode } from 'react';
import { type CookieBannerProps } from './CookieBanner';
export type CookieBannerAction = 'accept' | 'reject' | 'preferences' | 'close';
export type CookieBannerResult = {
    action: CookieBannerAction;
    categoryKeys: string[];
};
export type CookieBannerRequest = Omit<CookieBannerProps, 'defaultOpen' | 'onOpenChange' | 'open'>;
type CookieContextValue = {
    open: (options?: CookieBannerRequest) => Promise<CookieBannerResult>;
    close: () => void;
};
export declare function CookieBannerProvider({ children }: {
    children?: ReactNode;
}): import("react").JSX.Element;
export declare function useCookieBanner(): CookieContextValue;
export {};
