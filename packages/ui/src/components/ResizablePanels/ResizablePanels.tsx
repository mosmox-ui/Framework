import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react';
import { CaretDown, CaretLeft, CaretRight, CaretUp } from '../../icons';
import './ResizablePanels.css';

export type ResizablePanelsDirection = 'horizontal' | 'vertical';
export type ResizablePanelsVariant = 'default' | 'card' | 'separated' | 'minimal';
export type ResizablePanel = { key: string; content: ReactNode; minSize?: number; maxSize?: number; defaultSize?: number; collapsible?: boolean; collapsedSize?: number; collapsedMinSize?: number; collapseIcon?: ReactNode; expandIcon?: ReactNode; ariaLabel?: string };
export type ResizablePanelsProps = {
  'aria-label'?: string;
  panels: ResizablePanel[];
  direction?: ResizablePanelsDirection;
  sizes?: number[];
  defaultSizes?: number[];
  onResize?: (sizes: number[], index: number) => void;
  step?: number;
  handleSize?: number;
  handleContent?: ReactNode;
  showHandle?: boolean;
  showCollapseButtons?: boolean;
  keyboardResize?: boolean;
  resetOnDoubleClick?: boolean;
  storageKey?: string;
  variant?: ResizablePanelsVariant;
  className?: string;
  style?: CSSProperties;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const collapseButtonSize = 26;
const collapseButtonInset = 4;
const collapseButtonMinSize = collapseButtonSize + collapseButtonInset * 2;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function getPanelBounds(panel: ResizablePanel, collapsed: boolean) {
  if (collapsed) {
    const size = Math.max(0, panel.collapsedSize ?? 0);
    return { min: size, max: size };
  }
  const min = Math.max(0, panel.minSize ?? 5);
  return { min, max: Math.max(min, panel.maxSize ?? 95) };
}

function normalizeSizes(panels: ResizablePanel[], supplied?: number[], collapsed?: boolean[]) {
  const values = panels.map((panel, index) => {
    const collapsedSize = Math.max(0, panel.collapsedSize ?? 0);
    const min = collapsed?.[index] ? collapsedSize : Math.max(0, panel.minSize ?? 5);
    const max = collapsed?.[index] ? collapsedSize : Math.max(min, panel.maxSize ?? 95);
    return clamp(supplied?.[index] ?? (collapsed?.[index] ? collapsedSize : panel.defaultSize ?? 100 / Math.max(1, panels.length)), min, max);
  });
  const total = values.reduce((sum, value) => sum + value, 0) || 100;
  const normalized = total > 0 ? [...values] : panels.map((panel) => panel.defaultSize ?? 100 / Math.max(1, panels.length));
  const minSizes = panels.map((panel, index) => collapsed?.[index] ? Math.max(0, panel.collapsedSize ?? 0) : Math.max(0, panel.minSize ?? 5));
  const maxSizes = panels.map((panel, index) => collapsed?.[index] ? minSizes[index] : Math.max(minSizes[index], panel.maxSize ?? 95));
  let remaining = 100 - normalized.reduce((sum, value) => sum + value, 0);
  const adjust = (grow: boolean) => {
    for (let pass = 0; pass < panels.length && Math.abs(remaining) > 0.001; pass += 1) {
      const capacity = normalized.reduce((sum, value, index) => sum + (grow ? Math.max(0, maxSizes[index] - value) : Math.max(0, value - minSizes[index])), 0);
      if (capacity <= 0) break;
      normalized.forEach((value, index) => {
        const room = grow ? Math.max(0, maxSizes[index] - value) : Math.max(0, value - minSizes[index]);
        const change = Math.min(room, Math.abs(remaining) * (room / capacity));
        normalized[index] += grow ? change : -change;
        remaining += grow ? -change : change;
      });
    }
  };
  adjust(remaining > 0);
  return normalized;
}

export function ResizablePanels({ 'aria-label': ariaLabel = 'Resizable panels', panels, direction = 'horizontal', sizes, defaultSizes, onResize, step = 5, handleSize = 12, handleContent, showHandle = true, showCollapseButtons = false, keyboardResize = true, resetOnDoubleClick = true, storageKey, variant = 'default', className, style }: ResizablePanelsProps) {
  const id = useId().replace(/:/g, '');
  const rootRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ handle: number; start: number; first: number; second: number } | null>(null);
  const [collapsed, setCollapsed] = useState<boolean[]>(() => panels.map(() => false));
  const initialSizes = normalizeSizes(panels, defaultSizes, collapsed);
  const [internalSizes, setInternalSizes] = useState<number[]>(initialSizes);
  const currentSizes = sizes ? normalizeSizes(panels, sizes, collapsed) : normalizeSizes(panels, internalSizes, collapsed);
  const setPanelSizes = (next: number[], handle = -1, collapsedState = collapsed) => { const normalized = normalizeSizes(panels, next, collapsedState); if (sizes === undefined) setInternalSizes(normalized); onResize?.(normalized, handle); if (storageKey && typeof window !== 'undefined') window.localStorage.setItem(storageKey, JSON.stringify(normalized)); };

  useEffect(() => { if (!storageKey || sizes !== undefined || typeof window === 'undefined') return; try { const saved = JSON.parse(window.localStorage.getItem(storageKey) || 'null'); if (Array.isArray(saved)) setInternalSizes(normalizeSizes(panels, saved)); } catch { /* Invalid storage is ignored. */ } }, [storageKey]);
  useEffect(() => { const move = (event: globalThis.PointerEvent) => { const drag = dragRef.current; const root = rootRef.current; if (!drag || !root) return; const rect = root.getBoundingClientRect(); const pixels = direction === 'horizontal' ? event.clientX - rect.left : event.clientY - rect.top; const delta = ((pixels - drag.start) / (direction === 'horizontal' ? rect.width : rect.height)) * 100; const firstBounds = getPanelBounds(panels[drag.handle], collapsed[drag.handle]); const secondBounds = getPanelBounds(panels[drag.handle + 1], collapsed[drag.handle + 1]); const first = clamp(drag.first + delta, firstBounds.min, Math.min(firstBounds.max, 100 - secondBounds.min)); const second = clamp(drag.second - delta, secondBounds.min, Math.min(secondBounds.max, 100 - first)); const next = [...currentSizes]; next[drag.handle] = first; next[drag.handle + 1] = second; setPanelSizes(next, drag.handle); }; const stop = () => { dragRef.current = null; document.body.style.removeProperty('user-select'); }; window.addEventListener('pointermove', move); window.addEventListener('pointerup', stop); return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', stop); }; });
  const startDrag = (event: PointerEvent<HTMLButtonElement>, index: number) => { if (!rootRef.current) return; event.preventDefault(); const rect = rootRef.current.getBoundingClientRect(); dragRef.current = { handle: index, start: direction === 'horizontal' ? event.clientX - rect.left : event.clientY - rect.top, first: currentSizes[index], second: currentSizes[index + 1] }; document.body.style.userSelect = 'none'; };
  const reset = (index: number) => { const next = normalizeSizes(panels, defaultSizes); setPanelSizes(next, index); };
  const toggleCollapse = (index: number) => { const panel = panels[index]; if (!panel.collapsible) return; const nextCollapsed = [...collapsed]; const nextSizes = [...currentSizes]; if (nextCollapsed[index]) { nextCollapsed[index] = false; nextSizes[index] = panel.defaultSize ?? 100 / panels.length; } else { nextCollapsed[index] = true; nextSizes[index] = panel.collapsedSize ?? 0; } setCollapsed(nextCollapsed); setPanelSizes(nextSizes, index, nextCollapsed); };
  const resizeWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => { if (!keyboardResize) return; const positive = direction === 'horizontal' ? event.key === 'ArrowRight' : event.key === 'ArrowDown'; const negative = direction === 'horizontal' ? event.key === 'ArrowLeft' : event.key === 'ArrowUp'; if (event.key === 'House' || event.key === 'End') { event.preventDefault(); reset(index); return; } if (!positive && !negative) return; event.preventDefault(); const delta = positive ? step : -step; const firstBounds = getPanelBounds(panels[index], collapsed[index]); const secondBounds = getPanelBounds(panels[index + 1], collapsed[index + 1]); const next = [...currentSizes]; next[index] = clamp(next[index] + delta, firstBounds.min, Math.min(firstBounds.max, 100 - secondBounds.min)); next[index + 1] = clamp(next[index + 1] - delta, secondBounds.min, Math.min(secondBounds.max, 100 - next[index])); setPanelSizes(next, index); };
  return <div aria-label={ariaLabel} className={cx('mm-resizable-panels', `mm-resizable-panels--${direction}`, `mm-resizable-panels--${variant}`, className)} ref={rootRef} style={{ ...style, '--mm-resizable-handle-size': `${handleSize}px`, '--mm-resizable-collapse-button-size': `${collapseButtonSize}px` } as CSSProperties}>
    {panels.map((panel, index) => <span className="mm-resizable-panels__slot" key={panel.key} style={{ flexBasis: `${currentSizes[index]}%`, minWidth: direction === 'horizontal' ? collapsed[index] ? `${Math.max(panel.collapsedMinSize ?? collapseButtonMinSize, collapseButtonMinSize) + (index < panels.length - 1 && showHandle ? handleSize : 0)}px` : `${panel.minSize ?? 5}%` : undefined, minHeight: direction === 'vertical' ? collapsed[index] ? `${Math.max(panel.collapsedMinSize ?? collapseButtonMinSize, collapseButtonMinSize) + (index < panels.length - 1 && showHandle ? handleSize : 0)}px` : `${panel.minSize ?? 5}%` : undefined }}>
      <section aria-label={panel.ariaLabel} className={cx('mm-resizable-panels__panel', collapsed[index] && 'mm-resizable-panels__panel--collapsed')}><div className="mm-resizable-panels__content">{panel.content}</div>{showCollapseButtons && panel.collapsible && <button aria-label={`${collapsed[index] ? 'Expand' : 'Collapse'} ${panel.key} panel`} className="mm-resizable-panels__collapse" onClick={() => toggleCollapse(index)} type="button">{collapsed[index] ? panel.expandIcon ?? (direction === 'vertical' ? <CaretDown aria-hidden="true" size={15} /> : <CaretRight aria-hidden="true" size={15} />) : panel.collapseIcon ?? (direction === 'vertical' ? <CaretUp aria-hidden="true" size={15} /> : <CaretLeft aria-hidden="true" size={15} />)}</button>}</section>
      {index < panels.length - 1 && showHandle && <button aria-label={`Resize ${panel.key} panel`} aria-orientation={direction} aria-valuemax={panel.maxSize ?? 95} aria-valuemin={panel.minSize ?? 5} aria-valuenow={Math.round(currentSizes[index])} className="mm-resizable-panels__handle" id={`${id}-handle-${index}`} onDoubleClick={() => resetOnDoubleClick && reset(index)} onKeyDown={(event) => resizeWithKeyboard(event, index)} onPointerDown={(event) => startDrag(event, index)} type="button">{handleContent ?? <span aria-hidden="true" className="mm-resizable-panels__grip">⋮</span>}</button>}
    </span>)}
  </div>;
}
