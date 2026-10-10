import { useEffect, useMemo, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { CaretDown, CaretUp, DotsSixVertical, Minus, Plus } from '../../icons';
import { useConfig } from '../ConfigProvider';
import { Checkbox } from '../Checkbox';
import './Table.css';

export type TableSize = 'default' | 'small';
export type TableVariant = 'plain' | 'bordered' | 'striped' | 'card';
export type TableDensity = 'compact' | 'comfortable' | 'spacious';
export type TableSortDirection = 'asc' | 'desc';
export type TablePin = 'left' | 'right';
export type TableRowKey = string | number;

export type TableSortRule = { key: string; direction: TableSortDirection };

export type TableCellState<T> = {
  row: T;
  rowKey: TableRowKey;
  column: TableColumn<T>;
  value: unknown;
  rowIndex: number;
  selected: boolean;
  editing: boolean;
};

export type TableColumn<T = Record<string, unknown>> = {
  key: string;
  header: ReactNode;
  accessor?: keyof T | ((row: T) => unknown);
  render?: (value: unknown, row: T, state: TableCellState<T>) => ReactNode;
  editor?: (value: unknown, row: T, state: TableCellState<T>) => ReactNode;
  sortable?: boolean;
  sort?: (a: unknown, b: unknown, rowA: T, rowB: T) => number;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'left' | 'center' | 'right';
  pin?: TablePin;
  resizable?: boolean;
  editable?: boolean;
  className?: string;
  headerClassName?: string;
  ariaLabel?: string;
};

export type TableProps<T = Record<string, unknown>> = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> & {
  data: T[];
  columns: TableColumn<T>[];
  rowKey?: keyof T | ((row: T, index: number) => TableRowKey);
  caption?: ReactNode;
  captionSide?: 'top' | 'bottom';
  ariaLabel?: string;
  size?: TableSize;
  variant?: TableVariant;
  density?: TableDensity;
  stickyHeader?: boolean;
  maxHeight?: number | string;
  bordered?: boolean;
  hoverable?: boolean;
  sortable?: boolean;
  multiSort?: boolean;
  defaultSort?: TableSortRule[];
  sort?: TableSortRule[];
  onSortChange?: (sort: TableSortRule[]) => void;
  showToolbar?: boolean;
  toolbar?: ReactNode;
  selectionMode?: 'none' | 'single' | 'multiple';
  selectedRowKeys?: TableRowKey[];
  defaultSelectedRowKeys?: TableRowKey[];
  onSelectionChange?: (keys: TableRowKey[], rows: T[]) => void;
  onRowClick?: (row: T, rowIndex: number) => void;
  isRowDisabled?: (row: T, rowIndex: number) => boolean;
  editable?: boolean;
  onCellEdit?: (row: T, column: TableColumn<T>, value: unknown, rowIndex: number) => void;
  columnOrder?: string[];
  defaultColumnOrder?: string[];
  onColumnOrderChange?: (order: string[]) => void;
  resizableColumns?: boolean;
  onColumnResize?: (column: TableColumn<T>, width: number) => void;
  pinning?: { left?: string[]; right?: string[] };
  defaultPinning?: { left?: string[]; right?: string[] };
  onPinningChange?: (pinning: { left: string[]; right: string[] }) => void;
  pinnedRows?: { top?: TableRowKey[]; bottom?: TableRowKey[] };
  rowClassName?: (row: T, rowIndex: number) => string | undefined;
  rowHeight?: number;
  virtualize?: boolean;
  loading?: boolean;
  loadingContent?: ReactNode;
  emptyContent?: ReactNode;
  footer?: ReactNode;
  stickyFooter?: boolean;
  renderCell?: (value: unknown, row: T, column: TableColumn<T>, state: TableCellState<T>) => ReactNode;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const cssLength = (value?: number | string) => typeof value === 'number' ? `${value}px` : value;
const asText = (value: unknown) => value === null || value === undefined ? '' : String(value);

function valueFor<T>(row: T, column: TableColumn<T>) {
  if (typeof column.accessor === 'function') return column.accessor(row);
  if (column.accessor) return row[column.accessor];
  return row[column.key as keyof T];
}

function compareValues(a: unknown, b: unknown) {
  if (a === b) return 0;
  if (a === null || a === undefined) return 1;
  if (b === null || b === undefined) return -1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  if (typeof a === 'boolean' && typeof b === 'boolean') return Number(a) - Number(b);
  return asText(a).localeCompare(asText(b), undefined, { numeric: true, sensitivity: 'base' });
}

export function Table<T = Record<string, unknown>>({
  data, columns, rowKey, caption, captionSide = 'top', ariaLabel, size, variant, density, stickyHeader = false, maxHeight,
  bordered = false, hoverable = true, sortable = true, multiSort = true, defaultSort = [], sort, onSortChange,
  showToolbar = true, toolbar,
  selectionMode = 'none', selectedRowKeys, defaultSelectedRowKeys = [], onSelectionChange, onRowClick, isRowDisabled,
  editable = false, onCellEdit,
  columnOrder, defaultColumnOrder, onColumnOrderChange, resizableColumns = true, onColumnResize,
  pinning, defaultPinning = {}, onPinningChange, pinnedRows = {}, rowClassName, rowHeight = 48, virtualize = false,
  loading = false, loadingContent = 'Loading…', emptyContent = 'No data to display.', footer, stickyFooter = false,
  renderCell, className, style, ...rest
}: TableProps<T>) {
  const { components } = useConfig();
  const config = components.table;
  const activeSize = size ?? config?.size ?? 'default';
  const activeVariant = variant ?? config?.variant ?? 'plain';
  const activeDensity = density ?? config?.density ?? 'comfortable';
  const activeStickyHeader = stickyHeader || Boolean(config?.stickyHeader);
  const [internalSort, setInternalSort] = useState(defaultSort);
  const currentSort = sort ?? internalSort;
  const [internalSelected, setInternalSelected] = useState(defaultSelectedRowKeys);
  const currentSelected = selectedRowKeys ?? internalSelected;
  const initialOrder = defaultColumnOrder ?? columns.map((column) => column.key);
  const [internalOrder, setInternalOrder] = useState(initialOrder);
  const activeOrder = columnOrder ?? internalOrder;
  const [internalPinning, setInternalPinning] = useState(defaultPinning);
  const activePinning = pinning ?? internalPinning;
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const tableScrollRef = useRef<HTMLDivElement>(null);

  const orderedColumns = useMemo(() => activeOrder.map((key) => columns.find((column) => column.key === key)).filter(Boolean) as TableColumn<T>[], [activeOrder, columns]);
  const visibleColumns = orderedColumns;
  const leadingPinned = visibleColumns.filter((column) => (activePinning.left ?? []).includes(column.key) || column.pin === 'left');
  const trailingPinned = visibleColumns.filter((column) => (activePinning.right ?? []).includes(column.key) || column.pin === 'right');
  const centerColumns = visibleColumns.filter((column) => !leadingPinned.includes(column) && !trailingPinned.includes(column));
  const renderColumns = [...leadingPinned, ...centerColumns, ...trailingPinned];
  const keyOf = (row: T, index: number): TableRowKey => typeof rowKey === 'function' ? rowKey(row, index) : rowKey ? row[rowKey] as unknown as TableRowKey : ((row as Record<string, unknown>).id as TableRowKey ?? index);
  const selectedSet = new Set(currentSelected);
  const matches = (row: T) => {
    return true;
  };
  const sortedRows = useMemo(() => {
    const filtered = data.map((row, index) => ({ row, index, key: keyOf(row, index) })).filter(({ row }) => matches(row));
    if (!currentSort.length) return filtered;
    return [...filtered].sort((a, b) => {
      for (const rule of currentSort) { const column = columns.find((item) => item.key === rule.key); if (!column) continue; const result = column.sort ? column.sort(valueFor(a.row, column), valueFor(b.row, column), a.row, b.row) : compareValues(valueFor(a.row, column), valueFor(b.row, column)); if (result) return rule.direction === 'asc' ? result : -result; }
      return a.index - b.index;
    });
  }, [data, columns, currentSort, visibleColumns]);
  const topRows = sortedRows.filter(({ key }) => (pinnedRows.top ?? []).includes(key));
  const bottomRows = sortedRows.filter(({ key }) => (pinnedRows.bottom ?? []).includes(key));
  const bodyRows = sortedRows.filter(({ key }) => !(pinnedRows.top ?? []).includes(key) && !(pinnedRows.bottom ?? []).includes(key));
  const allRows = [...topRows, ...bodyRows, ...bottomRows];
  const selectableRows = allRows.filter(({ row, index }) => !isRowDisabled?.(row, index));
  const allSelected = selectableRows.length > 0 && selectableRows.every(({ key }) => selectedSet.has(key));
  const viewportRows = virtualize && maxHeight ? bodyRows.slice(Math.max(0, Math.floor(scrollTop / rowHeight) - 4), Math.ceil((scrollTop + Number.parseInt(String(maxHeight), 10)) / rowHeight) + 4) : bodyRows;
  const virtualStart = virtualize && maxHeight ? Math.max(0, Math.floor(scrollTop / rowHeight) - 4) : 0;
  const styleVariables = { '--mm-table-max-height': cssLength(maxHeight), '--mm-table-row-height': `${rowHeight}px`, ...style } as CSSProperties;
  const updateSort = (key: string) => {
    if (!sortable || columns.find((column) => column.key === key)?.sortable === false) return;
    const current = currentSort.find((rule) => rule.key === key);
    const nextDirection = current?.direction === 'asc' ? 'desc' : current?.direction === 'desc' ? undefined : 'asc';
    const next = multiSort ? currentSort.filter((rule) => rule.key !== key) : [];
    if (nextDirection) next.push({ key, direction: nextDirection });
    if (!sort) setInternalSort(next); onSortChange?.(next);
  };
  const updateSelection = (keys: TableRowKey[]) => { const unique = [...new Set(keys)]; if (!selectedRowKeys) setInternalSelected(unique); onSelectionChange?.(unique, allRows.filter(({ key }) => unique.includes(key)).map(({ row }) => row)); };
  const toggleRow = (key: TableRowKey, row: T, index: number) => { if (selectionMode === 'none' || isRowDisabled?.(row, index)) { onRowClick?.(row, index); return; } const next = selectionMode === 'single' ? selectedSet.has(key) ? [] : [key] : selectedSet.has(key) ? currentSelected.filter((item) => item !== key) : [...currentSelected, key]; updateSelection(next); onRowClick?.(row, index); };
  const reorderColumn = (key: string, direction: -1 | 1) => { const index = activeOrder.indexOf(key); const nextIndex = index + direction; if (nextIndex < 0 || nextIndex >= activeOrder.length) return; const next = [...activeOrder]; [next[index], next[nextIndex]] = [next[nextIndex], next[index]]; if (!columnOrder) setInternalOrder(next); onColumnOrderChange?.(next); };
  const resizeColumn = (column: TableColumn<T>, startX: number) => { const initial = columnWidths[column.key] ?? (typeof column.width === 'number' ? column.width : 160); const move = (event: PointerEvent) => { const width = Math.max(column.minWidth ?? 72, Math.min(column.maxWidth ?? 640, initial + event.clientX - startX)); setColumnWidths((current) => ({ ...current, [column.key]: width })); onColumnResize?.(column, width); }; const stop = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', stop); }; window.addEventListener('pointermove', move); window.addEventListener('pointerup', stop); };
  const renderRow = ({ row, index, key }: { row: T; index: number; key: TableRowKey }, actualIndex: number) => { const disabled = Boolean(isRowDisabled?.(row, index)); return <>
    <tr aria-selected={selectionMode !== 'none' ? selectedSet.has(key) : undefined} className={cx('mm-table__row', selectedSet.has(key) && 'mm-table__row--selected', disabled && 'mm-table__row--disabled', hoverable && 'mm-table__row--hoverable', rowClassName?.(row, index))} key={`row-${String(key)}`} onClick={() => toggleRow(key, row, index)}>
      {selectionMode !== 'none' && <td className="mm-table__selection-cell" onClick={(event) => event.stopPropagation()}><Checkbox aria-label={`Select row ${actualIndex + 1}`} checked={selectedSet.has(key)} disabled={disabled} onChange={() => toggleRow(key, row, index)} onClick={(event) => event.stopPropagation()} /></td>}
      {renderColumns.map((column) => { const value = valueFor(row, column); const cellKey = `${String(key)}:${column.key}`; const state: TableCellState<T> = { row, rowKey: key, column, value, rowIndex: index, selected: selectedSet.has(key), editing: editingCell === cellKey }; const cellStyle = { width: columnWidths[column.key] ?? cssLength(column.width), minWidth: column.minWidth, maxWidth: column.maxWidth, textAlign: column.align, '--mm-table-pin-offset': leadingPinned.includes(column) ? `${leadingPinned.slice(0, leadingPinned.indexOf(column)).reduce((sum, item) => sum + (columnWidths[item.key] ?? (typeof item.width === 'number' ? item.width : 160)), 0)}px` : trailingPinned.includes(column) ? `${trailingPinned.slice(trailingPinned.indexOf(column) + 1).reduce((sum, item) => sum + (columnWidths[item.key] ?? (typeof item.width === 'number' ? item.width : 160)), 0)}px` : undefined } as CSSProperties; const content = state.editing && (editable || column.editable) && column.editor ? column.editor(value, row, state) : renderCell ? renderCell(value, row, column, state) : column.render ? column.render(value, row, state) : asText(value); return <td className={cx('mm-table__cell', leadingPinned.includes(column) && 'mm-table__cell--pinned-left', trailingPinned.includes(column) && 'mm-table__cell--pinned-right', column.className)} key={column.key} style={cellStyle} onDoubleClick={() => (editable || column.editable) && column.editor && setEditingCell(cellKey)}>{content}</td>; })}
    </tr>
  </>; };
  return <section aria-label={ariaLabel} className={cx('mm-table', `mm-table--${activeSize}`, `mm-table--${activeVariant}`, `mm-table--${activeDensity}`, bordered && 'mm-table--bordered', className)} style={styleVariables} {...rest}>
    {caption && <div className={cx('mm-table__caption', `mm-table__caption--${captionSide}`)}>{caption}</div>}
    {showToolbar && toolbar && <div className="mm-table__toolbar">{toolbar}</div>}
    <div className="mm-table__scroll" onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)} ref={tableScrollRef}><table aria-label={ariaLabel} className="mm-table__native"><thead className={activeStickyHeader ? 'mm-table__head--sticky' : undefined}><tr>{selectionMode !== 'none' && <th className="mm-table__selection-cell"><Checkbox aria-label="Select all rows" checked={allSelected} indeterminate={!allSelected && selectableRows.some(({ key }) => selectedSet.has(key))} onChange={() => updateSelection(allSelected ? [] : selectableRows.map(({ key }) => key))} onClick={(event) => event.stopPropagation()} /></th>}{renderColumns.map((column) => { const rule = currentSort.find((item) => item.key === column.key); const cellStyle = { width: columnWidths[column.key] ?? cssLength(column.width), minWidth: column.minWidth, maxWidth: column.maxWidth, textAlign: column.align, '--mm-table-pin-offset': leadingPinned.includes(column) ? `${leadingPinned.slice(0, leadingPinned.indexOf(column)).reduce((sum, item) => sum + (columnWidths[item.key] ?? (typeof item.width === 'number' ? item.width : 160)), 0)}px` : trailingPinned.includes(column) ? `${trailingPinned.slice(trailingPinned.indexOf(column) + 1).reduce((sum, item) => sum + (columnWidths[item.key] ?? (typeof item.width === 'number' ? item.width : 160)), 0)}px` : undefined } as CSSProperties; return <th aria-sort={rule ? rule.direction === 'asc' ? 'ascending' : 'descending' : 'none'} className={cx('mm-table__header-cell', leadingPinned.includes(column) && 'mm-table__cell--pinned-left', trailingPinned.includes(column) && 'mm-table__cell--pinned-right', column.headerClassName)} key={column.key} style={cellStyle}><button className="mm-table__sort-button" disabled={!sortable || column.sortable === false} onClick={() => updateSort(column.key)} type="button"><span>{column.header}</span>{rule ? rule.direction === 'asc' ? <CaretUp size={14} /> : <CaretDown size={14} /> : <span className="mm-table__sort-placeholder">↕</span>}{multiSort && rule && currentSort.length > 1 && <sup>{currentSort.findIndex((item) => item.key === column.key) + 1}</sup>}</button>{resizableColumns && column.resizable !== false && <span aria-hidden="true" className="mm-table__resize-handle" onPointerDown={(event) => { event.preventDefault(); resizeColumn(column, event.clientX); }} />}</th>; })}</tr></thead><tbody>{loading ? <tr><td className="mm-table__state" colSpan={renderColumns.length + (selectionMode !== 'none' ? 1 : 0)}>{loadingContent}</td></tr> : !allRows.length ? <tr><td className="mm-table__state" colSpan={renderColumns.length + (selectionMode !== 'none' ? 1 : 0)}>{emptyContent}</td></tr> : <>{virtualize && virtualStart > 0 && <tr aria-hidden="true" className="mm-table__spacer"><td colSpan={renderColumns.length + (selectionMode !== 'none' ? 1 : 0)} style={{ height: virtualStart * rowHeight }} /></tr>}{topRows.map((item, index) => renderRow(item, index))}{viewportRows.map((item, index) => renderRow(item, virtualStart + index + topRows.length))}{virtualize && virtualStart + viewportRows.length < bodyRows.length && <tr aria-hidden="true" className="mm-table__spacer"><td colSpan={renderColumns.length + (selectionMode !== 'none' ? 1 : 0)} style={{ height: (bodyRows.length - virtualStart - viewportRows.length) * rowHeight }} /></tr>}{bottomRows.map((item, index) => renderRow(item, allRows.length - bottomRows.length + index))}</>}</tbody></table></div>
    {footer && <div className={cx('mm-table__footer', stickyFooter && 'mm-table__footer--sticky')}>{footer}</div>}
  </section>;
}
