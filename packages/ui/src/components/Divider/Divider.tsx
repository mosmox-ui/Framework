import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import './Divider.css';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted' | 'double';
export type DividerTone = 'default' | 'muted' | 'strong' | 'primary';
export type DividerSize = 'sm' | 'default' | 'lg';
export type DividerLabelPosition = 'start' | 'center' | 'end';
export type DividerProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & { children?: ReactNode; contentPadding?: string; decorative?: boolean; labelPosition?: DividerLabelPosition; orientation?: DividerOrientation; size?: DividerSize; tone?: DividerTone; variant?: DividerVariant };

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function Divider({ children, className, contentPadding, decorative = false, labelPosition = 'center', orientation = 'horizontal', size = 'default', style, tone = 'default', variant = 'solid', ...rest }: DividerProps) {
  const labelled = children !== undefined && orientation === 'horizontal';
  const dividerStyle = contentPadding ? { ...style, '--mm-divider-content-padding': contentPadding } as CSSProperties : style;
  return <div aria-hidden={decorative || undefined} aria-orientation={decorative ? undefined : orientation} className={cx('mm-divider', `mm-divider--${orientation}`, `mm-divider--${size}`, `mm-divider--${tone}`, `mm-divider--${variant}`, labelled && `mm-divider--label-${labelPosition}`, className)} role={decorative ? undefined : 'separator'} style={dividerStyle} {...rest}>
    {labelled ? <><span className="mm-divider__line" /><span className="mm-divider__label">{children}</span><span className="mm-divider__line" /></> : <span className="mm-divider__line" />}
  </div>;
}
