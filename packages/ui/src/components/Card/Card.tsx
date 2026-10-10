import { SpinnerGap } from '../../icons';
import { memo, useId, type CSSProperties, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import './Card.css';

export type CardSize = 'sm' | 'default' | 'lg';
export type CardVariant = 'default' | 'outlined' | 'filled' | 'ghost' | 'elevated' | 'flat';
export type CardOrientation = 'vertical' | 'horizontal';
export type CardMediaPosition = 'top' | 'bottom' | 'start' | 'end' | 'background';
export type CardBackgroundContentPosition = 'top' | 'bottom' | 'left' | 'right';
export type CardColumnSizing = 'equal' | 'content' | 'fixed' | 'between' | 'flex';
export type CardColumnAlign = 'start' | 'center' | 'end';
export type CardColumn = { key?: string; label?: ReactNode; content: ReactNode; width?: number | string; align?: CardColumnAlign };
export type CardElement = 'article' | 'div' | 'section';

export type CardProps = {
  'aria-label'?: string;
  actions?: ReactNode;
  as?: CardElement;
  badge?: ReactNode;
  backgroundContentPosition?: CardBackgroundContentPosition;
  backgroundContentWidth?: number | string;
  children?: ReactNode;
  columns?: CardColumn[];
  columnHeaders?: boolean;
  columnSizing?: CardColumnSizing;
  columnWidths?: Array<number | string>;
  className?: string;
  description?: ReactNode;
  disabled?: boolean;
  footer?: ReactNode;
  fullWidth?: boolean;
  header?: ReactNode;
  href?: string;
  interactive?: boolean;
  layout?: 'stacked' | 'row';
  loading?: boolean;
  media?: ReactNode;
  mediaPosition?: CardMediaPosition;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
  orientation?: CardOrientation;
  selected?: boolean;
  size?: CardSize;
  title?: ReactNode;
  titleIcon?: ReactNode;
  variant?: CardVariant;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

function renderCard({
  'aria-label': ariaLabel,
  actions,
  as: Element = 'article',
  badge,
  backgroundContentPosition = 'top',
  backgroundContentWidth = '100%',
  children,
  className,
  description,
  disabled = false,
  footer,
  fullWidth = false,
  header,
  href,
  interactive,
  layout = 'stacked',
  loading = false,
  media,
  mediaPosition,
  columns,
  columnHeaders = false,
  columnSizing = 'flex',
  columnWidths,
  onClick,
  onKeyDown,
  orientation = 'vertical',
  selected = false,
  size = 'default',
  title,
  titleIcon,
  variant = 'default',
}: CardProps, titleId?: string, descriptionId?: string) {
  const isLink = Boolean(href) && !disabled;
  const resolvedMediaPosition = mediaPosition ?? (orientation === 'horizontal' ? 'start' : 'top');
  const isBackgroundMedia = orientation === 'vertical' && resolvedMediaPosition === 'background';
  const isActionable = (interactive ?? Boolean(onClick || href)) || isLink;
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled || isLink || !isActionable || !onClick) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(event as unknown as MouseEvent<HTMLElement>);
    }
  };
  const headerContent = header ?? ((title || description || titleIcon || actions || badge) ? <div className="mm-card__header">
    <div className="mm-card__heading">
      {(title || titleIcon) && <div className="mm-card__title-row">{titleIcon && <span aria-hidden="true" className="mm-card__title-icon">{titleIcon}</span>}{title && <h3 className="mm-card__title" id={titleId}>{title}</h3>}</div>}
      {description && <p className="mm-card__description" id={descriptionId}>{description}</p>}
    </div>
    {(badge || actions) && <div className="mm-card__header-actions">{badge && <span className="mm-card__badge">{badge}</span>}{actions && <div className="mm-card__actions">{actions}</div>}</div>}
  </div> : null);
  const columnTemplate = columnWidths?.length ? columnWidths.map((width) => typeof width === 'number' ? `${width}px` : width).join(' ') : columns?.map((column) => column.width ? (typeof column.width === 'number' ? `${column.width}px` : column.width) : 'minmax(0, 1fr)').join(' ');
  const rowColumns = layout === 'row' && columns?.length ? <div className="mm-card__columns" role="row" style={{ '--mm-card-columns': columnTemplate ?? (columnSizing === 'equal' ? `repeat(${columns.length}, minmax(0, 1fr))` : columnSizing === 'content' ? `repeat(${columns.length}, auto)` : columnSizing === 'between' && columns.length >= 3 ? `auto minmax(0, 1fr) auto` : `repeat(${columns.length}, minmax(0, 1fr))`) } as CSSProperties}>{columns.map((column, index) => <div className={cx('mm-card__column', `mm-card__column--${column.align ?? 'start'}`)} key={column.key ?? index} role="cell">{columnHeaders && column.label && <span className="mm-card__column-label">{column.label}</span>}<span className="mm-card__column-content">{column.content}</span></div>)}</div> : null;
  const cardContent = <>
    {layout === 'row' ? rowColumns : <>{headerContent}{children !== undefined && <div className="mm-card__body">{children}</div>}</>}
    {footer && <div className="mm-card__footer">{footer}</div>}
  </>;
  const content = <>
    {media && <div className="mm-card__media">{media}</div>}
    {isBackgroundMedia ? <div className={cx('mm-card__background-content', `mm-card__background-content--${backgroundContentPosition}`)} style={{ '--mm-card-background-content-width': backgroundContentWidth === 'full' ? '100%' : typeof backgroundContentWidth === 'number' ? `${backgroundContentWidth}px` : backgroundContentWidth } as CSSProperties}>{cardContent}</div> : cardContent}
    {loading && <div aria-label="Loading" className="mm-card__loading" role="status"><SpinnerGap aria-hidden="true" size={18} /></div>}
  </>;
  const commonProps = {
    'aria-describedby': descriptionId,
    'aria-disabled': disabled || undefined,
    'aria-label': ariaLabel,
    'aria-labelledby': titleId,
    className: cx('mm-card', `mm-card--${variant}`, `mm-card--${size}`, `mm-card--${orientation}`, `mm-card--media-${resolvedMediaPosition}`, layout === 'row' && 'mm-card--row', Boolean(media) && 'mm-card--with-media', fullWidth && 'mm-card--full-width', isActionable && 'mm-card--interactive', selected && 'mm-card--selected', disabled && 'mm-card--disabled', loading && 'mm-card--loading', className),
    onClick: disabled ? undefined : onClick,
    onKeyDown: handleKeyDown,
  };

  if (isLink) return <a {...commonProps} href={href}>{content}</a>;
  return <Element {...commonProps} role={isActionable ? 'button' : undefined} tabIndex={isActionable && !disabled ? 0 : undefined}>{content}</Element>;
}

const CardWithA11yIds = memo(function CardWithA11yIds(props: CardProps) {
  const generatedId = useId();
  return renderCard(props, props.title ? `mm-card-${generatedId}-title` : undefined, props.description ? `mm-card-${generatedId}-description` : undefined);
});

export const Card = memo(function Card(props: CardProps) {
  if (props.title || props.description) return <CardWithA11yIds {...props} />;
  return renderCard(props);
});
