import { CaretDown } from '../../icons';
import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import './Accordion.css';

export type AccordionSize = 'sm' | 'default' | 'lg';
export type AccordionVariant = 'default' | 'separated' | 'plain';
export type AccordionItem = { key: string; label: ReactNode; content: ReactNode; description?: ReactNode; icon?: ReactNode; badge?: ReactNode; disabled?: boolean };
export type AccordionValue = string | string[];
export type AccordionProps = {
  'aria-label'?: string;
  items: AccordionItem[];
  value?: AccordionValue;
  defaultValue?: AccordionValue;
  onChange?: (value: AccordionValue, item: AccordionItem) => void;
  multiple?: boolean;
  collapsible?: boolean;
  size?: AccordionSize;
  variant?: AccordionVariant;
  iconPosition?: 'start' | 'end';
  lazy?: boolean;
  className?: string;
  style?: CSSProperties;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function Accordion({ 'aria-label': ariaLabel = 'Accordion', items, value, defaultValue, onChange, multiple = false, collapsible = true, size = 'default', variant = 'default', iconPosition = 'end', lazy = false, className, style }: AccordionProps) {
  const id = useId().replace(/:/g, '');
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const normalize = (next: AccordionValue | undefined): string[] => {
    const values = next === undefined ? [] : Array.isArray(next) ? next : [next];
    return multiple ? values : values.slice(0, 1);
  };
  const [internal, setInternal] = useState<string[]>(normalize(defaultValue));
  const openKeys = normalize(value === undefined ? internal : value);
  const isOpen = (key: string) => openKeys.includes(key);
  const update = (item: AccordionItem) => {
    if (item.disabled) return;
    const nextOpen = isOpen(item.key)
      ? (collapsible ? openKeys.filter((key) => key !== item.key) : openKeys)
      : (multiple ? [...openKeys, item.key] : [item.key]);
    if (value === undefined) setInternal(nextOpen);
    onChange?.(multiple ? nextOpen : (nextOpen[0] ?? ''), item);
  };
  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const enabled = items.map((item, itemIndex) => ({ item, itemIndex })).filter(({ item }) => !item.disabled);
    if (!enabled.length) return;
    let target = -1;
    if (event.key === 'House') target = enabled[0].itemIndex;
    if (event.key === 'End') target = enabled[enabled.length - 1].itemIndex;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') target = enabled[(enabled.findIndex(({ itemIndex }) => itemIndex === index) + 1) % enabled.length].itemIndex;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') target = enabled[(enabled.findIndex(({ itemIndex }) => itemIndex === index) - 1 + enabled.length) % enabled.length].itemIndex;
    if (target >= 0) { event.preventDefault(); buttonRefs.current[target]?.focus(); }
  };
  return <div aria-label={ariaLabel} className={cx('mm-accordion', `mm-accordion--${size}`, `mm-accordion--${variant}`, `mm-accordion--icon-${iconPosition}`, className)} style={style}>
    {items.map((item, index) => {
      const open = isOpen(item.key);
      const buttonId = `${id}-trigger-${item.key}`;
      const panelId = `${id}-panel-${item.key}`;
      return <div className={cx('mm-accordion__item', open && 'mm-accordion__item--open', item.disabled && 'mm-accordion__item--disabled')} key={item.key}>
        <h3 className="mm-accordion__heading"><button aria-controls={panelId} aria-expanded={open} className="mm-accordion__trigger" disabled={item.disabled} id={buttonId} ref={(node) => { buttonRefs.current[index] = node; }} onClick={() => update(item)} onKeyDown={(event) => moveFocus(event, index)} type="button">
          {item.icon && <span aria-hidden="true" className="mm-accordion__icon">{item.icon}</span>}
          <span className="mm-accordion__label"><span>{item.label}</span>{item.description && <span className="mm-accordion__description">{item.description}</span>}</span>
          {item.badge && <span className="mm-accordion__badge">{item.badge}</span>}<span aria-hidden="true" className="mm-accordion__chevron"><CaretDown size={16} strokeWidth={2} /></span>
        </button></h3>
        <div aria-hidden={!open} aria-labelledby={buttonId} className={cx('mm-accordion__panel', open && 'mm-accordion__panel--open')} id={panelId} role="region">
          <div className="mm-accordion__panel-inner">{(!lazy || open || openKeys.includes(item.key)) && item.content}</div>
        </div>
      </div>;
    })}
  </div>;
}
