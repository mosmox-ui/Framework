import type { AnchorHTMLAttributes, ReactNode } from 'react';
import './Link.css';
export type LinkVariant = 'default' | 'subtle' | 'muted' | 'underline';
export type LinkSize = 'sm' | 'default' | 'lg';
export type LinkExternalIcon = 'auto' | 'always' | 'never';
export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
    children?: ReactNode;
    color?: string;
    disabled?: boolean;
    external?: boolean;
    externalIcon?: LinkExternalIcon;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    loading?: boolean;
    newTab?: boolean;
    size?: LinkSize;
    variant?: LinkVariant;
};
export declare function Link({ children, className, color, disabled, external, externalIcon, iconLeft, iconRight, loading, newTab, onClick, rel, size, style, tabIndex, target, variant, ...rest }: LinkProps): import("react").JSX.Element;
