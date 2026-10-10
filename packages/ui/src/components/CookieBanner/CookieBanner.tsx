import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { useConfig, type Locale } from '../ConfigProvider';
import './CookieBanner.css';

export type CookieBannerSize = 'sm' | 'default';
export type CookieBannerVariant = 'default' | 'soft' | 'contrast';
export type CookieBannerLocale = Locale;

export type CookieBannerCategory = {
  key: string;
  label: ReactNode;
  description?: ReactNode;
  required?: boolean;
  defaultChecked?: boolean;
};

export type CookieBannerProps = {
  'aria-label'?: string;
  acceptLabel?: ReactNode;
  allowNecessaryOnly?: boolean;
  className?: string;
  categories?: CookieBannerCategory[];
  children?: ReactNode;
  actions?: ReactNode;
  closeLabel?: string;
  defaultOpen?: boolean;
  description?: ReactNode;
  fullWidth?: boolean;
  icon?: ReactNode;
  layout?: 'inline' | 'stacked';
  locale?: CookieBannerLocale;
  maxWidth?: number | string;
  onAcceptAll?: (categoryKeys: string[]) => void;
  onClose?: () => void;
  onConsentChange?: (categoryKeys: string[]) => void;
  onOpenChange?: (open: boolean) => void;
  onRejectAll?: (categoryKeys: string[]) => void;
  onSavePreferences?: (categoryKeys: string[]) => void;
  open?: boolean;
  placement?: 'top' | 'bottom';
  presentation?: 'bar' | 'card';
  policyHref?: string;
  policyLabel?: ReactNode;
  preferencesLabel?: ReactNode;
  position?: 'fixed' | 'sticky' | 'static';
  rejectLabel?: ReactNode;
  radius?: number | string;
  surfaceColor?: string;
  textColor?: string;
  borderColor?: string;
  showClose?: boolean;
  showPreferences?: boolean;
  size?: CookieBannerSize;
  style?: CSSProperties;
  title?: ReactNode;
  variant?: CookieBannerVariant;
};

const translations: Record<CookieBannerLocale, { accept: string; close: string; closePreferences: string; description: string; manage: string; reject: string; save: string; title: string }> = {
  en: { accept: 'Accept all', close: 'Close cookie banner', closePreferences: 'Close preferences', description: 'We use cookies to improve the experience, measure usage, and remember your preferences.', manage: 'Manage preferences', reject: 'Reject optional', save: 'Save preferences', title: 'Your privacy matters' },
  uk: { accept: 'Прийняти всі', close: 'Закрити банер cookies', closePreferences: 'Закрити налаштування', description: 'Ми використовуємо cookies, щоб покращувати роботу сайту, вимірювати використання та зберігати ваші налаштування.', manage: 'Керувати налаштуваннями', reject: 'Відхилити необов’язкові', save: 'Зберегти налаштування', title: 'Ваша приватність важлива' },
  de: { accept: 'Alle akzeptieren', close: 'Cookie-Banner schließen', closePreferences: 'Einstellungen schließen', description: 'Wir verwenden Cookies, um die Nutzung zu verbessern und Ihre Einstellungen zu speichern.', manage: 'Einstellungen verwalten', reject: 'Optionale ablehnen', save: 'Einstellungen speichern', title: 'Ihre Privatsphäre ist wichtig' },
  fr: { accept: 'Tout accepter', close: 'Fermer la bannière de cookies', closePreferences: 'Fermer les préférences', description: 'Nous utilisons des cookies pour améliorer votre expérience et mémoriser vos préférences.', manage: 'Gérer les préférences', reject: 'Refuser les optionnels', save: 'Enregistrer les préférences', title: 'Votre confidentialité compte' },
};

const defaultCategories: CookieBannerCategory[] = [
  { key: 'necessary', label: 'Necessary', description: 'Required for core site functionality.', required: true, defaultChecked: true },
  { key: 'analytics', label: 'Analytics', description: 'Helps us understand how the site is used.' },
  { key: 'marketing', label: 'Marketing', description: 'Used to personalize relevant messages.' },
];

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const cssLength = (value?: number | string) => typeof value === 'number' ? `${value}px` : value;

export function CookieBanner({
  'aria-label': ariaLabel,
  acceptLabel,
  allowNecessaryOnly = true,
  className,
  categories = defaultCategories,
  children,
  actions,
  closeLabel,
  defaultOpen = true,
  description,
  fullWidth = true,
  icon,
  layout,
  locale,
  maxWidth,
  onAcceptAll,
  onClose,
  onConsentChange,
  onOpenChange,
  onRejectAll,
  onSavePreferences,
  open,
  placement,
  policyHref,
  policyLabel,
  preferencesLabel,
  position,
  presentation,
  rejectLabel,
  radius,
  surfaceColor,
  textColor,
  borderColor,
  showClose = false,
  showPreferences,
  size,
  style,
  title,
  variant,
}: CookieBannerProps) {
  const { components, locale: globalLocale } = useConfig();
  const config = components.cookieBanner;
  const language = translations[locale ?? globalLocale];
  const resolvedLayout = layout ?? config?.layout ?? 'inline';
  const resolvedPosition = position ?? config?.position ?? 'fixed';
  const resolvedPlacement = placement ?? config?.placement ?? 'bottom';
  const resolvedPresentation = presentation ?? config?.presentation ?? 'bar';
  const resolvedSize = size ?? config?.size ?? 'default';
  const resolvedVariant = variant ?? config?.variant ?? 'default';
  const resolvedShowPreferences = showPreferences ?? config?.showPreferences ?? true;
  const [visible, setVisible] = useState(open ?? defaultOpen);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(() => categories.filter((category) => category.defaultChecked || category.required).map((category) => category.key));
  const isControlled = open !== undefined;
  const active = open ?? visible;

  useEffect(() => {
    if (open !== undefined) setVisible(open);
  }, [open]);

  const close = () => {
    if (!isControlled) setVisible(false);
    onOpenChange?.(false);
    onClose?.();
  };

  const commit = (keys: string[], callback?: (categoryKeys: string[]) => void) => {
    setSelected(keys);
    onConsentChange?.(keys);
    callback?.(keys);
    close();
  };

  const toggle = (category: CookieBannerCategory) => {
    if (category.required) return;
    const next = selected.includes(category.key) ? selected.filter((key) => key !== category.key) : [...selected, category.key];
    setSelected(next);
    onConsentChange?.(next);
  };

  if (!active) return null;
  const allKeys = categories.map((category) => category.key);
  const necessaryKeys = categories.filter((category) => category.required).map((category) => category.key);
  const resolvedRadius = radius ?? config?.radius;
  const styleVariables = { ...(maxWidth !== undefined && { '--mm-cookie-banner-max-width': cssLength(maxWidth) }), ...(resolvedRadius !== undefined && { '--mm-cookie-banner-radius': cssLength(resolvedRadius) }), ...(surfaceColor ?? config?.surfaceColor ? { '--mm-cookie-banner-surface': surfaceColor ?? config?.surfaceColor } : {}), ...(textColor ?? config?.textColor ? { '--mm-cookie-banner-text': textColor ?? config?.textColor } : {}), ...(borderColor ?? config?.borderColor ? { '--mm-cookie-banner-border': borderColor ?? config?.borderColor } : {}), ...style } as CSSProperties;
  return <aside aria-label={ariaLabel ?? String(title ?? language.title)} className={cx('mm-cookie-banner', `mm-cookie-banner--${resolvedPosition}`, `mm-cookie-banner--${resolvedPlacement}`, `mm-cookie-banner--${resolvedPresentation}`, `mm-cookie-banner--${resolvedSize}`, `mm-cookie-banner--${resolvedVariant}`, `mm-cookie-banner--${resolvedLayout}`, fullWidth && 'mm-cookie-banner--full-width', className)} style={styleVariables} role="region">
    <div className="mm-cookie-banner__inner">
      <div className="mm-cookie-banner__copy">
        {icon && <div className="mm-cookie-banner__icon" aria-hidden="true">{icon}</div>}
        <div><h2 className="mm-cookie-banner__title">{title ?? language.title}</h2><div className="mm-cookie-banner__description">{description ?? language.description} {policyHref && <a href={policyHref}>{policyLabel ?? 'Privacy policy'}</a>}</div>{children && <div className="mm-cookie-banner__content">{children}</div>}</div>
      </div>
      {preferencesOpen && <div className="mm-cookie-banner__preferences" aria-label="Cookie preferences">{categories.map((category) => <Checkbox checked={selected.includes(category.key)} className="mm-cookie-banner__category" disabled={category.required} key={category.key} label={<><strong>{category.label}</strong>{category.description && <small>{category.description}</small>}</>} onChange={() => toggle(category)} size="sm" />)}</div>}
      <div className="mm-cookie-banner__actions">
        {actions ?? <><div className="mm-cookie-banner__default-actions">{showClose && <Button aria-label={closeLabel ?? language.close} className="mm-cookie-banner__close" iconOnly onClick={close} size="xs" variant="text">×</Button>}{resolvedShowPreferences && <Button className="mm-cookie-banner__button--subtle" onClick={() => setPreferencesOpen((value) => !value)} size="sm" variant="outline">{preferencesOpen ? language.closePreferences : (preferencesLabel ?? language.manage)}</Button>}{preferencesOpen ? <Button onClick={() => onSavePreferences ? commit(selected, onSavePreferences) : commit(selected)} size="sm">{language.save}</Button> : <><Button className="mm-cookie-banner__button--subtle" onClick={() => commit(allowNecessaryOnly ? necessaryKeys : [], onRejectAll)} size="sm" variant="outline">{rejectLabel ?? language.reject}</Button><Button onClick={() => commit(allKeys, onAcceptAll)} size="sm">{acceptLabel ?? language.accept}</Button></>}</div></>}
      </div>
    </div>
  </aside>;
}
