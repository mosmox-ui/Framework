import { CaretRight, House, DotsThree } from '../../icons';
import { useState, type MouseEvent, type ReactNode } from 'react';
import './Breadcrumbs.css';

export type BreadcrumbItem = {
  href?: string;
  icon?: ReactNode;
  label: ReactNode;
  current?: boolean;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
};

export type BreadcrumbsSize = 'xs' | 'sm' | 'default';
export type BreadcrumbsVariant = 'default' | 'muted' | 'pill';

export type BreadcrumbsProps = {
  'aria-label'?: string;
  className?: string;
  currentLabel?: ReactNode;
  ellipsisLabel?: ReactNode;
  expandLabel?: string;
  homeIcon?: ReactNode;
  hoverBackground?: boolean;
  hoverLift?: boolean;
  hoverUnderline?: boolean;
  id?: string;
  items: BreadcrumbItem[];
  maxItems?: number;
  onItemClick?: (item: BreadcrumbItem, index: number, event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  renderItem?: (item: BreadcrumbItem, index: number, current: boolean) => ReactNode;
  separator?: ReactNode;
  showHouse?: boolean;
  size?: BreadcrumbsSize;
  variant?: BreadcrumbsVariant;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function Breadcrumbs({
  'aria-label': ariaLabel = 'Breadcrumbs',
  className,
  currentLabel,
  ellipsisLabel = <DotsThree aria-hidden="true" size={16} />,
  expandLabel = 'Show all breadcrumbs',
  homeIcon = <House aria-hidden="true" size={16} />,
  hoverBackground = true,
  hoverLift = false,
  hoverUnderline = false,
  id,
  items,
  maxItems,
  onItemClick,
  renderItem,
  separator = <CaretRight aria-hidden="true" size={16} />,
  showHouse = false,
  size = 'default',
  variant = 'default',
}: BreadcrumbsProps) {
  const [expanded, setExpanded] = useState(false);
  const hasCurrent = items.some((item) => item.current);
  const lastIndex = items.length - 1;
  const visibleItems = currentLabel !== undefined && items.length > 0
    ? [...items.slice(0, -1), { ...items[lastIndex], label: currentLabel, current: true }]
    : items;
  const shouldCollapse = Boolean(maxItems && maxItems > 2 && visibleItems.length > maxItems && !expanded);
  const collapsedItems = shouldCollapse
    ? [visibleItems[0], { label: ellipsisLabel, disabled: true }, visibleItems[visibleItems.length - 1]]
    : visibleItems;
  const interactiveClass = cx(
    hoverBackground && 'mm-breadcrumbs--hover-background',
    hoverLift && 'mm-breadcrumbs--hover-lift',
    hoverUnderline && 'mm-breadcrumbs--hover-underline',
  );

  if (visibleItems.length === 0) return null;

  return (
    <nav aria-label={ariaLabel} className={cx('mm-breadcrumbs', `mm-breadcrumbs--${size}`, `mm-breadcrumbs--${variant}`, className)} id={id}>
      <ol className="mm-breadcrumbs__list">
        {showHouse && <li className="mm-breadcrumbs__item">
          <a aria-label="House" className={cx('mm-breadcrumbs__link', 'mm-breadcrumbs__home', interactiveClass)} href="/">
            {homeIcon}
          </a>
          {separator && <span aria-hidden="true" className="mm-breadcrumbs__separator">{separator}</span>}
        </li>}
        {collapsedItems.map((item, index) => {
          const originalIndex = visibleItems.indexOf(item);
          const current = item.current ?? (!hasCurrent && originalIndex === lastIndex);
          const isEllipsis = shouldCollapse && index === 1;
          const isLast = index === collapsedItems.length - 1;
          const handleClick = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
            if (isEllipsis) {
              event.preventDefault();
              setExpanded(true);
              return;
            }
            item.onClick?.(event);
            onItemClick?.(item, originalIndex, event);
          };
          return <li className={cx('mm-breadcrumbs__item', current && 'mm-breadcrumbs__item--current')} key={`${index}-${String(item.label)}`}>
            {renderItem ? renderItem(item, originalIndex, current) : isEllipsis ? <button aria-label={expandLabel} className={cx('mm-breadcrumbs__ellipsis', interactiveClass)} onClick={handleClick} type="button">{ellipsisLabel}</button> : item.disabled ? <span aria-disabled="true" className="mm-breadcrumbs__link mm-breadcrumbs__link--disabled">{item.icon}{item.label}</span> : current ? <span aria-current="page" className="mm-breadcrumbs__link mm-breadcrumbs__link--current">{item.icon}{item.label}</span> : <a className={cx('mm-breadcrumbs__link', interactiveClass)} href={item.href ?? '#'} onClick={handleClick}>{item.icon}{item.label}</a>}
            {!isLast && separator && <span aria-hidden="true" className="mm-breadcrumbs__separator">{separator}</span>}
          </li>;
        })}
      </ol>
    </nav>
  );
}
