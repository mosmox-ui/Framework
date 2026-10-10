import { type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import './Grid.css';

export type GridBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type GridAlign = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
export type GridJustify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
export type GridGutter = number | string | [number | string, number | string];
export type GridColConfig = { span?: number; offset?: number; order?: number; pull?: number; push?: number; flex?: string | number; hidden?: boolean };
export type GridResponsive = number | GridColConfig;

export type GridProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: ReactNode;
  fluid?: boolean;
  maxWidth?: number | string;
};

export type RowProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: ReactNode;
  gutter?: GridGutter;
  align?: GridAlign;
  justify?: GridJustify;
  wrap?: boolean;
};

export type ColProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: ReactNode;
  span?: number;
  offset?: number;
  order?: number;
  pull?: number;
  push?: number;
  flex?: string | number;
  xs?: GridResponsive;
  sm?: GridResponsive;
  md?: GridResponsive;
  lg?: GridResponsive;
  xl?: GridResponsive;
  xxl?: GridResponsive;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const cssLength = (value: number | string) => typeof value === 'number' ? `${value}px` : value;
const clampSpan = (value = 24) => Math.min(24, Math.max(0, value));
const responsiveBreakpoints: GridBreakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

function responsiveConfig(value: GridResponsive | undefined): GridColConfig | undefined {
  return typeof value === 'number' ? { span: value } : value;
}

function colVariables(config: GridColConfig | undefined) {
  if (!config) return {};
  return {
    ...(config.span !== undefined && { '--mm-grid-span': clampSpan(config.span) }),
    ...(config.offset !== undefined && { '--mm-grid-offset': clampSpan(config.offset) }),
    ...(config.order !== undefined && { '--mm-grid-order': config.order }),
    ...(config.pull !== undefined && { '--mm-grid-pull': clampSpan(config.pull) }),
    ...(config.push !== undefined && { '--mm-grid-push': clampSpan(config.push) }),
    ...(config.flex !== undefined && { '--mm-grid-flex': typeof config.flex === 'number' ? String(config.flex) : config.flex }),
  } as CSSProperties;
}

export function Grid({ children, fluid = false, maxWidth = 1200, className, style, ...rest }: GridProps) {
  return <div className={cx('mm-grid', fluid && 'mm-grid--fluid', className)} style={{ '--mm-grid-max-width': cssLength(maxWidth), ...style } as CSSProperties} {...rest}>{children}</div>;
}

export function Row({ children, gutter = 0, align = 'stretch', justify = 'flex-start', wrap = true, className, style, ...rest }: RowProps) {
  const [horizontal, vertical] = Array.isArray(gutter) ? gutter : [gutter, gutter];
  return <div className={cx('mm-grid__row', `mm-grid__row--align-${align}`, `mm-grid__row--justify-${justify}`, !wrap && 'mm-grid__row--nowrap', className)} style={{ '--mm-grid-gutter-x': cssLength(horizontal), '--mm-grid-gutter-y': cssLength(vertical), ...style } as CSSProperties} {...rest}>{children}</div>;
}

export function Col({ children, span = 24, offset = 0, order = 0, pull = 0, push = 0, flex, xs, sm, md, lg, xl, xxl, className, style, ...rest }: ColProps) {
  const baseConfig = { span, offset, order, pull, push, flex };
  const responsiveValues: Partial<Record<GridBreakpoint, GridColConfig | undefined>> = { xs: responsiveConfig(xs), sm: responsiveConfig(sm), md: responsiveConfig(md), lg: responsiveConfig(lg), xl: responsiveConfig(xl), xxl: responsiveConfig(xxl) };
  let currentConfig = baseConfig;
  const responsiveStyles = responsiveBreakpoints.reduce((variables, breakpoint) => {
    currentConfig = { ...currentConfig, ...(responsiveValues[breakpoint] ?? {}) };
    const current = colVariables(currentConfig) as Record<string, string | number>;
    Object.entries(current).forEach(([key, value]) => { variables[`--mm-grid-${breakpoint}${key.replace('--mm-grid', '')}`] = value; });
    return variables;
  }, {} as Record<string, string | number>);
  const hiddenBreakpoints = responsiveBreakpoints.filter((breakpoint) => responsiveValues[breakpoint]?.hidden).reduce((value, breakpoint) => ({ ...value, [breakpoint]: 'true' }), {} as Record<string, string>);
  return <div className={cx('mm-grid__col', className)} data-mm-grid-hidden-lg={hiddenBreakpoints.lg} data-mm-grid-hidden-md={hiddenBreakpoints.md} data-mm-grid-hidden-sm={hiddenBreakpoints.sm} data-mm-grid-hidden-xl={hiddenBreakpoints.xl} data-mm-grid-hidden-xs={hiddenBreakpoints.xs} data-mm-grid-hidden-xxl={hiddenBreakpoints.xxl} style={{ ...colVariables(baseConfig), ...responsiveStyles, ...style } as CSSProperties} {...rest}>{children}</div>;
}
