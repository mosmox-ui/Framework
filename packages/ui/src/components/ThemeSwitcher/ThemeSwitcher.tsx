import { useEffect, useMemo, useRef, useState, type CSSProperties, type HTMLAttributes } from 'react';
import { useConfig, type Locale } from '../ConfigProvider';
import './ThemeSwitcher.css';

export type ThemeSwitcherMode = 'light' | 'dark' | 'system';
export type ThemeSwitcherSize = 'xs' | 'sm' | 'default';
export type ThemeSwitcherVariant = 'button' | 'segmented';

export type ThemeSwitcherTokens = Partial<{
  controlBorder: string;
  controlFilled: string;
  controlIcon: string;
  controlSelected: string;
  focus: string;
  lightBackground: string;
  lightHover: string;
  mutedText: string;
  overlay: string;
  placeholder: string;
  primary: string;
  primaryHover: string;
  secondary: string;
  secondaryHover: string;
  surface: string;
  surfaceHover: string;
  text: string;
}>;

export type ThemeSwitcherLabels = Partial<Record<ThemeSwitcherMode, string> & {
  label: string;
  light: string;
  dark: string;
  system: string;
}>;

export type ThemeSwitcherProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  value?: ThemeSwitcherMode;
  defaultValue?: ThemeSwitcherMode;
  onChange?: (mode: ThemeSwitcherMode) => void;
  storageKey?: string;
  persist?: boolean;
  applyTheme?: boolean;
  options?: ThemeSwitcherMode[];
  labels?: ThemeSwitcherLabels;
  locale?: Locale;
  lightTokens?: ThemeSwitcherTokens;
  darkTokens?: ThemeSwitcherTokens;
  showLabel?: boolean;
  size?: ThemeSwitcherSize;
  variant?: ThemeSwitcherVariant;
  disabled?: boolean;
};

type ResolvedTheme = 'light' | 'dark';
type ThemeTokenName = keyof ThemeSwitcherTokens;

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const defaultOptions: ThemeSwitcherMode[] = ['light', 'dark', 'system'];
const themeTokenVariables: Record<ThemeTokenName, string> = {
  controlBorder: '--mm-color-control-border',
  controlFilled: '--mm-color-control-filled',
  controlIcon: '--mm-color-control-icon',
  controlSelected: '--mm-color-control-selected',
  focus: '--mm-color-focus',
  lightBackground: '--mm-color-light-background',
  lightHover: '--mm-color-light-hover',
  mutedText: '--mm-color-muted-text',
  overlay: '--mm-color-overlay',
  placeholder: '--mm-color-placeholder',
  primary: '--mm-color-primary',
  primaryHover: '--mm-color-primary-hover',
  secondary: '--mm-color-secondary',
  secondaryHover: '--mm-color-secondary-hover',
  surface: '--mm-color-surface',
  surfaceHover: '--mm-color-surface-hover',
  text: '--mm-color-text',
};

const defaultLightTokens: Required<ThemeSwitcherTokens> = {
  controlBorder: '#d0d5dd', controlFilled: '#eef1f2', controlIcon: '#667085', controlSelected: '#f6f6f7', focus: '#6366f1', lightBackground: '#f6f6f7', lightHover: '#e8dfd1', mutedText: '#667085', overlay: 'rgb(12 21 24 / 14%)', placeholder: '#98a2b3', primary: '#003c3a', primaryHover: '#003331', secondary: '#47634c', secondaryHover: '#58775d', surface: '#ffffff', surfaceHover: '#f8fafc', text: '#0c1518',
};

const defaultDarkTokens: Required<ThemeSwitcherTokens> = {
  controlBorder: '#3a4b46', controlFilled: '#1d2a26', controlIcon: '#b0c0ba', controlSelected: '#24443a', focus: '#8eb8ff', lightBackground: '#1b2925', lightHover: '#263b34', mutedText: '#a6b5b0', overlay: 'rgb(0 0 0 / 48%)', placeholder: '#70817b', primary: '#86d8c2', primaryHover: '#a6e5d3', secondary: '#9cc6a9', secondaryHover: '#b2d8bb', surface: '#101816', surfaceHover: '#18221f', text: '#f4f7f6',
};

const translations: Record<Locale, { label: string; light: string; dark: string; system: string }> = {
  en: { label: 'Theme', light: 'Light', dark: 'Dark', system: 'System' },
  uk: { label: 'Тема', light: 'Світла', dark: 'Темна', system: 'Системна' },
  de: { label: 'Design', light: 'Hell', dark: 'Dunkel', system: 'System' },
  fr: { label: 'Thème', light: 'Clair', dark: 'Sombre', system: 'Système' },
};

const modeIcon = (mode: ThemeSwitcherMode) => {
  if (mode === 'light') return <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16"><circle cx="8" cy="8" r="2.8" stroke="currentColor" strokeWidth="1.4" /><path d="M8 1.4v1.3M8 13.3v1.3M1.4 8h1.3M13.3 8h1.3M3.3 3.3l.9.9M11.8 11.8l.9.9M12.7 3.3l-.9.9M4.2 11.8l-.9.9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" /></svg>;
  if (mode === 'dark') return <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16"><path d="M13.1 10.7A5.7 5.7 0 0 1 5.3 2.9 5.8 5.8 0 1 0 13.1 10.7Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" /></svg>;
  return <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16"><rect height="9.2" rx="1.5" stroke="currentColor" strokeWidth="1.3" width="13" x="1.5" y="1.5" /><path d="M5.3 14.2h5.4M8 10.7v3.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.3" /></svg>;
};

function getStoredMode(storageKey: string, fallback: ThemeSwitcherMode) {
  if (typeof window === 'undefined') return fallback;
  const stored = window.localStorage.getItem(storageKey);
  return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : fallback;
}

export function ThemeSwitcher({
  value,
  defaultValue = 'system',
  onChange,
  storageKey = 'mosmox-theme',
  persist = true,
  applyTheme = true,
  options = defaultOptions,
  labels,
  locale,
  lightTokens,
  darkTokens,
  showLabel,
  size,
  variant,
  disabled = false,
  className,
  style,
  ...props
}: ThemeSwitcherProps) {
  const { components, locale: globalLocale } = useConfig();
  const config = components.themeSwitcher;
  const language = translations[locale ?? globalLocale];
  const resolvedSize = size ?? config?.size ?? 'default';
  const resolvedVariant = variant ?? config?.variant ?? 'segmented';
  const resolvedShowLabel = showLabel ?? config?.showLabel ?? true;
  const resolvedOptions = options.length > 0 ? options : defaultOptions;
  const [internalValue, setInternalValue] = useState<ThemeSwitcherMode>(() => persist ? getStoredMode(storageKey, defaultValue) : defaultValue);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>('light');
  const scopeRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<object>({});
  const currentValue = value ?? internalValue;
  const copy = { ...language, ...labels };
  const activeLabel = copy[currentValue];
  const resolvedTheme = currentValue === 'system' ? systemTheme : currentValue;
  const resolvedTokens = useMemo(() => ({
    ...(resolvedTheme === 'dark' ? defaultDarkTokens : defaultLightTokens),
    ...(resolvedTheme === 'dark' ? darkTokens : lightTokens),
  }), [darkTokens, lightTokens, resolvedTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!persist) return;
    window.localStorage.setItem(storageKey, currentValue);
  }, [currentValue, persist, storageKey]);

  useEffect(() => {
    if (!persist) return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== storageKey || (event.newValue !== 'light' && event.newValue !== 'dark' && event.newValue !== 'system')) return;
      if (value === undefined) setInternalValue(event.newValue);
      onChange?.(event.newValue);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [onChange, persist, storageKey, value]);

  useEffect(() => {
    if (!persist) return;
    const handleThemeEvent = (event: Event) => {
      const detail = (event as CustomEvent<{ mode?: ThemeSwitcherMode; source?: object; storageKey?: string }>).detail;
      if (detail?.storageKey !== storageKey || !detail.mode || detail.source === instanceRef.current) return;
      if (value === undefined) setInternalValue(detail.mode);
      onChange?.(detail.mode);
    };
    window.addEventListener('mosmox-theme-change', handleThemeEvent);
    return () => window.removeEventListener('mosmox-theme-change', handleThemeEvent);
  }, [onChange, persist, storageKey, value]);

  useEffect(() => {
    if (!applyTheme || typeof document === 'undefined') return;
    const scope = scopeRef.current?.closest<HTMLElement>('.mm-config-provider') ?? document.documentElement;
    const previousTokens = new Map<string, string>();
    Object.entries(resolvedTokens).forEach(([token, tokenValue]) => {
      const variable = themeTokenVariables[token as ThemeTokenName];
      previousTokens.set(variable, scope.style.getPropertyValue(variable));
      scope.style.setProperty(variable, tokenValue);
    });
    const previousTheme = scope.getAttribute('data-mm-theme');
    const previousColorScheme = scope.style.getPropertyValue('color-scheme');
    scope.setAttribute('data-mm-theme', resolvedTheme);
    scope.style.setProperty('color-scheme', resolvedTheme);
    return () => {
      previousTokens.forEach((tokenValue, variable) => {
        if (tokenValue) scope.style.setProperty(variable, tokenValue);
        else scope.style.removeProperty(variable);
      });
      if (previousTheme) scope.setAttribute('data-mm-theme', previousTheme);
      else scope.removeAttribute('data-mm-theme');
      if (previousColorScheme) scope.style.setProperty('color-scheme', previousColorScheme);
      else scope.style.removeProperty('color-scheme');
    };
  }, [applyTheme, resolvedTheme, resolvedTokens]);

  const selectMode = (nextMode: ThemeSwitcherMode) => {
    if (disabled || !resolvedOptions.includes(nextMode)) return;
    if (value === undefined) setInternalValue(nextMode);
    onChange?.(nextMode);
    if (persist) window.dispatchEvent(new CustomEvent('mosmox-theme-change', { detail: { mode: nextMode, source: instanceRef.current, storageKey } }));
  };

  const cycleMode = () => {
    const currentIndex = resolvedOptions.indexOf(currentValue);
    selectMode(resolvedOptions[(currentIndex + 1) % resolvedOptions.length]);
  };

  const tokenStyle: CSSProperties = {
    ...(config?.radius && { '--mm-theme-switcher-radius': config.radius }),
    ...style,
  } as CSSProperties;

  return <div {...props} ref={scopeRef} aria-label={props['aria-label'] ?? copy.label} className={cx('mm-theme-switcher', `mm-theme-switcher--${resolvedSize}`, `mm-theme-switcher--${resolvedVariant}`, disabled && 'mm-theme-switcher--disabled', className)} style={tokenStyle}>
    {resolvedVariant === 'button' ? <button aria-label={`${copy.label}: ${activeLabel}`} aria-pressed="true" className="mm-theme-switcher__button" disabled={disabled} type="button" onClick={cycleMode}>{modeIcon(currentValue)}{resolvedShowLabel && <span>{activeLabel}</span>}</button> : <div aria-label={copy.label} className="mm-theme-switcher__segments" role="group">{resolvedOptions.map((mode) => <button aria-pressed={currentValue === mode} className={cx('mm-theme-switcher__segment', currentValue === mode && 'is-active')} disabled={disabled} key={mode} type="button" onClick={() => selectMode(mode)}>{modeIcon(mode)}{resolvedShowLabel && <span>{copy[mode]}</span>}</button>)}</div>}
  </div>;
}
