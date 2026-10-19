import { Check, Crop, File as FileIcon, FileImage, FlipHorizontal, FlipVertical, SpinnerGap, ArrowCounterClockwise, ArrowClockwise, Trash, CloudArrowUp, X, MagnifyingGlassPlus, MagnifyingGlassMinus } from '../../icons';
import { useEffect, useRef, useState, type DragEvent, type ReactNode } from 'react';
import type * as React from 'react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { useConfig } from '../ConfigProvider';
import { Dialog } from '../Dialog';
import { Input } from '../Input';
import { InputNumber } from '../InputNumber';
import { ColorPicker } from '../ColorPicker';
import { Radio, RadioGroup } from '../Radio';
import { Select } from '../Select';
import { Slider } from '../Slider';
import { Tooltip } from '../Tooltip';
import './FileUpload.css';

export type FileUploadStatus = 'queued' | 'uploading' | 'success' | 'error';
export type FileUploadVariant = 'dropzone' | 'compact' | 'button';
export type FileUploadPreview = 'auto' | 'image' | 'none';
export type FileUploadCropAspect = 'free' | '1:1' | '3:4' | '4:3' | '16:9' | '9:16' | '4:5' | '5:4';
export type FileUploadCropShape = 'rectangle' | 'circle';
export type FileUploadSizePreset = { height: number; label?: string; value: string; width: number };
export type FileUploadOutputFormat = 'original' | 'png' | 'jpeg' | 'webp';
export type FileUploadEditorControl = 'aspectRatio' | 'background' | 'brightness' | 'contrast' | 'cropSize' | 'exposure' | 'flipX' | 'flipY' | 'format' | 'grayscale' | 'height' | 'hue' | 'invert' | 'pixelate' | 'posterize' | 'preset' | 'quality' | 'redEye' | 'removeBackground' | 'rotate' | 'saturation' | 'sepia' | 'sharpness' | 'text' | 'textColor' | 'textOpacity' | 'textPosition' | 'textSize' | 'temperature' | 'tint' | 'vibrance' | 'vignette' | 'watermark' | 'watermarkOpacity' | 'watermarkPosition' | 'watermarkSize' | 'width' | 'zoom' | 'blur' | 'noiseReduction';
export type FileUploadUploadResult = { id?: string; metadata?: Record<string, unknown>; name?: string; url?: string } | void;
export type FileUploadFile = { error?: string; file: File; id: string; metadata?: Record<string, unknown>; preview?: string; progress: number; serverId?: string; serverName?: string; status: FileUploadStatus; url?: string };
export type FileUploadLocale = Partial<{ browse: string; cancel: string; cancelUpload: string; edit: string; remove: string; retry: string; saveCrop: string; uploading: string }>;
export type FileUploadActions = { cancelUpload: () => void; edit: () => void; remove: () => void; retry: () => void; upload: () => void };
export type FileUploadEditorActionContext = { cancel: () => void; close: () => void; file: FileUploadFile; save: () => void };
export type FileUploadEditorAction = { 'aria-label'?: string; disabled?: boolean; icon?: ReactNode; key?: string; label: ReactNode; loading?: boolean; loadingLabel?: string; onClick: (context: FileUploadEditorActionContext) => void; size?: 'xs' | 'sm' | 'default'; type?: 'button' | 'submit' | 'reset'; variant?: 'primary' | 'secondary' | 'light' | 'outline' | 'dashed' | 'text' | 'link' | 'danger' | 'success' };
export type FileUploadProps = {
  accept?: string;
  'aria-label'?: string;
  autoUpload?: boolean;
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
  className?: string;
  concurrency?: number;
  cropAspect?: FileUploadCropAspect;
  cropEnabled?: boolean;
  cropShape?: FileUploadCropShape;
  defaultValue?: FileUploadFile[];
  disabled?: boolean;
  editOnSelect?: boolean;
  editorAspectRatios?: FileUploadCropAspect[];
  editorActions?: FileUploadEditorAction[];
  editorControls?: FileUploadEditorControl[];
  editorDescription?: ReactNode;
  editorSizePresets?: FileUploadSizePreset[];
  editorTitle?: ReactNode;
  dropzone?: boolean;
  locale?: FileUploadLocale;
  maxFiles?: number;
  maxSize?: number;
  multiple?: boolean;
  onCancelUpload?: (file: FileUploadFile) => void;
  onChange?: (files: FileUploadFile[]) => void;
  onEditCancel?: (file: FileUploadFile) => void;
  onEditSave?: (original: FileUploadFile, edited: File) => void;
  onEditStart?: (file: FileUploadFile) => void;
  onError?: (error: string, file?: File) => void;
  onUpload?: (file: FileUploadFile) => void;
  outputFormat?: FileUploadOutputFormat;
  preview?: FileUploadPreview;
  quality?: number;
  renderFile?: (file: FileUploadFile, actions: FileUploadActions) => ReactNode;
  retryCount?: number;
  retryDelay?: number;
  upload?: (file: File, signal: AbortSignal, onProgress: (progress: number) => void) => Promise<FileUploadUploadResult>;
  value?: FileUploadFile[];
  variant?: FileUploadVariant;
};

type CropState = { aspect: FileUploadCropAspect; flipX: boolean; flipY: boolean; freeHeight?: number; freeWidth?: number; rotation: number; scale: number; x: number; y: number };
type CropHandle = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';
const cropHandles: CropHandle[] = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
type EditorAdjustments = { blur: number; brightness: number; contrast: number; grayscale: number; saturation: number; sepia: number };
const defaultLocale: Required<FileUploadLocale> = { browse: 'Drop files here or browse', cancel: 'Cancel', cancelUpload: 'Cancel upload', edit: 'Edit', remove: 'Remove', retry: 'Retry', saveCrop: 'Save cropped image', uploading: 'Uploading' };
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const aspectValue = (aspect: FileUploadCropAspect) => aspect === 'free' ? undefined : Number(aspect.split(':')[0]) / Number(aspect.split(':')[1]);
const aspectIconStyle = (ratio?: string) => { if (!ratio) return undefined; const [width, height] = ratio.split('/').map(Number); const scale = Math.min(24 / width, 18 / height); return { height: height * scale, width: width * scale }; };
const isImage = (file: File) => file.type.startsWith('image/');
const formatSize = (bytes: number) => bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
const makeId = (file: File) => `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`;
const createPreview = (file: File) => isImage(file) ? URL.createObjectURL(file) : undefined;
const allEditorControls: FileUploadEditorControl[] = ['aspectRatio', 'background', 'brightness', 'contrast', 'cropSize', 'exposure', 'flipX', 'flipY', 'format', 'grayscale', 'height', 'hue', 'invert', 'pixelate', 'posterize', 'preset', 'quality', 'redEye', 'removeBackground', 'rotate', 'saturation', 'sepia', 'sharpness', 'text', 'textColor', 'textOpacity', 'textPosition', 'textSize', 'temperature', 'tint', 'vibrance', 'vignette', 'watermark', 'watermarkOpacity', 'watermarkPosition', 'watermarkSize', 'width', 'zoom', 'blur', 'noiseReduction'];

type AdvancedAdjustments = EditorAdjustments & { exposure: number; hue: number; noiseReduction: number; pixelate: number; posterize: number; sharpness: number; temperature: number; tint: number; vibrance: number; vignette: number };
const defaultAdvancedAdjustments: AdvancedAdjustments = { blur: 0, brightness: 100, contrast: 100, exposure: 0, grayscale: 0, hue: 0, noiseReduction: 0, pixelate: 0, posterize: 0, saturation: 100, sepia: 0, sharpness: 0, temperature: 0, tint: 0, vibrance: 0, vignette: 0 };

function ImageEditor({ aspect, aspectRatios, controls, editorActions, editorDescription, editorTitle, entry, labels, onCancel, onSave, outputFormat, quality, shape, sizePresets }: { aspect: FileUploadCropAspect; aspectRatios: FileUploadCropAspect[]; controls: FileUploadEditorControl[]; editorActions?: FileUploadEditorAction[]; editorDescription?: ReactNode; editorTitle?: ReactNode; entry: FileUploadFile; labels: Required<FileUploadLocale>; onCancel: () => void; onSave: (file: File) => void; outputFormat: FileUploadOutputFormat; quality: number; shape: FileUploadCropShape; sizePresets: FileUploadSizePreset[] }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [editorPreview] = useState(() => entry.preview ?? createPreview(entry.file));
  const initialRatio = aspectValue(aspect);
  const initialMaxScale = initialRatio ? Math.min(.9, .9 * initialRatio) : .72;
  const [crop, setCrop] = useState<CropState>({ aspect, flipX: false, flipY: false, freeHeight: Math.min(.72, initialMaxScale), freeWidth: Math.min(.72, initialMaxScale), rotation: 0, scale: Math.min(.72, initialMaxScale), x: .14, y: .14 });
  const [imageZoom, setImageZoom] = useState(1);
  const [natural, setNatural] = useState({ height: 1, width: 1 });
  const [adjustments, setAdjustments] = useState<AdvancedAdjustments>(defaultAdvancedAdjustments);
  const [overlayText, setOverlayText] = useState('');
  const [watermark, setWatermark] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [textSize, setTextSize] = useState(28);
  const [textOpacity, setTextOpacity] = useState(100);
  const [textPosition, setTextPosition] = useState('bottom-left');
  const [watermarkSize, setWatermarkSize] = useState(18);
  const [watermarkOpacity, setWatermarkOpacity] = useState(55);
  const [watermarkPosition, setWatermarkPosition] = useState('top-left');
  const [outputSize, setOutputSize] = useState({ height: sizePresets[0]?.height ?? 0, width: sizePresets[0]?.width ?? 0 });
  const [exportFormat, setExportFormat] = useState<FileUploadOutputFormat>(outputFormat);
  const [exportQuality, setExportQuality] = useState(Math.round(quality * 100));
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [selectedSizePreset, setSelectedSizePreset] = useState(sizePresets[0]?.value ?? '');
  const backgroundColorBeforePicker = useRef(backgroundColor);
  const [invertColors, setInvertColors] = useState(false);
  const [preset, setPreset] = useState('original');
  const [removeBackground, setRemoveBackground] = useState(false);
  const [redEye, setRedEye] = useState(false);
  const imageRatio = natural.width / Math.max(1, natural.height);
  const activeSizePreset = sizePresets.find((preset) => preset.value === selectedSizePreset);
  const presetSizesLocked = Boolean(activeSizePreset);
  const ratio = activeSizePreset ? activeSizePreset.width / activeSizePreset.height : aspectValue(crop.aspect);
  const maxScale = ratio ? Math.min(1, ratio / Math.max(imageRatio, .01)) : 1;
  const cropSizeValue = maxScale > 0 ? crop.scale / maxScale : 0;
  const cropWidth = ratio ? crop.scale : (crop.freeWidth ?? crop.scale);
  const cropHeight = ratio ? cropWidth * imageRatio / ratio : (crop.freeHeight ?? crop.scale);
  const maxX = Math.max(0, 1 - cropWidth);
  const maxY = Math.max(0, 1 - cropHeight);
  useEffect(() => () => { if (!entry.preview && editorPreview) URL.revokeObjectURL(editorPreview); }, [editorPreview, entry.preview]);
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const stage = document.querySelector<HTMLElement>('.mm-file-upload__editor-stage');
    if (!stage) return;
    stage.style.backgroundColor = backgroundColor === 'transparent' ? '#101718' : backgroundColor;
    return () => { stage.style.backgroundColor = ''; };
  }, [backgroundColor]);
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const overlays: HTMLElement[] = [];
    const addOverlay = (value: string, size: number, opacity: number, color: string, position: string) => {
      if (!value) return;
      const overlay = document.createElement('span');
      overlay.className = 'mm-file-upload__editor-live-overlay';
      overlay.textContent = value;
      overlay.style.color = color;
      overlay.style.fontSize = `${Math.max(10, size)}px`;
      overlay.style.opacity = `${opacity / 100}`;
      overlay.style[position.startsWith('top') ? 'top' : 'bottom'] = '24px';
      overlay.style[position.endsWith('right') ? 'right' : 'left'] = '24px';
      frame.appendChild(overlay);
      overlays.push(overlay);
    };
    addOverlay(overlayText, textSize, textOpacity, textColor, textPosition);
    addOverlay(watermark, watermarkSize, watermarkOpacity, '#ffffff', watermarkPosition);
    return () => { overlays.forEach((overlay) => overlay.remove()); };
  }, [overlayText, textColor, textOpacity, textPosition, textSize, watermark, watermarkOpacity, watermarkPosition, watermarkSize]);
  const moveCrop = (event: React.PointerEvent<HTMLDivElement>) => {
    const frame = frameRef.current;
    if (!frame) return;
    const startX = event.clientX;
    const startY = event.clientY;
    const initialX = crop.x;
    const initialY = crop.y;
    frame.setPointerCapture(event.pointerId);
    const move = (moveEvent: PointerEvent) => { const rect = frame.parentElement?.getBoundingClientRect(); if (!rect) return; setCrop((current) => ({ ...current, x: Math.min(maxX, Math.max(0, initialX + (moveEvent.clientX - startX) / rect.width)), y: Math.min(maxY, Math.max(0, initialY + (moveEvent.clientY - startY) / rect.height)) })); };
    const end = () => { frame.releasePointerCapture(event.pointerId); frame.removeEventListener('pointermove', move); frame.removeEventListener('pointerup', end); };
    frame.addEventListener('pointermove', move);
    frame.addEventListener('pointerup', end);
  };
  const resizeCrop = (event: React.PointerEvent<HTMLSpanElement>, handle: CropHandle) => {
    if (presetSizesLocked) return;
    event.preventDefault();
    event.stopPropagation();
    const frame = frameRef.current;
    const parent = frame?.parentElement;
    if (!frame || !parent) return;
    const rect = parent.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = cropWidth;
    const startHeight = cropHeight;
    const startLeft = crop.x;
    const startTop = crop.y;
    const fixedHeightPerWidth = ratio ? startHeight / Math.max(.01, startWidth) : undefined;
    frame.setPointerCapture(event.pointerId);
    const resize = (moveEvent: PointerEvent) => {
      const dx = (moveEvent.clientX - startX) / rect.width;
      const dy = (moveEvent.clientY - startY) / rect.height;
      const horizontal = handle.includes('e') || handle.includes('w');
      const vertical = handle.includes('n') || handle.includes('s');
      const horizontalDelta = handle.includes('w') ? -dx : dx;
      const verticalDelta = handle.includes('n') ? -dy : dy;
      let nextWidth = startWidth + (horizontal ? horizontalDelta : 0);
      let nextHeight = startHeight + (vertical ? verticalDelta : 0);
      if (ratio && fixedHeightPerWidth) {
        const widthFromHeight = nextHeight / fixedHeightPerWidth;
        nextWidth = horizontal && vertical ? (Math.abs(dx) >= Math.abs(dy) ? nextWidth : widthFromHeight) : horizontal ? nextWidth : widthFromHeight;
        nextHeight = nextWidth * fixedHeightPerWidth;
      }
      nextWidth = Math.max(.1, Math.min(nextWidth, handle.includes('w') ? startLeft + startWidth : 1 - startLeft));
      nextHeight = Math.max(.1, Math.min(nextHeight, handle.includes('n') ? startTop + startHeight : 1 - startTop));
      if (ratio && fixedHeightPerWidth) {
        const constrainedWidth = Math.min(nextWidth, nextHeight / fixedHeightPerWidth);
        nextWidth = Math.max(.1, constrainedWidth);
        nextHeight = nextWidth * fixedHeightPerWidth;
      }
      const nextLeft = handle.includes('w') ? startLeft + startWidth - nextWidth : startLeft;
      const nextTop = handle.includes('n') ? startTop + startHeight - nextHeight : startTop;
      setCrop((current) => ({ ...current, freeHeight: nextHeight, freeWidth: nextWidth, scale: nextWidth, x: Math.max(0, Math.min(1 - nextWidth, nextLeft)), y: Math.max(0, Math.min(1 - nextHeight, nextTop)) }));
      setOutputSize({ height: Math.max(1, Math.round(nextHeight * natural.height)), width: Math.max(1, Math.round(nextWidth * natural.width)) });
    };
    const end = () => { frame.releasePointerCapture(event.pointerId); frame.removeEventListener('pointermove', resize); frame.removeEventListener('pointerup', end); };
    frame.addEventListener('pointermove', resize);
    frame.addEventListener('pointerup', end);
  };
  const filter = `brightness(${Math.max(0, adjustments.brightness + adjustments.exposure)}%) contrast(${adjustments.contrast}%) saturate(${Math.max(0, adjustments.saturation + adjustments.vibrance)}%) hue-rotate(${adjustments.hue + adjustments.tint + adjustments.temperature / 2}deg) sepia(${adjustments.sepia}%) grayscale(${adjustments.grayscale}%) invert(${invertColors ? 100 : 0}%) blur(${adjustments.blur}px)`;
  const applyPreset = (value: string) => {
    const presets: Record<string, Partial<AdvancedAdjustments>> = {
      bw: { brightness: 105, contrast: 110, grayscale: 100, saturation: 0 }, cool: { temperature: -18, tint: 4 }, dramatic: { brightness: 96, contrast: 135, saturation: 115, vignette: 32 }, vintage: { brightness: 104, contrast: 92, sepia: 38, saturation: 82, vignette: 22 }, warm: { temperature: 18, tint: -3, saturation: 112 }, original: { blur: 0, brightness: 100, contrast: 100, exposure: 0, grayscale: 0, hue: 0, noiseReduction: 0, pixelate: 0, posterize: 0, saturation: 100, sepia: 0, sharpness: 0, temperature: 0, tint: 0, vibrance: 0, vignette: 0 }, };
    setAdjustments((current) => ({ ...current, ...(presets[value] ?? {}) }));
  };
  const save = () => {
    const image = imageRef.current;
    if (!image) return;
    const sourceWidth = natural.width;
    const sourceHeight = natural.height;
    const sx = Math.round(crop.x * sourceWidth);
    const sy = Math.round(crop.y * sourceHeight);
    const sw = Math.max(1, Math.round(cropWidth * sourceWidth));
    const sh = Math.max(1, Math.round(cropHeight * sourceHeight));
    const canvas = document.createElement('canvas');
    const targetWidth = outputSize.width > 0 ? outputSize.width : sw;
    const targetHeight = outputSize.height > 0 ? outputSize.height : sh;
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const context = canvas.getContext('2d');
    if (!context) return;
    if (backgroundColor !== 'transparent') { context.fillStyle = backgroundColor; context.fillRect(0, 0, targetWidth, targetHeight); }
    context.filter = `brightness(${Math.max(0, adjustments.brightness + adjustments.exposure)}%) contrast(${adjustments.contrast}%) saturate(${Math.max(0, adjustments.saturation + adjustments.vibrance)}%) hue-rotate(${adjustments.hue + adjustments.tint + adjustments.temperature / 2}deg) sepia(${adjustments.sepia}%) grayscale(${adjustments.grayscale}%) invert(${invertColors ? 100 : 0}%) blur(${adjustments.blur}px)`;
    context.translate(targetWidth / 2, targetHeight / 2);
    context.rotate((crop.rotation * Math.PI) / 180);
    context.scale(crop.flipX ? -1 : 1, crop.flipY ? -1 : 1);
    context.drawImage(image, sx, sy, sw, sh, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.filter = 'none';
    const pixels = context.getImageData(0, 0, targetWidth, targetHeight);
    const data = pixels.data;
    const corner = [data[0], data[1], data[2]];
    for (let index = 0; index < data.length; index += 4) {
      let red = data[index]; let green = data[index + 1]; let blue = data[index + 2];
      if (removeBackground && Math.abs(red - corner[0]) + Math.abs(green - corner[1]) + Math.abs(blue - corner[2]) < 72) data[index + 3] = 0;
      if (redEye && red > green * 1.35 && red > blue * 1.35 && green < 130) { data[index] = Math.round((green + blue) / 2); }
      if (adjustments.posterize > 0) { const levels = Math.max(2, Math.round(12 - adjustments.posterize / 12)); red = Math.round(red / 255 * (levels - 1)) * 255 / (levels - 1); green = Math.round(green / 255 * (levels - 1)) * 255 / (levels - 1); blue = Math.round(blue / 255 * (levels - 1)) * 255 / (levels - 1); }
      if (adjustments.pixelate > 0) { const block = Math.max(1, Math.round(adjustments.pixelate / 8)); const x = (index / 4) % targetWidth; const y = Math.floor(index / 4 / targetWidth); const source = (Math.floor(y / block) * block * targetWidth + Math.floor(x / block) * block) * 4; red = data[source]; green = data[source + 1]; blue = data[source + 2]; }
      data[index] = red; data[index + 1] = green; data[index + 2] = blue;
    }
    if (adjustments.sharpness > 0 || adjustments.noiseReduction > 0) {
      const source = new Uint8ClampedArray(data);
      const sharpness = adjustments.sharpness / 100;
      const smoothing = adjustments.noiseReduction / 100;
      for (let index = 0; index < data.length; index += 4) {
        const x = (index / 4) % targetWidth;
        const y = Math.floor(index / 4 / targetWidth);
        const left = (y * targetWidth + Math.max(0, x - 1)) * 4;
        const right = (y * targetWidth + Math.min(targetWidth - 1, x + 1)) * 4;
        for (let channel = 0; channel < 3; channel += 1) {
          const average = (source[left + channel] + source[right + channel]) / 2;
          data[index + channel] = Math.max(0, Math.min(255, source[index + channel] * (1 + sharpness) - average * sharpness * .5 + (average - source[index + channel]) * smoothing));
        }
      }
    }
    context.putImageData(pixels, 0, 0);
    if (adjustments.vignette > 0) { const gradient = context.createRadialGradient(targetWidth / 2, targetHeight / 2, Math.min(targetWidth, targetHeight) * .2, targetWidth / 2, targetHeight / 2, Math.max(targetWidth, targetHeight) * .7); gradient.addColorStop(0, 'rgba(0,0,0,0)'); gradient.addColorStop(1, `rgba(0,0,0,${adjustments.vignette / 140})`); context.fillStyle = gradient; context.fillRect(0, 0, targetWidth, targetHeight); }
    const drawLabel = (value: string, size: number, opacity: number, color: string, position: string) => { if (!value) return; context.globalAlpha = opacity / 100; context.fillStyle = color; context.font = `${Math.max(10, size)}px sans-serif`; const metrics = context.measureText(value); const x = position.endsWith('right') ? targetWidth - metrics.width - 24 : 24; const y = position.startsWith('top') ? size + 24 : targetHeight - 24; context.fillText(value, x, y); context.globalAlpha = 1; };
    drawLabel(overlayText, textSize, textOpacity, textColor, textPosition);
    drawLabel(watermark, watermarkSize, watermarkOpacity, '#ffffff', watermarkPosition);
    const sourceType = entry.file.type === 'image/jpeg' || entry.file.type === 'image/webp' ? entry.file.type : 'image/png';
    const mime = exportFormat === 'original' ? sourceType : `image/${exportFormat}`;
    const extension = mime === 'image/jpeg' ? 'jpg' : mime.split('/')[1];
    canvas.toBlob((blob) => { if (blob) onSave(new globalThis.File([blob], `${entry.file.name.replace(/\.[^.]+$/, '')}-edited.${extension}`, { lastModified: Date.now(), type: mime })); }, mime, exportQuality / 100);
  };
  const setAspect = (nextAspect: string) => { if (presetSizesLocked) return; const next = nextAspect as FileUploadCropAspect; const nextRatio = aspectValue(next); setCrop((current) => { const currentWidth = ratio ? current.scale : (current.freeWidth ?? current.scale); const currentHeight = ratio ? cropHeight : (current.freeHeight ?? current.scale); const nextScale = Math.min(currentWidth, nextRatio ? Math.min(1, nextRatio / Math.max(imageRatio, .01)) : 1); const nextHeight = nextRatio ? nextScale * imageRatio / nextRatio : currentHeight; return { ...current, aspect: next, freeHeight: nextHeight, freeWidth: nextScale, scale: nextScale, x: Math.min(Math.max(0, 1 - nextScale), current.x), y: Math.min(Math.max(0, 1 - nextHeight), current.y) }; }); if (nextRatio) setOutputSize((current) => ({ height: Math.max(1, Math.round(current.width / nextRatio)), width: current.width })); };
  const setSizePreset = (value: string) => { const nextPreset = sizePresets.find((preset) => preset.value === value); if (!nextPreset) return; setSelectedSizePreset(value); setOutputSize({ height: nextPreset.height, width: nextPreset.width }); setCrop((current) => { const nextRatio = nextPreset.width / nextPreset.height; const nextScale = Math.min(nextPreset.width / Math.max(1, natural.width), Math.min(1, nextRatio / Math.max(imageRatio, .01))); const nextHeight = nextScale * imageRatio / nextRatio; return { ...current, freeHeight: nextHeight, freeWidth: nextScale, scale: nextScale, x: Math.min(Math.max(0, 1 - nextScale), current.x), y: Math.min(Math.max(0, 1 - nextHeight), current.y) }; }); };
  const updateCropDimension = (dimension: 'height' | 'width', value: number | null | undefined) => {
    if (presetSizesLocked || !value || value <= 0) return;
    const imageWidth = imageRef.current?.naturalWidth || natural.width;
    const imageHeight = imageRef.current?.naturalHeight || natural.height;
    setOutputSize((current) => {
      const nextRatio = aspectValue(crop.aspect);
      const nextWidth = dimension === 'width' ? value : nextRatio ? Math.round(value * nextRatio) : current.width;
      const nextHeight = dimension === 'height' ? value : nextRatio ? Math.round(value / nextRatio) : current.height;
      return { height: nextHeight, width: nextWidth };
    });
    setCrop((current) => {
      const nextRatio = aspectValue(current.aspect);
      const nextWidth = dimension === 'width' ? value : nextRatio ? value * nextRatio : value;
      const nextHeight = dimension === 'height' ? value : nextRatio ? value / nextRatio : value;
      const widthScale = Math.max(.05, Math.min(.95, nextWidth / Math.max(1, imageWidth)));
      const heightScale = Math.max(.05, Math.min(.95, nextHeight / Math.max(1, imageHeight)));
      return { ...current, freeHeight: nextRatio ? heightScale : heightScale, freeWidth: nextRatio ? widthScale : widthScale, scale: widthScale, x: Math.min(Math.max(0, 1 - widthScale), current.x), y: Math.min(Math.max(0, 1 - heightScale), current.y) };
    });
  };
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => { const nextNatural = { height: event.currentTarget.naturalHeight, width: event.currentTarget.naturalWidth }; const nextImageRatio = nextNatural.width / Math.max(1, nextNatural.height); const nextMaxScale = ratio ? Math.min(1, ratio / Math.max(nextImageRatio, .01)) : 1; setNatural(nextNatural); setCrop((current) => { const requestedWidth = activeSizePreset?.width ?? 0; const nextScale = requestedWidth > 0 ? Math.min(requestedWidth / nextNatural.width, nextMaxScale) : Math.min(current.scale, nextMaxScale); const nextWidth = ratio ? nextScale : (current.freeWidth ?? nextScale); const nextHeight = ratio ? nextWidth * nextImageRatio / ratio : (current.freeHeight ?? nextScale); setOutputSize(activeSizePreset ? { height: activeSizePreset.height, width: activeSizePreset.width } : { height: Math.max(1, Math.round(nextHeight * nextNatural.height)), width: Math.max(1, Math.round(nextWidth * nextNatural.width)) }); return { ...current, freeHeight: nextHeight, freeWidth: nextWidth, scale: nextScale, x: Math.min(Math.max(0, 1 - nextWidth), current.x), y: Math.min(Math.max(0, 1 - nextHeight), current.y) }; }); };
  const cropOptions: Array<{ label: string; ratio?: string; value: FileUploadCropAspect }> = [{ label: 'Free', value: 'free' }, { label: '1:1', ratio: '1 / 1', value: '1:1' }, { label: '3:4', ratio: '3 / 4', value: '3:4' }, { label: '4:3', ratio: '4 / 3', value: '4:3' }, { label: '16:9', ratio: '16 / 9', value: '16:9' }, { label: '9:16', ratio: '9 / 16', value: '9:16' }, { label: '4:5', ratio: '4 / 5', value: '4:5' }, { label: '5:4', ratio: '5 / 4', value: '5:4' }]; const visibleCropOptions = cropOptions.filter((option) => aspectRatios.includes(option.value));
  const setAdjustment = (key: keyof AdvancedAdjustments, value: number) => setAdjustments((current) => ({ ...current, [key]: value }));
  const resetColor = () => setAdjustments((current) => ({ ...current, brightness: 100, contrast: 100, exposure: 0, hue: 0, saturation: 100, temperature: 0, tint: 0, vibrance: 0 }));
  const resetEffects = () => setAdjustments((current) => ({ ...current, blur: 0, grayscale: 0, noiseReduction: 0, pixelate: 0, posterize: 0, sepia: 0, sharpness: 0, vignette: 0 }));
  const resetTextAndWatermark = () => { setOverlayText(''); setWatermark(''); setTextColor('#ffffff'); setTextSize(28); setTextOpacity(100); setTextPosition('bottom-left'); setWatermarkSize(18); setWatermarkOpacity(55); setWatermarkPosition('top-left'); };
  const resetExport = () => { setExportFormat(outputFormat); setExportQuality(Math.round(quality * 100)); setOutputSize(activeSizePreset ? { height: activeSizePreset.height, width: activeSizePreset.width } : { height: Math.max(1, Math.round(cropHeight * natural.height)), width: Math.max(1, Math.round(cropWidth * natural.width)) }); };
  const resetAll = () => { resetColor(); resetEffects(); resetTextAndWatermark(); resetExport(); setPreset('original'); setInvertColors(false); setRemoveBackground(false); setRedEye(false); setBackgroundColor('transparent'); setImageZoom(1); setCrop({ aspect, flipX: false, flipY: false, freeHeight: Math.min(.72, maxScale), freeWidth: Math.min(.72, maxScale), rotation: 0, scale: Math.min(.72, maxScale), x: .14, y: .14 }); };
  const renderControl = (name: FileUploadEditorControl, element: ReactNode) => controls.includes(name) ? element : null;
  const customFooter = editorActions && editorActions.length > 0 ? <div className="mm-dialog__footer-layout"><div className="mm-dialog__actions mm-dialog__actions--end">{editorActions.map((action, index) => <Button aria-label={action['aria-label']} disabled={action.disabled} iconLeft={action.icon} key={action.key ?? `editor-action-${index}`} loading={action.loading} loadingLabel={action.loadingLabel} onClick={() => action.onClick({ cancel: onCancel, close: onCancel, file: entry, save })} size={action.size} type={action.type ?? 'button'} variant={action.variant}>{action.label}</Button>)}</div></div> : undefined;
  return <Dialog className="mm-file-upload__editor-dialog" footer={customFooter} modal open onOpenChange={(open) => { if (!open) onCancel(); }} size="lg" title={editorTitle ?? 'Edit image'} description={editorDescription ?? 'Crop, correct colors, apply effects, add overlays, and export the result.'} actions={editorActions === undefined ? { align: 'end', cancel: { label: labels.cancel, onClick: onCancel }, confirm: { label: labels.saveCrop, onClick: save } } : undefined}>
  <div className="mm-file-upload__editor"><div className="mm-file-upload__editor-layout"><div className="mm-file-upload__editor-stage" style={{ backgroundColor: backgroundColor === 'transparent' ? '#101718' : backgroundColor }}><div className="mm-file-upload__editor-image-wrap"><img alt={entry.file.name} ref={imageRef} src={editorPreview} onLoad={handleImageLoad} style={{ filter, transform: `scale(${imageZoom}) rotate(${crop.rotation}deg) scaleX(${crop.flipX ? -1 : 1}) scaleY(${crop.flipY ? -1 : 1})` }} /><div aria-label="Crop selection. Drag to move." className={cx('mm-file-upload__crop-frame', shape === 'circle' && 'mm-file-upload__crop-frame--circle')} onPointerDown={moveCrop} ref={frameRef} style={{ height: `${cropHeight * 100}%`, left: `${crop.x * 100}%`, top: `${crop.y * 100}%`, width: `${cropWidth * 100}%` }}>{!presetSizesLocked && cropHandles.map((handle) => <span aria-hidden="true" className={`mm-file-upload__crop-handle mm-file-upload__crop-handle--${handle}`} key={handle} onPointerDown={(event) => resizeCrop(event, handle)} />)}</div></div></div><aside className="mm-file-upload__editor-panel"><div className="mm-file-upload__editor-controls">{renderControl('aspectRatio', presetSizesLocked ? <Select label="Image size" size="xs" value={selectedSizePreset} options={sizePresets.map((preset) => ({ label: [preset.label, String(preset.width) + " × " + String(preset.height)].filter(Boolean).join(" — "), value: preset.value }))} onChange={(value) => { if (typeof value === "string") setSizePreset(value); }} /> : <RadioGroup label="Aspect ratio" direction="vertical" name="file-upload-aspect" value={crop.aspect} onChange={setAspect}><div className="mm-file-upload__aspect-options">{visibleCropOptions.map((option) => <Radio key={option.value} size="xs" value={option.value} label={<><span aria-hidden="true" className={cx('mm-file-upload__aspect-icon', option.value === 'free' && 'mm-file-upload__aspect-icon--free')} style={aspectIconStyle(option.ratio)} />{option.label}</>} />)}</div></RadioGroup>)}<div className="mm-file-upload__editor-section"><div className="mm-file-upload__editor-section-header"><strong>Color</strong><Button size="xs" variant="light" onClick={resetColor}>Reset</Button></div>{renderControl('preset', <Select label="Preset" size="xs" value={preset} options={[{ label: 'Original', value: 'original' }, { label: 'Black & white', value: 'bw' }, { label: 'Warm', value: 'warm' }, { label: 'Cool', value: 'cool' }, { label: 'Vintage', value: 'vintage' }, { label: 'Dramatic', value: 'dramatic' }]} onChange={(value) => { if (typeof value === 'string') { setPreset(value); applyPreset(value); } }} />)}{renderControl('brightness', <Slider resettable label="Brightness" size="xs" min={40} max={180} value={adjustments.brightness} onChange={(value) => setAdjustment('brightness', value)} />)}{renderControl('exposure', <Slider resettable label="Exposure" size="xs" min={-60} max={60} value={adjustments.exposure} onChange={(value) => setAdjustment('exposure', value)} />)}{renderControl('contrast', <Slider resettable label="Contrast" size="xs" min={40} max={180} value={adjustments.contrast} onChange={(value) => setAdjustment('contrast', value)} />)}{renderControl('saturation', <Slider resettable label="Saturation" size="xs" min={0} max={180} value={adjustments.saturation} onChange={(value) => setAdjustment('saturation', value)} />)}{renderControl('hue', <Slider resettable label="Hue" size="xs" min={-180} max={180} value={adjustments.hue} valueFormatter={(value) => `${value}°`} onChange={(value) => setAdjustment('hue', value)} />)}{renderControl('temperature', <Slider resettable label="Temperature" size="xs" min={-50} max={50} value={adjustments.temperature} onChange={(value) => setAdjustment('temperature', value)} />)}{renderControl('tint', <Slider resettable label="Tint" size="xs" min={-50} max={50} value={adjustments.tint} onChange={(value) => setAdjustment('tint', value)} />)}{renderControl('vibrance', <Slider resettable label="Vibrance" size="xs" min={0} max={80} value={adjustments.vibrance} onChange={(value) => setAdjustment('vibrance', value)} />)}</div><div className="mm-file-upload__editor-section"><div className="mm-file-upload__editor-section-header"><strong>Effects</strong><Button size="xs" variant="light" onClick={resetEffects}>Reset</Button></div>{renderControl('blur', <Slider resettable label="Blur" size="xs" min={0} max={12} value={adjustments.blur} valueFormatter={(value) => `${value}px`} onChange={(value) => setAdjustment('blur', value)} />)}{renderControl('sharpness', <Slider resettable label="Sharpness" size="xs" min={0} max={100} value={adjustments.sharpness} onChange={(value) => setAdjustment('sharpness', value)} />)}{renderControl('noiseReduction', <Slider resettable label="Noise reduction" size="xs" min={0} max={100} value={adjustments.noiseReduction} onChange={(value) => setAdjustment('noiseReduction', value)} />)}{renderControl('grayscale', <Slider resettable label="Grayscale" size="xs" min={0} max={100} value={adjustments.grayscale} onChange={(value) => setAdjustment('grayscale', value)} />)}{renderControl('sepia', <Slider resettable label="Sepia" size="xs" min={0} max={100} value={adjustments.sepia} onChange={(value) => setAdjustment('sepia', value)} />)}{renderControl('vignette', <Slider resettable label="Vignette" size="xs" min={0} max={100} value={adjustments.vignette} onChange={(value) => setAdjustment('vignette', value)} />)}{renderControl('pixelate', <Slider resettable label="Pixelate" size="xs" min={0} max={100} value={adjustments.pixelate} onChange={(value) => setAdjustment('pixelate', value)} />)}{renderControl('posterize', <Slider resettable label="Posterize" size="xs" min={0} max={100} value={adjustments.posterize} onChange={(value) => setAdjustment('posterize', value)} />)}{renderControl('invert', <Checkbox label="Invert colors" size="xs" checked={invertColors} onChange={(event) => setInvertColors(event.target.checked)} />)}{renderControl('removeBackground', <Checkbox label="Remove background" size="xs" checked={removeBackground} onChange={(event) => setRemoveBackground(event.target.checked)} />)}{renderControl('redEye', <Checkbox label="Red-eye correction" size="xs" checked={redEye} onChange={(event) => setRedEye(event.target.checked)} />)}</div><div className="mm-file-upload__editor-section"><div className="mm-file-upload__editor-section-header"><strong>Text and watermark</strong><Button size="xs" variant="light" onClick={resetTextAndWatermark}>Reset</Button></div>{renderControl('text', <Input label="Text" size="xs" placeholder="Add text" value={overlayText} onChange={(event) => setOverlayText(event.target.value)} />)}{renderControl('textColor', <Input label="Text color" size="xs" type="color" value={textColor} onChange={(event) => setTextColor(event.target.value)} />)}{renderControl('textSize', <Slider resettable label="Text size" size="xs" min={10} max={96} value={textSize} onChange={setTextSize} />)}{renderControl('textOpacity', <Slider resettable label="Text opacity" size="xs" min={0} max={100} value={textOpacity} onChange={setTextOpacity} />)}{renderControl('textPosition', <Select label="Text position" size="xs" value={textPosition} options={[{ label: 'Bottom left', value: 'bottom-left' }, { label: 'Bottom right', value: 'bottom-right' }, { label: 'Top left', value: 'top-left' }, { label: 'Top right', value: 'top-right' }]} onChange={(value) => { if (typeof value === 'string') setTextPosition(value); }} />)}{renderControl('watermark', <Input label="Watermark" size="xs" placeholder="Add watermark" value={watermark} onChange={(event) => setWatermark(event.target.value)} />)}{renderControl('watermarkSize', <Slider resettable label="Watermark size" size="xs" min={10} max={72} value={watermarkSize} onChange={setWatermarkSize} />)}{renderControl('watermarkOpacity', <Slider resettable label="Watermark opacity" size="xs" min={0} max={100} value={watermarkOpacity} onChange={setWatermarkOpacity} />)}{renderControl('watermarkPosition', <Select label="Watermark position" size="xs" value={watermarkPosition} options={[{ label: 'Top left', value: 'top-left' }, { label: 'Top right', value: 'top-right' }, { label: 'Bottom left', value: 'bottom-left' }, { label: 'Bottom right', value: 'bottom-right' }]} onChange={(value) => { if (typeof value === 'string') setWatermarkPosition(value); }} />)}</div><div className="mm-file-upload__editor-section"><div className="mm-file-upload__editor-section-header"><strong>Export</strong><Button size="xs" variant="light" onClick={resetExport}>Reset</Button></div>{renderControl('format', <Select label="Format" size="xs" value={exportFormat} options={[{ label: 'Original', value: 'original' }, { label: 'PNG', value: 'png' }, { label: 'JPEG', value: 'jpeg' }, { label: 'WebP', value: 'webp' }]} onChange={(value) => { if (typeof value === 'string') setExportFormat(value as FileUploadOutputFormat); }} />)}<div className="mm-file-upload__editor-size">{renderControl('width', <InputNumber disabled={presetSizesLocked} resettable label="Width" size="xs" min={1} value={outputSize.width || undefined} onChange={(value) => updateCropDimension("width", value)} />)}{renderControl('height', <InputNumber disabled={presetSizesLocked} resettable label="Height" size="xs" min={1} value={outputSize.height || undefined} onChange={(value) => updateCropDimension("height", value)} />)}</div>{renderControl('cropSize', <Slider resettable label="Crop size" disabled={presetSizesLocked} min={.1} max={1} size="xs" step={.01} value={cropSizeValue} valueFormatter={(value) => `${Math.round(value * 100)}%`} onChange={(value) => { const nextScale = value * maxScale; const nextWidth = Math.max(1, Math.round(nextScale * natural.width)); const nextHeight = Math.max(1, Math.round((ratio ? nextWidth / ratio : nextScale * natural.width / Math.max(imageRatio, .01)))); setOutputSize({ width: nextWidth, height: nextHeight }); setCrop((current) => { const factor = nextScale / Math.max(.01, current.scale); return { ...current, freeHeight: ratio ? current.freeHeight : Math.min(1, (current.freeHeight ?? current.scale) * factor), freeWidth: ratio ? current.freeWidth : Math.min(1, (current.freeWidth ?? current.scale) * factor), scale: nextScale }; }); }} />)}{renderControl('quality', <Slider resettable label="Quality" size="xs" min={10} max={100} value={exportQuality} valueFormatter={(value) => `${value}%`} onChange={setExportQuality} />)}{renderControl('background', <ColorPicker label="Background" size="sm" value={backgroundColor} onChange={setBackgroundColor} onCommit={setBackgroundColor} onCancel={() => setBackgroundColor(backgroundColorBeforePicker.current)} onOpenChange={(open) => { if (open) backgroundColorBeforePicker.current = backgroundColor; }} confirmActions allowTransparent showAlpha={false} showSwatches={false} />)}</div><div className="mm-file-upload__editor-buttons">{renderControl('zoom', <Tooltip content="Make the crop area smaller" maxWidth={180} size="sm" placement="top-start"><Button iconLeft={<MagnifyingGlassMinus size={16} />} title="Make the crop area smaller" size="sm" iconOnly variant="light" onClick={() => setImageZoom((current) => Math.max(.5, current - .05))}>Smaller</Button></Tooltip>)}{renderControl('zoom', <Tooltip content="Make the crop area larger" maxWidth={120} size="sm" placement="top-start"><Button iconLeft={<MagnifyingGlassPlus size={16} />} title="Make the crop area larger" size="sm" iconOnly variant="light" onClick={() => setImageZoom((current) => Math.min(3, current + .05))}>Larger</Button></Tooltip>)}{renderControl('rotate', <Tooltip content="Rotate the image 90 degrees counterclockwise" maxWidth={120} size="sm" placement="top-start"><Button aria-label="Rotate left" title="Rotate the image 90 degrees counterclockwise" iconLeft={<ArrowCounterClockwise size={16} />} size="sm" iconOnly variant="light" onClick={() => setCrop((current) => ({ ...current, rotation: current.rotation - 90 }))}>Rotate left</Button></Tooltip>)}{renderControl('rotate', <Tooltip content="Rotate the image 90 degrees clockwise" maxWidth={120} size="sm" placement="top-end"><Button aria-label="Rotate right" title="Rotate the image 90 degrees clockwise" iconLeft={<ArrowClockwise size={16} />} size="sm" iconOnly variant="light" onClick={() => setCrop((current) => ({ ...current, rotation: current.rotation + 90 }))}>Rotate right</Button></Tooltip>)}{renderControl('flipX', <Tooltip content="Flip the image horizontally from left to right" maxWidth={120} size="sm" placement="top-end"><Button className="mm-file-upload__flip-button" title="Flip the image horizontally from left to right" iconLeft={<FlipHorizontal size={16} />} iconOnly size="sm" variant="light" onClick={() => setCrop((current) => ({ ...current, flipX: !current.flipX }))}>Flip X</Button></Tooltip>)}{renderControl('flipY', <Tooltip content="Flip the image vertically from top to bottom" maxWidth={180} size="sm" placement="top-end"><Button className="mm-file-upload__flip-button" title="Flip the image vertically from top to bottom" iconLeft={<FlipVertical size={16} />} iconOnly size="sm" variant="light" onClick={() => setCrop((current) => ({ ...current, flipY: !current.flipY }))}>Flip Y</Button></Tooltip>)}<Tooltip content="Reset all editor settings to their initial values" maxWidth={200} size="sm" placement="top-end"><Button className="mm-file-upload__reset-all" title="Reset all editor settings to their initial values" size="sm" variant="outline" onClick={resetAll}>Reset all</Button></Tooltip></div></div></aside></div></div></Dialog>;
}

function LegacyImageEditor({ entry, aspect, labels, onCancel, onSave, outputFormat, quality, shape }: { aspect: FileUploadCropAspect; entry: FileUploadFile; labels: Required<FileUploadLocale>; onCancel: () => void; onSave: (file: File) => void; outputFormat: FileUploadOutputFormat; quality: number; shape: FileUploadCropShape }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [editorPreview] = useState(() => entry.preview ?? createPreview(entry.file));
  const initialRatio = aspectValue(aspect);
  const initialMaxScale = initialRatio ? Math.min(.9, .9 * initialRatio) : .72;
  const [crop, setCrop] = useState<CropState>({ aspect, flipX: false, flipY: false, rotation: 0, scale: Math.min(.72, initialMaxScale), x: .14, y: .14 });
  const [imageZoom, setImageZoom] = useState(1);
  const [natural, setNatural] = useState({ height: 1, width: 1 });
  const [adjustments, setAdjustments] = useState<EditorAdjustments>({ blur: 0, brightness: 100, contrast: 100, grayscale: 0, saturation: 100, sepia: 0 });
  const [overlayText, setOverlayText] = useState('');
  const [watermark, setWatermark] = useState('');
  const [outputSize, setOutputSize] = useState({ height: 0, width: 0 });
  const [exportFormat, setExportFormat] = useState<FileUploadOutputFormat>(outputFormat);
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  useEffect(() => () => { if (!entry.preview && editorPreview) URL.revokeObjectURL(editorPreview); }, [editorPreview, entry.preview]);
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>('.mm-file-upload__editor-stage');
    if (!stage) return;
    stage.style.backgroundColor = backgroundColor === 'transparent' ? '#101718' : backgroundColor;
    return () => { stage.style.backgroundColor = ''; };
  }, [backgroundColor]);
  const ratio = aspectValue(crop.aspect);
  const maxScale = ratio ? Math.min(.9, .9 * ratio) : .9;
  const cropWidth = crop.scale;
  const cropHeight = ratio ? cropWidth / ratio : crop.scale;
  const maxX = Math.max(0, 1 - cropWidth);
  const maxY = Math.max(0, 1 - cropHeight);
  const moveCrop = (event: React.PointerEvent<HTMLDivElement>) => {
    const frame = frameRef.current;
    if (!frame) return;
    const startX = event.clientX;
    const startY = event.clientY;
    const initialX = crop.x;
    const initialY = crop.y;
    frame.setPointerCapture(event.pointerId);
    const move = (moveEvent: PointerEvent) => { const rect = frame.parentElement?.getBoundingClientRect(); if (!rect) return; setCrop((current) => ({ ...current, x: Math.min(maxX, Math.max(0, initialX + (moveEvent.clientX - startX) / rect.width)), y: Math.min(maxY, Math.max(0, initialY + (moveEvent.clientY - startY) / rect.height)) })); };
    const end = () => { frame.releasePointerCapture(event.pointerId); frame.removeEventListener('pointermove', move); frame.removeEventListener('pointerup', end); };
    frame.addEventListener('pointermove', move);
    frame.addEventListener('pointerup', end);
  };
  const filter = `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturation}%) grayscale(${adjustments.grayscale}%) sepia(${adjustments.sepia}%) blur(${adjustments.blur}px)`;
  const save = () => {
    const image = imageRef.current;
    if (!image) return;
    const sourceWidth = natural.width;
    const sourceHeight = natural.height;
    const sx = Math.round(crop.x * sourceWidth);
    const sy = Math.round(crop.y * sourceHeight);
    const sw = Math.max(1, Math.round(cropWidth * sourceWidth));
    const sh = Math.max(1, Math.round(cropHeight * sourceHeight));
    const canvas = document.createElement('canvas');
    const targetWidth = outputSize.width > 0 ? outputSize.width : sw;
    const targetHeight = outputSize.height > 0 ? outputSize.height : sh;
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const context = canvas.getContext('2d');
    if (!context) return;
    if (backgroundColor !== 'transparent') { context.fillStyle = backgroundColor; context.fillRect(0, 0, targetWidth, targetHeight); }
    context.filter = filter;
    context.translate(targetWidth / 2, targetHeight / 2);
    context.rotate((crop.rotation * Math.PI) / 180);
    context.scale(crop.flipX ? -1 : 1, crop.flipY ? -1 : 1);
    context.drawImage(image, sx, sy, sw, sh, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);
    context.filter = 'none';
    if (overlayText || watermark) {
      context.fillStyle = 'rgba(255, 255, 255, .92)';
      context.shadowColor = 'rgba(0, 0, 0, .55)';
      context.shadowBlur = 4;
      context.font = `${Math.max(14, Math.round(targetWidth / 28))}px sans-serif`;
      if (overlayText) context.fillText(overlayText, -targetWidth / 2 + 24, targetHeight / 2 - 28);
      if (watermark) { context.globalAlpha = .55; context.fillText(watermark, -targetWidth / 2 + 24, -targetHeight / 2 + 32); context.globalAlpha = 1; }
    }
    const sourceType = entry.file.type === 'image/jpeg' || entry.file.type === 'image/webp' ? entry.file.type : 'image/png';
    const mime = exportFormat === 'original' ? sourceType : `image/${exportFormat}`;
    const extension = mime === 'image/jpeg' ? 'jpg' : mime.split('/')[1];
    canvas.toBlob((blob) => { if (blob) onSave(new globalThis.File([blob], `${entry.file.name.replace(/\.[^.]+$/, '')}-cropped.${extension}`, { lastModified: Date.now(), type: mime })); }, mime, quality);
  };
  const cropOptions: Array<{ label: string; ratio?: string; value: FileUploadCropAspect }> = [{ label: 'Free', value: 'free' }, { label: '1:1', ratio: '1 / 1', value: '1:1' }, { label: '3:4', ratio: '3 / 4', value: '3:4' }, { label: '4:3', ratio: '4 / 3', value: '4:3' }, { label: '16:9', ratio: '16 / 9', value: '16:9' }, { label: '9:16', ratio: '9 / 16', value: '9:16' }, { label: '4:5', ratio: '4 / 5', value: '4:5' }, { label: '5:4', ratio: '5 / 4', value: '5:4' }];
  const setAspect = (nextAspect: string) => setCrop((current) => { const next = nextAspect as FileUploadCropAspect; const nextRatio = aspectValue(next); const nextScale = Math.min(current.scale, nextRatio ? Math.min(.9, .9 * nextRatio) : .9); return { ...current, aspect: next, scale: nextScale, x: Math.min(Math.max(0, 1 - nextScale), current.x), y: Math.min(Math.max(0, 1 - (nextRatio ? nextScale / nextRatio : nextScale)), current.y) }; });
  return <Dialog className="mm-file-upload__editor-dialog" modal open onOpenChange={(open) => { if (!open) onCancel(); }} size="lg" title="Edit image" description="Choose a crop ratio, adjust the crop size, then move, rotate, flip, or save the result." actions={{ align: 'end', cancel: { label: labels.cancel, onClick: onCancel }, confirm: { label: labels.saveCrop, onClick: save } }}><div className="mm-file-upload__editor"><div className="mm-file-upload__editor-layout"><div className="mm-file-upload__editor-stage"><div className="mm-file-upload__editor-image-wrap"><img alt={entry.file.name} ref={imageRef} src={editorPreview} onLoad={(event) => { setNatural({ height: event.currentTarget.naturalHeight, width: event.currentTarget.naturalWidth }); setOutputSize({ height: event.currentTarget.naturalHeight, width: event.currentTarget.naturalWidth }); }} style={{ filter, transform: `scale(${imageZoom}) rotate(${crop.rotation}deg) scaleX(${crop.flipX ? -1 : 1}) scaleY(${crop.flipY ? -1 : 1})` }} /><div aria-label="Crop selection. Drag to move." className={cx('mm-file-upload__crop-frame', shape === 'circle' && 'mm-file-upload__crop-frame--circle')} onPointerDown={moveCrop} ref={frameRef} style={{ height: `${cropHeight * 100}%`, left: `${crop.x * 100}%`, top: `${crop.y * 100}%`, width: `${cropWidth * 100}%` }}><span /></div></div></div><aside className="mm-file-upload__editor-panel"><div className="mm-file-upload__editor-controls"><RadioGroup label="Aspect ratio" direction="vertical" name="file-upload-aspect" value={crop.aspect} onChange={setAspect}><div className="mm-file-upload__aspect-options">{cropOptions.map((option) => <Radio key={option.value} size="xs" value={option.value} label={<><span aria-hidden="true" className={cx('mm-file-upload__aspect-icon', option.value === 'free' && 'mm-file-upload__aspect-icon--free')} style={aspectIconStyle(option.ratio)} />{option.label}</>} />)}</div></RadioGroup><Slider resettable label="Crop size" min={.1} max={maxScale} size="sm" step={.01} value={crop.scale} valueFormatter={(value) => `${Math.round(value * 100)}%`} onChange={(value) => setCrop((current) => ({ ...current, scale: value, x: Math.min(Math.max(0, 1 - value), current.x), y: Math.min(Math.max(0, 1 - (ratio ? value / ratio : value)), current.y) }))} /><div className="mm-file-upload__editor-section"><strong>Adjustments</strong><Slider resettable label="Brightness" min={40} max={180} size="xs" value={adjustments.brightness} onChange={(value) => setAdjustments((current) => ({ ...current, brightness: value }))} /><Slider resettable label="Contrast" min={40} max={180} size="xs" value={adjustments.contrast} onChange={(value) => setAdjustments((current) => ({ ...current, contrast: value }))} /><Slider resettable label="Saturation" min={0} max={180} size="xs" value={adjustments.saturation} onChange={(value) => setAdjustments((current) => ({ ...current, saturation: value }))} /><Slider resettable label="Blur" min={0} max={12} size="xs" value={adjustments.blur} valueFormatter={(value) => `${value}px`} onChange={(value) => setAdjustments((current) => ({ ...current, blur: value }))} /><Slider resettable label="Grayscale" min={0} max={100} size="xs" value={adjustments.grayscale} valueFormatter={(value) => `${value}%`} onChange={(value) => setAdjustments((current) => ({ ...current, grayscale: value }))} /><Slider resettable label="Sepia" min={0} max={100} size="xs" value={adjustments.sepia} valueFormatter={(value) => `${value}%`} onChange={(value) => setAdjustments((current) => ({ ...current, sepia: value }))} /></div><div className="mm-file-upload__editor-section"><strong>Export</strong><Select label="Format" size="xs" value={exportFormat} onChange={(value) => { if (typeof value === "string") setExportFormat(value as FileUploadOutputFormat); }} options={[{ label: "Original", value: "original" }, { label: "PNG", value: "png" }, { label: "JPEG", value: "jpeg" }, { label: "WebP", value: "webp" }]} /><div className="mm-file-upload__editor-size"><InputNumber resettable label="Width" size="xs" min={1} value={outputSize.width || undefined} onChange={(value) => setOutputSize((current) => ({ ...current, width: value ?? 0 }))} /><InputNumber resettable label="Height" size="xs" min={1} value={outputSize.height || undefined} onChange={(value) => setOutputSize((current) => ({ ...current, height: value ?? 0 }))} /></div><Input label="Text" size="xs" placeholder="Add text" value={overlayText} onChange={(event) => setOverlayText(event.target.value)} /><Input label="Background" size="xs" type="color" value={backgroundColor === "transparent" ? "#ffffff" : backgroundColor} onChange={(event) => setBackgroundColor(event.target.value)} /><Input label="Watermark" size="xs" placeholder="Add watermark" value={watermark} onChange={(event) => setWatermark(event.target.value)} /></div><div className="mm-file-upload__editor-buttons"><Tooltip content="Make the crop area smaller" maxWidth={180} size="sm" placement="top-start"><Button iconLeft={<MagnifyingGlassMinus size={16} />} title="Make the crop area smaller" size="sm" iconOnly variant="light" onClick={() => setImageZoom((current) => Math.max(.5, current - .05))}>Smaller</Button></Tooltip><Tooltip content="Make the crop area larger" maxWidth={120} size="sm" placement="top-start"><Button iconLeft={<MagnifyingGlassPlus size={16} />} title="Make the crop area larger" size="sm" iconOnly variant="light" onClick={() => setImageZoom((current) => Math.min(3, current + .05))}>Larger</Button></Tooltip><Tooltip content="Rotate the image 90 degrees counterclockwise" maxWidth={120} size="sm" placement="top-start"><Button aria-label="Rotate left" title="Rotate the image 90 degrees counterclockwise" iconLeft={<ArrowCounterClockwise size={16} />} size="sm" iconOnly variant="light" onClick={() => setCrop((current) => ({ ...current, rotation: current.rotation - 90 }))}>Rotate left</Button></Tooltip><Tooltip content="Rotate the image 90 degrees clockwise" maxWidth={120} size="sm" placement="top-end"><Button aria-label="Rotate right" title="Rotate the image 90 degrees clockwise" iconLeft={<ArrowClockwise size={16} />} size="sm" iconOnly variant="light" onClick={() => setCrop((current) => ({ ...current, rotation: current.rotation + 90 }))}>Rotate right</Button></Tooltip><Tooltip content="Flip the image horizontally from left to right" maxWidth={120} size="sm" placement="top-end"><Button className="mm-file-upload__flip-button" title="Flip the image horizontally from left to right" iconLeft={<FlipHorizontal size={16} />} iconOnly size="sm" variant="light" onClick={() => setCrop((current) => ({ ...current, flipX: !current.flipX }))}>Flip X</Button></Tooltip><Tooltip content="Flip the image vertically from top to bottom" maxWidth={180} size="sm" placement="top-end"><Button className="mm-file-upload__flip-button" title="Flip the image vertically from top to bottom" iconLeft={<FlipVertical size={16} />} iconOnly size="sm" variant="light" onClick={() => setCrop((current) => ({ ...current, flipY: !current.flipY }))}>Flip Y</Button></Tooltip></div></div></aside></div></div></Dialog>;
}

export function FileUpload({ accept, 'aria-label': ariaLabel = 'File upload', autoUpload = false, beforeUpload, className, concurrency = Infinity, cropAspect = 'free', cropEnabled = true, cropShape = 'rectangle', defaultValue = [], disabled = false, editOnSelect = true, editorActions, editorAspectRatios: editorAspectRatiosProp, editorControls: editorControlsProp, editorDescription, editorSizePresets = [], editorTitle, dropzone = true, locale, maxFiles = 10, maxSize, multiple = true, onCancelUpload, onChange, onEditCancel, onEditSave, onEditStart, onError, onUpload, outputFormat = 'original', preview = 'auto', quality = .92, renderFile, retryCount = 0, retryDelay = 500, upload, value: controlledValue, variant, }: FileUploadProps) {
  const { components } = useConfig();
  const config = components.fileUpload;
  const labels = { ...defaultLocale, ...locale };
  const resolvedVariant = variant ?? config?.variant ?? (dropzone ? 'dropzone' : 'compact');
  const effectiveCropAspect = config?.cropAspect ?? cropAspect;
  const effectiveCropEnabled = config?.cropEnabled ?? cropEnabled;
  const effectiveCropShape = config?.cropShape ?? cropShape;
  const effectiveEditorControls = config?.editorControls ?? editorControlsProp ?? allEditorControls;
  const effectiveEditorAspectRatios = config?.editorAspectRatios ?? editorAspectRatiosProp ?? ['free', '1:1', '3:4', '4:3', '16:9', '9:16', '4:5', '5:4'] as FileUploadCropAspect[];
  const effectivePreview = config?.preview ?? preview;
  const resolvedMultiple = multiple && maxFiles !== 1;
  const [internalFiles, setInternalFiles] = useState<FileUploadFile[]>(defaultValue);
  const files = controlledValue ?? internalFiles;
  const filesRef = useRef(files);
  filesRef.current = files;
  const [dragging, setDragging] = useState(false);
  const [editing, setEditing] = useState<FileUploadFile | null>(null);
  const [autoEditQueue, setAutoEditQueue] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadQueue = useRef<string[]>([]);
  const activeUploads = useRef(0);
  const controllers = useRef(new Map<string, AbortController>());
  const updateFiles = (next: FileUploadFile[]) => { filesRef.current = next; if (controlledValue === undefined) setInternalFiles(next); onChange?.(next); };
  const validate = (file: File) => { if (maxSize && file.size > maxSize) return `File is larger than ${formatSize(maxSize)}.`; if (accept) { const accepted = accept.split(',').map((type) => type.trim().toLowerCase()); const matches = accepted.some((type) => type.startsWith('.') ? file.name.toLowerCase().endsWith(type) : type.endsWith('/*') ? file.type.startsWith(type.slice(0, -1)) : file.type.toLowerCase() === type); if (!matches) return 'This file type is not supported.'; } return undefined; };
  const runUpload = async (id: string, attempt = 0): Promise<void> => {
    const entry = filesRef.current.find((file) => file.id === id);
    if (!entry) return;
    if (!upload) { const done = { ...entry, progress: 100, status: 'success' as FileUploadStatus }; updateFiles(filesRef.current.map((file) => file.id === id ? done : file)); onUpload?.(done); return; }
    const controller = new AbortController();
    controllers.current.set(id, controller);
    const uploading = { ...entry, progress: 0, status: 'uploading' as FileUploadStatus };
    updateFiles(filesRef.current.map((file) => file.id === id ? uploading : file));
    try {
      const result = await upload(entry.file, controller.signal, (progress) => updateFiles(filesRef.current.map((file) => file.id === id ? { ...file, progress, status: 'uploading' } : file)));
      const done = { ...uploading, metadata: result && 'metadata' in result ? result.metadata : undefined, progress: 100, serverId: result && 'id' in result ? result.id : undefined, serverName: result && 'name' in result ? result.name : undefined, status: 'success' as FileUploadStatus, url: result && 'url' in result ? result.url : undefined };
      updateFiles(filesRef.current.map((file) => file.id === id ? done : file));
      onUpload?.(done);
    } catch (error) {
      if (controller.signal.aborted) { updateFiles(filesRef.current.map((file) => file.id === id ? { ...file, progress: 0, status: 'queued' } : file)); return; }
      if (attempt < Math.max(0, retryCount)) { await new Promise((resolve) => window.setTimeout(resolve, Math.max(0, retryDelay))); if (controller.signal.aborted) return; return runUpload(id, attempt + 1); }
      const failed = { ...uploading, error: error instanceof Error ? error.message : 'Upload failed.', status: 'error' as FileUploadStatus };
      updateFiles(filesRef.current.map((file) => file.id === id ? failed : file));
      onError?.(failed.error, entry.file);
    } finally { controllers.current.delete(id); }
  };
  const processQueue = async () => {
    const limit = Math.max(1, Number.isFinite(concurrency) ? concurrency : Number.MAX_SAFE_INTEGER);
    while (activeUploads.current < limit && uploadQueue.current.length > 0) {
      const id = uploadQueue.current.shift();
      if (!id) continue;
      activeUploads.current += 1;
      void runUpload(id).finally(() => { activeUploads.current -= 1; void processQueue(); });
    }
  };
  const enqueueUpload = (id: string) => { if (!uploadQueue.current.includes(id) && !controllers.current.has(id)) uploadQueue.current.push(id); void processQueue(); };
  const cancelUpload = (entry: FileUploadFile, notify = true) => { uploadQueue.current = uploadQueue.current.filter((id) => id !== entry.id); controllers.current.get(entry.id)?.abort(); if (notify) onCancelUpload?.(entry); };
  const openEditor = (entry: FileUploadFile) => { onEditStart?.(entry); setEditing(entry); };
  const cancelEditor = () => { if (editing) onEditCancel?.(editing); setAutoEditQueue([]); setEditing(null); };
  const replaceWithEdited = (edited: File) => {
    if (!editing) return;
    onEditSave?.(editing, edited);
    if (editing.preview) URL.revokeObjectURL(editing.preview);
    const next = filesRef.current.map((entry) => entry.id === editing.id ? { ...entry, file: edited, preview: createPreview(edited), status: 'queued' as FileUploadStatus, progress: 0, error: undefined } : entry);
    updateFiles(next);
    const nextAutoEditId = autoEditQueue[0];
    const nextAutoEdit = nextAutoEditId ? next.find((entry) => entry.id === nextAutoEditId) : undefined;
    setAutoEditQueue((queue) => queue.slice(1));
    setEditing(nextAutoEdit ?? null);
    if (autoUpload) { const replacement = next.find((entry) => entry.id === editing.id); if (replacement) enqueueUpload(replacement.id); }
  };
  const addFiles = async (incoming: File[]) => {
    const limited = resolvedMultiple ? incoming.slice(0, Math.max(0, maxFiles - filesRef.current.length)) : incoming.slice(0, 1);
    const approved = (await Promise.all(limited.map(async (file) => { const error = validate(file); if (error) { onError?.(error, file); return { file, accepted: false }; } try { return { file, accepted: await beforeUpload?.(file) ?? true }; } catch (beforeError) { onError?.(beforeError instanceof Error ? beforeError.message : 'File was rejected.', file); return { file, accepted: false }; } }))).filter((item) => item.accepted);
    const next = [...filesRef.current];
    approved.forEach(({ file }) => { next.push({ file, id: makeId(file), preview: createPreview(file), progress: 0, status: 'queued' }); });
    const normalized = resolvedMultiple ? next : next.slice(-approved.length || 1);
    const newEntries = approved.length > 0 ? normalized.slice(-approved.length) : [];
    updateFiles(normalized);
    const autoEditEntries = newEntries.filter((entry) => isImage(entry.file) && effectiveCropEnabled && editOnSelect);
    if (autoEditEntries.length > 0) { setAutoEditQueue(autoEditEntries.slice(1).map((entry) => entry.id)); openEditor(autoEditEntries[0]); }
    if (autoUpload) newEntries.filter((entry) => !autoEditEntries.some((candidate) => candidate.id === entry.id)).forEach((entry) => enqueueUpload(entry.id));
  };
  const remove = (id: string) => { const entry = filesRef.current.find((file) => file.id === id); cancelUpload(entry ?? { id } as FileUploadFile, false); if (entry?.preview) URL.revokeObjectURL(entry.preview); updateFiles(filesRef.current.filter((file) => file.id !== id)); };
  useEffect(() => () => { filesRef.current.forEach((entry) => { if (entry.preview) URL.revokeObjectURL(entry.preview); }); controllers.current.forEach((controller) => controller.abort()); }, []);
  const renderDefaultFile = (entry: FileUploadFile, actions: FileUploadActions) => <div className="mm-file-upload__file"><div className={cx('mm-file-upload__preview', isImage(entry.file) && 'mm-file-upload__preview--image')}>{entry.preview && effectivePreview !== 'none' ? <img alt="" src={entry.preview} /> : isImage(entry.file) ? <FileImage size={22} /> : <FileIcon size={22} />}</div><div className="mm-file-upload__details"><strong>{entry.file.name}</strong><span>{formatSize(entry.file.size)} · {entry.status === 'uploading' ? labels.uploading : entry.status === 'error' ? entry.error : entry.status}</span>{(entry.status === 'uploading' || entry.status === 'success') && <progress max="100" value={entry.progress} />}</div>{isImage(entry.file) && effectiveCropEnabled && <Button aria-label={`${labels.edit} ${entry.file.name}`} title={labels.edit} size="sm" variant="light" onClick={actions.edit}><Crop size={16} /> {labels.edit}</Button>}{entry.status === 'uploading' && <Button aria-label={`${labels.cancelUpload} ${entry.file.name}`} title={labels.cancelUpload} iconOnly variant="light" onClick={actions.cancelUpload}><X size={16} /></Button>}{entry.status === 'queued' && upload && <Button aria-label={`Upload ${entry.file.name}`} iconOnly variant="light" onClick={actions.upload}><CloudArrowUp size={16} /></Button>}{entry.status === 'success' && <Check aria-label="Uploaded" size={18} />}{entry.status === 'error' && <Button aria-label={`${labels.retry} ${entry.file.name}`} title={labels.retry} iconOnly variant="light" onClick={actions.retry}><SpinnerGap size={16} /></Button>}<Button aria-label={`${labels.remove} ${entry.file.name}`} title={labels.remove} iconOnly variant="light" onClick={actions.remove}><Trash size={16} /></Button></div>;
  const input = <input accept={accept} aria-hidden="true" className="mm-file-upload__input" disabled={disabled} multiple={resolvedMultiple} onChange={(event) => { void addFiles(Array.from(event.target.files ?? [])); event.target.value = ''; }} ref={inputRef} type="file" />;
  return <div aria-label={ariaLabel} className={cx('mm-file-upload', `mm-file-upload--${resolvedVariant}`, dragging && 'mm-file-upload--dragging', disabled && 'mm-file-upload--disabled', className)}>
    {dropzone && <div className="mm-file-upload__dropzone" onDragEnter={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={(event) => { if (event.currentTarget === event.target) setDragging(false); }} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); setDragging(false); void addFiles(Array.from(event.dataTransfer.files)); }} onClick={() => inputRef.current?.click()} role="button" tabIndex={disabled ? -1 : 0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); inputRef.current?.click(); } }}><CloudArrowUp aria-hidden="true" size={30} /><strong>{labels.browse}</strong><span>{accept ? `Accepted: ${accept}` : 'Choose files from your device'}{maxSize ? ` · Up to ${formatSize(maxSize)}` : ''}</span></div>}
    {!dropzone && <Button disabled={disabled} iconLeft={<CloudArrowUp size={16} />} onClick={() => inputRef.current?.click()}>{resolvedMultiple ? 'Choose files' : 'Choose file'}</Button>}{input}
    {files.length > 0 && <div className="mm-file-upload__list" aria-live="polite">{files.map((entry) => { const actions: FileUploadActions = { cancelUpload: () => cancelUpload(entry), edit: () => openEditor(entry), remove: () => remove(entry.id), retry: () => { updateFiles(filesRef.current.map((file) => file.id === entry.id ? { ...file, error: undefined, progress: 0, status: 'queued' } : file)); enqueueUpload(entry.id); }, upload: () => enqueueUpload(entry.id) }; return <div key={entry.id}>{renderFile ? renderFile(entry, actions) : renderDefaultFile(entry, actions)}</div>; })}</div>}
    {editing && <ImageEditor aspect={effectiveCropShape === 'circle' ? '1:1' : effectiveCropAspect} aspectRatios={effectiveEditorAspectRatios} controls={effectiveEditorControls} editorActions={editorActions} editorDescription={editorDescription} editorTitle={editorTitle} entry={editing} labels={labels} onCancel={cancelEditor} onSave={replaceWithEdited} outputFormat={outputFormat} quality={quality} shape={effectiveCropShape} sizePresets={editorSizePresets} />}
  </div>;
}
