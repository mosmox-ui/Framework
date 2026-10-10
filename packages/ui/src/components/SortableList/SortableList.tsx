import { DotsSixVertical } from '../../icons';
import { useEffect, useState, type CSSProperties, type DragEvent, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import './SortableList.css';

export type SortableListSize = 'sm' | 'default' | 'lg';
export type SortableListVariant = 'plain' | 'divided' | 'bordered' | 'card';

export type SortableListItem<T = unknown> = {
  key: string;
  title: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  meta?: ReactNode;
  disabled?: boolean;
  data?: T;
};

export type SortableListRenderState = {
  index: number;
  dragging: boolean;
  over: boolean;
  disabled: boolean;
};

export type SortableListReorderContext = {
  activeKey: string;
  overKey: string;
  fromIndex: number;
  toIndex: number;
};

export type SortableListProps<T = unknown> = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> & {
  items: SortableListItem<T>[];
  renderItem?: (item: SortableListItem<T>, state: SortableListRenderState) => ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  size?: SortableListSize;
  variant?: SortableListVariant;
  fullWidth?: boolean;
  onReorder?: (items: SortableListItem<T>[], context: SortableListReorderContext) => void;
  dragHandleLabel?: (item: SortableListItem<T>, index: number) => string;
  emptyState?: ReactNode;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function SortableList<T = unknown>({ items, renderItem, header, footer, size = 'default', variant = 'divided', fullWidth = true, onReorder, dragHandleLabel = (_item, index) => `Move item ${index + 1}`, emptyState = 'No items', className, style, ...rest }: SortableListProps<T>) {
  const [orderedItems, setOrderedItems] = useState(items);
  const [draggingKey, setDraggingKey] = useState<string | null>(null);
  const [overKey, setOverKey] = useState<string | null>(null);

  useEffect(() => {
    setOrderedItems(items);
  }, [items]);

  const reorder = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= orderedItems.length || toIndex >= orderedItems.length) return;
    const activeItem = orderedItems[fromIndex];
    const targetItem = orderedItems[toIndex];
    if (!activeItem || !targetItem || activeItem.disabled || targetItem.disabled) return;
    const nextItems = [...orderedItems];
    nextItems.splice(toIndex, 0, ...nextItems.splice(fromIndex, 1));
    setOrderedItems(nextItems);
    onReorder?.(nextItems, { activeKey: activeItem.key, overKey: targetItem.key, fromIndex, toIndex });
  };

  const handleDragStart = (event: DragEvent<HTMLDivElement>, item: SortableListItem<T>) => {
    if (item.disabled) { event.preventDefault(); return; }
    setDraggingKey(item.key);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', item.key);
  };

  const handleDragEnd = () => {
    setDraggingKey(null);
    setOverKey(null);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>, targetIndex: number) => {
    event.preventDefault();
    const activeKey = event.dataTransfer.getData('text/plain') || draggingKey;
    const fromIndex = orderedItems.findIndex((item) => item.key === activeKey);
    reorder(fromIndex, targetIndex);
    handleDragEnd();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
    const item = orderedItems[index];
    if (!item || item.disabled) return;
    let targetIndex: number | undefined;
    if (event.key === 'ArrowUp') targetIndex = index - 1;
    if (event.key === 'ArrowDown') targetIndex = index + 1;
    if (event.key === 'House') targetIndex = 0;
    if (event.key === 'End') targetIndex = orderedItems.length - 1;
    if (targetIndex === undefined || targetIndex < 0 || targetIndex >= orderedItems.length || orderedItems[targetIndex]?.disabled) return;
    event.preventDefault();
    reorder(index, targetIndex);
  };

  const styleVariables = { ...style, ...(fullWidth ? { width: '100%' } : {}) } as CSSProperties;
  return <div {...rest} className={cx('mm-sortable-list', `mm-sortable-list--${size}`, `mm-sortable-list--${variant}`, fullWidth && 'mm-sortable-list--full-width', className)} style={styleVariables}>
    {header && <div className="mm-sortable-list__header">{header}</div>}
    <div aria-label="Sortable list" className="mm-sortable-list__items" role="list">
      {orderedItems.length === 0 && <div className="mm-sortable-list__empty">{emptyState}</div>}
      {orderedItems.map((item, index) => {
        const isDragging = item.key === draggingKey;
        const isOver = item.key === overKey && !isDragging;
        const content = renderItem ? renderItem(item, { index, dragging: isDragging, over: isOver, disabled: Boolean(item.disabled) }) : <>
          {item.leading && <span className="mm-sortable-list__leading">{item.leading}</span>}
          <span className="mm-sortable-list__body"><span className="mm-sortable-list__title">{item.title}</span>{item.description && <span className="mm-sortable-list__description">{item.description}</span>}{item.content && <span className="mm-sortable-list__content">{item.content}</span>}</span>
          <span className="mm-sortable-list__aside">{item.meta && <span className="mm-sortable-list__meta">{item.meta}</span>}{item.trailing && <span className="mm-sortable-list__trailing">{item.trailing}</span>}</span>
        </>;
        return <div aria-disabled={item.disabled || undefined} aria-posinset={index + 1} aria-setsize={orderedItems.length} className={cx('mm-sortable-list__item', isDragging && 'mm-sortable-list__item--dragging', isOver && 'mm-sortable-list__item--over', item.disabled && 'mm-sortable-list__item--disabled')} draggable={!item.disabled} key={item.key} onDragEnd={handleDragEnd} onDragOver={(event) => { event.preventDefault(); if (!item.disabled) setOverKey(item.key); }} onDragStart={(event) => handleDragStart(event, item)} onDrop={(event) => handleDrop(event, index)} onKeyDown={(event) => handleKeyDown(event, index)} role="listitem" tabIndex={item.disabled ? -1 : 0}>
          <button aria-label={dragHandleLabel(item, index)} className="mm-sortable-list__handle" disabled={item.disabled} onClick={(event) => event.preventDefault()} tabIndex={-1} type="button"><DotsSixVertical aria-hidden="true" size={18} /></button>
          <div className="mm-sortable-list__content-area">{content}</div>
        </div>;
      })}
    </div>
    {footer && <div className="mm-sortable-list__footer">{footer}</div>}
  </div>;
}
