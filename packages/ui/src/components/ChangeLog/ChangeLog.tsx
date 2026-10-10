import { CaretDown, CaretRight, GitBranch, Tag, UserCircle } from '../../icons';
import { useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import './ChangeLog.css';

export type ChangeLogSize = 'sm' | 'default' | 'lg';
export type ChangeLogVariant = 'default' | 'timeline' | 'compact' | 'bordered';
export type ChangeLogGroupBy = 'none' | 'date' | 'version' | 'category';
export type ChangeLogStatus = 'added' | 'changed' | 'fixed' | 'removed' | 'deprecated' | 'security';

export type ChangeLogEntry = {
  id: string;
  date: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  details?: ReactNode;
  version?: ReactNode;
  category?: ReactNode;
  status?: ChangeLogStatus;
  tags?: ReactNode[];
  author?: ReactNode;
  branch?: ReactNode;
  href?: string;
  breaking?: boolean;
};

export type ChangeLogProps = {
  'aria-label'?: string;
  className?: string;
  entries: ChangeLogEntry[];
  defaultExpandedIds?: string[];
  expandedIds?: string[];
  onExpandedChange?: (ids: string[], entry: ChangeLogEntry) => void;
  size?: ChangeLogSize;
  variant?: ChangeLogVariant;
  groupBy?: ChangeLogGroupBy;
  reverse?: boolean;
  maxHeight?: number | string;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const statusLabels: Record<ChangeLogStatus, string> = {
  added: 'Added', changed: 'Changed', fixed: 'Fixed', removed: 'Removed', deprecated: 'Deprecated', security: 'Security',
};

export function ChangeLog({
  'aria-label': ariaLabel = 'Change log', className, entries, defaultExpandedIds = [], expandedIds: controlledExpandedIds,
  onExpandedChange, size = 'default', variant = 'default', groupBy = 'none', reverse = false, maxHeight,
}: ChangeLogProps) {
  const [internalExpandedIds, setInternalExpandedIds] = useState(defaultExpandedIds);
  const currentExpandedIds = controlledExpandedIds ?? internalExpandedIds;
  const visibleEntries = reverse ? [...entries].reverse() : entries;
  const groups = useMemo(() => {
    if (groupBy === 'none') return [{ key: 'all', label: null, entries: visibleEntries }];
    const map = new Map<string, ChangeLogEntry[]>();
    visibleEntries.forEach((entry) => {
      const value = groupBy === 'date' ? String(entry.date) : groupBy === 'version' ? String(entry.version ?? 'Other') : String(entry.category ?? 'Other');
      map.set(value, [...(map.get(value) ?? []), entry]);
    });
    return Array.from(map, ([key, groupedEntries]) => ({ key, label: key, entries: groupedEntries }));
  }, [groupBy, visibleEntries]);

  const toggle = (entry: ChangeLogEntry) => {
    const next = currentExpandedIds.includes(entry.id) ? currentExpandedIds.filter((id) => id !== entry.id) : [...currentExpandedIds, entry.id];
    if (controlledExpandedIds === undefined) setInternalExpandedIds(next);
    onExpandedChange?.(next, entry);
  };
  return <section aria-label={ariaLabel} className={cx('mm-change-log', `mm-change-log--${size}`, `mm-change-log--${variant}`, className)} style={{ '--mm-change-log-max-height': typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight } as CSSProperties}>
    <div className="mm-change-log__body">
      {groups.map((group) => <div className="mm-change-log__group" key={group.key}>{group.label ? <h3 className="mm-change-log__group-title">{group.label}</h3> : null}<div className="mm-change-log__entries">{group.entries.map((entry) => { const expanded = currentExpandedIds.includes(entry.id); return <article className={cx('mm-change-log__entry', expanded && 'mm-change-log__entry--expanded', entry.breaking && 'mm-change-log__entry--breaking')} key={entry.id}>
        <div className="mm-change-log__marker" aria-hidden="true"><span className={cx('mm-change-log__dot', `mm-change-log__dot--${entry.status ?? 'changed'}`)} /></div>
        <div className="mm-change-log__content"><div className="mm-change-log__meta"><time>{entry.date}</time>{entry.version ? <span><Tag aria-hidden="true" size={13} />{entry.version}</span> : null}{entry.category ? <span>{entry.category}</span> : null}</div><div className="mm-change-log__title-row"><h4>{entry.href ? <a href={entry.href}>{entry.title}</a> : entry.title}</h4>{entry.status ? <span className={cx('mm-change-log__status', `mm-change-log__status--${entry.status}`)}>{statusLabels[entry.status]}</span> : null}{entry.breaking ? <span className="mm-change-log__breaking">Breaking</span> : null}</div>{entry.description ? <p>{entry.description}</p> : null}<div className="mm-change-log__byline">{entry.author ? <span><UserCircle aria-hidden="true" size={13} />{entry.author}</span> : null}{entry.branch ? <span><GitBranch aria-hidden="true" size={13} />{entry.branch}</span> : null}{entry.tags?.map((tag, index) => <span className="mm-change-log__tag" key={`${entry.id}-tag-${index}`}>{tag}</span>)}</div>{entry.details ? <><button aria-expanded={expanded} className="mm-change-log__details-trigger" onClick={() => toggle(entry)} type="button">{expanded ? <CaretDown aria-hidden="true" size={15} /> : <CaretRight aria-hidden="true" size={15} />} {expanded ? 'Hide details' : 'View details'}</button>{expanded ? <div className="mm-change-log__details">{entry.details}</div> : null}</> : null}</div>
      </article>;})}</div></div>)}
    </div>
  </section>;
}
