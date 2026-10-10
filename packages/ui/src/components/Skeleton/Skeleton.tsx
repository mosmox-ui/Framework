import type { CSSProperties, HTMLAttributes } from 'react';
import { useConfig } from '../ConfigProvider';
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

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const cssLength = (value?: number | string) => typeof value === 'number' ? `${value}px` : value;

export function Skeleton({ animation, className, height, label = 'Loading', lastLineWidth = '72%', lines = 1, radius, size = 'default', style, tone = 'default', variant = 'rectangular', width, ...rest }: SkeletonProps) {
  const { components } = useConfig();
  const config = components.skeleton;
  const activeAnimation = animation ?? config?.animation ?? 'pulse';
  const safeLines = Math.max(1, Math.floor(lines));
  const styleVariables = {
    ...(config?.baseColor && { '--mm-skeleton-base': config.baseColor }),
    ...(config?.highlightColor && { '--mm-skeleton-highlight': config.highlightColor }),
    ...(config?.radius && { '--mm-skeleton-radius': config.radius }),
    ...(radius !== undefined && { '--mm-skeleton-radius': cssLength(radius) }),
    ...(width !== undefined && { '--mm-skeleton-width': cssLength(width) }),
    ...(height !== undefined && { '--mm-skeleton-height': cssLength(height) }),
    ...style,
  } as CSSProperties;
  const classes = cx('mm-skeleton', `mm-skeleton--${variant}`, `mm-skeleton--${size}`, `mm-skeleton--${tone}`, `mm-skeleton--${activeAnimation}`, className);
  const lineStyle = (index: number) => index === safeLines - 1 && safeLines > 1 ? { width: cssLength(lastLineWidth) } : undefined;
  return <div aria-busy="true" aria-label={label} className={classes} role="status" style={styleVariables} {...rest}>
    {variant === 'text' ? Array.from({ length: safeLines }, (_, index) => <span className="mm-skeleton__line" key={index} style={lineStyle(index)} />) : <span className="mm-skeleton__shape" />}
  </div>;
}
