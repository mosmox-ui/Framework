import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';
import './Button.css';
export type ButtonVariant = 'primary' | 'secondary' | 'light' | 'outline' | 'dashed' | 'text' | 'link' | 'danger' | 'success';
export type ButtonSize = 'xs' | 'sm' | 'default';
export type ButtonLoadingMode = 'inline' | 'replace';
type SharedButtonProps = {
    children?: ReactNode;
    className?: string;
    circle?: boolean;
    disableHover?: boolean;
    fullWidth?: boolean;
    hoverScale?: boolean;
    iconOnly?: boolean;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    loading?: boolean;
    loadingMode?: ButtonLoadingMode;
    loadingLabel?: string;
    progress?: number;
    win?: string;
    mac?: string;
    size?: ButtonSize;
    variant?: ButtonVariant;
};
export type ButtonProps = SharedButtonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedButtonProps> & {
    href?: never;
};
export type ButtonLinkProps = SharedButtonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedButtonProps> & {
    href: string;
};
export type AnyButtonProps = ButtonProps | ButtonLinkProps;
export declare const Button: import("react").NamedExoticComponent<AnyButtonProps>;
export {};
