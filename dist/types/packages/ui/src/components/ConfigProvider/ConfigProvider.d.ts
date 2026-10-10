import type { ReactNode } from 'react';
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
export declare function ConfigProvider({ children, components, locale, theme }: ConfigProviderProps): import("react").JSX.Element;
export declare function useConfig(): ConfigContextValue;
export {};
