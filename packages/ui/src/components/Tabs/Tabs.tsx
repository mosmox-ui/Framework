import { useId, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import { useConfig } from '../ConfigProvider';
import './Tabs.css';

export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsSize = 'xs' | 'sm' | 'default';
export type TabsActivationMode = 'automatic' | 'manual';
export type TabItem = { key: string; label: ReactNode; content?: ReactNode; icon?: ReactNode; badge?: ReactNode; disabled?: boolean };

export type TabsProps = {
  items: TabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string, item: TabItem) => void;
  orientation?: TabsOrientation;
  size?: TabsSize;
  activationMode?: TabsActivationMode;
  fullWidth?: boolean;
  fitted?: boolean;
  lazy?: boolean;
  keepMounted?: boolean;
  className?: string;
  style?: CSSProperties;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function Tabs({ items, activeKey, defaultActiveKey, onChange, orientation, size, activationMode = 'automatic', fullWidth = false, fitted = false, lazy = false, keepMounted = false, className, style }: TabsProps) {
  const { components } = useConfig();
  const config = components.tabs;
  const id = useId().replace(/:/g, '');
  const available = items.find((item) => !item.disabled);
  const [internalActive, setInternalActive] = useState(defaultActiveKey ?? available?.key ?? '');
  const currentKey = activeKey ?? internalActive;
  const currentIndex = Math.max(0, items.findIndex((item) => item.key === currentKey));
  const currentItem = items[currentIndex] ?? available;
  const activeOrientation = orientation ?? config?.orientation ?? 'horizontal';
  const activeSize = size ?? config?.size ?? 'default';
  const isFullWidth = fullWidth || Boolean(config?.fullWidth);
  const select = (item: TabItem) => { if (item.disabled) return; if (activeKey === undefined) setInternalActive(item.key); onChange?.(item.key, item); };
  const focusTab = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const direction = activeOrientation === 'vertical' ? ['ArrowUp', 'ArrowDown'] : ['ArrowLeft', 'ArrowRight'];
    if (event.key === 'Home') { event.preventDefault(); items.find((item) => !item.disabled) && (document.getElementById(`${id}-tab-${items.find((item) => !item.disabled)?.key}`)?.focus()); return; }
    if (event.key === 'End') { event.preventDefault(); [...items].reverse().find((item) => !item.disabled) && (document.getElementById(`${id}-tab-${[...items].reverse().find((item) => !item.disabled)?.key}`)?.focus()); return; }
    const offset = event.key === direction[0] ? -1 : event.key === direction[1] ? 1 : 0;
    if (!offset) return;
    event.preventDefault();
    for (let step = 1; step <= items.length; step += 1) { const next = items[(index + offset * step + items.length * 2) % items.length]; if (!next.disabled) { document.getElementById(`${id}-tab-${next.key}`)?.focus(); if (activationMode === 'automatic') select(next); break; } }
  };
  return <div className={cx('mm-tabs', `mm-tabs--${activeOrientation}`, `mm-tabs--${activeSize}`, isFullWidth && 'mm-tabs--full-width', fitted && 'mm-tabs--fitted', className)} style={style}>
    <div aria-label="Tabs" className="mm-tabs__list" role="tablist">
      {items.map((item, index) => <button aria-controls={`${id}-panel-${item.key}`} aria-selected={currentItem?.key === item.key} className={cx('mm-tabs__tab', currentItem?.key === item.key && 'mm-tabs__tab--active', item.disabled && 'mm-tabs__tab--disabled')} disabled={item.disabled} id={`${id}-tab-${item.key}`} key={item.key} onClick={() => select(item)} onKeyDown={(event) => focusTab(event, index)} role="tab" tabIndex={currentItem?.key === item.key ? 0 : -1} type="button">{item.icon && <span className="mm-tabs__icon">{item.icon}</span>}<span>{item.label}</span>{item.badge && <span className="mm-tabs__badge">{item.badge}</span>}</button>)}
    </div>
    <div className="mm-tabs__panels">{items.map((item) => { const active = currentItem?.key === item.key; if (lazy && !active && !keepMounted) return null; return <div aria-hidden={!active} aria-labelledby={`${id}-tab-${item.key}`} className={cx('mm-tabs__panel', active && 'mm-tabs__panel--active')} hidden={!active} id={`${id}-panel-${item.key}`} key={item.key} role="tabpanel" tabIndex={0}>{item.content}</div>; })}</div>
  </div>;
}
