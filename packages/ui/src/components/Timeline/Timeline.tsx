import { CaretDown, CaretRight, Circle, Check, Clock, X } from '../../icons';
import { useState, type CSSProperties, type ReactNode } from 'react';
import './Timeline.css';

export type TimelineOrientation = 'vertical' | 'horizontal';
export type TimelineAlign = 'start' | 'end' | 'alternate';
export type TimelineSize = 'sm' | 'default' | 'lg';
export type TimelineVariant = 'default' | 'compact' | 'bordered' | 'card';
export type TimelineLineStyle = 'solid' | 'dashed' | 'dotted';
export type TimelineStatus = 'default' | 'pending' | 'current' | 'completed' | 'error' | 'warning' | 'success';

export type TimelineItem = {
  key: string;
  date?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  details?: ReactNode;
  actions?: ReactNode;
  icon?: ReactNode;
  status?: TimelineStatus;
  href?: string;
  disabled?: boolean;
};

export type TimelineProps = {
  items: TimelineItem[];
  orientation?: TimelineOrientation;
  align?: TimelineAlign;
  size?: TimelineSize;
  variant?: TimelineVariant;
  lineStyle?: TimelineLineStyle;
  reverse?: boolean;
  activeKey?: string;
  defaultActiveKey?: string;
  onActiveChange?: (key: string, item: TimelineItem) => void;
  expandedKeys?: string[];
  defaultExpandedKeys?: string[];
  onExpandedChange?: (keys: string[], item: TimelineItem) => void;
  collapsible?: boolean;
  maxHeight?: number | string;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function Timeline({
  items, orientation = 'vertical', align = 'start', size = 'default', variant = 'default', lineStyle = 'solid', reverse = false,
  activeKey, defaultActiveKey, onActiveChange, expandedKeys: controlledExpandedKeys, defaultExpandedKeys = [], onExpandedChange,
  collapsible = false, maxHeight, className, style, 'aria-label': ariaLabel = 'Timeline',
}: TimelineProps) {
  const orderedItems = reverse ? [...items].reverse() : items;
  const [internalActiveKey, setInternalActiveKey] = useState(defaultActiveKey);
  const [internalExpandedKeys, setInternalExpandedKeys] = useState(defaultExpandedKeys);
  const currentExpandedKeys = controlledExpandedKeys ?? internalExpandedKeys;
  const select = (item: TimelineItem) => {
    if (item.disabled) return;
    if (activeKey === undefined) setInternalActiveKey(item.key);
    onActiveChange?.(item.key, item);
  };
  const toggle = (item: TimelineItem) => {
    const next = currentExpandedKeys.includes(item.key) ? currentExpandedKeys.filter((key) => key !== item.key) : [...currentExpandedKeys, item.key];
    if (controlledExpandedKeys === undefined) setInternalExpandedKeys(next);
    onExpandedChange?.(next, item);
  };
  const marker = (item: TimelineItem) => item.icon ?? (item.status === 'completed' || item.status === 'success' ? <Check aria-hidden="true" size={14} /> : item.status === 'current' ? <Clock aria-hidden="true" size={14} /> : item.status === 'error' ? <X aria-hidden="true" size={14} /> : <Circle aria-hidden="true" size={10} />);
  return <section aria-label={ariaLabel} className={cx('mm-timeline', `mm-timeline--${orientation}`, `mm-timeline--align-${align}`, `mm-timeline--${size}`, `mm-timeline--${variant}`, `mm-timeline--line-${lineStyle}`, className)} style={{ ...style, '--mm-timeline-max-height': typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight } as CSSProperties}>
    <div className="mm-timeline__list">
      {orderedItems.map((item, index) => {
        const expanded = currentExpandedKeys.includes(item.key);
        const active = (activeKey ?? internalActiveKey) === item.key;
        const hasDetails = Boolean(item.details);
        const title = item.href ? <a href={item.href}>{item.title}</a> : item.title;
        return <article aria-current={active ? 'step' : undefined} className={cx('mm-timeline__item', active && 'mm-timeline__item--active', item.disabled && 'mm-timeline__item--disabled', item.status && `mm-timeline__item--${item.status}`)} key={item.key}>
          <div className="mm-timeline__rail"><button aria-label={typeof item.title === 'string' ? `Select ${item.title}` : `Select event ${index + 1}`} className="mm-timeline__marker" disabled={item.disabled} onClick={() => select(item)} type="button">{marker(item)}</button></div>
          <div className="mm-timeline__body"><div className="mm-timeline__meta">{item.date && <time>{item.date}</time>}{item.status && <span className="mm-timeline__status">{item.status}</span>}</div><h3>{title}</h3>{item.description && <p className="mm-timeline__description">{item.description}</p>}{item.content && <div className="mm-timeline__content">{item.content}</div>}{item.actions && <div className="mm-timeline__actions">{item.actions}</div>}{collapsible && hasDetails && <><button aria-expanded={expanded} className="mm-timeline__details-trigger" onClick={() => toggle(item)} type="button">{expanded ? <CaretDown aria-hidden="true" size={15} /> : <CaretRight aria-hidden="true" size={15} />} {expanded ? 'Hide details' : 'View details'}</button>{expanded && <div className="mm-timeline__details">{item.details}</div>}</>}</div>
        </article>;
      })}
    </div>
  </section>;
}
