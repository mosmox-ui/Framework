import { ArrowsClockwise } from '../../icons';
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import './InfiniteScroll.css';

export type InfiniteScrollDirection = 'vertical' | 'horizontal';
export type InfiniteScrollProps = {
  children: ReactNode;
  hasMore?: boolean;
  loading?: boolean;
  onLoadMore: () => void | Promise<void>;
  threshold?: number;
  rootMargin?: string;
  initialLoad?: boolean;
  disabled?: boolean;
  direction?: InfiniteScrollDirection;
  reverse?: boolean;
  height?: number | string;
  endMessage?: ReactNode;
  loadingContent?: ReactNode;
  error?: ReactNode;
  onRetry?: () => void | Promise<void>;
  retryLabel?: string;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function InfiniteScroll({
  children, hasMore = true, loading = false, onLoadMore, threshold = 0.25, rootMargin = '160px', initialLoad = false,
  disabled = false, direction = 'vertical', reverse = false, height, endMessage = 'All items have been loaded.',
  loadingContent, error, onRetry, retryLabel = 'Try again', ariaLabel = 'Infinite scroll', className, style,
}: InfiniteScrollProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const initialRequested = useRef(false);
  const [internalLoading, setInternalLoading] = useState(false);
  const isLoading = loading || internalLoading;
  const loadMore = useCallback(async () => {
    if (disabled || !hasMore || isLoading || error || loadingRef.current) return;
    loadingRef.current = true;
    setInternalLoading(true);
    try { await onLoadMore(); } finally { loadingRef.current = false; setInternalLoading(false); }
  }, [disabled, error, hasMore, isLoading, onLoadMore]);

  useEffect(() => {
    if (!initialLoad || initialRequested.current || disabled || !hasMore || isLoading || error) return;
    initialRequested.current = true;
    void loadMore().catch(() => undefined);
  }, [disabled, error, hasMore, initialLoad, isLoading, loadMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || disabled || !hasMore || error || typeof IntersectionObserver === 'undefined') return undefined;
    const root = direction === 'vertical' ? rootRef.current : rootRef.current;
    const observer = new IntersectionObserver((entries) => { if (entries[0]?.isIntersecting) void loadMore().catch(() => undefined); }, { root, rootMargin, threshold: Math.min(Math.max(threshold, 0), 1) });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [disabled, direction, error, hasMore, loadMore, rootMargin, threshold]);

  const retry = async () => { if (onRetry) await onRetry(); else await loadMore(); };
  const indicator = isLoading ? (loadingContent ?? <span className="mm-infinite-scroll__loading"><ArrowsClockwise aria-hidden="true" className="mm-infinite-scroll__spinner" size={16} /> Loading more</span>) : error ? <div className="mm-infinite-scroll__error"><span>{error}</span>{onRetry && <button className="mm-infinite-scroll__retry" onClick={() => void retry().catch(() => undefined)} type="button">{retryLabel}</button>}</div> : !hasMore ? <span className="mm-infinite-scroll__end">{endMessage}</span> : null;
  return <section aria-busy={isLoading} aria-label={ariaLabel} className={cx('mm-infinite-scroll', `mm-infinite-scroll--${direction}`, reverse && 'mm-infinite-scroll--reverse', className)} ref={rootRef} style={{ ...style, '--mm-infinite-scroll-height': typeof height === 'number' ? `${height}px` : height } as CSSProperties}>
    <div className="mm-infinite-scroll__content">{children}</div>
    <div aria-hidden="true" className="mm-infinite-scroll__sentinel" ref={sentinelRef} />
    <div className="mm-infinite-scroll__status" role="status">{indicator}</div>
  </section>;
}
