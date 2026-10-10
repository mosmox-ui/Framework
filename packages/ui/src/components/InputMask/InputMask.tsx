import { useId, useRef, useState, type ChangeEvent, type CSSProperties, type FocusEvent, type InputHTMLAttributes, type ReactNode, type KeyboardEvent } from 'react';
import '../Input/Input.css';
import './InputMask.css';

export type InputMaskSize = 'xs' | 'sm' | 'default';
export type InputMaskFormatChars = Record<string, RegExp>;
export type InputMaskVariant = 'outline' | 'filled';
export type InputMaskPresetName = 'phone' | 'internationalPhone' | 'date' | 'time' | 'dateTime' | 'creditCard' | 'expiry' | 'cvv' | 'postalCode' | 'zipCode' | 'iban' | 'sortCode' | 'routingNumber' | 'otp' | 'hexColor' | 'ipv4' | 'slug' | 'licensePlate';
export type InputMaskPreset = { mask: string; inputMode?: InputMaskProps['inputMode']; placeholder?: string; guide?: boolean; maskPlaceholder?: string; formatChars?: InputMaskFormatChars };
export const inputMaskPresets: Record<InputMaskPresetName, InputMaskPreset> = {
  phone: { mask: '(999) 999-9999', inputMode: 'tel', placeholder: '(555) 123-4567' },
  internationalPhone: { mask: '+99 999 999 9999', inputMode: 'tel', placeholder: '+38 067 123 4567' },
  date: { mask: '99/99/9999', inputMode: 'numeric', placeholder: 'DD/MM/YYYY' },
  time: { mask: '99:99', inputMode: 'numeric', placeholder: 'HH:MM' },
  dateTime: { mask: '99/99/9999 99:99', inputMode: 'numeric', placeholder: 'DD/MM/YYYY HH:MM' },
  creditCard: { mask: '9999 9999 9999 9999', inputMode: 'numeric', placeholder: '0000 0000 0000 0000' },
  expiry: { mask: '99/99', inputMode: 'numeric', placeholder: 'MM/YY' },
  cvv: { mask: '999', inputMode: 'numeric', placeholder: 'CVV' },
  postalCode: { mask: 'AA9 9AA', inputMode: 'text', placeholder: 'SW1A 1AA' },
  zipCode: { mask: '99999-9999', inputMode: 'numeric', placeholder: '12345-6789' },
  iban: { mask: 'AA99 9999 9999 9999 9999 9999', inputMode: 'text', placeholder: 'UA00 0000 0000 0000 0000 0000' },
  sortCode: { mask: '99-99-99', inputMode: 'numeric', placeholder: '20-00-00' },
  routingNumber: { mask: '999999999', inputMode: 'numeric', placeholder: '021000021' },
  otp: { mask: '999999', inputMode: 'numeric', placeholder: '000000' },
  hexColor: { mask: 'HAAAAAA', inputMode: 'text', placeholder: '#FFFFFF', formatChars: { H: /#/ } },
  ipv4: { mask: '999.999.999.999', inputMode: 'numeric', placeholder: '192.168.001.001' },
  slug: { mask: '********************', inputMode: 'text', placeholder: 'my-project-slug' },
  licensePlate: { mask: 'AA-9999-AA', inputMode: 'text', placeholder: 'AA-1234-AA' },
};
export type InputMaskProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue' | 'onChange' | 'placeholder'> & {
  'aria-label'?: string;
  label?: ReactNode;
  mask?: string;
  preset?: InputMaskPresetName | InputMaskPreset;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, rawValue: string) => void;
  onComplete?: (value: string, rawValue: string) => void;
  onValidityChange?: (valid: boolean) => void;
  formatChars?: InputMaskFormatChars;
  maskPlaceholder?: string;
  showMask?: boolean;
  guide?: boolean;
  placeholder?: string;
  description?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  clearable?: boolean;
  size?: InputMaskSize;
  variant?: InputMaskVariant;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  onTrailingIconClick?: () => void;
  prefix?: ReactNode;
  suffix?: ReactNode;
  trailingIconLabel?: string;
  trailingIcon?: ReactNode;
  loading?: boolean;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'email' | 'url';
  autoComplete?: string;
  name?: string;
  id?: string;
  className?: string;
  style?: CSSProperties;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
};

const defaults: InputMaskFormatChars = { '9': /[0-9]/, A: /[a-zA-Z]/, '*': /[a-zA-Z0-9]/, '#': /[0-9a-fA-F]/ };
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

function isToken(char: string, formatChars: InputMaskFormatChars) { return Boolean(formatChars[char]); }
function formatMask(input: string, mask: string, formatChars: InputMaskFormatChars, placeholder: string, guide: boolean) {
  const chars = input.split(''); let cursor = 0; let output = '';
  for (let index = 0; index < mask.length; index += 1) { const maskChar = mask[index]; if (!isToken(maskChar, formatChars)) { if (cursor < chars.length && chars[cursor] === maskChar) cursor += 1; if (guide || cursor < chars.length) output += maskChar; continue; } const next = chars.slice(cursor).findIndex((char) => formatChars[maskChar].test(char)); if (next < 0) { if (guide) output += placeholder; continue; } output += chars[cursor + next]; cursor += next + 1; }
  return output;
}
function rawValue(input: string, mask: string, formatChars: InputMaskFormatChars) { let raw = ''; let cursor = 0; for (const char of input) { while (cursor < mask.length && !isToken(mask[cursor], formatChars)) { if (mask[cursor] === char) { cursor += 1; break; } cursor += 1; } if (cursor >= mask.length) break; if (formatChars[mask[cursor]]?.test(char)) { raw += char; cursor += 1; } } return raw; }
function complete(value: string, mask: string, formatChars: InputMaskFormatChars) { return mask.split('').filter((char) => isToken(char, formatChars)).length === rawValue(value, mask, formatChars).length; }
function caretForRawIndex(raw: string, mask: string, formatChars: InputMaskFormatChars, rawIndex: number) { let rawCursor = 0; let outputCursor = 0; for (const maskChar of mask) { if (!isToken(maskChar, formatChars)) { if (outputCursor < formatMask(raw, mask, formatChars, '_', false).length) outputCursor += 1; continue; } if (rawCursor >= rawIndex) return outputCursor; if (rawCursor < raw.length) { rawCursor += 1; outputCursor += 1; } } return outputCursor; }

export function InputMask({ 'aria-label': ariaLabel, label, mask, preset, value, defaultValue = '', onChange, onComplete, onValidityChange, formatChars: customFormatChars, maskPlaceholder, showMask = false, guide, placeholder, description, helperText, error, disabled = false, readOnly = false, required = false, clearable = false, size = 'default', variant = 'outline', fullWidth = false, leadingIcon, onTrailingIconClick, prefix, suffix, trailingIconLabel = 'Input action', trailingIcon, loading = false, inputMode, autoComplete, name, id, className, style, onFocus, onBlur, ...inputProps }: InputMaskProps) {
  const generatedId = useId().replace(/:/g, '');
  const inputId = id ?? `mm-input-mask-${generatedId}`;
  const presetConfig = typeof preset === 'string' ? inputMaskPresets[preset] : preset;
  const activeMask = presetConfig?.mask ?? mask ?? '';
  const formatChars = { ...defaults, ...presetConfig?.formatChars, ...customFormatChars };
  const activePlaceholder = maskPlaceholder ?? presetConfig?.maskPlaceholder ?? '_';
  const activeGuide = guide ?? presetConfig?.guide ?? false;
  const activeInputMode = inputMode ?? presetConfig?.inputMode;
  const activePlaceholderText = placeholder ?? presetConfig?.placeholder;
  const [internalValue, setInternalValue] = useState(() => formatMask(defaultValue, activeMask, formatChars, activePlaceholder, activeGuide || showMask));
  const currentValue = value === undefined ? internalValue : value;
  const renderedValue = formatMask(currentValue, activeMask, formatChars, activePlaceholder, activeGuide || showMask);
  const inputRef = useRef<HTMLInputElement>(null);
  const [touched, setTouched] = useState(false);
  const validationError = error || (touched && required && !rawValue(renderedValue, activeMask, formatChars) ? 'This field is required.' : undefined);
  const describedBy = [description ? `${inputId}-description` : undefined, validationError ? `${inputId}-error` : undefined].filter(Boolean).join(' ') || undefined;
  const emitRaw = (raw: string, caretRawIndex?: number) => { const next = formatMask(raw, activeMask, formatChars, activePlaceholder, activeGuide || showMask); const valid = complete(next, activeMask, formatChars); if (value === undefined) setInternalValue(next); onChange?.(next, raw); onValidityChange?.(valid); if (valid) onComplete?.(next, raw); if (caretRawIndex !== undefined) window.requestAnimationFrame(() => { const caret = caretForRawIndex(raw, activeMask, formatChars, caretRawIndex); inputRef.current?.setSelectionRange(caret, caret); }); };
  const commit = (event: ChangeEvent<HTMLInputElement>) => { const caret = event.target.selectionStart ?? event.target.value.length; const raw = rawValue(event.target.value, activeMask, formatChars); const rawBeforeCaret = rawValue(event.target.value.slice(0, caret), activeMask, formatChars); emitRaw(raw, rawBeforeCaret.length); };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    inputProps.onKeyDown?.(event);
    if (event.defaultPrevented || (event.key !== 'Backspace' && event.key !== 'Delete')) return;
    const input = event.currentTarget;
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? start;
    if (start !== end) return;
    const currentRaw = rawValue(input.value, activeMask, formatChars);
    const rawBefore = rawValue(input.value.slice(0, start), activeMask, formatChars);
    const index = event.key === 'Backspace' ? rawBefore.length - 1 : rawBefore.length;
    if (index < 0 || index >= currentRaw.length) return;
    event.preventDefault();
    emitRaw(`${currentRaw.slice(0, index)}${currentRaw.slice(index + 1)}`, index);
  };
  const canClear = clearable && renderedValue.length > 0 && !disabled && !loading && !readOnly;
  const hasLeading = Boolean(leadingIcon || prefix);
  const hasTrailing = Boolean(suffix || trailingIcon || canClear || loading || readOnly);
  return <div className={cx('mm-input-field', 'mm-input-mask-field', fullWidth && 'mm-input-field--full-width', className)} style={style}>
    {label && <label className="mm-input-field__label" htmlFor={inputId}>{label}{required && <span aria-hidden="true"> *</span>}</label>}
    {description && <p className="mm-input-field__description" id={`${inputId}-description`}>{description}</p>}
    <span className={cx('mm-input', `mm-input--${size}`, `mm-input--${variant}`, Boolean(validationError) && 'mm-input--error', hasLeading && 'mm-input--has-leading-icon', hasTrailing && 'mm-input--has-trailing-icon', loading && 'mm-input--loading', disabled && 'mm-input--disabled', readOnly && 'mm-input--readonly')}>
      {leadingIcon && <span aria-hidden="true" className="mm-input__icon mm-input__icon--leading">{leadingIcon}</span>}
      {prefix && <span aria-hidden="true" className="mm-input__adornment mm-input__adornment--prefix">{prefix}</span>}
      <input {...inputProps} aria-describedby={describedBy} aria-invalid={Boolean(validationError)} aria-label={label ? undefined : ariaLabel} aria-required={required || undefined} autoComplete={autoComplete} className="mm-input__control" disabled={disabled || loading} id={inputId} inputMode={activeInputMode} name={name} onBlur={(event) => { setTouched(true); onBlur?.(event); }} onChange={commit} onFocus={onFocus} onKeyDown={handleKeyDown} placeholder={activePlaceholderText ?? (showMask ? undefined : activeMask)} readOnly={readOnly} ref={inputRef} required={required} type="text" value={renderedValue} />
      {loading && <span aria-label="Loading" className="mm-input__loader" role="status" />}
      {suffix && <span aria-hidden="true" className="mm-input__adornment mm-input__adornment--suffix">{suffix}</span>}
      {canClear && <button aria-label="Clear input" className="mm-input__action" onClick={() => { if (value === undefined) setInternalValue(''); onChange?.('', ''); onValidityChange?.(false); }} type="button">×</button>}
      {readOnly && <span aria-label="Read-only" className="mm-input__icon mm-input__icon--trailing" role="img">⌁</span>}
      {!canClear && !readOnly && trailingIcon && (onTrailingIconClick ? <button aria-label={trailingIconLabel} className="mm-input__icon mm-input__icon--trailing mm-input__icon--interactive" onClick={onTrailingIconClick} type="button">{trailingIcon}</button> : <span aria-hidden="true" className="mm-input__icon mm-input__icon--trailing mm-input__icon--interactive">{trailingIcon}</span>)}
    </span>
    {validationError ? <div className="mm-input-field__error" id={`${inputId}-error`} role="alert">{validationError}</div> : (helperText && <div className="mm-input-field__description">{helperText}</div>)}
  </div>;
}
