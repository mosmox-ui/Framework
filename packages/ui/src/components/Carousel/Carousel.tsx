import { CaretLeft, CaretRight, Pause, Play } from '../../icons';
import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react';
import './Carousel.css';

export type CarouselOrientation = 'horizontal' | 'vertical';
export type CarouselVariant = 'default' | 'overlay' | 'minimal' | 'cards' | 'peek';
export type CarouselEffect = 'slide' | 'fade' | 'scale';
export type CarouselRenderState = { active: boolean; index: number; visible: boolean };
export type CarouselItem = { key: string; content?: ReactNode; label?: ReactNode; eyebrow?: ReactNode; title?: ReactNode; description?: ReactNode; badge?: ReactNode; image?: string; alt?: string; disabled?: boolean };
export type CarouselProps = {
  items: CarouselItem[];
  activeIndex?: number;
  defaultActiveIndex?: number;
  onChange?: (index: number, item: CarouselItem) => void;
  orientation?: CarouselOrientation;
  variant?: CarouselVariant;
  effect?: CarouselEffect;
  slidesPerView?: number;
  gap?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  pauseOnInteraction?: boolean;
  draggable?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  showProgress?: boolean;
  showThumbnails?: boolean;
  thumbnailSize?: number;
  transitionDuration?: number;
  previousLabel?: string;
  nextLabel?: string;
  playLabel?: string;
  pauseLabel?: string;
  dotLabel?: (index: number, item: CarouselItem) => string;
  lazy?: boolean;
  renderItem?: (item: CarouselItem, index: number, state: CarouselRenderState) => ReactNode;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function Carousel({
  items, activeIndex, defaultActiveIndex = 0, onChange, orientation = 'horizontal', variant = 'default', effect = 'slide', slidesPerView = 1, gap = 16,
  loop = true, autoplay = false, interval = 5000, pauseOnHover = true, pauseOnFocus = true, pauseOnInteraction = true, draggable = true,
  showArrows = true, showDots = true, showProgress = false, showThumbnails = false, thumbnailSize = 64, transitionDuration = 320,
  previousLabel = 'Previous slide', nextLabel = 'Next slide', playLabel = 'Start autoplay', pauseLabel = 'Pause autoplay', dotLabel = (index) => `Go to slide ${index + 1}`,
  lazy = false, renderItem, className, style, 'aria-label': ariaLabel = 'Carousel',
}: CarouselProps) {
  const id = useId().replace(/:/g, '');
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const count = items.length;
  const visible = Math.max(1, Math.min(Math.floor(slidesPerView), count || 1));
  const visualVisible = variant === 'peek' && visible === 1 ? 1.16 : visible;
  const pageCount = Math.max(1, count - visible + 1);
  const [internalIndex, setInternalIndex] = useState(Math.min(Math.max(0, defaultActiveIndex), pageCount - 1));
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(autoplay);
  const [step, setStep] = useState(0);
  const currentIndex = Math.min(Math.max(0, activeIndex ?? internalIndex), pageCount - 1);
  const setIndex = (nextIndex: number) => {
    if (!count) return;
    const direction = nextIndex >= currentIndex ? 1 : -1;
    let candidate = loop ? (nextIndex + pageCount) % pageCount : Math.min(Math.max(0, nextIndex), pageCount - 1);
    for (let attempts = 0; attempts < pageCount && items[candidate]?.disabled; attempts += 1) candidate = loop ? (candidate + direction + pageCount) % pageCount : candidate + direction;
    if (candidate < 0 || candidate >= pageCount || items[candidate]?.disabled) return;
    if (activeIndex === undefined) setInternalIndex(candidate);
    onChange?.(candidate, items[candidate]);
  };
  const next = () => setIndex(currentIndex + 1);
  const previous = () => setIndex(currentIndex - 1);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!viewport || !track || !first) return undefined;
    const measure = () => {
      const computedGap = Number.parseFloat(getComputedStyle(track).gap) || 0;
      setStep((orientation === 'horizontal' ? first.getBoundingClientRect().width : first.getBoundingClientRect().height) + computedGap);
    };
    measure();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : undefined;
    observer?.observe(viewport);
    observer?.observe(first);
    return () => observer?.disconnect();
  }, [orientation, visible, visualVisible, gap, count]);

  useEffect(() => {
    if (!autoplay || !playing || paused || count < 2 || interval <= 0) return undefined;
    const timer = window.setInterval(next, interval);
    return () => window.clearInterval(timer);
  }, [autoplay, playing, paused, interval, currentIndex, count]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggable || effect !== 'slide') return;
    if (event.target instanceof Element && event.target.closest('button, a, input, select, textarea')) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    if (pauseOnInteraction) setPaused(true);
  };
  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || !draggable || effect !== 'slide') return;
    const delta = orientation === 'horizontal' ? event.clientX - start.x : event.clientY - start.y;
    if (Math.abs(delta) > 40) (delta < 0 ? next : previous)();
    if (pauseOnInteraction) setPaused(false);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const backward = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    const forward = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    if (event.key === backward) { event.preventDefault(); previous(); }
    if (event.key === forward) { event.preventDefault(); next(); }
    if (event.key === 'House') { event.preventDefault(); setIndex(0); }
    if (event.key === 'End') { event.preventDefault(); setIndex(pageCount - 1); }
  };
  if (!count) return null;
  const gapValue = typeof gap === 'number' ? `${gap}px` : gap;
  const trackStyle = { '--mm-carousel-visible': visualVisible, '--mm-carousel-gap': gapValue, '--mm-carousel-duration': `${transitionDuration}ms`, transform: effect === 'slide' ? (orientation === 'horizontal' ? `translate3d(${-currentIndex * step}px, 0, 0)` : `translate3d(0, ${-currentIndex * step}px, 0)`) : undefined } as CSSProperties;
  const setPause = (value: boolean) => { if (pauseOnHover || pauseOnFocus) setPaused(value); };
  const isVisible = (index: number) => effect === 'fade' ? index === currentIndex : index >= currentIndex && index < currentIndex + visible;

  return <section aria-label={ariaLabel} aria-roledescription="carousel" className={cx('mm-carousel', `mm-carousel--${orientation}`, `mm-carousel--variant-${variant}`, `mm-carousel--effect-${effect}`, className)} style={style}>
    <div className="mm-carousel__header"><span className="mm-carousel__status" aria-live="polite">{currentIndex + 1} / {pageCount}</span>{showProgress && <div aria-hidden="true" className="mm-carousel__progress"><span style={{ width: `${((currentIndex + 1) / pageCount) * 100}%` }} /></div>}{autoplay && count > 1 && <button aria-label={playing ? pauseLabel : playLabel} className="mm-carousel__play" onClick={() => setPlaying((value) => !value)} type="button">{playing ? <Pause aria-hidden="true" size={14} /> : <Play aria-hidden="true" size={14} />}</button>}</div>
    <div className="mm-carousel__viewport" onBlur={() => setPause(false)} onFocus={() => pauseOnFocus && setPause(true)} onKeyDown={handleKeyDown} onMouseEnter={() => pauseOnHover && setPause(true)} onMouseLeave={() => setPause(false)} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} ref={viewportRef} role="group" tabIndex={0}>
      <div className="mm-carousel__track" ref={trackRef} style={trackStyle}>{items.map((item, index) => { const active = currentIndex === index; const visibleNow = isVisible(index); return <article aria-hidden={!visibleNow} aria-label={typeof item.label === 'string' ? item.label : undefined} className={cx('mm-carousel__slide', active && 'mm-carousel__slide--active', visibleNow && 'mm-carousel__slide--visible', item.disabled && 'mm-carousel__slide--disabled')} id={`${id}-slide-${item.key}`} key={item.key} role="group">{renderItem ? renderItem(item, index, { active, index, visible: visibleNow }) : <>{item.image && <img alt={item.alt ?? ''} className="mm-carousel__image" loading={lazy && !visibleNow ? 'lazy' : 'eager'} src={item.image} />}{(item.eyebrow || item.title || item.description || item.badge || item.content) && <div className="mm-carousel__content">{item.eyebrow && <span className="mm-carousel__eyebrow">{item.eyebrow}</span>}{item.badge && <span className="mm-carousel__badge">{item.badge}</span>}{item.title && <h3>{item.title}</h3>}{item.description && <p>{item.description}</p>}{item.content}</div>}</>}</article>; })}</div>
      {showArrows && <><button aria-label={previousLabel} className="mm-carousel__arrow mm-carousel__arrow--previous" disabled={!loop && currentIndex === 0} onClick={previous} type="button"><CaretLeft aria-hidden="true" size={20} /></button><button aria-label={nextLabel} className="mm-carousel__arrow mm-carousel__arrow--next" disabled={!loop && currentIndex === pageCount - 1} onClick={next} type="button"><CaretRight aria-hidden="true" size={20} /></button></>}
    </div>
    {showThumbnails && <div aria-label="Choose slide thumbnail" className="mm-carousel__thumbnails" role="tablist">{items.slice(0, pageCount).map((item, index) => <button aria-label={dotLabel(index, item)} aria-selected={currentIndex === index} className={cx('mm-carousel__thumbnail', currentIndex === index && 'mm-carousel__thumbnail--active')} key={item.key} onClick={() => setIndex(index)} role="tab" style={{ '--mm-carousel-thumbnail-size': `${thumbnailSize}px` } as CSSProperties} type="button">{item.image ? <img alt="" src={item.image} /> : <span>{index + 1}</span>}</button>)}</div>}
    {showDots && pageCount > 1 && <div aria-label="Choose slide" className="mm-carousel__dots" role="tablist">{items.slice(0, pageCount).map((item, index) => <button aria-label={dotLabel(index, item)} aria-selected={currentIndex === index} className={cx('mm-carousel__dot', currentIndex === index && 'mm-carousel__dot--active')} key={item.key} onClick={() => setIndex(index)} role="tab" type="button" />)}</div>}
  </section>;
}
