import { useState, type CSSProperties, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { useConfig } from '../ConfigProvider';
import './List.css';

export type ListSize = 'sm' | 'default' | 'lg';
export type ListVariant = 'plain' | 'divided' | 'bordered' | 'card';
export type ListSelectionMode = 'none' | 'single' | 'multiple';

export type ListItem<T = unknown> = {
  key: string;
  title: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  meta?: ReactNode;
  href?: string;
  disabled?: boolean;
  data?: T;
};

export type ListRenderState = { selected: boolean; disabled: boolean; index: number };

export type ListProps<T = unknown> = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> & {
  items?: ListItem<T>[];
  children?: ReactNode;
  renderItem?: (item: ListItem<T>, state: ListRenderState) => ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  size?: ListSize;
  variant?: ListVariant;
  selectionMode?: ListSelectionMode;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  onSelectionChange?: (keys: string[], item?: ListItem<T>) => void;
  onItemClick?: (item: ListItem<T>, index: number) => void;
  gap?: number | string;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const cssLength = (value?: number | string) => typeof value === 'number' ? `${value}px` : value;

export function List<T = unknown>({ items = [], children, renderItem, header, footer, size, variant, selectionMode = 'none', selectedKeys, defaultSelectedKeys = [], onSelectionChange, onItemClick, gap, className, style, ...rest }: ListProps<T>) {
  const { components } = useConfig();
  const config = components.list;
  const activeSize = size ?? config?.size ?? 'default';
  const activeVariant = variant ?? config?.variant ?? 'plain';
  const [internalSelected, setInternalSelected] = useState(defaultSelectedKeys);
  const currentSelected = selectedKeys ?? internalSelected;
  const styleVariables = { ...(config?.gap && { '--mm-list-gap': config.gap }), ...(gap !== undefined && { '--mm-list-gap': cssLength(gap) }), ...style } as CSSProperties;
  const toggleSelection = (item: ListItem<T>, index: number) => {
    if (item.disabled || selectionMode === 'none') { onItemClick?.(item, index); return; }
    const next = selectionMode === 'single' ? [item.key] : currentSelected.includes(item.key) ? currentSelected.filter((key) => key !== item.key) : [...currentSelected, item.key];
    if (!selectedKeys) setInternalSelected(next);
    onSelectionChange?.(next, item);
    onItemClick?.(item, index);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>, item: ListItem<T>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleSelection(item, index); }
  };
  const listContent = children ?? items.map((item, index) => {
    const selected = currentSelected.includes(item.key);
    const interactive = selectionMode !== 'none' || Boolean(item.href) || Boolean(onItemClick);
    const content = renderItem ? renderItem(item, { selected, disabled: Boolean(item.disabled), index }) : <>
      {item.leading && <span className="mm-list__leading">{item.leading}</span>}
      <span className="mm-list__body"><span className="mm-list__title">{item.title}</span>{item.description && <span className="mm-list__description">{item.description}</span>}{item.content && <span className="mm-list__content">{item.content}</span>}</span>
      <span className="mm-list__aside">{item.meta && <span className="mm-list__meta">{item.meta}</span>}{item.trailing && <span className="mm-list__trailing">{item.trailing}</span>}</span>
    </>;
    const rowClass = cx('mm-list__item', selected && 'mm-list__item--selected', item.disabled && 'mm-list__item--disabled', interactive && 'mm-list__item--interactive');
    const rowProps = { 'aria-disabled': item.disabled || undefined, 'aria-selected': selectionMode !== 'none' ? selected : undefined, className: rowClass, onClick: () => toggleSelection(item, index), onKeyDown: (event: KeyboardEvent<HTMLElement>) => handleKeyDown(event, item, index), role: selectionMode !== 'none' ? 'option' : undefined, tabIndex: interactive && !item.disabled ? 0 : undefined };
    return item.href && !item.disabled ? <a {...rowProps} href={item.href} key={item.key}>{content}</a> : <div {...rowProps} key={item.key}>{content}</div>;
  });
  return <div className={cx('mm-list', `mm-list--${activeSize}`, `mm-list--${activeVariant}`, className)} style={styleVariables} {...rest}>
    {header && <div className="mm-list__header">{header}</div>}
    <div className="mm-list__items" role={selectionMode !== 'none' ? 'listbox' : undefined}>{listContent}</div>
    {footer && <div className="mm-list__footer">{footer}</div>}
  </div>;
}
