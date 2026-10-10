import { Check, CaretDown, Clock, X } from '../../icons';
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { useConfig, type Locale } from '../ConfigProvider';
import './TimePicker.css';

export type TimePickerSize = 'sm' | 'default' | 'lg';
export type TimePickerFormat = '12' | '24';
export type TimePickerView = 'input' | 'picker';
export type TimePickerDisplayMode = 'numeric' | 'time';
export type TimePickerLocale = Locale;

const timeTranslations: Record<TimePickerLocale, { am: string; chooseTime: string; clearTime: string; hours: string; minutes: string; pm: string; seconds: string; placeholder: string }> = {
  en: { am: 'AM', chooseTime: 'Choose a time', clearTime: 'Clear time', hours: 'Hours', minutes: 'Minutes', pm: 'PM', seconds: 'Seconds', placeholder: 'Select time' },
  uk: { am: 'дп', chooseTime: 'Виберіть час', clearTime: 'Очистити час', hours: 'Години', minutes: 'Хвилини', pm: 'пп', seconds: 'Секунди', placeholder: 'Виберіть час' },
  de: { am: 'AM', chooseTime: 'Uhrzeit auswählen', clearTime: 'Zeit löschen', hours: 'Stunden', minutes: 'Minuten', pm: 'PM', seconds: 'Sekunden', placeholder: 'Zeit auswählen' },
  fr: { am: 'AM', chooseTime: 'Choisir une heure', clearTime: 'Effacer l’heure', hours: 'Heures', minutes: 'Minutes', pm: 'PM', seconds: 'Secondes', placeholder: 'Sélectionner une heure' },
};

export type TimePickerProps = {
  'aria-label'?: string;
  className?: string;
  clearable?: boolean;
  defaultValue?: string | null;
  description?: string;
  displayMode?: TimePickerDisplayMode;
  disabled?: boolean;
  error?: string;
  format?: TimePickerFormat;
  fullWidth?: boolean;
  label?: string;
  loading?: boolean;
  locale?: TimePickerLocale;
  maxTime?: string;
  minTime?: string;
  minuteStep?: number;
  name?: string;
  onChange?: (value: string | null) => void;
  onComplete?: (value: string) => void;
  placeholder?: string;
  prefix?: ReactNode;
  readOnly?: boolean;
  seconds?: boolean;
  secondStep?: number;
  size?: TimePickerSize;
  step?: number;
  suffix?: ReactNode;
  value?: string | null;
  view?: TimePickerView;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const MINUTES_IN_DAY = 24 * 60;

function toMinutes(value?: string | null) {
  if (!value) return null;
  const match = value.match(/^(\d{1,2}):(\d{2})/);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return hours * 60 + minutes;
}

function normalizeTime(value: string | null | undefined, seconds: boolean) {
  const minutes = toMinutes(value);
  if (minutes === null) return '';
  const match = value?.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}${seconds ? `:${match?.[3] ?? '00'}` : ''}`;
}

function formatTime(value: string, format: TimePickerFormat, seconds: boolean, locale: TimePickerLocale = 'en') {
  const minutes = toMinutes(value);
  if (minutes === null) return value;
  const hours24 = Math.floor(minutes / 60);
  const hour = format === '12' ? (hours24 % 12 || 12) : hours24;
  return `${String(hour).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}${seconds ? `:${value.slice(6, 8) || '00'}` : ''}${format === '12' ? ` ${hours24 >= 12 ? timeTranslations[locale].pm : timeTranslations[locale].am}` : ''}`;
}

function parseTyped(value: string, format: TimePickerFormat, seconds: boolean) {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const suffix = match[4]?.toUpperCase();
  if (format === '12') {
    if (hours < 1 || hours > 12 || !suffix) return null;
    hours = hours % 12 + (suffix === 'PM' ? 12 : 0);
  }
  if (hours > 23 || minutes > 59 || (match[3] && Number(match[3]) > 59)) return null;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}${seconds ? `:${match[3] ?? '00'}` : ''}`;
}

export function TimePicker({
  'aria-label': ariaLabel = 'Time', className, clearable = false, defaultValue = null, description, disabled = false, displayMode = 'numeric', error, format = '24', fullWidth = false, label, loading = false, locale, maxTime, minTime, minuteStep, name, onChange, onComplete, placeholder, prefix, readOnly = false, seconds = false, secondStep = 1, size = 'default', step = 30, suffix, value, view = 'input',
}: TimePickerProps) {
  const { locale: globalLocale } = useConfig();
  const activeLocale: TimePickerLocale = locale ?? globalLocale;
  const language = timeTranslations[activeLocale];
  const inputPlaceholder = placeholder ?? language.placeholder;
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue);
  const [open, setOpen] = useState(view === 'picker');
  const [draft, setDraft] = useState(value ? formatTime(value, format, seconds, activeLocale) : defaultValue ? formatTime(defaultValue, format, seconds, activeLocale) : '');
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedPartsRef = useRef(new Set<'hour' | 'minute' | 'second'>());
  const generatedId = useId();
  const currentValue = value === undefined ? internalValue : value;
  const minMinutes = toMinutes(minTime);
  const maxMinutes = toMinutes(maxTime);
  const safeStep = Math.max(1, Math.round(step));
  const safeMinuteStep = Math.max(1, Math.round(minuteStep ?? step));
  const safeSecondStep = Math.max(1, Math.round(secondStep));
  const inputId = name ?? `time-picker-${generatedId.replace(/:/g, '')}`;
  const describedBy = [description && `${inputId}-description`, error && `${inputId}-error`].filter(Boolean).join(' ') || undefined;

  useEffect(() => { setDraft(currentValue ? formatTime(currentValue, format, seconds, activeLocale) : ''); }, [activeLocale, currentValue, format, seconds]);
  useEffect(() => {
    if (!open || view === 'picker') return undefined;
    const close = (event: MouseEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open, view]);

  const options = useMemo(() => Array.from({ length: Math.ceil(MINUTES_IN_DAY / safeStep) }, (_, index) => index * safeStep).filter((minutes) => (minMinutes === null || minutes >= minMinutes) && (maxMinutes === null || minutes <= maxMinutes)), [maxMinutes, minMinutes, safeStep]);
  const commit = (next: string | null, complete = false) => {
    const normalized = next ? normalizeTime(next, seconds) : null;
    if (normalized && ((minMinutes !== null && toMinutes(normalized)! < minMinutes) || (maxMinutes !== null && toMinutes(normalized)! > maxMinutes))) return;
    if (value === undefined) setInternalValue(normalized);
    setDraft(normalized ? formatTime(normalized, format, seconds, activeLocale) : '');
    onChange?.(normalized);
    if (normalized && complete) onComplete?.(normalized);
    if (view === 'input') setOpen(false);
  };
  const onInputChange = (next: string) => {
    setDraft(next);
    const parsed = parseTyped(next, format, seconds);
    if (parsed) commit(parsed, true);
  };
  const selectPart = (part: 'hour' | 'minute' | 'second', selectedValue: number) => {
    const normalized = normalizeTime(currentValue ?? '00:00:00', true) || '00:00:00';
    const parts = normalized.split(':').map(Number);
    const next = part === 'hour' ? [selectedValue, parts[1], parts[2]] : part === 'minute' ? [parts[0], selectedValue, parts[2]] : [parts[0], parts[1], selectedValue];
    const nextValue = `${String(next[0]).padStart(2, '0')}:${String(next[1]).padStart(2, '0')}:${String(next[2]).padStart(2, '0')}`;
    selectedPartsRef.current.add(part);
    const complete = seconds
      ? selectedPartsRef.current.size === 3
      : selectedPartsRef.current.has('hour') && selectedPartsRef.current.has('minute');
    commit(nextValue, complete);
    if (complete) selectedPartsRef.current.clear();
  };
  const numericColumn = (label: string, values: number[], part: 'hour' | 'minute' | 'second') => <div className="mm-time-picker__column"><span className="mm-time-picker__column-label">{label}</span><div className="mm-time-picker__column-options" role="listbox">{values.map((number) => { const current = currentValue?.split(':').map(Number) ?? [0, 0, 0]; const selected = current[part === 'hour' ? 0 : part === 'minute' ? 1 : 2] === number; const candidate = part === 'hour' ? number * 60 + current[1] : current[0] * 60 + (part === 'minute' ? number : current[1]); const unavailable = part !== 'second' && ((minMinutes !== null && candidate < minMinutes) || (maxMinutes !== null && candidate > maxMinutes)); return <button aria-selected={selected} className={cx('mm-time-picker__option', selected && 'mm-time-picker__option--selected')} disabled={disabled || readOnly || unavailable} key={`${part}-${number}`} onClick={() => selectPart(part, number)} role="option" type="button">{String(number).padStart(2, '0')}{selected && <Check aria-hidden="true" size={14} />}</button>; })}</div></div>;
  const panel = <div aria-label="Time options" className="mm-time-picker__panel">
    <div className="mm-time-picker__panel-header"><span>{currentValue ? formatTime(currentValue, format, seconds, activeLocale) : language.chooseTime}</span>{clearable && currentValue && <button aria-label={language.clearTime} className="mm-time-picker__clear" onClick={() => commit(null)} type="button"><X size={14} /></button>}</div>
    {displayMode === 'numeric' ? <div className="mm-time-picker__numeric">{numericColumn(language.hours, format === '12' ? Array.from({ length: 12 }, (_, index) => index + 1) : Array.from({ length: 24 }, (_, index) => index), 'hour')}{numericColumn(language.minutes, Array.from({ length: Math.ceil(60 / safeMinuteStep) }, (_, index) => index * safeMinuteStep).filter((number) => number < 60), 'minute')}{seconds && numericColumn(language.seconds, Array.from({ length: Math.ceil(60 / safeSecondStep) }, (_, index) => index * safeSecondStep).filter((number) => number < 60), 'second')}</div> : <div className="mm-time-picker__options" role="listbox">{options.map((minutes) => { const option = `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}${seconds ? ':00' : ''}`; const selected = option.slice(0, 5) === currentValue?.slice(0, 5); return <button aria-selected={selected} className={cx('mm-time-picker__option', selected && 'mm-time-picker__option--selected')} disabled={disabled || readOnly} key={option} onClick={() => commit(option, true)} role="option" type="button">{formatTime(option, format, seconds, activeLocale)}{selected && <Check aria-hidden="true" size={14} />}</button>; })}</div>}
  </div>;
  const content = <div className={cx('mm-time-picker', `mm-time-picker--${size}`, `mm-time-picker--${view}`, disabled && 'mm-time-picker--disabled', loading && 'mm-time-picker--loading', fullWidth && 'mm-time-picker--full-width', error && 'mm-time-picker--error', className)} ref={rootRef}>
    {label && <label className="mm-time-picker__label" htmlFor={inputId}>{label}</label>}
    {description && <div className="mm-time-picker__description" id={`${inputId}-description`}>{description}</div>}
    {view === 'input' ? <div className="mm-time-picker__control"><span className="mm-time-picker__slot">{prefix ?? <Clock aria-hidden="true" size={16} />}</span><input aria-describedby={describedBy} aria-label={ariaLabel} className="mm-time-picker__input" disabled={disabled || loading} id={inputId} name={name} onChange={(event) => onInputChange(event.target.value)} onFocus={() => !readOnly && setOpen(true)} placeholder={inputPlaceholder} readOnly={readOnly} value={draft} />{suffix ?? <CaretDown aria-hidden="true" className="mm-time-picker__chevron" size={16} />}</div> : null}
    {error && <div className="mm-time-picker__error" id={`${inputId}-error`} role="alert">{error}</div>}
    {(open || view === 'picker') && !disabled && panel}
  </div>;
  return content;
}
