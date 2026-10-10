import { useId, useLayoutEffect, useRef, useState, type ChangeEvent, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { X } from '../../icons';
import './Textarea.css';

export type TextareaVariant = 'outline' | 'filled';
export type TextareaResize = 'none' | 'vertical' | 'both';

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows' | 'size'> & {
  autoResize?: boolean;
  clearable?: boolean;
  description?: string;
  error?: string;
  fullWidth?: boolean;
  label?: string;
  maxRows?: number;
  minRows?: number;
  onClear?: () => void;
  variant?: TextareaVariant;
  resize?: TextareaResize;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function Textarea({
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  autoResize = false,
  className,
  clearable = false,
  defaultValue,
  description,
  disabled = false,
  error,
  fullWidth = false,
  id: providedId,
  label,
  maxLength,
  maxRows = 8,
  minRows = 3,
  onChange,
  onClear,
  readOnly = false,
  resize = 'vertical',
  value,
  variant = 'outline',
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const id = providedId ?? `mm-textarea-${generatedId}`;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue === undefined ? '' : String(defaultValue));
  const currentValue = value === undefined ? uncontrolledValue : String(value);
  const normalizedMinRows = Math.max(1, minRows);
  const normalizedMaxRows = Math.max(normalizedMinRows, maxRows);
  const hasError = Boolean(error);
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined;
  const canClear = clearable && currentValue.length > 0 && !disabled && !readOnly;

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea || !autoResize) return;

    const styles = window.getComputedStyle(textarea);
    const lineHeight = Number.parseFloat(styles.lineHeight) || 20;
    const verticalExtras = Number.parseFloat(styles.paddingTop) + Number.parseFloat(styles.paddingBottom)
      + Number.parseFloat(styles.borderTopWidth) + Number.parseFloat(styles.borderBottomWidth);
    const minHeight = lineHeight * normalizedMinRows + verticalExtras;
    const maxHeight = lineHeight * normalizedMaxRows + verticalExtras;

    textarea.style.height = 'auto';
    const height = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${height}px`;
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [autoResize, currentValue, normalizedMaxRows, normalizedMinRows]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (value === undefined) setUncontrolledValue(event.target.value);
    onChange?.(event);
  };

  const handleClear = () => {
    onClear?.();
    if (value === undefined) setUncontrolledValue('');
  };

  return (
    <div className={cx('mm-textarea-field', fullWidth && 'mm-textarea-field--full-width', className)}>
      {label && <label className="mm-textarea-field__label" htmlFor={id}>{label}{props.required && <span aria-hidden="true"> *</span>}</label>}
      {description && <p className="mm-textarea-field__description" id={descriptionId}>{description}</p>}
      <span className={cx('mm-textarea', `mm-textarea--${variant}`, `mm-textarea--resize-${resize}`, autoResize && 'mm-textarea--auto-resize', hasError && 'mm-textarea--error', disabled && 'mm-textarea--disabled')}>
        <textarea
          {...props}
          aria-describedby={describedBy}
          aria-invalid={ariaInvalid ?? hasError}
          className="mm-textarea__control"
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          maxLength={maxLength}
          onChange={handleChange}
          readOnly={readOnly}
          ref={textareaRef}
          rows={normalizedMinRows}
          value={value}
        />
        {canClear && <button aria-label="Clear text" className="mm-textarea__action" onClick={handleClear} type="button"><X size={16} /></button>}
      </span>
      {maxLength !== undefined && <p aria-live="polite" className="mm-textarea-field__counter">{currentValue.length} / {maxLength}</p>}
      {error && <p className="mm-textarea-field__error" id={errorId}>{error}</p>}
    </div>
  );
}
