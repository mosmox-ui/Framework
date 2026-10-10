import type { CSSProperties, ReactNode } from 'react';
import { createContext, useContext } from 'react';
import type { FileUploadCropAspect, FileUploadEditorControl } from '../FileUpload';
import '../../../../theme/src/tokens.css';

export type ThemeConfig = {
  colors?: Partial<{
    dangerBackground: string;
    danger: string;
    dangerHover: string;
    dangerText: string;
    controlBorder: string;
    controlFilled: string;
    controlSelected: string;
    controlIcon: string;
    focus: string;
    link: string;
    lightBackground: string;
    lightHover: string;
    mutedText: string;
    overlay: string;
    placeholder: string;
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
    success: string;
    successHover: string;
    surface: string;
    surfaceHover: string;
    text: string;
    warning: string;
    warningHover: string;
    warningText: string;
  }>;
  radius?: string;
  typography?: Partial<{
    fontFamily: string;
    fontWeightMedium: number;
    fontWeightLight: number;
    fontWeightNormal: number;
  }>;
};

export type ButtonConfig = Partial<{
  gap: string;
  iconSize: string;
  radius: string;
}>;

export type ButtonMenuConfig = Partial<{
  closeOnEscape: boolean;
  closeOnOutsideClick: boolean;
  closeOnSelect: boolean;
  matchTriggerWidth: boolean;
  menuWidth: number | string;
  placement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
}>;

export type ConfirmationDialogConfig = Partial<{
  cancelLabel: string;
  closeButton: boolean;
  closeOnOverlayClick: boolean;
  confirmLabel: string;
  intent: 'default' | 'warning' | 'danger';
  size: 'xs' | 'sm' | 'default' | 'lg' | 'xl' | 'full';
}>;

export type BannerConfig = Partial<{
  layout: 'inline' | 'stacked';
  position: 'static' | 'sticky-top' | 'sticky-bottom';
  size: 'sm' | 'default' | 'lg';
  variant: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
}>;

export type ActivityFeedConfig = Partial<{
  horizontalPadding: number | string;
  verticalPadding: number | string;
  showConnector: boolean;
  size: 'sm' | 'default' | 'lg';
  variant: 'default' | 'compact' | 'bordered' | 'card';
}>;

export type SkeletonConfig = Partial<{
  animation: 'pulse' | 'wave' | 'none';
  baseColor: string;
  highlightColor: string;
  radius: string;
}>;

export type CodeBlockConfig = Partial<{
  copyable: boolean;
  fontSize: string;
  radius: string;
  theme: 'light' | 'dark' | 'black' | 'github' | 'solarized' | 'dracula' | 'nord' | 'monokai' | 'ocean' | 'high-contrast';
}>;

export type ListConfig = Partial<{
  gap: string;
  size: 'sm' | 'default' | 'lg';
  variant: 'plain' | 'divided' | 'bordered' | 'card';
}>;

export type TabsConfig = Partial<{
  fullWidth: boolean;
  orientation: 'horizontal' | 'vertical';
  size: 'sm' | 'default' | 'lg';
}>;

export type EmptyConfig = Partial<{
  bordered: boolean;
  size: 'sm' | 'default';
}>;

export type CookieBannerConfig = Partial<{
  layout: 'inline' | 'stacked';
  presentation: 'bar' | 'card';
  position: 'fixed' | 'sticky' | 'static';
  placement: 'top' | 'bottom';
  radius: number | string;
  size: 'sm' | 'default';
  surfaceColor: string;
  textColor: string;
  borderColor: string;
  variant: 'default' | 'soft' | 'contrast';
  showPreferences: boolean;
}>;

export type PricingTableConfig = Partial<{
  columns: number;
  size: 'sm' | 'default' | 'lg';
  variant: 'cards' | 'bordered' | 'flat' | 'spotlight' | 'compact';
}>;

export type ThemeSwitcherConfig = Partial<{
  radius: string;
  showLabel: boolean;
  size: 'sm' | 'default';
  variant: 'button' | 'segmented';
}>;

export type ScrollAreaConfig = Partial<{
  fadeEdges: boolean;
  orientation: 'vertical' | 'horizontal' | 'both';
  scrollbar: 'auto' | 'always' | 'hover' | 'hidden';
  size: 'sm' | 'default' | 'lg';
  variant: 'plain' | 'bordered' | 'soft';
}>;

export type FormConfig = Partial<{
  layout: 'vertical' | 'horizontal' | 'inline';
  size: 'sm' | 'default' | 'lg';
  validateOn: 'change' | 'blur' | 'submit' | 'change-and-blur';
}>;

export type ToolbarConfig = Partial<{
  density: 'compact' | 'comfortable';
  orientation: 'horizontal' | 'vertical';
  size: 'sm' | 'default';
  variant: 'surface' | 'bordered' | 'floating' | 'plain' | 'primary' | 'secondary' | 'light' | 'outline' | 'dashed' | 'text' | 'link' | 'danger' | 'success';
}>;

export type NavigationMenuConfig = Partial<{
  collapseSubmenus: boolean;
  closeSubmenusOnMouseLeave: boolean;
  gap: number | string;
  orientation: 'horizontal' | 'vertical';
  size: 'sm' | 'default' | 'lg';
  submenuCloseDelay: number;
  submenuBehavior: 'click' | 'hover';
  variant: 'plain' | 'soft';
}>;

export type ProfileMenuConfig = Partial<{
  display: 'full' | 'compact' | 'avatar';
  matchTriggerWidth: boolean;
  menuWidth: number | string;
  placement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  size: 'xs' | 'sm' | 'default';
}>;

export type LightboxConfig = Partial<{
  fit: 'contain' | 'cover' | 'actual';
  showCaptions: boolean;
  showThumbnails: boolean;
  showToolbar: boolean;
  variant: 'dark' | 'glass' | 'light';
}>;

export type FileUploadConfig = Partial<{
  cropAspect: 'free' | '1:1' | '3:4' | '4:3' | '16:9' | '9:16' | '4:5' | '5:4';
  cropEnabled: boolean;
  cropShape: 'rectangle' | 'circle';
  editorAspectRatios: FileUploadCropAspect[];
  editorControls: FileUploadEditorControl[];
  preview: 'auto' | 'image' | 'none';
  variant: 'dropzone' | 'compact' | 'button';
}>;

export type TableConfig = Partial<{
  density: 'compact' | 'comfortable' | 'spacious';
  size: 'default' | 'small';
  stickyHeader: boolean;
  variant: 'plain' | 'bordered' | 'striped' | 'card';
}>;

export type RadioCardConfig = Partial<{
  indicator: 'start' | 'end' | 'top' | 'none';
  size: 'xs' | 'sm' | 'default';
  variant: 'outline' | 'soft' | 'filled' | 'elevated';
}>;

export type Locale = 'en' | 'uk' | 'de' | 'fr';

export type ComponentConfig = {
  activityFeed?: ActivityFeedConfig;
  banner?: BannerConfig;
  button?: ButtonConfig;
  buttonMenu?: ButtonMenuConfig;
  confirmationDialog?: ConfirmationDialogConfig;
  skeleton?: SkeletonConfig;
  codeBlock?: CodeBlockConfig;
  list?: ListConfig;
  tabs?: TabsConfig;
  empty?: EmptyConfig;
  cookieBanner?: CookieBannerConfig;
  pricingTable?: PricingTableConfig;
  table?: TableConfig;
  radioCard?: RadioCardConfig;
  themeSwitcher?: ThemeSwitcherConfig;
  scrollArea?: ScrollAreaConfig;
  form?: FormConfig;
  toolbar?: ToolbarConfig;
  navigationMenu?: NavigationMenuConfig;
  profileMenu?: ProfileMenuConfig;
  lightbox?: LightboxConfig;
  fileUpload?: FileUploadConfig;
};

export type ConfigProviderProps = {
  children: ReactNode;
  components?: ComponentConfig;
  locale?: Locale;
  theme?: ThemeConfig;
};

type ConfigContextValue = {
  components: ComponentConfig;
  locale: Locale;
};

type CSSVariables = CSSProperties & Record<`--${string}`, string | number | undefined>;

const ConfigContext = createContext<ConfigContextValue>({ components: {}, locale: 'en' });

const themeVariables = (theme: ThemeConfig): CSSVariables => ({
  ...(theme.colors?.dangerBackground && { '--mm-color-danger-background': theme.colors.dangerBackground }),
  ...(theme.colors?.danger && { '--mm-color-danger': theme.colors.danger }),
  ...(theme.colors?.dangerHover && { '--mm-color-danger-hover': theme.colors.dangerHover }),
  ...(theme.colors?.dangerText && { '--mm-color-danger-text': theme.colors.dangerText }),
  ...(theme.colors?.controlBorder && { '--mm-color-control-border': theme.colors.controlBorder }),
  ...(theme.colors?.controlFilled && { '--mm-color-control-filled': theme.colors.controlFilled }),
  ...(theme.colors?.controlSelected && { '--mm-color-control-selected': theme.colors.controlSelected }),
  ...(theme.colors?.controlIcon && { '--mm-color-control-icon': theme.colors.controlIcon }),
  ...(theme.colors?.focus && { '--mm-color-focus': theme.colors.focus }),
  ...(theme.colors?.link && { '--mm-color-link': theme.colors.link }),
  ...(theme.colors?.lightBackground && { '--mm-color-light-background': theme.colors.lightBackground }),
  ...(theme.colors?.lightHover && { '--mm-color-light-hover': theme.colors.lightHover }),
  ...(theme.colors?.mutedText && { '--mm-color-muted-text': theme.colors.mutedText }),
  ...(theme.colors?.overlay && { '--mm-color-overlay': theme.colors.overlay }),
  ...(theme.colors?.placeholder && { '--mm-color-placeholder': theme.colors.placeholder }),
  ...(theme.colors?.primary && { '--mm-color-primary': theme.colors.primary }),
  ...(theme.colors?.primaryHover && { '--mm-color-primary-hover': theme.colors.primaryHover }),
  ...(theme.colors?.secondary && { '--mm-color-secondary': theme.colors.secondary }),
  ...(theme.colors?.secondaryHover && { '--mm-color-secondary-hover': theme.colors.secondaryHover }),
  ...(theme.colors?.success && { '--mm-color-success': theme.colors.success }),
  ...(theme.colors?.successHover && { '--mm-color-success-hover': theme.colors.successHover }),
  ...(theme.colors?.surface && { '--mm-color-surface': theme.colors.surface }),
  ...(theme.colors?.surfaceHover && { '--mm-color-surface-hover': theme.colors.surfaceHover }),
  ...(theme.colors?.text && { '--mm-color-text': theme.colors.text }),
  ...(theme.colors?.warning && { '--mm-color-warning': theme.colors.warning }),
  ...(theme.colors?.warningHover && { '--mm-color-warning-hover': theme.colors.warningHover }),
  ...(theme.colors?.warningText && { '--mm-color-warning-text': theme.colors.warningText }),
  ...(theme.radius && { '--mm-radius-control': theme.radius }),
  ...(theme.typography?.fontFamily && { '--mm-font-family-sans': theme.typography.fontFamily }),
  ...(theme.typography?.fontWeightMedium && { '--mm-font-weight-medium': theme.typography.fontWeightMedium }),
  ...(theme.typography?.fontWeightLight && { '--mm-font-weight-light': theme.typography.fontWeightLight }),
  ...(theme.typography?.fontWeightNormal && { '--mm-font-weight-normal': theme.typography.fontWeightNormal }),
});

export function ConfigProvider({ children, components = {}, locale = 'en', theme = {} }: ConfigProviderProps) {
  return (
    <ConfigContext.Provider value={{ components, locale }}>
      <div className="mm-config-provider" style={themeVariables(theme)}>{children}</div>
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}
