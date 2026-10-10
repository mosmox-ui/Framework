import type { HTMLAttributes, ReactNode } from 'react';
import './Divider.css';
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted' | 'double';
export type DividerTone = 'default' | 'muted' | 'strong' | 'primary';
export type DividerSize = 'sm' | 'default' | 'lg';
export type DividerLabelPosition = 'start' | 'center' | 'end';
export type DividerProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: ReactNode;
    contentPadding?: string;
    decorative?: boolean;
    labelPosition?: DividerLabelPosition;
    orientation?: DividerOrientation;
    size?: DividerSize;
    tone?: DividerTone;
    variant?: DividerVariant;
};
export declare function Divider({ children, className, contentPadding, decorative, labelPosition, orientation, size, style, tone, variant, ...rest }: DividerProps): import("react").JSX.Element;
