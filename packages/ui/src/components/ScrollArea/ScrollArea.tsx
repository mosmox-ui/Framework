import { forwardRef, useImperativeHandle, useRef, type CSSProperties, type HTMLAttributes, type Ref, type UIEvent } from 'react';
import { useConfig } from '../ConfigProvider';
import './ScrollArea.css';

export type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';
export type ScrollAreaScrollbar = 'auto' | 'always' | 'hover' | 'hidden';
export type ScrollAreaSize = 'sm' | 'default' | 'lg';
export type ScrollAreaVariant = 'plain' | 'bordered' | 'soft';

export type ScrollAreaHandle = {
  element: HTMLDivElement | null;
  scrollTo: (options: ScrollToOptions) => void;
  scrollToTop: (behavior?: ScrollBehavior) => void;
  scrollToBottom: (behavior?: ScrollBehavior) => void;
  scrollToStart: (behavior?: ScrollBehavior) => void;
  scrollToEnd: (behavior?: ScrollBehavior) => void;
};

export type ScrollAreaProps = Omit<HTMLAttributes<HTMLDivElement>, 'onScroll'> & {
  orientation?: ScrollAreaOrientation;
  scrollbar?: ScrollAreaScrollbar;
  size?: ScrollAreaSize;
  variant?: ScrollAreaVariant;
  height?: CSSProperties['height'];
  maxHeight?: CSSProperties['maxHeight'];
  width?: CSSProperties['width'];
  maxWidth?: CSSProperties['maxWidth'];
  fadeEdges?: boolean;
  viewportRef?: Ref<HTMLDivElement>;
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
  onReachStart?: () => void;
  onReachEnd?: () => void;
  scrollThreshold?: number;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

function setRef<T>(ref: Ref<T> | undefined, value: T) {
  if (typeof ref === 'function') ref(value);
  else if (ref) (ref as { current: T | null }).current = value;
}

export const ScrollArea = forwardRef<ScrollAreaHandle, ScrollAreaProps>(function ScrollArea({
  orientation,
  scrollbar,
  size,
  variant,
  height,
  maxHeight,
  width,
  maxWidth,
  fadeEdges,
  viewportRef,
  onScroll,
  onReachStart,
  onReachEnd,
  scrollThreshold = 2,
  className,
  style,
  children,
  ...props
}, ref) {
  const { components } = useConfig();
  const resolvedOrientation = orientation ?? components.scrollArea?.orientation ?? 'vertical';
  const resolvedScrollbar = scrollbar ?? components.scrollArea?.scrollbar ?? 'auto';
  const resolvedSize = size ?? components.scrollArea?.size ?? 'default';
  const resolvedVariant = variant ?? components.scrollArea?.variant ?? 'plain';
  const resolvedFadeEdges = fadeEdges ?? components.scrollArea?.fadeEdges ?? false;
  const internalViewportRef = useRef<HTMLDivElement | null>(null);
  const reachedStartRef = useRef<boolean | null>(null);
  const reachedEndRef = useRef<boolean | null>(null);
  const setViewportRef = (element: HTMLDivElement | null) => {
    internalViewportRef.current = element;
    setRef(viewportRef, element);
  };

  useImperativeHandle(ref, () => ({
    get element() {
      return internalViewportRef.current;
    },
    scrollTo: (options) => internalViewportRef.current?.scrollTo(options),
    scrollToTop: (behavior = 'smooth') => internalViewportRef.current?.scrollTo({ top: 0, behavior }),
    scrollToBottom: (behavior = 'smooth') => {
      const viewport = internalViewportRef.current;
      viewport?.scrollTo({ top: viewport.scrollHeight, behavior });
    },
    scrollToStart: (behavior = 'smooth') => internalViewportRef.current?.scrollTo({ left: 0, behavior }),
    scrollToEnd: (behavior = 'smooth') => {
      const viewport = internalViewportRef.current;
      viewport?.scrollTo({ left: viewport.scrollWidth, behavior });
    },
  }), []);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const viewport = event.currentTarget;
    const atStart = resolvedOrientation === 'horizontal'
      ? viewport.scrollLeft <= scrollThreshold
      : resolvedOrientation === 'both'
        ? viewport.scrollTop <= scrollThreshold && viewport.scrollLeft <= scrollThreshold
        : viewport.scrollTop <= scrollThreshold;
    const atEnd = resolvedOrientation === 'horizontal'
      ? viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - scrollThreshold
      : resolvedOrientation === 'both'
        ? viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight - scrollThreshold && viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - scrollThreshold
        : viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight - scrollThreshold;

    if (atStart && reachedStartRef.current !== true) onReachStart?.();
    if (atEnd && reachedEndRef.current !== true) onReachEnd?.();
    reachedStartRef.current = atStart;
    reachedEndRef.current = atEnd;
    onScroll?.(event);
  };

  const rootStyle = {
    ...style,
    ...(height !== undefined && { '--mm-scroll-area-height': typeof height === 'number' ? `${height}px` : height }),
    ...(maxHeight !== undefined && { '--mm-scroll-area-max-height': typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }),
    ...(width !== undefined && { '--mm-scroll-area-width': typeof width === 'number' ? `${width}px` : width }),
    ...(maxWidth !== undefined && { '--mm-scroll-area-max-width': typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }),
  } as CSSProperties;

  return <div {...props} className={cx('mm-scroll-area', `mm-scroll-area--${resolvedOrientation}`, `mm-scroll-area--scrollbar-${resolvedScrollbar}`, `mm-scroll-area--${resolvedSize}`, `mm-scroll-area--${resolvedVariant}`, resolvedFadeEdges && 'mm-scroll-area--fade-edges', className)} style={rootStyle}>
    <div className="mm-scroll-area__viewport" ref={setViewportRef} onScroll={handleScroll} tabIndex={props.tabIndex ?? 0}>
      <div className="mm-scroll-area__content">{children}</div>
    </div>
  </div>;
});

ScrollArea.displayName = 'ScrollArea';
