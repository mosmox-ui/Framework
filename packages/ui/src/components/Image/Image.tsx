import { useState, type CSSProperties, type ImgHTMLAttributes, type KeyboardEvent, type MouseEventHandler, type ReactNode } from 'react';
import './Image.css';

export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
export type ImageRadius = 'none' | 'sm' | 'default' | 'lg' | 'full';
export type ImageOverlayPosition = 'top' | 'center' | 'bottom';
export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'className' | 'onClick'> & { aspectRatio?: number | string; bordered?: boolean; className?: string; disableHover?: boolean; fallback?: ReactNode; hoverDuration?: number | string; hoverScale?: number; imageClassName?: string; onClick?: MouseEventHandler<HTMLSpanElement>; overlay?: ReactNode; overlayPosition?: ImageOverlayPosition; radius?: ImageRadius; showLoader?: boolean; fit?: ImageFit };

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function Image({ aspectRatio, bordered = false, className, disableHover = false, fallback, fit = 'cover', hoverDuration = 220, hoverScale = 1.08, imageClassName, onClick, onError, onLoad, overlay, overlayPosition = 'center', radius = 'default', showLoader = true, src, style, ...rest }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const interactive = Boolean(onClick);
  const wrapperStyle = { '--mm-image-hover-duration': typeof hoverDuration === 'number' ? `${hoverDuration}ms` : hoverDuration, '--mm-image-hover-scale': Math.max(1, hoverScale), ...style, ...(aspectRatio ? { aspectRatio } : {}) } as CSSProperties;
  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (interactive && onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event as unknown as Parameters<MouseEventHandler<HTMLSpanElement>>[0]);
    }
  };
  return <span aria-busy={!loaded && !failed || undefined} className={cx('mm-image', `mm-image--${radius}`, bordered && 'mm-image--bordered', interactive && 'mm-image--interactive', disableHover && 'mm-image--disable-hover', className)} onClick={interactive ? onClick : undefined} onKeyDown={handleKeyDown} role={interactive ? 'button' : undefined} style={wrapperStyle} tabIndex={interactive ? 0 : undefined}>
    {!failed && src ? <img {...rest} className={cx('mm-image__element', `mm-image__element--${fit}`, imageClassName)} onError={(event) => { setFailed(true); onError?.(event); }} onLoad={(event) => { setLoaded(true); onLoad?.(event); }} src={src} /> : <span className="mm-image__fallback">{fallback ?? 'Image unavailable'}</span>}
    {!loaded && !failed && showLoader && <span aria-hidden="true" className="mm-image__loader" />}
    {overlay && <span className={`mm-image__overlay mm-image__overlay--${overlayPosition}`}>{overlay}</span>}
  </span>;
}
