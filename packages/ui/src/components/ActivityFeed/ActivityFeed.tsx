import { Check, CaretDown, CaretRight, Circle, Clock, Info, Warning, X } from '../../icons';
import { useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import { useConfig } from '../ConfigProvider';
import './ActivityFeed.css';

export type ActivityFeedSize = 'sm' | 'default' | 'lg';
export type ActivityFeedVariant = 'default' | 'compact' | 'bordered' | 'card';
export type ActivityFeedStatus = 'default' | 'pending' | 'success' | 'warning' | 'danger';

export type ActivityFeedItem = {
  key: string;
  title: ReactNode;
  description?: ReactNode;
  timestamp?: ReactNode;
  actor?: ReactNode;
  avatar?: ReactNode;
  icon?: ReactNode;
  status?: ActivityFeedStatus;
  metadata?: ReactNode;
  content?: ReactNode;
  details?: ReactNode;
  actions?: ReactNode;
  group?: ReactNode;
  href?: string;
  unread?: boolean;
  disabled?: boolean;
};

export type ActivityFeedProps = {
  items?: ActivityFeedItem[];
  children?: ReactNode;
  size?: ActivityFeedSize;
  variant?: ActivityFeedVariant;
  reverse?: boolean;
  showConnector?: boolean;
  showGroups?: boolean;
  collapsible?: boolean;
  activeKey?: string;
  defaultActiveKey?: string;
  onActiveChange?: (key: string, item: ActivityFeedItem) => void;
  expandedKeys?: string[];
  defaultExpandedKeys?: string[];
  onExpandedChange?: (keys: string[], item: ActivityFeedItem) => void;
  onItemClick?: (item: ActivityFeedItem, index: number) => void;
  loading?: boolean;
  emptyState?: ReactNode;
  maxHeight?: number | string;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

const statusIcon = (status?: ActivityFeedStatus) => {
  if (status === 'success') return <Check aria-hidden="true" size={14} />;
  if (status === 'pending') return <Clock aria-hidden="true" size={14} />;
  if (status === 'warning') return <Warning aria-hidden="true" size={14} />;
  if (status === 'danger') return <X aria-hidden="true" size={14} />;
  return <Circle aria-hidden="true" size={9} />;
};

export function ActivityFeed({
  items = [], children,
  size, variant, reverse = false, showConnector, showGroups = false, collapsible = false,
  activeKey, defaultActiveKey, onActiveChange,
  expandedKeys: controlledExpandedKeys, defaultExpandedKeys = [], onExpandedChange,
  onItemClick, loading = false, emptyState = 'No activity yet.', maxHeight,
  className, style, 'aria-label': ariaLabel = 'Activity feed',
}: ActivityFeedProps) {
  const { components } = useConfig();
  const config = components.activityFeed;
  const activeSize = size ?? config?.size ?? 'default';
  const activeVariant = variant ?? config?.variant ?? 'default';
  const connector = showConnector ?? config?.showConnector ?? true;
  const [internalActiveKey, setInternalActiveKey] = useState(defaultActiveKey);
  const [internalExpandedKeys, setInternalExpandedKeys] = useState(defaultExpandedKeys);
  const currentExpandedKeys = controlledExpandedKeys ?? internalExpandedKeys;
  const orderedItems = reverse ? [...items].reverse() : items;

  const activate = (item: ActivityFeedItem, index: number) => {
    if (item.disabled) return;
    if (activeKey === undefined) setInternalActiveKey(item.key);
    onActiveChange?.(item.key, item);
    onItemClick?.(item, index);
  };
  const toggleExpanded = (item: ActivityFeedItem) => {
    const next = currentExpandedKeys.includes(item.key) ? currentExpandedKeys.filter((key) => key !== item.key) : [...currentExpandedKeys, item.key];
    if (controlledExpandedKeys === undefined) setInternalExpandedKeys(next);
    onExpandedChange?.(next, item);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>, item: ActivityFeedItem, index: number) => {
    if ((event.key === 'Enter' || event.key === ' ') && onItemClick) { event.preventDefault(); activate(item, index); }
  };
  const renderItem = (item: ActivityFeedItem, index: number) => {
    const active = (activeKey ?? internalActiveKey) === item.key;
    const expanded = currentExpandedKeys.includes(item.key);
    const interactive = Boolean(onItemClick) && !item.disabled;
    const marker = item.avatar ?? item.icon ?? statusIcon(item.status);
    const title = item.href ? <a href={item.href}>{item.title}</a> : item.title;
    return <article aria-current={active ? 'true' : undefined} className={cx('mm-activity-feed__item', active && 'mm-activity-feed__item--active', item.unread && 'mm-activity-feed__item--unread', item.disabled && 'mm-activity-feed__item--disabled', item.status && `mm-activity-feed__item--${item.status}`)} key={item.key} onClick={interactive ? () => activate(item, index) : undefined} onKeyDown={interactive ? (event) => handleKeyDown(event, item, index) : undefined} role={interactive ? 'button' : undefined} tabIndex={interactive ? 0 : undefined}>
      <div className="mm-activity-feed__rail"><span aria-hidden="true" className={cx('mm-activity-feed__marker', Boolean(item.avatar) && 'mm-activity-feed__marker--avatar')}>{marker}</span></div>
      <div className="mm-activity-feed__body">
        <div className="mm-activity-feed__header"><div className="mm-activity-feed__heading">{item.actor && <span className="mm-activity-feed__actor">{item.actor}</span>}<h3>{title}</h3>{item.unread && <span aria-label="Unread" className="mm-activity-feed__unread" />}</div>{item.timestamp && <time className="mm-activity-feed__time">{item.timestamp}</time>}</div>
        {item.description && <p className="mm-activity-feed__description">{item.description}</p>}
        {item.metadata && <div className="mm-activity-feed__metadata">{item.metadata}</div>}
        {item.content && <div className="mm-activity-feed__content">{item.content}</div>}
        {item.actions && <div className="mm-activity-feed__actions" onClick={(event) => event.stopPropagation()}>{item.actions}</div>}
        {collapsible && item.details && <><button aria-expanded={expanded} className="mm-activity-feed__details-trigger" onClick={(event) => { event.stopPropagation(); toggleExpanded(item); }} type="button">{expanded ? <CaretDown aria-hidden="true" size={15} /> : <CaretRight aria-hidden="true" size={15} />} {expanded ? 'Hide details' : 'View details'}</button>{expanded && <div className="mm-activity-feed__details">{item.details}</div>}</>}
      </div>
    </article>;
  };
  const content = children ?? (loading ? <>{[1, 2, 3].map((key) => <div aria-hidden="true" className="mm-activity-feed__skeleton" key={key}><span /><div><b /><i /><i /></div></div>)}</> : orderedItems.length ? orderedItems.map(renderItem) : <div className="mm-activity-feed__empty"><Info aria-hidden="true" size={18} /><span>{emptyState}</span></div>);
  const groupedContent = !children && showGroups && !loading ? orderedItems.reduce<ReactNode[]>((result, item, index) => { const previous = orderedItems[index - 1]; if (item.group && item.group !== previous?.group) result.push(<div className="mm-activity-feed__group" key={`group-${item.key}`}>{item.group}</div>); result.push(renderItem(item, index)); return result; }, []) : content;
  const horizontalPadding = config?.horizontalPadding ?? (activeSize === 'sm' ? 10 : 14);
  const verticalPadding = config?.verticalPadding ?? (activeSize === 'sm' ? 6 : 8);
  return <section aria-label={ariaLabel} className={cx('mm-activity-feed', `mm-activity-feed--${activeSize}`, `mm-activity-feed--${activeVariant}`, connector && 'mm-activity-feed--connector', className)} style={{ ...style, '--mm-activity-feed-max-height': typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight, '--mm-activity-feed-horizontal-padding': typeof horizontalPadding === 'number' ? `${horizontalPadding}px` : horizontalPadding, '--mm-activity-feed-vertical-padding': typeof verticalPadding === 'number' ? `${verticalPadding}px` : verticalPadding } as CSSProperties}>{groupedContent}</section>;
}
