import { Check, CaretDown, SpinnerGap, MagnifyingGlass, X } from '../../icons';
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import type { InputSize, InputVariant } from '../Input';
import './Select.css';

export type SelectOption = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  group?: string;
  icon?: ReactNode;
  image?: string;
};

export type SelectValue = string | string[] | undefined;

export type SelectProps = {
  'aria-describedby'?: string;
  'aria-label'?: string;
  className?: string;
  clearable?: boolean;
  defaultValue?: SelectValue;
  description?: string;
  disabled?: boolean;
  error?: string;
  fullWidth?: boolean;
  id?: string;
  label?: ReactNode;
  loading?: boolean;
  maxSelected?: number;
  multiple?: boolean;
  name?: string;
  onChange?: (value: SelectValue, option: SelectOption | SelectOption[] | undefined) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  options: SelectOption[];
  placeholder?: string;
  readOnly?: boolean;
  renderValue?: (selected: SelectOption[], multiple: boolean) => ReactNode;
  searchPlaceholder?: string;
  searchable?: boolean;
  size?: InputSize;
  value?: SelectValue;
  variant?: InputVariant;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

function normalizeValues(value: SelectValue, multiple: boolean) {
  if (multiple) return Array.isArray(value) ? value : value ? [value] : [];
  return Array.isArray(value) ? value.slice(0, 1) : value ? [value] : [];
}

export function Select({
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  className,
  clearable = false,
  defaultValue,
  description,
  disabled = false,
  error,
  fullWidth = false,
  id: providedId,
  label,
  loading = false,
  maxSelected,
  multiple = false,
  name,
  onChange,
  onOpenChange,
  open: controlledOpen,
  options,
  placeholder = 'Select an option',
  readOnly = false,
  renderValue,
  searchPlaceholder = 'MagnifyingGlass options',
  searchable = false,
  size = 'default',
  value,
  variant = 'outline',
}: SelectProps) {
  const generatedId = useId();
  const id = providedId ?? `mm-select-${generatedId}`;
  const listboxId = `${id}-listbox`;
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<SelectValue>(defaultValue);
  const selectedValues = normalizeValues(isControlled ? value : uncontrolledValue, multiple);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const openScrollPositionRef = useRef<{ left: number; top: number } | null>(null);
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return options;
    return options.filter((option) => `${option.label} ${option.description ?? ''}`.toLowerCase().includes(normalizedQuery));
  }, [options, query]);

  const selectedOptions = selectedValues.map((selectedValue) => options.find((option) => option.value === selectedValue)).filter(Boolean) as SelectOption[];
  const selectedSet = new Set(selectedValues);
  const hasValue = selectedValues.length > 0;
  const canClear = clearable && hasValue && !disabled && !readOnly && !loading;
  const activeOption = filteredOptions[activeIndex];

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setActiveIndex(0);
    requestAnimationFrame(() => {
      if (searchable) searchRef.current?.focus({ preventScroll: true });
      else triggerRef.current?.focus({ preventScroll: true });
    });

    const scrollPosition = openScrollPositionRef.current;
    if (!scrollPosition) return;
    const restoreScrollPosition = () => window.scrollTo(scrollPosition.left, scrollPosition.top);
    restoreScrollPosition();
    const frame = requestAnimationFrame(() => requestAnimationFrame(restoreScrollPosition));
    return () => cancelAnimationFrame(frame);
  }, [isOpen, searchable]);

  const setOpen = (nextOpen: boolean) => {
    if (disabled || readOnly || loading) return;
    if (nextOpen && !isOpen) openScrollPositionRef.current = { left: window.scrollX, top: window.scrollY };
    if (controlledOpen === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
    if (!nextOpen) {
      setQuery('');
    }
  };

  const emitValue = (nextValues: string[]) => {
    const nextValue: SelectValue = multiple ? nextValues : nextValues[0];
    if (!isControlled) setUncontrolledValue(nextValue);
    const nextOptions = nextValues.map((nextValueItem) => options.find((option) => option.value === nextValueItem)).filter(Boolean) as SelectOption[];
    onChange?.(nextValue, multiple ? nextOptions : nextOptions[0]);
  };

  const chooseOption = (option: SelectOption) => {
    if (option.disabled) return;
    if (multiple) {
      if (selectedSet.has(option.value)) emitValue(selectedValues.filter((selectedValue) => selectedValue !== option.value));
      else if (maxSelected === undefined || selectedValues.length < maxSelected) emitValue([...selectedValues, option.value]);
      return;
    }
    emitValue([option.value]);
    setOpen(false);
  };

  const clearValue = () => emitValue([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) setOpen(true);
      else setActiveIndex((index) => Math.max(0, Math.min(filteredOptions.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1))));
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!isOpen) setOpen(true);
      else if (activeOption) chooseOption(activeOption);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'House' && isOpen) {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === 'End' && isOpen) {
      event.preventDefault();
      setActiveIndex(Math.max(0, filteredOptions.length - 1));
    }
  };

  const displayValue = renderValue ? renderValue(selectedOptions, multiple) : multiple ? (
    <span className="mm-select__chips">
      {selectedOptions.map((option) => <span className="mm-select__chip" key={option.value}>{option.label}<button aria-label={`Remove ${option.label}`} className="mm-select__chip-remove" onClick={(event) => { event.stopPropagation(); chooseOption(option); }} type="button"><X size={12} /></button></span>)}
    </span>
  ) : selectedOptions[0] ? <span className="mm-select__selected">{selectedOptions[0].label}</span> : null;

  return (
    <div className={cx('mm-select-field', fullWidth && 'mm-select-field--full-width', className)} ref={rootRef}>
      {label && <label className="mm-select-field__label" htmlFor={id}>{label}</label>}
      <div className={cx('mm-select', `mm-select--${size}`, `mm-select--${variant}`, error && 'mm-select--error', disabled && 'mm-select--disabled', loading && 'mm-select--loading', isOpen && 'mm-select--open')}>
        <button
          aria-describedby={describedBy}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-invalid={Boolean(error)}
          aria-label={ariaLabel}
          className="mm-select__trigger"
          disabled={disabled}
          id={id}
          onClick={(event) => {
            // Keyboard activation has no mouse-down phase, so keep it accessible.
            if (event.detail === 0) setOpen(!isOpen);
          }}
          onMouseDown={(event) => {
            // Prevent the browser from moving the document while the custom menu opens.
            event.preventDefault();
            setOpen(!isOpen);
          }}
          onKeyDown={handleKeyDown}
          ref={triggerRef}
          type="button"
        >
          <span className={cx('mm-select__value', !hasValue && 'mm-select__placeholder')}>{displayValue ?? placeholder}</span>
          <span className="mm-select__actions">
            {loading && <SpinnerGap aria-hidden="true" className="mm-select__loader" size={16} />}
            {canClear && <span aria-hidden="true" className="mm-select__clear" onClick={(event) => { event.stopPropagation(); clearValue(); }}><X size={16} /></span>}
            <CaretDown aria-hidden="true" className="mm-select__chevron" size={16} />
          </span>
        </button>
        {isOpen && (
          <div className="mm-select__popover">
            {searchable && <div className="mm-select__search-wrap"><MagnifyingGlass aria-hidden="true" className="mm-select__search-icon" size={16} /><input aria-label={searchPlaceholder} className="mm-select__search" onChange={(event) => setQuery(event.target.value)} onKeyDown={handleKeyDown} placeholder={searchPlaceholder} ref={searchRef} value={query} /></div>}
            <div aria-label={ariaLabel ?? (typeof label === 'string' ? label : 'Options')} className="mm-select__list" id={listboxId} role="listbox" aria-multiselectable={multiple || undefined}>
              {filteredOptions.length === 0 && <div className="mm-select__empty">No options found</div>}
              {filteredOptions.map((option, index) => {
                const selected = selectedSet.has(option.value);
                const previous = filteredOptions[index - 1];
                const showGroup = option.group && option.group !== previous?.group;
                return (
                  <span className="mm-select__option-wrap" key={option.value}>
                    {showGroup && <span className="mm-select__group">{option.group}</span>}
                    <button aria-selected={selected} className={cx('mm-select__option', selected && 'mm-select__option--selected', option.disabled && 'mm-select__option--disabled', activeIndex === index && 'mm-select__option--active')} disabled={option.disabled} onClick={() => chooseOption(option)} onMouseEnter={() => setActiveIndex(index)} role="option" type="button">
                      {option.image ? <img alt="" className="mm-select__option-image" src={option.image} /> : option.icon && <span className="mm-select__option-icon">{option.icon}</span>}
                      <span className="mm-select__option-copy"><span className="mm-select__option-label">{option.label}</span>{option.description && <span className="mm-select__option-description">{option.description}</span>}</span>
                      {selected && <Check aria-hidden="true" className="mm-select__check" size={16} />}
                    </button>
                  </span>
                );
              })}
            </div>
            {multiple && <div className="mm-select__footer">{selectedValues.length} selected{maxSelected !== undefined ? ` of ${maxSelected}` : ''}</div>}
          </div>
        )}
      </div>
      {name && <input name={name} type="hidden" value={multiple ? selectedValues.join(',') : selectedValues[0] ?? ''} />}
      {description && <p className="mm-select-field__description" id={descriptionId}>{description}</p>}
      {error && <p className="mm-select-field__error" id={errorId}>{error}</p>}
    </div>
  );
}
