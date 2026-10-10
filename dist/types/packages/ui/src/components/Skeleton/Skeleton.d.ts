import type { HTMLAttributes } from 'react';
import './Skeleton.css';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';
export type SkeletonVariant = 'text' | 'rectangular' | 'circular';
export type SkeletonSize = 'sm' | 'default' | 'lg';
export type SkeletonProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    animation?: SkeletonAnimation;
    height?: number | string;
    label?: string;
    lastLineWidth?: number | string;
    lines?: number;
    radius?: number | string;
    size?: SkeletonSize;
    tone?: 'default' | 'subtle' | 'strong';
    variant?: SkeletonVariant;
    width?: number | string;
};
export declare function Skeleton({ animation, className, height, label, lastLineWidth, lines, radius, size, style, tone, variant, width, ...rest }: SkeletonProps): import("react").JSX.Element;
