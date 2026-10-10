import { CaretLeft, CaretRight, Download, ArrowsOut, ArrowCounterClockwise, ArrowClockwise, X, MagnifyingGlassPlus, MagnifyingGlassMinus } from '../../icons';
import { createPortal } from 'react-dom';
import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import { Button } from '../Button';
import { useConfig, type Locale } from '../ConfigProvider';
import './Lightbox.css';

export type LightboxItem = { src: string; alt?: string; caption?: ReactNode; download?: string; height?: number; id?: string; thumbnailSrc?: string; title?: ReactNode; width?: number };
export type LightboxFit = 'contain' | 'cover' | 'actual';
export type LightboxVariant = 'dark' | 'glass' | 'light';
export type LightboxProps = {
  items: LightboxItem[];
  'aria-label'?: string;
  className?: string;
  closeOnBackdrop?: boolean;
  defaultIndex?: number;
  downloadable?: boolean;
  fit?: LightboxFit;
  loop?: boolean;
  onChange?: (index: number, item: LightboxItem) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  showCaptions?: boolean;
  showGallery?: boolean;
  showCounter?: boolean;
  showThumbnails?: boolean;
  showToolbar?: boolean;
  thumbSize?: number;
  variant?: LightboxVariant;
  zoom?: boolean;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const clampIndex = (index: number, length: number) => Math.max(0, Math.min(index, Math.max(0, length - 1)));
const translations: Record<Locale, { cover: string; fit: string; fitMode: string; actual: string }> = {
  en: { cover: 'Cover', fit: 'Fit', fitMode: 'Image fit mode', actual: '100%' },
  uk: { cover: 'Заповнити', fit: 'Вписати', fitMode: 'Режим відображення зображення', actual: '100%' },
  de: { cover: 'Ausfüllen', fit: 'Einpassen', fitMode: 'Anzeigemodus des Bildes', actual: '100%' },
  fr: { cover: 'Couvrir', fit: 'Ajuster', fitMode: "Mode d'affichage de l'image", actual: '100%' },
};

export function Lightbox({ items, 'aria-label': ariaLabel = 'Image gallery', className, closeOnBackdrop = true, defaultIndex = 0, downloadable = true, fit: providedFit, loop = true, onChange, onOpenChange, open: controlledOpen, showCaptions: providedShowClosedCaptioning, showCounter = true, showGallery = true, showThumbnails: providedShowThumbnails, showToolbar: providedShowToolbar, thumbSize = 64, variant: providedVariant, zoom = true }: LightboxProps) {
  const { components, locale } = useConfig();
  const config = components.lightbox;
  const language = translations[locale];
  const fit = providedFit ?? config?.fit ?? 'contain';
  const variant = providedVariant ?? config?.variant ?? 'dark';
  const showCaptions = providedShowClosedCaptioning ?? config?.showCaptions ?? true;
  const showThumbnails = providedShowThumbnails ?? config?.showThumbnails ?? true;
  const showToolbar = providedShowToolbar ?? config?.showToolbar ?? true;
  const [internalOpen, setInternalOpen] = useState(false);
  const [index, setIndex] = useState(clampIndex(defaultIndex, items.length));
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [actualFit, setActualFit] = useState(fit);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const current = items[index];
  const isOpen = controlledOpen ?? internalOpen;
  const imageStyle = useMemo(() => ({ '--mm-lightbox-scale': scale, '--mm-lightbox-rotation': `${rotation}deg` } as CSSProperties), [rotation, scale]);
  const changeIndex = (nextIndex: number) => { const next = clampIndex(nextIndex, items.length); setIndex(next); setScale(1); setRotation(0); onChange?.(next, items[next]); };
  const setOpen = (nextOpen: boolean, nextIndex = index) => { if (controlledOpen === undefined) setInternalOpen(nextOpen); if (nextOpen) { setIndex(clampIndex(nextIndex, items.length)); setScale(1); setRotation(0); } onOpenChange?.(nextOpen); };
  const move = (direction: 1 | -1) => { if (!items.length) return; const next = index + direction; if (loop) changeIndex((next + items.length) % items.length); else if (next >= 0 && next < items.length) changeIndex(next); };
  const close = () => { setOpen(false); if (isFullscreen && document.fullscreenElement) void document.exitFullscreen?.(); };
  const download = () => { if (!current) return; const link = document.createElement('a'); link.href = current.src; link.download = current.download ?? current.src.split('/').pop()?.split('?')[0] ?? 'image'; link.target = '_blank'; link.rel = 'noreferrer'; link.click(); };
  const toggleFullscreen = () => { if (!stageRef.current) return; if (document.fullscreenElement) void document.exitFullscreen(); else void stageRef.current.requestFullscreen?.(); };

  useEffect(() => { const onFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement)); document.addEventListener('fullscreenchange', onFullscreen); return () => document.removeEventListener('fullscreenchange', onFullscreen); }, []);
  useEffect(() => { if (!isOpen) return; const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = previous; }; }, [isOpen]);
  useEffect(() => { if (!isOpen) return; const handleKeyDown = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape') close(); else if (event.key === 'ArrowRight') move(1); else if (event.key === 'ArrowLeft') move(-1); else if (event.key === '+' || event.key === '=') setScale((value) => zoom ? Math.min(4, value + .25) : value); else if (event.key === '-') setScale((value) => zoom ? Math.max(.5, value - .25) : value); else if (event.key === '0') { setScale(1); setRotation(0); setActualFit(fit); } }; window.addEventListener('keydown', handleKeyDown); return () => window.removeEventListener('keydown', handleKeyDown); });
  const handleThumbnailKeyDown = (event: KeyboardEvent<HTMLButtonElement>, thumbnailIndex: number) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setOpen(true, thumbnailIndex); } };
  if (!items.length) return null;
  return (
    <>
      {showGallery && <div aria-label={ariaLabel} className={cx('mm-lightbox-gallery', className)}>
        {items.map((item, itemIndex) => <button aria-label={`Open image ${itemIndex + 1}${item.title ? `: ${String(item.title)}` : ''}`} className="mm-lightbox-gallery__thumbnail" key={item.id ?? item.src} onClick={() => setOpen(true, itemIndex)} onKeyDown={(event) => handleThumbnailKeyDown(event, itemIndex)} type="button"><img alt={item.alt ?? ''} src={item.thumbnailSrc ?? item.src} /></button>)}
      </div>}
      {isOpen && createPortal(
        <div aria-label={ariaLabel} aria-modal="true" className={cx('mm-lightbox', `mm-lightbox--${variant}`, isFullscreen && 'mm-lightbox--fullscreen')} onClick={(event) => { if (closeOnBackdrop && event.target === event.currentTarget) close(); }} role="dialog">
          <div className="mm-lightbox__stage" ref={stageRef}>
            <div className="mm-lightbox__header">
              <span className="mm-lightbox__title">{current?.title ?? current?.alt}</span>
              {showCounter && <span aria-live="polite" className="mm-lightbox__counter">Image {index + 1} of {items.length}</span>}
              <Button aria-label="Close lightbox" className="mm-lightbox__close" iconLeft={<X size={20} />} iconOnly variant="text" onClick={close}>Close</Button>
            </div>
            <div className="mm-lightbox__viewport" onClick={(event) => { if (closeOnBackdrop && event.target === event.currentTarget) close(); }}>
              <Button aria-label="Previous image" className="mm-lightbox__nav mm-lightbox__nav--previous" disabled={!loop && index === 0} iconLeft={<CaretLeft size={28} />} iconOnly variant="text" onClick={() => move(-1)}>Previous image</Button>
              <div className={cx('mm-lightbox__canvas', `mm-lightbox__canvas--${actualFit}`)}>
              <img alt={current?.alt ?? ''} className={cx('mm-lightbox__image', `mm-lightbox__image--${actualFit}`)} src={current?.src} style={imageStyle} />
              {showToolbar && <div className="mm-lightbox__overlay-controls">
                <div aria-label={language.fitMode} className="mm-lightbox__fit-switch" role="group">
                  <button aria-pressed={actualFit === 'contain'} className="mm-lightbox__fit-option" onClick={() => setActualFit('contain')} type="button">{language.fit}</button>
                  <button aria-pressed={actualFit === 'cover'} className="mm-lightbox__fit-option" onClick={() => setActualFit('cover')} type="button">{language.cover}</button>
                  <button aria-pressed={actualFit === 'actual'} className="mm-lightbox__fit-option" onClick={() => setActualFit('actual')} type="button">{language.actual}</button>
                </div>
                <div className="mm-lightbox__toolbar" aria-label="Image controls">
                  <Button aria-label="Zoom out" disabled={!zoom || scale <= .5} iconLeft={<MagnifyingGlassMinus size={18} />} iconOnly variant="text" onClick={() => setScale((value) => Math.max(.5, value - .25))}>Zoom out</Button>
                  <span aria-live="polite" className="mm-lightbox__zoom-label">{Math.round(scale * 100)}%</span>
                  <Button aria-label="Zoom in" disabled={!zoom || scale >= 4} iconLeft={<MagnifyingGlassPlus size={18} />} iconOnly variant="text" onClick={() => setScale((value) => Math.min(4, value + .25))}>Zoom in</Button>
                  <Button aria-label="Rotate left" iconLeft={<ArrowCounterClockwise size={18} />} iconOnly variant="text" onClick={() => setRotation((value) => value - 90)}>Rotate left</Button>
                  <Button aria-label="Rotate right" iconLeft={<ArrowClockwise size={18} />} iconOnly variant="text" onClick={() => setRotation((value) => value + 90)}>Rotate right</Button>
                  <Button aria-label="Toggle fullscreen" iconLeft={<ArrowsOut size={18} />} iconOnly variant="text" onClick={toggleFullscreen}>Toggle fullscreen</Button>
                  {downloadable && <Button aria-label="Download image" iconLeft={<Download size={18} />} iconOnly variant="text" onClick={download}>Download image</Button>}
                </div>
              </div>}
              </div>
              <Button aria-label="Next image" className="mm-lightbox__nav mm-lightbox__nav--next" disabled={!loop && index === items.length - 1} iconLeft={<CaretRight size={28} />} iconOnly variant="text" onClick={() => move(1)}>Next image</Button>
            </div>
            {showCaptions && (current?.caption || current?.alt) && <div className="mm-lightbox__caption">{current.caption ?? current.alt}</div>}
            {showThumbnails && <div aria-label="Image thumbnails" className="mm-lightbox__thumbnails" style={{ '--mm-lightbox-thumb-size': `${thumbSize}px` } as CSSProperties}>{items.map((item, itemIndex) => <button aria-label={`Show image ${itemIndex + 1}`} aria-current={itemIndex === index ? 'true' : undefined} className={cx('mm-lightbox__thumbnail', itemIndex === index && 'mm-lightbox__thumbnail--active')} key={item.id ?? item.src} onClick={() => changeIndex(itemIndex)} type="button"><img alt="" src={item.thumbnailSrc ?? item.src} /></button>)}</div>}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
