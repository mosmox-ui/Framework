import { CaretLeft, CaretRight, CaretDoubleLeft, CaretDoubleRight, SpinnerGap, DotsThree } from '../../icons';
import { useEffect, useId, useMemo, useState, type ReactNode } from 'react';
import { Button } from '../Button';
import { useConfig, type Locale } from '../ConfigProvider';
import { InputNumber } from '../InputNumber';
import './Pagination.css';

export type PaginationSize = 'default' | 'sm' | 'xs';
export type PaginationVariant = 'default' | 'minimal';
export type PaginationMode = 'pages' | 'steps';
export type PaginationLocale = Locale;
export type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end';

export type PaginationProps = {
  'aria-label'?: string;
  boundaryCount?: number;
  className?: string;
  compact?: boolean;
  current?: number;
  defaultCurrent?: number;
  disabled?: boolean;
  fullWidth?: boolean;
  firstLabel?: ReactNode;
  firstLast?: boolean;
  hideOnSinglePage?: boolean;
  lastLabel?: ReactNode;
  loading?: boolean;
  locale?: PaginationLocale;
  mode?: PaginationMode;
  nextLabel?: ReactNode;
  onChange?: (page: number) => void;
  pageInfo?: ReactNode;
  pageSize?: number;
  previousLabel?: ReactNode;
  renderItem?: (item: PaginationItem, active: boolean) => ReactNode;
  showPageInfo?: boolean;
  showQuickJumper?: boolean;
  siblingCount?: number;
  size?: PaginationSize;
  totalItems?: number;
  totalPages?: number;
  variant?: PaginationVariant;
};

const translations: Record<PaginationLocale, { pagination: string; page: string; pageNumber: string; firstPage: string; previousPage: string; nextPage: string; lastPage: string; showPreviousPages: string; showNextPages: string; goTo: string; go: string }> = {
  en: { pagination: 'Pagination', page: 'Page', pageNumber: 'Page number', firstPage: 'First page', previousPage: 'Previous page', nextPage: 'Next page', lastPage: 'Last page', showPreviousPages: 'Show previous pages', showNextPages: 'Show next pages', goTo: 'Go to', go: 'Go' },
  uk: { pagination: 'Пагінація', page: 'Сторінка', pageNumber: 'Номер сторінки', firstPage: 'Перша сторінка', previousPage: 'Попередня сторінка', nextPage: 'Наступна сторінка', lastPage: 'Остання сторінка', showPreviousPages: 'Показати попередні сторінки', showNextPages: 'Показати наступні сторінки', goTo: 'Перейти до', go: 'Перейти' },
  de: { pagination: 'Seitennavigation', page: 'Seite', pageNumber: 'Seitennummer', firstPage: 'Erste Seite', previousPage: 'Vorherige Seite', nextPage: 'Nächste Seite', lastPage: 'Letzte Seite', showPreviousPages: 'Vorherige Seiten anzeigen', showNextPages: 'Nächste Seiten anzeigen', goTo: 'Gehe zu', go: 'Los' },
  fr: { pagination: 'Pagination', page: 'Page', pageNumber: 'Numéro de page', firstPage: 'Première page', previousPage: 'Page précédente', nextPage: 'Page suivante', lastPage: 'Dernière page', showPreviousPages: 'Afficher les pages précédentes', showNextPages: 'Afficher les pages suivantes', goTo: 'Aller à', go: 'Aller' },
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

function createItems(totalPages: number, current: number, siblingCount: number, boundaryCount: number): PaginationItem[] {
  const visibleCount = boundaryCount * 2 + siblingCount * 2 + 3;
  if (totalPages <= visibleCount) return Array.from({ length: totalPages }, (_, index) => index + 1);
  const startPages = Array.from({ length: boundaryCount }, (_, index) => index + 1);
  const endPages = Array.from({ length: boundaryCount }, (_, index) => totalPages - boundaryCount + index + 1);
  const rangeStart = Math.max(boundaryCount + 2, current - siblingCount);
  const rangeEnd = Math.min(totalPages - boundaryCount - 1, current + siblingCount);
  const items: PaginationItem[] = [...startPages];
  if (rangeStart > boundaryCount + 2) items.push('ellipsis-start');
  else if (boundaryCount + 1 < rangeStart) items.push(boundaryCount + 1);
  for (let page = rangeStart; page <= rangeEnd; page += 1) items.push(page);
  if (rangeEnd < totalPages - boundaryCount - 1) items.push('ellipsis-end');
  else if (rangeEnd < totalPages - boundaryCount) items.push(totalPages - boundaryCount);
  items.push(...endPages);
  return items;
}

export function Pagination({
  'aria-label': ariaLabel,
  boundaryCount = 1,
  className,
  compact = false,
  current,
  defaultCurrent = 1,
  disabled = false,
  fullWidth = false,
  firstLabel = <CaretDoubleLeft aria-hidden="true" size={16} />,
  firstLast = true,
  hideOnSinglePage = false,
  loading = false,
  lastLabel = <CaretDoubleRight aria-hidden="true" size={16} />,
  mode = 'pages',
  locale,
  nextLabel = <CaretRight aria-hidden="true" size={16} />,
  onChange,
  pageInfo,
  pageSize,
  previousLabel = <CaretLeft aria-hidden="true" size={16} />,
  renderItem,
  showPageInfo = false,
  showQuickJumper = false,
  siblingCount = 1,
  size = 'default',
  totalItems,
  totalPages: providedTotalPages,
  variant = 'default',
}: PaginationProps) {
  const { locale: globalLocale } = useConfig();
  const activeLocale: PaginationLocale = locale ?? globalLocale;
  const language = translations[activeLocale];
  const [uncontrolledPage, setUncontrolledPage] = useState(defaultCurrent);
  const [jumpValue, setJumpValue] = useState<number | undefined>(current);
  const jumpId = useId().replace(/:/g, '');
  const currentPage = Math.max(1, current ?? uncontrolledPage);
  const activePageSize = pageSize ?? 10;
  const totalPages = Math.max(1, providedTotalPages ?? Math.ceil((totalItems ?? 0) / activePageSize));
  const safePage = Math.min(currentPage, totalPages);
  const items = useMemo(() => createItems(totalPages, safePage, Math.max(0, siblingCount), Math.max(1, boundaryCount)), [boundaryCount, safePage, siblingCount, totalPages]);

  useEffect(() => {
    if (current !== undefined) setJumpValue(safePage);
  }, [current, safePage]);

  if (hideOnSinglePage && totalPages <= 1) return null;

  const goTo = (page: number) => {
    if (disabled || loading || page < 1 || page > totalPages || page === safePage) return;
    if (current === undefined) setUncontrolledPage(page);
  };

  const submitJump = () => {
    if (jumpValue !== undefined) goTo(jumpValue);
    setJumpValue(undefined);
  };

  const renderPageItem = (item: PaginationItem) => {
    if (typeof item !== 'number') return <button aria-label={item === 'ellipsis-start' ? language.showPreviousPages : language.showNextPages} className="mm-pagination__ellipsis" onClick={() => goTo(item === 'ellipsis-start' ? Math.max(1, safePage - siblingCount * 2 - 1) : Math.min(totalPages, safePage + siblingCount * 2 + 1))} type="button"><DotsThree aria-hidden="true" size={16} /></button>;
    const active = item === safePage;
    if (renderItem) return renderItem(item, active);
    return <button aria-current={active ? 'page' : undefined} aria-label={`${language.page} ${item}`} className={cx('mm-pagination__page', active && 'mm-pagination__page--active')} onClick={() => goTo(item)} type="button">{item}</button>;
  };

  return (
    <nav aria-label={ariaLabel ?? language.pagination} className={cx('mm-pagination', `mm-pagination--${size}`, `mm-pagination--${variant}`, compact && 'mm-pagination--compact', fullWidth && 'mm-pagination--full-width', fullWidth && showPageInfo && showQuickJumper && 'mm-pagination--full-width-three', (disabled || loading) && 'mm-pagination--disabled', className)}>
      {showPageInfo && <span className="mm-pagination__info">{pageInfo ?? `Page ${safePage} of ${totalPages}`}</span>}
      <div className="mm-pagination__controls">
        {firstLast && <button aria-label={language.firstPage} className="mm-pagination__control" disabled={disabled || loading || safePage === 1} onClick={() => goTo(1)} type="button">{firstLabel}</button>}
        <button aria-label={language.previousPage} className="mm-pagination__control" disabled={disabled || loading || safePage === 1} onClick={() => goTo(safePage - 1)} type="button">{previousLabel}</button>
        {mode === 'pages' && <div className="mm-pagination__pages">{items.map((item, index) => <span className="mm-pagination__item" key={`${item}-${index}`}>{renderPageItem(item)}</span>)}</div>}
        <button aria-label={language.nextPage} className="mm-pagination__control" disabled={disabled || loading || safePage === totalPages} onClick={() => goTo(safePage + 1)} type="button">{nextLabel}</button>
        {firstLast && <button aria-label={language.lastPage} className="mm-pagination__control" disabled={disabled || loading || safePage === totalPages} onClick={() => goTo(totalPages)} type="button">{lastLabel}</button>}
      </div>
      {showQuickJumper && <form className="mm-pagination__jumper" onSubmit={(event) => { event.preventDefault(); submitJump(); }}><span className="mm-pagination__jumper-label">{language.goTo}</span><InputNumber aria-label={language.pageNumber} clampOnBlur controls id={`mm-pagination-jump-${jumpId}`} max={totalPages} min={1} minWidth={120} onChange={(value) => setJumpValue(value)} size="sm" step={1} value={jumpValue} width={120} /><Button iconRight={<CaretRight aria-hidden="true" size={14} />} size="sm" type="submit">{language.go}</Button></form>}
      {loading && <SpinnerGap aria-label="Loading" className="mm-pagination__loader" role="status" size={16} />}
    </nav>
  );
}
