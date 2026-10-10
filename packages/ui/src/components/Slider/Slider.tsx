import { useId, useRef, useState, type ChangeEvent, type CSSProperties, type ReactNode } from 'react';
import './Slider.css';

export type SliderSize = 'xs' | 'sm' | 'default';
export type SliderMode = 'linear' | 'centered' | 'options';
export type SliderOption = { color?: string; label?: ReactNode; value: number | string };
export type SliderColorRange = { from: string; to: string };
export type SliderProps = {
  'aria-label'?: string;
  className?: string;
  defaultValue?: number;
  disabled?: boolean;
  id?: string;
  label?: ReactNode;
  max?: number;
  min?: number;
  mode?: SliderMode;
  onChange?: (value: number, event: ChangeEvent<HTMLInputElement>) => void;
  onChangeEnd?: (value: number, event: ChangeEvent<HTMLInputElement>) => void;
  onOptionChange?: (option: SliderOption, index: number, event: ChangeEvent<HTMLInputElement>) => void;
  options?: Array<SliderOption | number | string>;
  optionFormatter?: (option: SliderOption, index: number) => ReactNode;
  colorRange?: SliderColorRange;
  showColorSwatch?: boolean;
  showDelta?: boolean;
  showInitialValue?: boolean;
  showValue?: boolean;
  size?: SliderSize;
  step?: number;
  value?: number;
  valueFormatter?: (value: number) => ReactNode;
  resettable?: boolean;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const normalizeOption = (option: SliderOption | number | string): SliderOption => typeof option === 'object' ? option : { value: option, label: option };
const interpolateHexColor = (from: string, to: string, progress: number) => {
  const parse = (color: string) => {
    const value = color.replace('#', '');
    if (!/^(?:[\da-f]{3}|[\da-f]{6})$/i.test(value)) return null;
    const hex = value.length === 3 ? value.split('').map((part) => part + part).join('') : value;
    return [0, 2, 4].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
  };
  const start = parse(from);
  const end = parse(to);
  if (!start || !end) return `color-mix(in srgb, ${from} ${100 - progress}%, ${to} ${progress}%)`;
  return `rgb(${start.map((part, index) => Math.round(part + ((end[index] - part) * progress) / 100)).join(' ')})`;
};

export function Slider({ 'aria-label': ariaLabel, className, colorRange, defaultValue = 0, disabled = false, id: providedId, label, max = 100, min = 0, mode = 'linear', onChange, onChangeEnd, onOptionChange, options, optionFormatter, resettable = false, showColorSwatch = true, showDelta = false, showInitialValue = false, showValue = true, size = 'default', step = 1, value, valueFormatter = (current) => current, }: SliderProps) {
  const generatedId = useId();
  const id = providedId ?? `mm-slider-${generatedId}`;
  const initialValue = useRef(value ?? defaultValue);
  const lastChange = useRef<ChangeEvent<HTMLInputElement> | null>(null);
  const committedEvent = useRef<ChangeEvent<HTMLInputElement> | null>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const optionsMode = mode === 'options' && Boolean(options?.length);
  const optionList = optionsMode ? options!.map(normalizeOption) : [];
  const inputMin = optionsMode ? 0 : min;
  const inputMax = optionsMode ? optionList.length - 1 : max;
  const inputStep = optionsMode ? 1 : step;
  const currentValue = Math.min(inputMax, Math.max(inputMin, value ?? uncontrolledValue));
  const currentOption = optionsMode ? optionList[currentValue] : undefined;
  const percentage = inputMax === inputMin ? 0 : ((currentValue - inputMin) / (inputMax - inputMin)) * 100;
  const zeroPercentage = mode === 'centered' && inputMin < 0 && inputMax > 0 ? ((0 - inputMin) / (inputMax - inputMin)) * 100 : 0;
  const progress = Math.min(100, Math.max(0, percentage));
  const progressStart = mode === 'centered' && inputMin < 0 && inputMax > 0 ? Math.min(zeroPercentage, progress) : 0;
  const progressEnd = mode === 'centered' && inputMin < 0 && inputMax > 0 ? Math.max(zeroPercentage, progress) : progress;
  const selectedColor = colorRange ? interpolateHexColor(colorRange.from, colorRange.to, progress) : currentOption?.color;
  const style = { '--mm-slider-progress-start': `${progressStart}%`, '--mm-slider-progress-end': `${progressEnd}%`, '--mm-slider-zero': `${zeroPercentage}%`, '--mm-slider-color-from': colorRange?.from, '--mm-slider-color-to': colorRange?.to, '--mm-slider-current-color': selectedColor } as CSSProperties;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    lastChange.current = event;
    const nextValue = Number(event.target.value);
    if (value === undefined) setUncontrolledValue(nextValue);
    onChange?.(nextValue, event);
    if (optionsMode) onOptionChange?.(optionList[nextValue], nextValue, event);
  };
  const handleChangeEnd = () => {
    const event = lastChange.current;
    if (!event || !onChangeEnd) return;
    const nextValue = Number(event.target.value);
    if (event === committedEvent.current) return;
    committedEvent.current = event;
    onChangeEnd(nextValue, event);
  };
  const delta = currentValue - initialValue.current;
  const showSelectedColor = showColorSwatch && Boolean(selectedColor);
  const showHeader = label || showValue || showInitialValue || showDelta || showSelectedColor;
  const displayedValue = currentOption ? optionFormatter?.(currentOption, currentValue) ?? currentOption.label ?? currentOption.value : valueFormatter(currentValue);

  return <div className={cx('mm-slider', `mm-slider--${size}`, optionsMode && 'mm-slider--options', colorRange && 'mm-slider--color-range', disabled && 'mm-slider--disabled', className)} style={style}>
    {showHeader && <div className="mm-slider__header">{label && <label htmlFor={id}>{label}</label>}{(showValue || showInitialValue || showDelta || showSelectedColor) && <span className="mm-slider__values">{showSelectedColor && <span aria-label="Selected color" className="mm-slider__color-swatch" style={{ backgroundColor: selectedColor }} role="img" />}{showValue && <output htmlFor={id}>{displayedValue}</output>}{showInitialValue && <span className="mm-slider__initial">Initial: {valueFormatter(initialValue.current)}</span>}{showDelta && <span className={cx('mm-slider__delta', delta > 0 && 'mm-slider__delta--positive', delta < 0 && 'mm-slider__delta--negative')}>Change: {delta > 0 ? '+' : ''}{valueFormatter(delta)}</span>}{resettable && <button aria-label={`Reset ${typeof label === 'string' ? label : 'value'}`} className="mm-slider__reset" disabled={disabled} onClick={() => { const next = initialValue.current; if (value === undefined) setUncontrolledValue(next); onChange?.(next, lastChange.current as ChangeEvent<HTMLInputElement>); }} type="button">Reset</button>}</span>}</div>}
    <input aria-label={ariaLabel ?? (typeof label === 'string' ? label : undefined)} className="mm-slider__input" disabled={disabled} id={id} max={inputMax} min={inputMin} onBlur={handleChangeEnd} onChange={handleChange} onKeyUp={handleChangeEnd} onPointerUp={handleChangeEnd} step={inputStep} type="range" value={currentValue} />
  </div>;
}
