import { SpinnerGap, MagnifyingGlass, X } from '../../icons';
import { useEffect, useId, useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent, type ReactNode } from 'react';
import type { InputSize, InputVariant } from '../Input';
import './AutoComplete.css';

export type AutoCompleteOption = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  group?: string;
  icon?: ReactNode;
  image?: string;
  keywords?: string[];
};

export type AutoCompleteRenderOptionState = {
  active: boolean;
  selected: boolean;
};

export type AutoCompleteProps = {
  'aria-describedby'?: string;
  'aria-label'?: string;
  allowCustomValue?: boolean;
  className?: string;
  clearable?: boolean;
  defaultValue?: string;
  description?: string;
  disabled?: boolean;
  emptyText?: ReactNode;
  error?: string;
  filterOption?: (option: AutoCompleteOption, query: string) => boolean;
  fullWidth?: boolean;
  id?: string;
  label?: ReactNode;
  leadingIcon?: ReactNode;
  loadOptions?: (query: string, signal: AbortSignal) => Promise<AutoCompleteOption[]>;
  loading?: boolean;
  loadingText?: ReactNode;
  minChars?: number;
  name?: string;
  noResultsText?: ReactNode;
  onChange?: (value: string, option: AutoCompleteOption | undefined) => void;
  onEnter?: (value: string, option: AutoCompleteOption | undefined, event: KeyboardEvent<HTMLInputElement>) => void;
  onInputChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  openOnFocus?: boolean;
  open?: boolean;
  options?: AutoCompleteOption[];
  placeholder?: string;
  readOnly?: boolean;
  renderOption?: (option: AutoCompleteOption, state: AutoCompleteRenderOptionState) => ReactNode;
  searchDebounceMs?: number;
  size?: InputSize;
  trailingIcon?: ReactNode;
  value?: string;
  variant?: InputVariant;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function AutoComplete({
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  allowCustomValue = false,
  className,
  clearable = true,
  defaultValue = '',
  description,
  disabled = false,
  emptyText = 'Start typing to search',
  error,
  filterOption,
  fullWidth = false,
  id: providedId,
  label,
  leadingIcon,
  loadOptions,
  loading = false,
  loadingText = 'Loading…',
  minChars = 1,
  name,
  noResultsText = 'No results found',
  onChange,
  onEnter,
  onInputChange,
  onOpenChange,
  openOnFocus = false,
  open: controlledOpen,
  options = [],
  placeholder = 'MagnifyingGlass',
  readOnly = false,
  renderOption,
  searchDebounceMs = 300,
  size = 'default',
  trailingIcon,
  value,
  variant = 'outline',
}: AutoCompleteProps) {
  const generatedId = useId();
  const id = providedId ?? `mm-auto-complete-${generatedId}`;
  const listboxId = `${id}-listbox`;
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = isControlled ? value : uncontrolledValue;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const [remoteOptions, setRemoteOptions] = useState<AutoCompleteOption[]>([]);
  const [remoteLoading, setRemoteLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const openScrollPositionRef = useRef<{ left: number; top: number } | null>(null);
  const isLoading = loading || remoteLoading;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  const sourceOptions = loadOptions ? remoteOptions : options;
  const filteredOptions = useMemo(() => {
    const query = currentValue.trim().toLowerCase();
    if (currentValue.trim().length < minChars && !(openOnFocus && !loadOptions && sourceOptions.length > 0)) return [];
    if (loadOptions) return sourceOptions;
    return sourceOptions.filter((option) => filterOption
      ? filterOption(option, currentValue)
      : `${option.label} ${option.description ?? ''} ${(option.keywords ?? []).join(' ')}`.toLowerCase().includes(query));
  }, [currentValue, filterOption, loadOptions, minChars, openOnFocus, sourceOptions]);
  const hasValue = currentValue.length > 0;
  const canClear = clearable && hasValue && !disabled && !readOnly && !isLoading;
  const activeOption = filteredOptions[activeIndex];
  const canShowOptions = currentValue.trim().length >= minChars || (openOnFocus && !loadOptions && options.length > 0);

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
    const scrollPosition = openScrollPositionRef.current;
    if (scrollPosition) {
      const restore = () => window.scrollTo(scrollPosition.left, scrollPosition.top);
      restore();
      const frame = requestAnimationFrame(() => requestAnimationFrame(restore));
      return () => cancelAnimationFrame(frame);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex((index) => Math.max(0, Math.min(index, Math.max(0, filteredOptions.length - 1))));
  }, [filteredOptions.length]);

  useEffect(() => {
    if (!loadOptions || !isOpen || currentValue.length < minChars) {
      if (!loadOptions) setRemoteOptions([]);
      setRemoteLoading(false);
      return;
    }
    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;
    setRemoteLoading(true);
    const timer = window.setTimeout(() => {
      loadOptions(currentValue, controller.signal)
        .then((nextOptions) => { if (!controller.signal.aborted) setRemoteOptions(nextOptions); })
        .catch(() => { if (!controller.signal.aborted) setRemoteOptions([]); })
        .finally(() => { if (!controller.signal.aborted) setRemoteLoading(false); });
    }, searchDebounceMs);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [currentValue, isOpen, loadOptions, minChars, searchDebounceMs]);

  const setOpen = (nextOpen: boolean) => {
    if (disabled || readOnly) return;
    const canOpenWithInitialOptions = openOnFocus && !loadOptions && options.length > 0;
    if (nextOpen && currentValue.trim().length < minChars && !canOpenWithInitialOptions) return;
    if (nextOpen && !isOpen) openScrollPositionRef.current = { left: window.scrollX, top: window.scrollY };
    if (controlledOpen === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const updateValue = (nextValue: string) => {
    if (!isControlled) setUncontrolledValue(nextValue);
    onInputChange?.(nextValue);
  };

  const chooseOption = (option: AutoCompleteOption) => {
    if (option.disabled) return;
    updateValue(typeof option.label === 'string' ? option.label : option.value);
    onChange?.(option.value, option);
    setOpen(false);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const clearValue = () => {
    updateValue('');
    onChange?.('', undefined);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHasInteracted(true);
    updateValue(event.target.value);
    if (event.target.value.trim().length >= minChars || (openOnFocus && !loadOptions && options.length > 0)) setOpen(true);
    else setOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen && currentValue.trim().length >= minChars) setOpen(true);
      else setActiveIndex((index) => Math.max(0, Math.min(filteredOptions.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1))));
    } else if (event.key === 'Enter') {
      const option = isOpen ? activeOption : undefined;
      if (isOpen && activeOption) { event.preventDefault(); chooseOption(activeOption); }
      else if (allowCustomValue && currentValue) onChange?.(currentValue, undefined);
      onEnter?.(currentValue, option, event);
    } else if (event.key === 'Escape') {
      if (isOpen) { event.preventDefault(); setOpen(false); }
    } else if (event.key === 'House' && isOpen) {
      event.preventDefault(); setActiveIndex(0);
    } else if (event.key === 'End' && isOpen) {
      event.preventDefault(); setActiveIndex(Math.max(0, filteredOptions.length - 1));
    }
  };

  const showEmpty = hasInteracted && currentValue.length >= minChars && !isLoading && filteredOptions.length === 0;

  return (
    <div className={cx('mm-auto-complete-field', fullWidth && 'mm-auto-complete-field--full-width', className)} ref={rootRef}>
      {label && <label className="mm-auto-complete-field__label" htmlFor={id}>{label}</label>}
      {description && <p className="mm-auto-complete-field__description" id={descriptionId}>{description}</p>}
      <div className={cx('mm-auto-complete', `mm-auto-complete--${size}`, `mm-auto-complete--${variant}`, error && 'mm-auto-complete--error', disabled && 'mm-auto-complete--disabled', isOpen && 'mm-auto-complete--open')}>
        {leadingIcon && <span aria-hidden="true" className="mm-auto-complete__leading-icon">{leadingIcon}</span>}
        <input
          aria-activedescendant={isOpen && activeOption ? `${id}-option-${activeIndex}` : undefined}
          aria-autocomplete="list"
          aria-controls={isOpen ? listboxId : undefined}
          aria-describedby={describedBy}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-invalid={Boolean(error)}
          aria-label={ariaLabel}
          className="mm-auto-complete__input"
          disabled={disabled}
          id={id}
          onChange={handleInputChange}
          onFocus={() => { if (!readOnly && (currentValue.trim().length >= minChars || (openOnFocus && !loadOptions && options.length > 0))) setOpen(true); }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={inputRef}
          role="combobox"
          value={currentValue}
        />
        <span className="mm-auto-complete__actions">
          {isLoading && <SpinnerGap aria-label="Loading" className="mm-auto-complete__loader" role="status" size={16} />}
          {canClear && <button aria-label="Clear input" className="mm-auto-complete__clear" onClick={clearValue} type="button"><X size={16} /></button>}
          {trailingIcon}
        </span>
        {isOpen && (
          <div className="mm-auto-complete__popover">
            <div aria-label={ariaLabel ?? (typeof label === 'string' ? label : 'Suggestions')} className="mm-auto-complete__list" id={listboxId} role="listbox">
              {isLoading && <div className="mm-auto-complete__status">{loadingText}</div>}
              {!isLoading && !canShowOptions && <div className="mm-auto-complete__status">{emptyText}</div>}
              {showEmpty && <div className="mm-auto-complete__status">{noResultsText}</div>}
              {!isLoading && canShowOptions && filteredOptions.map((option, index) => {
                const active = index === activeIndex;
                return <div className="mm-auto-complete__option-wrap" key={option.value}>
                  {option.group && option.group !== filteredOptions[index - 1]?.group && <div className="mm-auto-complete__group">{option.group}</div>}
                  <button aria-selected={active} className={cx('mm-auto-complete__option', active && 'mm-auto-complete__option--active', option.disabled && 'mm-auto-complete__option--disabled')} disabled={option.disabled} id={`${id}-option-${index}`} onClick={() => chooseOption(option)} onMouseEnter={() => setActiveIndex(index)} role="option" type="button">
                    {renderOption ? renderOption(option, { active, selected: false }) : <>
                      {option.image ? <img alt="" className="mm-auto-complete__option-image" src={option.image} /> : option.icon && <span className="mm-auto-complete__option-icon">{option.icon}</span>}
                      <span className="mm-auto-complete__option-copy"><span className="mm-auto-complete__option-label">{option.label}</span>{option.description && <span className="mm-auto-complete__option-description">{option.description}</span>}</span>
                    </>}
                  </button>
                </div>;
              })}
            </div>
          </div>
        )}
      </div>
      {name && <input name={name} type="hidden" value={currentValue} />}
      {error && <p className="mm-auto-complete-field__error" id={errorId}>{error}</p>}
    </div>
  );
}
