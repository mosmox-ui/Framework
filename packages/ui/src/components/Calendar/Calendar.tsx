import { CalendarDots, CaretLeft, CaretRight, CaretDoubleLeft, CaretDoubleRight, X } from '../../icons';
import { Fragment, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react';
import { Button } from '../Button';
import { useConfig, type Locale } from '../ConfigProvider';
import { Select } from '../Select';
import './Calendar.css';

export type CalendarSize = 'sm' | 'default' | 'lg';
export type CalendarLocale = Locale;
export type CalendarView = 'widget' | 'input';
export type CalendarVariant = 'standard' | 'mini';
export type CalendarGranularity = 'day' | 'month' | 'year';
export type CalendarSelectionMode = 'single' | 'multiple' | 'range';
export type CalendarOrientation = 'horizontal' | 'vertical';
export type CalendarRange = { from: Date | null; to: Date | null };
export type CalendarValue = Date | Date[] | CalendarRange | null;
export type CalendarValueFormat = 'date' | 'iso' | 'timestamp' | 'locale';
export type CalendarFormattedRange = { from: string | number | null; to: string | number | null };
export type CalendarChangeValue = CalendarValue | string | number | Array<string | number> | CalendarFormattedRange;
export type CalendarDisabledDate = Date | ((date: Date) => boolean);
export type CalendarRangePreset = { label: string; days: number };
export type CalendarHoliday = { date: Date; label: string };
export type CalendarHolidayInteraction = 'hover' | 'click' | 'both';
export type CalendarRelativeDateMode = 'any' | 'past' | 'future' | 'current';
export type CalendarYearNavigation = 'arrows' | 'select';
export type CalendarYearRange = { start: number; end: number };
export type CalendarFooterButtonAlign = 'start' | 'end';
export type CalendarFooterButtonOrder = 'today-clear' | 'clear-today';

export const defaultCalendarRangePresets: CalendarRangePreset[] = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 60 days', days: 60 },
  { label: 'Last 90 days', days: 90 },
  { label: 'Last 180 days', days: 180 },
];

const intlLocales: Record<CalendarLocale, string> = { en: 'en-US', uk: 'uk-UA', de: 'de-DE', fr: 'fr-FR' };
const translations: Record<CalendarLocale, { today: string; clear: string; close: string; ok: string; previousMonth: string; previousYear: string; nextMonth: string; nextYear: string; quickRanges: string; selectMonth: string; selectYear: string; endDateHint: string; presets: CalendarRangePreset[] }> = {
  en: { today: 'Today', clear: 'Clear', close: 'Close', ok: 'OK', previousMonth: 'Previous month', previousYear: 'Previous year', nextMonth: 'Next month', nextYear: 'Next year', quickRanges: 'Quick date ranges', selectMonth: 'Select month', selectYear: 'Select year', endDateHint: 'Select an end date', presets: defaultCalendarRangePresets },
  uk: { today: 'Сьогодні', clear: 'Очистити', close: 'Закрити', ok: 'OK', previousMonth: 'Попередній місяць', previousYear: 'Попередній рік', nextMonth: 'Наступний місяць', nextYear: 'Наступний рік', quickRanges: 'Швидкі діапазони дат', selectMonth: 'Вибрати місяць', selectYear: 'Вибрати рік', endDateHint: 'Виберіть кінцеву дату', presets: [{ label: 'Останні 7 днів', days: 7 }, { label: 'Останні 30 днів', days: 30 }, { label: 'Останні 60 днів', days: 60 }, { label: 'Останні 90 днів', days: 90 }, { label: 'Останні 180 днів', days: 180 }] },
  de: { today: 'Heute', clear: 'Löschen', close: 'Schließen', ok: 'OK', previousMonth: 'Vorheriger Monat', previousYear: 'Vorheriges Jahr', nextMonth: 'Nächster Monat', nextYear: 'Nächstes Jahr', quickRanges: 'Schnelle Zeiträume', selectMonth: 'Monat auswählen', selectYear: 'Jahr auswählen', endDateHint: 'Enddatum auswählen', presets: [{ label: 'Letzte 7 Tage', days: 7 }, { label: 'Letzte 30 Tage', days: 30 }, { label: 'Letzte 60 Tage', days: 60 }, { label: 'Letzte 90 Tage', days: 90 }, { label: 'Letzte 180 Tage', days: 180 }] },
  fr: { today: "Aujourd’hui", clear: 'Effacer', close: 'Fermer', ok: 'OK', previousMonth: 'Mois précédent', previousYear: 'Année précédente', nextMonth: 'Mois suivant', nextYear: 'Année suivante', quickRanges: 'Périodes rapides', selectMonth: 'Sélectionner le mois', selectYear: "Sélectionner l’année", endDateHint: 'Sélectionnez une date de fin', presets: [{ label: '7 derniers jours', days: 7 }, { label: '30 derniers jours', days: 30 }, { label: '60 derniers jours', days: 60 }, { label: '90 derniers jours', days: 90 }, { label: '180 derniers jours', days: 180 }] },
};

export type CalendarProps = {
  'aria-label'?: string;
  className?: string;
  closeOnRangeSelection?: boolean;
  granularity?: CalendarGranularity;
  displayDate?: Date;
  defaultDisplayDate?: Date;
  defaultValue?: CalendarValue;
  disabled?: boolean;
  disabledDates?: CalendarDisabledDate[] | ((date: Date) => boolean);
  footerButtonAlign?: CalendarFooterButtonAlign;
  footerButtonOrder?: CalendarFooterButtonOrder;
  footerOppositeContent?: ReactNode;
  fullWidth?: boolean;
  holidays?: CalendarHoliday[];
  holidayInteraction?: CalendarHolidayInteraction;
  locale?: CalendarLocale;
  miniDaysAfter?: number;
  miniDaysBefore?: number;
  miniReferenceDate?: Date;
  maxDate?: Date;
  minDate?: Date;
  monthFormat?: Intl.DateTimeFormatOptions;
  months?: 1 | 2 | 3;
  onChange?: (value: CalendarChangeValue) => void;
  outputDateFormat?: Intl.DateTimeFormatOptions;
  onDisplayDateChange?: (date: Date) => void;
  previousYearContent?: ReactNode;
  orientation?: CalendarOrientation;
  placeholder?: string;
  readOnly?: boolean;
  renderDay?: (date: Date, state: { disabled: boolean; outside: boolean; selected: boolean }) => ReactNode;
  rangePresets?: CalendarRangePreset[];
  referenceDate?: Date;
  relativeDateMode?: CalendarRelativeDateMode;
  selectionMode?: CalendarSelectionMode;
  showClear?: boolean;
  showOutsideDays?: boolean;
  showHolidays?: boolean;
  showRangePresets?: boolean;
  showToday?: boolean;
  showWeekNumbers?: boolean;
  size?: CalendarSize;
  value?: CalendarValue;
  valueFormat?: CalendarValueFormat;
  variant?: CalendarVariant;
  view?: CalendarView;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  nextYearContent?: ReactNode;
  yearNavigation?: CalendarYearNavigation;
  yearRange?: CalendarYearRange;
  yearOverview?: boolean;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const DAY_MS = 86_400_000;

function startOfDay(date: Date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function startOfMonth(date: Date) {
  const result = startOfDay(date);
  result.setDate(1);
  return result;
}

function addMonths(date: Date, amount: number) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + amount, 1);
  return result;
}

function addDays(date: Date, amount: number) {
  const result = startOfDay(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function sameDay(left: Date | null | undefined, right: Date | null | undefined) {
  return Boolean(left && right && startOfDay(left).getTime() === startOfDay(right).getTime());
}

function isRange(value: CalendarValue): value is CalendarRange {
  return Boolean(value && !Array.isArray(value) && !(value instanceof Date) && 'from' in value);
}

function valueDates(value: CalendarValue) {
  if (value instanceof Date) return [value];
  if (Array.isArray(value)) return value;
  if (isRange(value)) return [value.from, value.to].filter((date): date is Date => Boolean(date));
  return [];
}

function formatDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
}

function formatOutputDate(date: Date, format: CalendarValueFormat, locale: string, options: Intl.DateTimeFormatOptions) {
  if (format === 'iso') return date.toISOString();
  if (format === 'timestamp') return date.getTime();
  if (format === 'locale') return new Intl.DateTimeFormat(locale, options).format(date);
  return date;
}

function formatOutputValue(value: CalendarValue, format: CalendarValueFormat, locale: string, options: Intl.DateTimeFormatOptions): CalendarChangeValue {
  if (format === 'date') return value;
  if (value instanceof Date) return formatOutputDate(value, format, locale, options);
  if (Array.isArray(value)) return value.map((date) => formatOutputDate(date, format, locale, options) as string | number);
  if (isRange(value)) return { from: value.from ? formatOutputDate(value.from, format, locale, options) as string | number : null, to: value.to ? formatOutputDate(value.to, format, locale, options) as string | number : null };
  return value;
}

function formatGranularityDate(date: Date, locale: string, granularity: CalendarGranularity) {
  if (granularity === 'year') return new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date);
  if (granularity === 'month') return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(date);
  return formatDate(date, locale);
}

function formatGranularityValue(value: CalendarValue, locale: string, granularity: CalendarGranularity) {
  if (value instanceof Date) return formatGranularityDate(value, locale, granularity);
  if (Array.isArray(value)) return value.map((date) => formatGranularityDate(date, locale, granularity)).join(', ');
  if (isRange(value)) {
    if (value.from && value.to) return `${formatGranularityDate(value.from, locale, granularity)} – ${formatGranularityDate(value.to, locale, granularity)}`;
    if (value.from) return `${formatGranularityDate(value.from, locale, granularity)} – …`;
  }
  return '';
}

function monthDays(month: Date, weekStartsOn: number) {
  const first = startOfMonth(month);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(first);
    date.setDate(1 - offset + index);
    return date;
  });
}

function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date, disabledDates?: CalendarDisabledDate[] | ((date: Date) => boolean), referenceDate?: Date, relativeDateMode: CalendarRelativeDateMode = 'any') {
  const day = startOfDay(date).getTime();
  if (minDate && day < startOfDay(minDate).getTime()) return true;
  if (maxDate && day > startOfDay(maxDate).getTime()) return true;
  if (referenceDate && relativeDateMode === 'past' && day > startOfDay(referenceDate).getTime()) return true;
  if (referenceDate && relativeDateMode === 'future' && day < startOfDay(referenceDate).getTime()) return true;
  if (referenceDate && relativeDateMode === 'current' && day !== startOfDay(referenceDate).getTime()) return true;
  if (typeof disabledDates === 'function') return disabledDates(date);
  return disabledDates?.some((item) => typeof item === 'function' ? item(date) : sameDay(item, date)) ?? false;
}

const weekDayLabels = (locale: string, weekStartsOn: number) => Array.from({ length: 7 }, (_, index) => {
  const date = new Date(2024, 0, 7 + ((index + weekStartsOn) % 7));
  return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
});

type MiniCalendarPanelProps = {
  'aria-label': string;
  currentValue: CalendarValue;
  disabled?: boolean;
  disabledDates?: CalendarDisabledDate[] | ((date: Date) => boolean);
  locale: CalendarLocale;
  maxDate?: Date;
  minDate?: Date;
  miniDaysAfter: number;
  miniDaysBefore: number;
  miniReferenceDate: Date;
  readOnly?: boolean;
  referenceDate?: Date;
  relativeDateMode?: CalendarRelativeDateMode;
  selectValue: (value: CalendarValue) => void;
  selectionMode: CalendarSelectionMode;
  showToday: boolean;
  size: CalendarSize;
  weekStartsOn: number;
};

function MiniCalendarPanel({
  'aria-label': ariaLabel,
  currentValue,
  disabled = false,
  disabledDates,
  locale,
  maxDate,
  minDate,
  miniDaysAfter,
  miniDaysBefore,
  miniReferenceDate,
  readOnly = false,
  referenceDate,
  relativeDateMode = 'any',
  selectValue,
  selectionMode,
  showToday,
  size,
  weekStartsOn,
}: MiniCalendarPanelProps) {
  const language = translations[locale];
  const intlLocale = intlLocales[locale];
  const anchorDate = startOfDay(miniReferenceDate);
  const before = Math.max(0, Math.floor(miniDaysBefore));
  const after = Math.max(0, Math.floor(miniDaysAfter));
  const [displayAnchorDate, setDisplayAnchorDate] = useState(anchorDate);
  const dates = useMemo(() => Array.from({ length: before + after + 1 }, (_, index) => addDays(displayAnchorDate, index - before)), [before, after, displayAnchorDate]);
  const visibleCount = Math.min(7, dates.length);
  const maxStart = Math.max(0, dates.length - visibleCount);
  const initialStart = Math.max(0, Math.min(maxStart, before - Math.floor(visibleCount / 2)));
  const [startIndex, setStartIndex] = useState(initialStart);
  useEffect(() => setStartIndex(initialStart), [initialStart]);
  const visibleDates = dates.slice(startIndex, startIndex + visibleCount);
  const firstSelected = valueDates(currentValue)[0];
  const today = startOfDay(new Date());
  const focusDate = firstSelected ?? anchorDate;
  const isSelected = (date: Date) => {
    if (currentValue instanceof Date) return sameDay(currentValue, date);
    if (Array.isArray(currentValue)) return currentValue.some((item) => sameDay(item, date));
    return isRange(currentValue) && (sameDay(currentValue.from, date) || sameDay(currentValue.to, date));
  };
  const inRange = (date: Date) => isRange(currentValue) && currentValue.from && currentValue.to
    && startOfDay(date) >= startOfDay(currentValue.from) && startOfDay(date) <= startOfDay(currentValue.to);
  const choose = (date: Date) => {
    if (disabled || readOnly || isDateDisabled(date, minDate, maxDate, disabledDates, referenceDate, relativeDateMode)) return;
    if (selectionMode === 'multiple') {
      const selectedDates = Array.isArray(currentValue) ? currentValue : [];
      selectValue(selectedDates.some((item) => sameDay(item, date)) ? selectedDates.filter((item) => !sameDay(item, date)) : [...selectedDates, date]);
    } else if (selectionMode === 'range') {
      if (!isRange(currentValue) || (currentValue.from && currentValue.to)) selectValue({ from: date, to: null });
      else if (currentValue.from && date < currentValue.from) selectValue({ from: date, to: currentValue.from });
      else selectValue({ from: currentValue.from, to: date });
    } else selectValue(date);
  };
  return <div aria-label={ariaLabel} className={cx('mm-calendar-mini', `mm-calendar-mini--${size}`, disabled && 'mm-calendar--disabled')}>
    <div className="mm-calendar-mini__toolbar">
      <button aria-label={language.previousMonth} className="mm-calendar-mini__nav" disabled={disabled || startIndex === 0} onClick={() => setStartIndex((index) => Math.max(0, index - 1))} type="button"><CaretLeft aria-hidden="true" size={15} /></button>
      <div className="mm-calendar-mini__range-label">{new Intl.DateTimeFormat(intlLocale, { month: 'long', year: 'numeric' }).format(anchorDate)}</div>
      <button aria-label={language.nextMonth} className="mm-calendar-mini__nav" disabled={disabled || startIndex === maxStart} onClick={() => setStartIndex((index) => Math.min(maxStart, index + 1))} type="button"><CaretRight aria-hidden="true" size={15} /></button>
    </div>
    <div className="mm-calendar-mini__days" role="list">
      {visibleDates.map((date) => <button aria-current={sameDay(date, today) ? 'date' : undefined} aria-selected={isSelected(date)} className={cx('mm-calendar-mini__day', isSelected(date) && 'mm-calendar-mini__day--selected', Boolean(inRange(date)) && 'mm-calendar-mini__day--range', sameDay(date, anchorDate) && 'mm-calendar-mini__day--anchor')} disabled={disabled || readOnly || isDateDisabled(date, minDate, maxDate, disabledDates, referenceDate, relativeDateMode)} key={date.toISOString()} onClick={() => choose(date)} role="listitem" type="button">
        <span className="mm-calendar-mini__weekday">{new Intl.DateTimeFormat(intlLocale, { weekday: 'short' }).format(date)}</span>
        <span className="mm-calendar-mini__date">{date.getDate()}</span>
      </button>)}
    </div>
    <div className="mm-calendar-mini__footer">
      {showToday && <Button className="mm-calendar__footer-button" disabled={disabled || readOnly || isDateDisabled(focusDate, minDate, maxDate, disabledDates, referenceDate, relativeDateMode)} onClick={() => { setDisplayAnchorDate(focusDate); setStartIndex(initialStart); }} size="sm" variant="dashed">{language.today}</Button>}
      {firstSelected && selectionMode === 'single' && <span className="mm-calendar__value">{formatDate(firstSelected, intlLocale)}</span>}
    </div>
  </div>;
}

type PeriodCalendarPanelProps = {
  'aria-label': string;
  currentValue: CalendarValue;
  disabled?: boolean;
  disabledDates?: CalendarDisabledDate[] | ((date: Date) => boolean);
  displayDate: Date;
  granularity: 'month' | 'year';
  locale: CalendarLocale;
  maxDate?: Date;
  minDate?: Date;
  onNavigate: (date: Date) => void;
  readOnly?: boolean;
  referenceDate?: Date;
  relativeDateMode?: CalendarRelativeDateMode;
  selectValue: (value: CalendarValue) => void;
  selectionMode: CalendarSelectionMode;
  showClear: boolean;
  showToday: boolean;
  size: CalendarSize;
  rangeActions?: CalendarRangeActions;
};

type CalendarRangeActions = { close: string; ok: string; onClose: () => void; onConfirm: () => void };

function PeriodCalendarPanel({ 'aria-label': ariaLabel, currentValue, disabled = false, disabledDates, displayDate, granularity, locale, maxDate, minDate, onNavigate, rangeActions, readOnly = false, referenceDate, relativeDateMode = 'any', selectValue, selectionMode, showClear, showToday, size }: PeriodCalendarPanelProps) {
  const language = translations[locale];
  const intlLocale = intlLocales[locale];
  const today = startOfDay(new Date());
  const periodStart = (date: Date) => granularity === 'year' ? new Date(date.getFullYear(), 0, 1) : new Date(date.getFullYear(), date.getMonth(), 1);
  const periodEnd = (date: Date) => granularity === 'year' ? new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999) : new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
  const periods = granularity === 'year'
    ? Array.from({ length: 16 }, (_, index) => new Date(displayDate.getFullYear() - 7 + index, 0, 1))
    : Array.from({ length: 12 }, (_, index) => new Date(displayDate.getFullYear(), index, 1));
  const isPeriodDisabled = (date: Date) => {
    const start = periodStart(date);
    const end = periodEnd(date);
    if (minDate && end < startOfDay(minDate)) return true;
    if (maxDate && start > startOfDay(maxDate)) return true;
    if (referenceDate && relativeDateMode === 'past' && start > startOfDay(referenceDate)) return true;
    if (referenceDate && relativeDateMode === 'future' && end < startOfDay(referenceDate)) return true;
    if (referenceDate && relativeDateMode === 'current' && (start > startOfDay(referenceDate) || end < startOfDay(referenceDate))) return true;
    if (typeof disabledDates === 'function') return disabledDates(start);
    return disabledDates?.some((item) => typeof item === 'function' ? item(start) : sameDay(item, start)) ?? false;
  };
  const isSelected = (date: Date) => {
    if (currentValue instanceof Date) return sameDay(periodStart(currentValue), periodStart(date));
    if (Array.isArray(currentValue)) return currentValue.some((item) => sameDay(periodStart(item), periodStart(date)));
    return isRange(currentValue) && Boolean((currentValue.from && sameDay(periodStart(currentValue.from), periodStart(date))) || (currentValue.to && sameDay(periodStart(currentValue.to), periodStart(date))));
  };
  const inRange = (date: Date) => {
    if (!isRange(currentValue) || !currentValue.from || !currentValue.to) return false;
    const time = periodStart(date).getTime();
    return time >= periodStart(currentValue.from).getTime() && time <= periodStart(currentValue.to).getTime();
  };
  const choose = (date: Date) => {
    if (disabled || readOnly || isPeriodDisabled(date)) return;
    const normalized = periodStart(date);
    if (selectionMode === 'multiple') {
      const dates = Array.isArray(currentValue) ? currentValue : [];
      selectValue(dates.some((item) => sameDay(periodStart(item), normalized)) ? dates.filter((item) => !sameDay(periodStart(item), normalized)) : [...dates, normalized]);
    } else if (selectionMode === 'range') {
      if (!isRange(currentValue) || (currentValue.from && currentValue.to)) selectValue({ from: normalized, to: null });
      else if (currentValue.from && normalized < periodStart(currentValue.from)) selectValue({ from: normalized, to: periodStart(currentValue.from) });
      else selectValue({ from: periodStart(currentValue.from ?? normalized), to: normalized });
    } else selectValue(normalized);
  };
  const navigateAmount = granularity === 'year' ? 12 : 12;
  const heading = granularity === 'year' ? String(displayDate.getFullYear()) : new Intl.DateTimeFormat(intlLocale, { year: 'numeric' }).format(displayDate);
  return <div aria-label={ariaLabel} className={cx('mm-calendar-period', `mm-calendar-period--${size}`, `mm-calendar-period--${granularity}`, disabled && 'mm-calendar--disabled')}>
    <div className="mm-calendar-period__toolbar">
      <button aria-label={language.previousYear} className="mm-calendar-period__nav" disabled={disabled} onClick={() => onNavigate(addMonths(displayDate, -navigateAmount))} type="button"><CaretLeft aria-hidden="true" size={16} /></button>
      <strong>{heading}</strong>
      <button aria-label={language.nextYear} className="mm-calendar-period__nav" disabled={disabled} onClick={() => onNavigate(addMonths(displayDate, navigateAmount))} type="button"><CaretRight aria-hidden="true" size={16} /></button>
    </div>
    <div className="mm-calendar-period__grid">
      {periods.map((date) => <button aria-selected={isSelected(date)} className={cx('mm-calendar-period__tile', isSelected(date) && 'mm-calendar-period__tile--selected', inRange(date) && 'mm-calendar-period__tile--range')} disabled={disabled || readOnly || isPeriodDisabled(date)} key={date.toISOString()} onClick={() => choose(date)} type="button">{granularity === 'year' ? date.getFullYear() : new Intl.DateTimeFormat(intlLocale, { month: 'short' }).format(date)}</button>)}
    </div>
    <div className="mm-calendar-period__footer">
      {showToday && <Button className="mm-calendar__footer-button" disabled={disabled || readOnly || isPeriodDisabled(today)} onClick={() => choose(today)} size="sm" variant="dashed">{language.today}</Button>}
      {showClear && <Button className="mm-calendar__footer-button" disabled={disabled || readOnly} onClick={() => selectValue(null)} size="sm" variant="dashed">{language.clear}</Button>}
      {rangeActions && <><Button className="mm-calendar__footer-button" onClick={rangeActions.onClose} size="sm" variant="outline">{rangeActions.close}</Button><Button className="mm-calendar__footer-button" onClick={rangeActions.onConfirm} size="sm" variant="primary">{rangeActions.ok}</Button></>}
    </div>
  </div>;
}

function YearOverviewPanel({ ariaLabel, currentValue, disabled, disabledDates, displayDate, locale, maxDate, minDate, nextYearContent, onNavigate, previousYearContent, readOnly, referenceDate, relativeDateMode = 'any', renderDay, selectValue, selectionMode, showToday, size, weekStartsOn, yearNavigation, yearRange }: { ariaLabel: string; currentValue: CalendarValue; disabled?: boolean; disabledDates?: CalendarDisabledDate[] | ((date: Date) => boolean); displayDate: Date; locale: CalendarLocale; maxDate?: Date; minDate?: Date; nextYearContent?: ReactNode; onNavigate: (date: Date) => void; previousYearContent?: ReactNode; readOnly?: boolean; referenceDate?: Date; relativeDateMode?: CalendarRelativeDateMode; renderDay?: CalendarProps['renderDay']; selectValue: (value: CalendarValue) => void; selectionMode: CalendarSelectionMode; showToday?: boolean; size: CalendarSize; weekStartsOn: number; yearNavigation: CalendarYearNavigation; yearRange?: CalendarYearRange }) {
  const intlLocale = intlLocales[locale];
  const year = displayDate.getFullYear();
  const today = startOfDay(new Date());
  const availableYears = useMemo(() => {
    const start = Math.min(yearRange?.start ?? year - 10, yearRange?.end ?? year + 10);
    const end = Math.max(yearRange?.start ?? year - 10, yearRange?.end ?? year + 10);
    return Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index);
  }, [year, yearRange?.end, yearRange?.start]);
  const isYearUnavailable = (candidateYear: number) => {
    const start = new Date(candidateYear, 0, 1);
    const end = new Date(candidateYear, 11, 31);
    if (minDate && end < startOfDay(minDate)) return true;
    if (maxDate && start > startOfDay(maxDate)) return true;
    if (relativeDateMode === 'past' && start > startOfDay(referenceDate ?? today)) return true;
    if (relativeDateMode === 'future' && end < startOfDay(referenceDate ?? today)) return true;
    if (relativeDateMode === 'current' && candidateYear !== (referenceDate ?? today).getFullYear()) return true;
    return false;
  };
  const choose = (date: Date) => {
    if (disabled || readOnly || isDateDisabled(date, minDate, maxDate, disabledDates, referenceDate, relativeDateMode)) return;
    if (selectionMode === 'multiple') {
      const dates = Array.isArray(currentValue) ? currentValue : [];
      selectValue(dates.some((item) => sameDay(item, date)) ? dates.filter((item) => !sameDay(item, date)) : [...dates, date]);
    } else if (selectionMode === 'range') {
      if (!isRange(currentValue) || (currentValue.from && currentValue.to)) selectValue({ from: date, to: null });
      else if (currentValue.from && date < currentValue.from) selectValue({ from: date, to: currentValue.from });
      else selectValue({ from: currentValue.from, to: date });
    } else selectValue(date);
  };
  return <div aria-label={ariaLabel} className={cx('mm-calendar-year', `mm-calendar-year--${size}`)}>
    <div className="mm-calendar-year__toolbar">{yearNavigation === 'select' ? <><button aria-label={translations[locale].previousYear} className="mm-calendar__nav" disabled={disabled || (yearRange ? year <= Math.min(yearRange.start, yearRange.end) : false)} onClick={() => onNavigate(new Date(year - 1, 0, 1))} type="button"><CaretDoubleLeft aria-hidden="true" size={16} />{previousYearContent}</button><Select aria-label={translations[locale].selectYear} className="mm-calendar-year__select" disabled={disabled} options={availableYears.map((candidateYear) => ({ value: String(candidateYear), label: String(candidateYear), disabled: isYearUnavailable(candidateYear) }))} onChange={(value) => { const selectedYear = Number(value); if (Number.isFinite(selectedYear)) onNavigate(new Date(selectedYear, 0, 1)); }} size="sm" value={String(year)} /><button aria-label={translations[locale].nextYear} className="mm-calendar__nav" disabled={disabled || (yearRange ? year >= Math.max(yearRange.start, yearRange.end) : false)} onClick={() => onNavigate(new Date(year + 1, 0, 1))} type="button">{nextYearContent}<CaretDoubleRight aria-hidden="true" size={16} /></button></> : <><button aria-label={translations[locale].previousYear} className="mm-calendar__nav" disabled={disabled} onClick={() => onNavigate(new Date(year - 1, 0, 1))} type="button"><CaretDoubleLeft aria-hidden="true" size={16} />{previousYearContent}</button><strong>{year}</strong><button aria-label={translations[locale].nextYear} className="mm-calendar__nav" disabled={disabled} onClick={() => onNavigate(new Date(year + 1, 0, 1))} type="button">{nextYearContent}<CaretDoubleRight aria-hidden="true" size={16} /></button></>}</div>
    <div className="mm-calendar-year__grid">{Array.from({ length: 12 }, (_, month) => { const monthDate = new Date(year, month, 1); const days = monthDays(monthDate, weekStartsOn); const labels = weekDayLabels(intlLocale, weekStartsOn); return <section className="mm-calendar-year__month" key={month}><h3>{new Intl.DateTimeFormat(intlLocale, { month: 'long' }).format(monthDate)}</h3><div className="mm-calendar-year__weekdays">{labels.map((label) => <span key={label}>{label.slice(0, 2)}</span>)}</div><div className="mm-calendar-year__days">{days.map((date) => { const outside = date.getMonth() !== month; const selected = valueDates(currentValue).some((item) => sameDay(item, date)); const dateDisabled = isDateDisabled(date, minDate, maxDate, disabledDates, referenceDate, relativeDateMode); return <button aria-hidden={outside || undefined} aria-selected={selected} className={cx('mm-calendar-year__day', outside && 'mm-calendar-year__day--outside', selected && 'mm-calendar-year__day--selected', sameDay(date, today) && 'mm-calendar-year__day--today')} disabled={outside || dateDisabled || disabled || readOnly} key={date.toISOString()} onClick={() => choose(date)} role="gridcell" type="button">{renderDay ? renderDay(date, { disabled: dateDisabled, outside, selected }) : date.getDate()}</button>; })}</div></section>; })}</div>
    {showToday && <div className="mm-calendar-year__footer"><Button className="mm-calendar__footer-button" disabled={disabled || readOnly || isDateDisabled(today, minDate, maxDate, disabledDates, referenceDate, relativeDateMode)} onClick={() => { onNavigate(today); choose(today); }} size="sm" variant="dashed">{translations[locale].today}</Button></div>}
  </div>;
}

function CalendarPanel(props: Required<Pick<CalendarProps, 'aria-label' | 'locale' | 'monthFormat' | 'months' | 'orientation' | 'selectionMode' | 'showOutsideDays' | 'showWeekNumbers' | 'size' | 'weekStartsOn'>> & Omit<CalendarProps, 'aria-label' | 'locale' | 'monthFormat' | 'months' | 'orientation' | 'selectionMode' | 'showOutsideDays' | 'showWeekNumbers' | 'size' | 'weekStartsOn'> & { displayDate: Date; onNavigate: (date: Date) => void; currentValue: CalendarValue; selectValue: (value: CalendarValue) => void; rangeActions?: CalendarRangeActions }) {
  const { displayDate, onNavigate, currentValue, selectValue, months, locale, monthFormat, orientation, selectionMode, showOutsideDays, showWeekNumbers, size, weekStartsOn, disabled, readOnly, minDate, maxDate, disabledDates, holidays = [], holidayInteraction = 'both', referenceDate, relativeDateMode = 'any', renderDay, showToday, showClear, footerButtonAlign = 'start', footerButtonOrder = 'today-clear', footerOppositeContent, rangePresets = [], showRangePresets = false, showHolidays = false, 'aria-label': ariaLabel, rangeActions } = props;
  const language = translations[locale];
  const intlLocale = intlLocales[locale];
  const visibleMonths = Array.from({ length: months }, (_, index) => addMonths(displayDate, index));
  const labels = weekDayLabels(intlLocale, weekStartsOn);
  const firstSelected = valueDates(currentValue)[0];
  const today = startOfDay(new Date());
  const [picker, setPicker] = useState<'days' | 'months' | 'years'>('days');
  const [activeHolidayDate, setActiveHolidayDate] = useState<string | null>(null);
  const monthLabel = new Intl.DateTimeFormat(intlLocale, { month: 'long' }).format(displayDate);
  const yearLabel = new Intl.DateTimeFormat(intlLocale, { year: 'numeric' }).format(displayDate);
  const pickerYears = Array.from({ length: 16 }, (_, index) => displayDate.getFullYear() - 7 + index);
  const pickerMonths = Array.from({ length: 12 }, (_, index) => new Date(displayDate.getFullYear(), index, 1));
  const isPresetActive = (preset: CalendarRangePreset) => isRange(currentValue)
    && Boolean(currentValue.from && currentValue.to)
    && sameDay(currentValue.to, today)
    && sameDay(currentValue.from, addDays(today, -(Math.max(1, preset.days) - 1)));
  const choosePreset = (preset: CalendarRangePreset) => {
    if (disabled || readOnly || !Number.isFinite(preset.days) || preset.days < 1) return;
    const days = Math.max(1, Math.floor(preset.days));
    selectValue({ from: addDays(today, -(days - 1)), to: today });
  };

  const isSelected = (date: Date) => {
    if (currentValue instanceof Date) return sameDay(currentValue, date);
    if (Array.isArray(currentValue)) return currentValue.some((item) => sameDay(item, date));
    return isRange(currentValue) && (sameDay(currentValue.from, date) || sameDay(currentValue.to, date));
  };
  const inRange = (date: Date) => isRange(currentValue) && currentValue.from && currentValue.to && startOfDay(date) >= startOfDay(currentValue.from) && startOfDay(date) <= startOfDay(currentValue.to);
  const choose = (date: Date) => {
    if (disabled || readOnly || isDateDisabled(date, minDate, maxDate, disabledDates, referenceDate, relativeDateMode)) return;
    if (selectionMode === 'multiple') {
      const dates = Array.isArray(currentValue) ? currentValue : [];
      selectValue(dates.some((item) => sameDay(item, date)) ? dates.filter((item) => !sameDay(item, date)) : [...dates, date]);
      return;
    }
    if (selectionMode === 'range') {
      if (!isRange(currentValue) || (currentValue.from && currentValue.to)) selectValue({ from: date, to: null });
      else if (currentValue.from && date < currentValue.from) selectValue({ from: date, to: currentValue.from });
      else selectValue({ from: currentValue.from, to: date });
      return;
    }
    selectValue(date);
  };
  const holidaysFor = (date: Date) => showHolidays ? holidays.filter((holiday) => sameDay(holiday.date, date)) : [];

  return <div aria-label={ariaLabel} className={cx('mm-calendar', `mm-calendar--${size}`, `mm-calendar--${orientation}`, showWeekNumbers && 'mm-calendar--week-numbers', disabled && 'mm-calendar--disabled')}>
    <div className="mm-calendar__toolbar">
      <button aria-label={language.previousMonth} className="mm-calendar__nav" disabled={disabled} onClick={() => onNavigate(addMonths(displayDate, -1))} type="button"><CaretLeft aria-hidden="true" size={16} /></button>
      <button aria-label={language.previousYear} className="mm-calendar__nav" disabled={disabled} onClick={() => onNavigate(addMonths(displayDate, -12))} type="button"><CaretDoubleLeft aria-hidden="true" size={16} /></button>
      <div className="mm-calendar__toolbar-title">
        <button aria-label={language.selectMonth} className={cx('mm-calendar__picker-trigger', picker === 'months' && 'mm-calendar__picker-trigger--active')} disabled={disabled} onClick={() => setPicker(picker === 'months' ? 'days' : 'months')} type="button">{monthLabel}</button>
        <button aria-label={language.selectYear} className={cx('mm-calendar__picker-trigger', picker === 'years' && 'mm-calendar__picker-trigger--active')} disabled={disabled} onClick={() => setPicker(picker === 'years' ? 'days' : 'years')} type="button">{yearLabel}</button>
        {months > 1 && <span aria-hidden="true"> + {months - 1}</span>}
      </div>
      <button aria-label={language.nextYear} className="mm-calendar__nav" disabled={disabled} onClick={() => onNavigate(addMonths(displayDate, 12))} type="button"><CaretDoubleRight aria-hidden="true" size={16} /></button>
      <button aria-label={language.nextMonth} className="mm-calendar__nav" disabled={disabled} onClick={() => onNavigate(addMonths(displayDate, 1))} type="button"><CaretRight aria-hidden="true" size={16} /></button>
    </div>
    {picker !== 'days' && <div aria-label={picker === 'months' ? language.selectMonth : language.selectYear} className="mm-calendar__picker-grid">
      {picker === 'months' ? pickerMonths.map((month) => <button aria-current={month.getMonth() === displayDate.getMonth() ? 'date' : undefined} className={cx('mm-calendar__picker-tile', month.getMonth() === displayDate.getMonth() && 'mm-calendar__picker-tile--active')} disabled={disabled} key={month.toISOString()} onClick={() => { onNavigate(month); setPicker('days'); }} type="button">{new Intl.DateTimeFormat(intlLocale, { month: 'short' }).format(month)}</button>) : pickerYears.map((year) => <button aria-current={year === displayDate.getFullYear() ? 'date' : undefined} className={cx('mm-calendar__picker-tile', year === displayDate.getFullYear() && 'mm-calendar__picker-tile--active')} disabled={disabled} key={year} onClick={() => { onNavigate(new Date(year, displayDate.getMonth(), 1)); setPicker('days'); }} type="button">{year}</button>)}
    </div>}
    {picker === 'days' && <div className="mm-calendar__body">
      {showRangePresets && <aside aria-label={language.quickRanges} className="mm-calendar__presets">
        {rangePresets.map((preset) => <button aria-pressed={isPresetActive(preset)} className={cx('mm-calendar__preset', isPresetActive(preset) && 'mm-calendar__preset--active')} disabled={disabled || readOnly || preset.days < 1} key={`${preset.label}-${preset.days}`} onClick={() => choosePreset(preset)} type="button">{preset.label}</button>)}
      </aside>}
      <div className="mm-calendar__months">
      {visibleMonths.map((month) => <section className="mm-calendar__month" key={month.toISOString()}>
        <h3>{new Intl.DateTimeFormat(intlLocale, monthFormat).format(month)}</h3>
        <div className="mm-calendar__weekdays">{showWeekNumbers && <span aria-hidden="true" />}{labels.map((label) => <span key={label}>{label}</span>)}</div>
        <div className="mm-calendar__grid" role="grid">
          {monthDays(month, weekStartsOn).map((date, index) => {
            const outside = date.getMonth() !== month.getMonth();
            const dateDisabled = isDateDisabled(date, minDate, maxDate, disabledDates, referenceDate, relativeDateMode);
            const selected = isSelected(date);
            const range = inRange(date);
            const dayHolidays = holidaysFor(date);
            const holidayDateKey = date.toISOString();
            const canShowHolidayOnHover = holidayInteraction === 'hover' || holidayInteraction === 'both';
            const canShowHolidayOnClick = holidayInteraction === 'click' || holidayInteraction === 'both';
            return <Fragment key={holidayDateKey}>
              {showWeekNumbers && index % 7 === 0 && <span aria-hidden="true" className="mm-calendar__week-number">{Math.ceil((index + 1) / 7)}</span>}
              <div className={cx('mm-calendar__cell', outside && 'mm-calendar__cell--outside', Boolean(range) && 'mm-calendar__cell--range')}>
              <button aria-current={sameDay(date, today) ? 'date' : undefined} aria-label={`${formatDate(date, intlLocale)}${dayHolidays.length ? `: ${dayHolidays.map((holiday) => holiday.label).join(', ')}` : ''}`} aria-selected={selected} className={cx('mm-calendar__day', selected && 'mm-calendar__day--selected', sameDay(date, today) && 'mm-calendar__day--today')} disabled={dateDisabled || (!showOutsideDays && outside) || disabled} onClick={() => { choose(date); if (canShowHolidayOnClick && dayHolidays.length) setActiveHolidayDate(activeHolidayDate === holidayDateKey ? null : holidayDateKey); }} onMouseEnter={() => { if (canShowHolidayOnHover && dayHolidays.length) setActiveHolidayDate(holidayDateKey); }} onMouseLeave={() => { if (canShowHolidayOnHover && holidayInteraction === 'hover') setActiveHolidayDate(null); }} role="gridcell" type="button">
                {renderDay ? renderDay(date, { disabled: dateDisabled, outside, selected }) : date.getDate()}
              </button>
              {dayHolidays.length > 0 && <span aria-hidden="true" className="mm-calendar__holiday-dot" />}
              {activeHolidayDate === holidayDateKey && dayHolidays.length > 0 && <div className="mm-calendar__holiday-popover" role="status">{dayHolidays.map((holiday) => <span key={holiday.label}>{holiday.label}</span>)}</div>}
              </div>
            </Fragment>;
          })}
        </div>
      </section>)}
      </div>
    </div>}
    {(showToday || showClear || rangeActions || footerOppositeContent) && <div className={cx('mm-calendar__footer', `mm-calendar__footer--${footerButtonAlign}`)}>
      <div className="mm-calendar__footer-group">{footerButtonOrder === 'today-clear' ? <>{showToday && <Button className="mm-calendar__footer-button" disabled={disabled || readOnly} onClick={() => choose(today)} size="sm" variant="dashed">{language.today}</Button>}{showClear && <Button className="mm-calendar__footer-button" disabled={disabled || readOnly} onClick={() => selectValue(null)} size="sm" variant="dashed">{language.clear}</Button>}</> : <>{showClear && <Button className="mm-calendar__footer-button" disabled={disabled || readOnly} onClick={() => selectValue(null)} size="sm" variant="dashed">{language.clear}</Button>}{showToday && <Button className="mm-calendar__footer-button" disabled={disabled || readOnly} onClick={() => choose(today)} size="sm" variant="dashed">{language.today}</Button>}</>}{rangeActions && <><Button className="mm-calendar__footer-button" onClick={rangeActions.onClose} size="sm" variant="outline">{rangeActions.close}</Button><Button className="mm-calendar__footer-button" onClick={rangeActions.onConfirm} size="sm" variant="primary">{rangeActions.ok}</Button></>}</div>
      {footerOppositeContent && <div className="mm-calendar__footer-opposite">{footerOppositeContent}</div>}
      {selectionMode === 'range' && isRange(currentValue) && currentValue.from && !currentValue.to && <span className="mm-calendar__hint">{language.endDateHint}</span>}
      {firstSelected && selectionMode === 'single' && <span className="mm-calendar__value">{formatDate(firstSelected, intlLocale)}</span>}
    </div>}
  </div>;
}

export function Calendar({
  'aria-label': ariaLabel = 'Calendar', className, closeOnRangeSelection = true, defaultDisplayDate, defaultValue = null, disabled = false, disabledDates, displayDate, footerButtonAlign = 'start', footerButtonOrder = 'today-clear', footerOppositeContent, fullWidth = false, granularity = 'day', holidays, holidayInteraction = 'both', locale, maxDate, minDate, miniDaysAfter = 3, miniDaysBefore = 3, miniReferenceDate, monthFormat = { month: 'long', year: 'numeric' }, months = 1, nextYearContent, onChange, onDisplayDateChange, orientation = 'horizontal', outputDateFormat = { day: '2-digit', month: '2-digit', year: 'numeric' }, placeholder = 'Select a date', previousYearContent, rangePresets, readOnly = false, referenceDate = new Date(), relativeDateMode = 'any', renderDay, selectionMode = 'single', showClear = false, showOutsideDays = true, showHolidays = false, showRangePresets = false, showToday = true, showWeekNumbers = false, size = 'default', value, valueFormat = 'date', variant = 'standard', view = 'widget', weekStartsOn = 0, yearNavigation = 'arrows', yearRange, yearOverview = false,
}: CalendarProps) {
  const { locale: globalLocale } = useConfig();
  const activeLocale: CalendarLocale = locale ?? globalLocale;
  const [internalValue, setInternalValue] = useState<CalendarValue>(defaultValue);
  const [internalDisplayDate, setInternalDisplayDate] = useState(startOfMonth(defaultDisplayDate ?? valueDates(defaultValue)[0] ?? new Date()));
  const [inputOpen, setInputOpen] = useState(false);
  const [draftValue, setDraftValue] = useState<CalendarValue>(defaultValue);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const currentValue = value === undefined ? internalValue : value;
  const presetOptions = rangePresets ?? translations[activeLocale].presets;
  const intlLocale = intlLocales[activeLocale];
  const currentDisplayDate = startOfMonth(displayDate ?? internalDisplayDate);
  const miniAnchorDate = miniReferenceDate ?? valueDates(defaultValue)[0] ?? new Date();
  const inputText = useMemo(() => formatGranularityValue(currentValue, intlLocale, granularity), [currentValue, granularity, intlLocale]);
  const deferredRange = view === 'input' && selectionMode === 'range' && !closeOnRangeSelection;
  useEffect(() => {
    if (!inputOpen) return undefined;
    const handleKeyDown = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape') setInputOpen(false); };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [inputOpen]);
  useEffect(() => {
    if (!inputOpen) return undefined;
    const handlePointerDown = (event: PointerEvent) => {
      if (!inputContainerRef.current?.contains(event.target as Node)) setInputOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [inputOpen]);
  const commitValue = (nextValue: CalendarValue) => {
    if (value === undefined) setInternalValue(nextValue);
    onChange?.(formatOutputValue(nextValue, valueFormat, intlLocale, outputDateFormat));
  };
  const selectValue = (nextValue: CalendarValue) => {
    if (deferredRange) {
      setDraftValue(nextValue);
      return;
    }
    commitValue(nextValue);
    const completedRange = selectionMode === 'range' && isRange(nextValue) && Boolean(nextValue.from && nextValue.to);
    if (view === 'input' && (selectionMode === 'single' || (completedRange && closeOnRangeSelection))) setInputOpen(false);
  };
  const openInput = () => { setDraftValue(currentValue); setInputOpen((open) => !open); };
  const panelValue = deferredRange && inputOpen ? draftValue : currentValue;
  const rangeActions = deferredRange ? { close: translations[activeLocale].close, ok: translations[activeLocale].ok, onClose: () => setInputOpen(false), onConfirm: () => { commitValue(draftValue); setInputOpen(false); } } : undefined;
  const navigate = (nextDate: Date) => { if (displayDate !== undefined) onDisplayDateChange?.(nextDate); else setInternalDisplayDate(nextDate); };
  if (yearOverview && view === 'widget') {
    return <div className={cx('mm-calendar-year-overview', fullWidth && 'mm-calendar-year-overview--full-width', className)}><YearOverviewPanel ariaLabel={ariaLabel} currentValue={currentValue} disabled={disabled} disabledDates={disabledDates} displayDate={currentDisplayDate} locale={activeLocale} maxDate={maxDate} minDate={minDate} nextYearContent={nextYearContent} onNavigate={navigate} previousYearContent={previousYearContent} readOnly={readOnly} referenceDate={referenceDate} relativeDateMode={relativeDateMode} renderDay={renderDay} selectValue={selectValue} selectionMode={selectionMode} showToday={showToday} size={size} weekStartsOn={weekStartsOn} yearNavigation={yearNavigation} yearRange={yearRange} /></div>;
  }
  const panel = granularity !== 'day'
    ? <PeriodCalendarPanel aria-label={ariaLabel} currentValue={panelValue} disabled={disabled} disabledDates={disabledDates} displayDate={currentDisplayDate} granularity={granularity} locale={activeLocale} maxDate={maxDate} minDate={minDate} onNavigate={navigate} rangeActions={rangeActions} readOnly={readOnly} referenceDate={referenceDate} relativeDateMode={relativeDateMode} selectValue={selectValue} selectionMode={selectionMode} showClear={showClear} showToday={showToday} size={size} />
    : variant === 'mini'
    ? <MiniCalendarPanel aria-label={ariaLabel} currentValue={currentValue} disabled={disabled} disabledDates={disabledDates} locale={activeLocale} maxDate={maxDate} minDate={minDate} miniDaysAfter={miniDaysAfter} miniDaysBefore={miniDaysBefore} miniReferenceDate={miniAnchorDate} readOnly={readOnly} referenceDate={referenceDate} relativeDateMode={relativeDateMode} selectValue={selectValue} selectionMode={selectionMode} showToday={showToday} size={size} weekStartsOn={weekStartsOn} />
    : <CalendarPanel aria-label={ariaLabel} currentValue={panelValue} defaultDisplayDate={defaultDisplayDate} disabled={disabled} disabledDates={disabledDates} displayDate={currentDisplayDate} footerButtonAlign={footerButtonAlign} footerButtonOrder={footerButtonOrder} footerOppositeContent={footerOppositeContent} fullWidth={fullWidth} holidays={holidays} holidayInteraction={holidayInteraction} locale={activeLocale} maxDate={maxDate} minDate={minDate} monthFormat={monthFormat} months={Math.max(1, Math.min(3, months)) as 1 | 2 | 3} onNavigate={navigate} onDisplayDateChange={onDisplayDateChange} orientation={orientation} placeholder={placeholder} rangeActions={rangeActions} rangePresets={presetOptions} readOnly={readOnly} referenceDate={referenceDate} relativeDateMode={relativeDateMode} renderDay={renderDay} selectValue={selectValue} selectionMode={selectionMode} showClear={showClear} showHolidays={showHolidays} showOutsideDays={showOutsideDays} showRangePresets={showRangePresets} showToday={showToday} showWeekNumbers={showWeekNumbers} size={size} value={value} view={view} weekStartsOn={weekStartsOn} />;
  if (view === 'input') {
    const language = translations[activeLocale];
    return <div className={cx('mm-calendar-input', `mm-calendar-input--${size}`, fullWidth && 'mm-calendar-input--full-width', className)} ref={inputContainerRef}>
      <div className="mm-calendar-input__control"><input aria-expanded={inputOpen} aria-haspopup="dialog" aria-label={ariaLabel} className="mm-calendar-input__field" disabled={disabled} onClick={openInput} onKeyDown={(event: ReactKeyboardEvent<HTMLInputElement>) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openInput(); } }} readOnly value={inputText} placeholder={placeholder} /><CalendarDots aria-hidden="true" className="mm-calendar-input__icon" size={16} /></div>
      {inputOpen && <div className="mm-calendar-input__popover" role="dialog">{panel}</div>}
    </div>;
  }
  return <div className={cx(fullWidth && 'mm-calendar--full-width', className)}>{panel}</div>;
}
