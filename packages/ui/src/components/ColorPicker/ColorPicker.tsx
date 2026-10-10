import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CaretDown } from '../../icons';
import { Button } from '../Button';
import './ColorPicker.css';

export type ColorPickerSize = 'sm' | 'default' | 'lg';
export type ColorPickerFormat = 'hex' | 'hex8' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsb' | 'hsba' | 'hsv' | 'hsva';
export type ColorPickerPreset = string | { value: string; label?: ReactNode };
export type ColorPickerTokenOption = string | { token: string; value?: string; label?: ReactNode };
export type ColorPickerProps = {
  'aria-label'?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onCommit?: (value: string) => void;
  onCancel?: () => void;
  onInvalid?: (value: string) => void;
  invalidMessage?: ReactNode;
  onOpenChange?: (open: boolean) => void;
  label?: ReactNode;
  size?: ColorPickerSize;
  format?: ColorPickerFormat;
  disabled?: boolean;
  readOnly?: boolean;
  inline?: boolean;
  showAlpha?: boolean;
  alphaFormat?: 'decimal' | 'percentage';
  showInput?: boolean;
  showSwatches?: boolean;
  swatches?: ColorPickerPreset[];
  presets?: ColorPickerPreset[];
  recentColors?: string[];
  showRecent?: boolean;
  onSwatchAdd?: (value: string) => void;
  onSwatchRemove?: (value: string) => void;
  swatchShape?: 'circle' | 'square';
  swatchSize?: number | string;
  showSwatchLabels?: boolean;
  allowCustomSwatch?: boolean;
  allowTransparent?: boolean;
  confirmActions?: boolean;
  okLabel?: ReactNode;
  cancelLabel?: ReactNode;
  showEyeDropper?: boolean;
  showContrast?: boolean;
  contrastAgainst?: string;
  tokenOptions?: ColorPickerTokenOption[];
  placement?: 'top' | 'bottom' | 'left' | 'right';
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  portal?: boolean;
  popoverWidth?: number | string;
  className?: string;
  style?: CSSProperties;
};

type HSV = { h: number; s: number; v: number; a: number };
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const hex = (value: number) => Math.round(value).toString(16).padStart(2, '0');
const cssLength = (value?: number | string) => typeof value === 'number' ? `${value}px` : value;
const presetValue = (preset: ColorPickerPreset) => typeof preset === 'string' ? preset : preset.value;
const presetLabel = (preset: ColorPickerPreset) => typeof preset === 'string' ? preset : (preset.label ?? preset.value);

function fromRgb(red: number, green: number, blue: number, alpha = 1): HSV {
  const r = clamp(red / 255), g = clamp(green / 255), b = clamp(blue / 255), max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
  let h = 0;
  if (delta) { if (max === r) h = ((g - b) / delta) % 6; else if (max === g) h = (b - r) / delta + 2; else h = (r - g) / delta + 4; h *= 60; if (h < 0) h += 360; }
  return { h, s: max ? delta / max : 0, v: max, a: clamp(alpha) };
}

function parseChannel(value: string, scale: number) { const trimmed = value.trim(); return trimmed.endsWith('%') ? Number.parseFloat(trimmed) * scale / 100 : Number.parseFloat(trimmed); }

function parseColor(input: string): HSV {
  const value = input.trim().toLowerCase();
  const match = value.match(/^#([0-9a-f]{3,8})$/);
  let r = 0, g = 50, b = 49, a = 1;
  if (match) { const raw = match[1]; const expanded = raw.length <= 4 ? raw.split('').map((part) => part + part).join('') : raw; r = parseInt(expanded.slice(0, 2), 16); g = parseInt(expanded.slice(2, 4), 16); b = parseInt(expanded.slice(4, 6), 16); if (expanded.length === 8) a = parseInt(expanded.slice(6, 8), 16) / 255; }
  else { const rgb = value.match(/^rgba?\(([^)]+)\)/); const hsl = value.match(/^hsla?\(([^)]+)\)/); const hsb = value.match(/^hs(?:b|v)a?\(([^)]+)\)/); if (rgb) { const parts = rgb[1].split(/[,\s/]+/).filter(Boolean); [r, g, b] = parts.slice(0, 3).map((part) => parseChannel(part, 255)); a = parts[3] ? parseChannel(parts[3], 1) : 1; } else if (hsl) { const parts = hsl[1].split(/[,\s/]+/).filter(Boolean); const hue = ((Number.parseFloat(parts[0]) % 360) + 360) % 360; const saturation = clamp(parseChannel(parts[1], 1)); const lightness = clamp(parseChannel(parts[2], 1)); a = parts[3] ? parseChannel(parts[3], 1) : 1; const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation; const x = chroma * (1 - Math.abs((hue / 60) % 2 - 1)); const m = lightness - chroma / 2; const channels = hue < 60 ? [chroma, x, 0] : hue < 120 ? [x, chroma, 0] : hue < 180 ? [0, chroma, x] : hue < 240 ? [0, x, chroma] : hue < 300 ? [x, 0, chroma] : [chroma, 0, x]; [r, g, b] = channels.map((part) => (part + m) * 255); } else if (hsb) { const parts = hsb[1].split(/[,\s/]+/).filter(Boolean); const hue = ((Number.parseFloat(parts[0]) % 360) + 360) % 360; const saturation = clamp(parseChannel(parts[1], 1)); const brightness = clamp(parseChannel(parts[2], 1)); a = parts[3] ? parseChannel(parts[3], 1) : 1; const chroma = brightness * saturation; const x = chroma * (1 - Math.abs((hue / 60) % 2 - 1)); const m = brightness - chroma; const channels = hue < 60 ? [chroma, x, 0] : hue < 120 ? [x, chroma, 0] : hue < 180 ? [0, chroma, x] : hue < 240 ? [0, x, chroma] : hue < 300 ? [x, 0, chroma] : [chroma, 0, x]; [r, g, b] = channels.map((part) => (part + m) * 255); } }
  return fromRgb(r, g, b, a);
}

function isValidColor(value: string, allowTransparent: boolean) { return allowTransparent && value.trim().toLowerCase() === 'transparent' || /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value.trim()) || /^(?:rgba?|hsla?|hsba?|hsva?)\([^)]{3,}\)$/i.test(value.trim()); }
function toRgb(color: HSV) { const c = color.v * color.s, x = c * (1 - Math.abs((color.h / 60) % 2 - 1)), m = color.v - c; const parts = color.h < 60 ? [c, x, 0] : color.h < 120 ? [x, c, 0] : color.h < 180 ? [0, c, x] : color.h < 240 ? [0, x, c] : color.h < 300 ? [x, 0, c] : [c, 0, x]; return parts.map((part) => (part + m) * 255); }
function toHsl(color: HSV) { const l = color.v * (1 - color.s / 2); const s = l === 0 || l === 1 ? 0 : (color.v - l) / Math.min(l, 1 - l); return [Math.round(color.h), Math.round(s * 100), Math.round(l * 100)] as const; }
function toHsb(color: HSV) { return [Math.round(color.h), Math.round(color.s * 100), Math.round(color.v * 100)] as const; }
function formatColor(color: HSV, format: ColorPickerFormat, alphaFormat: 'decimal' | 'percentage') { const [r, g, b] = toRgb(color).map(Math.round); const alpha = alphaFormat === 'percentage' ? `${Math.round(color.a * 100)}%` : Number(color.a.toFixed(2)); const [h, s, l] = toHsl(color); const [bh, bs, bv] = toHsb(color); if (format === 'hex8') return `#${hex(r)}${hex(g)}${hex(b)}${hex(color.a * 255)}`; if (format === 'rgb') return `rgb(${r}, ${g}, ${b})`; if (format === 'rgba') return `rgba(${r}, ${g}, ${b}, ${alpha})`; if (format === 'hsl') return `hsl(${h}, ${s}%, ${l}%)`; if (format === 'hsla') return `hsla(${h}, ${s}%, ${l}%, ${alpha})`; if (format === 'hsb' || format === 'hsv') return `${format}(${bh}, ${bs}%, ${bv}%)`; if (format === 'hsba' || format === 'hsva') return `${format}(${bh}, ${bs}%, ${bv}%, ${alpha})`; return `#${hex(r)}${hex(g)}${hex(b)}`; }
function luminance(color: HSV) { const channels = toRgb(color).map((part) => part / 255).map((part) => part <= .03928 ? part / 12.92 : ((part + .055) / 1.055) ** 2.4); return .2126 * channels[0] + .7152 * channels[1] + .0722 * channels[2]; }
function contrastRatio(first: HSV, second: HSV) { const a = luminance(first), b = luminance(second); return (Math.max(a, b) + .05) / (Math.min(a, b) + .05); }
function isMacOS() { return typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(`${navigator.platform} ${navigator.userAgent}`); }

export function ColorPicker({ 'aria-label': ariaLabel = 'Color picker', value, defaultValue = '#003231', onChange, onCommit, onCancel, onInvalid, invalidMessage = 'Enter a valid color value.', onOpenChange, label, size = 'default', format = 'hex', disabled = false, readOnly = false, inline = false, showAlpha = true, alphaFormat = 'decimal', showInput = true, showSwatches = true, swatches = ['#003231', '#12b76a', '#f79009', '#f04438', '#7f56d9', '#2e90fa', '#101828', '#ffffff'], presets = [], recentColors = [], showRecent = false, onSwatchAdd, onSwatchRemove, swatchShape = 'circle', swatchSize = 22, showSwatchLabels = false, allowCustomSwatch = false, allowTransparent = false, confirmActions = false, okLabel = 'OK', cancelLabel = 'Cancel', showEyeDropper = false, showContrast = false, contrastAgainst = '#ffffff', tokenOptions = [], placement = 'bottom', closeOnEscape = true, closeOnOutsideClick = true, portal = false, popoverWidth = 248, className, style }: ColorPickerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;
  const [color, setColor] = useState<HSV>(() => parseColor(currentValue));
  const [transparent, setTransparent] = useState(currentValue.trim().toLowerCase() === 'transparent');
  const [inputValue, setInputValue] = useState(currentValue);
  const [open, setOpen] = useState(inline);
  const [invalid, setInvalid] = useState(false);
  const [recent, setRecent] = useState(recentColors);
  const [portalPosition, setPortalPosition] = useState<CSSProperties>({});
  const initialRef = useRef(currentValue);
  const activeOutput = transparent ? 'transparent' : formatColor(color, format, alphaFormat);
  const updatePortalPosition = () => { if (!portal || !rootRef.current) return; const rect = rootRef.current.getBoundingClientRect(); const width = Number.parseFloat(String(cssLength(popoverWidth))) || 248; const gap = 8; const position = placement === 'top' ? { left: rect.left, top: rect.top - gap, transform: 'translateY(-100%)' } : placement === 'left' ? { left: rect.left - gap, top: rect.top, transform: 'translateX(-100%)' } : placement === 'right' ? { left: rect.right + gap, top: rect.top } : { left: rect.left, top: rect.bottom + gap }; setPortalPosition({ ...position, width: cssLength(popoverWidth), position: 'fixed', zIndex: 1000 }); };
  useEffect(() => { setColor(parseColor(currentValue)); setTransparent(currentValue.trim().toLowerCase() === 'transparent'); setInputValue(currentValue); }, [currentValue]);
  useEffect(() => { if (open) { initialRef.current = currentValue; updatePortalPosition(); } }, [open]);
  useEffect(() => { if (!open || !portal) return; window.addEventListener('resize', updatePortalPosition); window.addEventListener('scroll', updatePortalPosition, true); return () => { window.removeEventListener('resize', updatePortalPosition); window.removeEventListener('scroll', updatePortalPosition, true); }; }, [open, portal, placement, popoverWidth]);
  useEffect(() => { const close = (event: globalThis.MouseEvent) => { const target = event.target as Element | null; if (closeOnOutsideClick && !inline && rootRef.current && !rootRef.current.contains(event.target as Node) && !target?.closest('.mm-color-picker__popover')) { setOpen(false); onOpenChange?.(false); } }; document.addEventListener('mousedown', close); return () => document.removeEventListener('mousedown', close); }, [closeOnOutsideClick, inline, onOpenChange]);
  useEffect(() => { if (!open || !closeOnEscape) return; const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { const previous = initialRef.current; if (value === undefined) setInternalValue(previous); setOpen(false); setInputValue(previous); setColor(parseColor(previous)); setTransparent(previous.trim().toLowerCase() === 'transparent'); onChange?.(previous); onCancel?.(); onOpenChange?.(false); } }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, [closeOnEscape, onCancel, onChange, onOpenChange, open, value]);
  const emit = (next: HSV, nextTransparent = false) => { setColor(next); setTransparent(nextTransparent); const output = nextTransparent ? 'transparent' : formatColor(next, format, alphaFormat); setInputValue(output); if (value === undefined) setInternalValue(output); onChange?.(output); setInvalid(false); };
  const commit = (output = activeOutput) => { setRecent((current) => [output, ...current.filter((item) => item !== output)].slice(0, 8)); onCommit?.(output); };
  const updateFromArea = (event: MouseEvent<HTMLDivElement>) => { if (disabled || readOnly) return; const rect = event.currentTarget.getBoundingClientRect(); emit({ ...color, s: clamp((event.clientX - rect.left) / rect.width), v: clamp(1 - (event.clientY - rect.top) / rect.height) }); };
  const choose = (next: string) => { if (next.trim().toLowerCase() === 'transparent' && allowTransparent) { emit({ ...color, a: 0 }, true); if (!confirmActions) commit('transparent'); return; } if (!isValidColor(next, allowTransparent)) { setInvalid(true); onInvalid?.(next); return; } emit(parseColor(next)); if (!confirmActions) commit(formatColor(parseColor(next), format, alphaFormat)); };
  const cancel = () => { const previous = initialRef.current; if (value === undefined) setInternalValue(previous); setColor(parseColor(previous)); setTransparent(previous.trim().toLowerCase() === 'transparent'); setInputValue(previous); setInvalid(false); onChange?.(previous); onCancel?.(); setOpen(false); onOpenChange?.(false); };
  const confirm = () => { commit(activeOutput); setOpen(false); onOpenChange?.(false); };
  const toggle = () => { if (disabled || readOnly || inline) return; const next = !open; if (next) initialRef.current = currentValue; setOpen(next); onOpenChange?.(next); };
  const resolveToken = (option: ColorPickerTokenOption) => { const token = typeof option === 'string' ? option : option.token; const valueFromOption = typeof option === 'string' ? undefined : option.value; if (valueFromOption) return valueFromOption; if (typeof window === 'undefined' || !rootRef.current) return ''; const name = token.startsWith('--') ? token : `--mm-color-${token}`; return getComputedStyle(rootRef.current).getPropertyValue(name).trim(); };
  const tokenEntries = tokenOptions.map((option) => ({ value: resolveToken(option), label: typeof option === 'string' ? option : (option.label ?? option.token) })).filter((option) => option.value);
  const panel = <div className="mm-color-picker__panel">
    <div aria-label="Saturation and brightness" className="mm-color-picker__area" onClick={updateFromArea} onKeyDown={(event) => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown') { event.preventDefault(); const step = event.shiftKey ? .1 : .01; emit({ ...color, s: clamp(color.s + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0)), v: clamp(color.v + (event.key === 'ArrowUp' ? step : event.key === 'ArrowDown' ? -step : 0)) }); } }} onMouseDown={(event) => event.preventDefault()} role="slider" tabIndex={0} style={{ '--mm-color-hue': `${color.h}deg` } as CSSProperties}><span className="mm-color-picker__area-pointer" style={{ left: `${color.s * 100}%`, top: `${(1 - color.v) * 100}%` }} /></div>
    <label className="mm-color-picker__range-label">Hue<input aria-label="Hue" className="mm-color-picker__hue" max="360" min="0" onChange={(event) => emit({ ...color, h: Number(event.target.value) })} type="range" value={color.h} /></label>
    {showAlpha && <label className="mm-color-picker__range-label">Opacity<input aria-label="Opacity" className="mm-color-picker__alpha" max="1" min="0" onChange={(event) => emit({ ...color, a: Number(event.target.value) })} step="0.01" type="range" value={color.a} /></label>}
    {showInput && <div className="mm-color-picker__input-row"><span className="mm-color-picker__preview" style={{ background: formatColor(color, 'rgba', 'decimal') }} /><input aria-invalid={invalid} aria-label="Color value" className={cx('mm-color-picker__input', invalid && 'mm-color-picker__input--invalid')} onChange={(event) => { setInputValue(event.target.value); setInvalid(false); }} onKeyDown={(event) => { if (event.key === 'Enter') { choose(inputValue); if (!confirmActions) commit(); } }} onBlur={() => choose(inputValue)} type="text" value={inputValue} /></div>}
    {invalid && <small className="mm-color-picker__error">{invalidMessage}</small>}
    {showEyeDropper && <button className="mm-color-picker__utility" disabled={!('EyeDropper' in (typeof window === 'undefined' ? {} : window))} onClick={async () => { const EyeDropper = (window as unknown as { EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper; if (!EyeDropper) return; const result = await new EyeDropper().open(); choose(result.sRGBHex); }} type="button">Pick from screen</button>}
    {allowTransparent && <button className="mm-color-picker__utility" onClick={() => choose('transparent')} type="button">Transparent</button>}
    {tokenEntries.length > 0 && <div aria-label="Theme color tokens" className="mm-color-picker__swatches">{tokenEntries.map((entry) => <button aria-label={`Choose ${entry.label}`} className="mm-color-picker__swatch" key={`${entry.label}-${entry.value}`} onClick={() => choose(entry.value)} style={{ background: entry.value, '--mm-swatch-size': cssLength(swatchSize) } as CSSProperties} title={String(entry.label)} type="button" />)}</div>}
    {showRecent && recent.length > 0 && <div className="mm-color-picker__swatch-group"><span className="mm-color-picker__swatch-heading">Recent colors</span><div className="mm-color-picker__swatches">{recent.map((swatch) => <button aria-label={`Choose recent ${swatch}`} className="mm-color-picker__swatch" key={swatch} onClick={() => choose(swatch)} onDoubleClick={() => onSwatchRemove?.(swatch)} style={{ background: swatch, '--mm-swatch-size': cssLength(swatchSize) } as CSSProperties} title={swatch} type="button" />)}</div></div>}
    {showSwatches && <div className="mm-color-picker__swatch-group"><span className="mm-color-picker__swatch-heading">{showSwatchLabels ? 'Palette' : ''}</span><div aria-label="Color swatches" className="mm-color-picker__swatches">{[...presets, ...swatches].map((swatch, index) => <button aria-label={`Choose ${presetLabel(swatch)}`} className={cx('mm-color-picker__swatch', `mm-color-picker__swatch--${swatchShape}`)} key={`${presetValue(swatch)}-${index}`} onClick={() => choose(presetValue(swatch))} style={{ background: presetValue(swatch), '--mm-swatch-size': cssLength(swatchSize) } as CSSProperties} title={showSwatchLabels ? String(presetLabel(swatch)) : undefined} type="button" />)}</div></div>}
    {allowCustomSwatch && <button className="mm-color-picker__utility" onClick={() => onSwatchAdd?.(activeOutput)} type="button">Add current color</button>}
    {showContrast && <div className="mm-color-picker__contrast">Contrast against {contrastAgainst}: <strong>{contrastRatio(color, parseColor(contrastAgainst)).toFixed(2)}:1</strong></div>}
    {confirmActions && <div className="mm-color-picker__actions"><Button size="sm" variant="outline" onClick={cancel}>{cancelLabel}</Button><Button size="sm" onClick={confirm}>{okLabel}</Button></div>}
  </div>;
  const popover = <div className={cx('mm-color-picker__popover', portal && 'mm-color-picker__popover--portal', `mm-color-picker__popover--${placement}`)} role="dialog" style={portal ? portalPosition : { width: cssLength(popoverWidth) }}>{panel}</div>;
  return <div aria-label={ariaLabel} className={cx('mm-color-picker', `mm-color-picker--${size}`, inline && 'mm-color-picker--inline', className)} ref={rootRef} style={style}>
    {label && <span className="mm-color-picker__label">{label}</span>}
    <button aria-expanded={open} aria-haspopup="dialog" className="mm-color-picker__trigger" disabled={disabled} onClick={toggle} type="button"><span className="mm-color-picker__trigger-swatch" style={{ background: formatColor(color, 'rgba', 'decimal') }} /><span>{inputValue}</span><CaretDown aria-hidden="true" className={cx('mm-color-picker__chevron', open && 'mm-color-picker__chevron--open')} size={16} /></button>
    {open && (portal && typeof document !== 'undefined' ? createPortal(popover, document.body) : popover)}
  </div>;
}
