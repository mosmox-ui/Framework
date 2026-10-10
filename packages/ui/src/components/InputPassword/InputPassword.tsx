import { DiceSix, Eye, EyeSlash } from '../../icons';
import { useId, useState, type ChangeEvent, type ReactNode } from 'react';
import { Input, type InputProps } from '../Input';
import './InputPassword.css';

export type PasswordGeneratorOptions = {
  charset?: string;
  maxLength?: number;
  minLength?: number;
};

export type PasswordRequirement = {
  id?: string;
  label: ReactNode;
  test: (value: string) => boolean;
};

export type PasswordStrength = 'empty' | 'weak' | 'fair' | 'good' | 'strong';

export type InputPasswordProps = Omit<InputProps, 'trailingActions' | 'type'> & {
  generateButton?: boolean;
  generatorOptions?: PasswordGeneratorOptions;
  onGenerate?: (password: string) => void;
  requirements?: PasswordRequirement[];
  showStrength?: boolean;
};

const DEFAULT_PASSWORD_CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*_-+=';
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

function randomIndex(max: number) {
  if (globalThis.crypto?.getRandomValues) {
    const limit = Math.floor(0xffffffff / max) * max;
    const randomValue = new Uint32Array(1);
    try {
      do {
        globalThis.crypto.getRandomValues(randomValue);
      } while (randomValue[0] >= limit);
      return randomValue[0] % max;
    } catch {
      // Some older or restricted environments expose crypto but reject getRandomValues.
    }
  }
  return Math.floor(Math.random() * max);
}

function createPassword(options: PasswordGeneratorOptions = {}) {
  const charset = options.charset?.length ? options.charset : DEFAULT_PASSWORD_CHARSET;
  const minLength = Math.max(1, Math.floor(Number.isFinite(options.minLength) ? options.minLength! : 16));
  const maxLength = Math.max(minLength, Math.floor(Number.isFinite(options.maxLength) ? options.maxLength! : 24));
  const length = minLength + randomIndex(maxLength - minLength + 1);
  return Array.from({ length }, () => charset[randomIndex(charset.length)]).join('');
}

function getStrength(value: string): { label: PasswordStrength; score: number } {
  if (!value) return { label: 'empty', score: 0 };
  let score = 0;
  if (value.length >= 8) score += 1;
  if (value.length >= 12) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  return { label: score <= 1 ? 'weak' : score === 2 ? 'fair' : score === 3 ? 'good' : 'strong', score };
}

export function InputPassword({
  'aria-describedby': ariaDescribedBy,
  className,
  defaultValue,
  disabled = false,
  generateButton = false,
  generatorOptions,
  id: providedId,
  loading = false,
  onChange,
  onClear,
  onGenerate,
  readOnly = false,
  requirements,
  showStrength = false,
  value,
  ...inputProps
}: InputPasswordProps) {
  const generatedId = useId();
  const id = providedId ?? `mm-input-password-${generatedId}`;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue === undefined ? '' : String(defaultValue));
  const [visible, setVisible] = useState(false);
  const currentValue = value === undefined ? uncontrolledValue : String(value);
  const minLength = inputProps.minLength;
  const resolvedRequirements: PasswordRequirement[] = [
    ...(minLength !== undefined && !requirements?.some((requirement) => requirement.id === 'minLength')
      ? [{ id: 'minLength', label: `At least ${minLength} characters`, test: (password: string) => password.length >= minLength }]
      : []),
    ...(requirements ?? []),
  ];
  const strengthId = showStrength ? `${id}-strength` : undefined;
  const requirementsId = resolvedRequirements.length > 0 ? `${id}-requirements` : undefined;
  const describedBy = [ariaDescribedBy, strengthId, requirementsId].filter(Boolean).join(' ') || undefined;
  const strength = getStrength(currentValue);
  const canGenerate = generateButton && !disabled && !loading && !readOnly;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setUncontrolledValue(event.target.value);
    onChange?.(event);
  };

  const handleClear = () => {
    if (value === undefined) setUncontrolledValue('');
    onClear?.();
  };

  const handleGenerate = () => {
    if (!canGenerate) return;
    const password = createPassword(generatorOptions);
    if (value === undefined) setUncontrolledValue(password);
    onGenerate?.(password);
  };

  return (
    <div className={cx('mm-input-password-field', inputProps.fullWidth && 'mm-input-password-field--full-width', className)}>
      <Input
        {...inputProps}
        aria-describedby={describedBy}
        clearable={inputProps.clearable}
        defaultValue={undefined}
        disabled={disabled}
        fullWidth={inputProps.fullWidth}
        id={id}
        loading={loading}
        onChange={handleChange}
        onClear={handleClear}
        readOnly={readOnly}
        type={visible ? 'text' : 'password'}
        trailingActions={<span className="mm-input-password__actions">
          {generateButton && <button aria-label="Generate password" className="mm-input-password__action" disabled={!canGenerate} onClick={handleGenerate} title="Generate password" type="button"><DiceSix aria-hidden="true" size={16} /></button>}
          <button aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible} className="mm-input-password__action" disabled={disabled || loading} onClick={() => setVisible((current) => !current)} title={visible ? 'Hide password' : 'Show password'} type="button">
            {visible ? <EyeSlash aria-hidden="true" size={16} /> : <Eye aria-hidden="true" size={16} />}
          </button>
        </span>}
        value={currentValue}
      />
      {showStrength && <div aria-live="polite" className="mm-input-password__strength" id={strengthId}>
        <span>Password strength: {strength.label}</span>
        <span aria-label={`Password strength: ${strength.label}`} aria-valuemax={5} aria-valuemin={0} aria-valuenow={strength.score} className="mm-input-password__strength-meter" role="progressbar">
          {Array.from({ length: 5 }, (_, index) => <span aria-hidden="true" className={cx('mm-input-password__strength-bar', index < strength.score && `mm-input-password__strength-bar--${strength.label}`)} key={index} />)}
        </span>
      </div>}
      {resolvedRequirements.length > 0 && <ul className="mm-input-password__requirements" id={requirementsId}>
        {resolvedRequirements.map((requirement, index) => {
          const met = requirement.test(currentValue);
          return <li className={cx(met && 'mm-input-password__requirement--met')} key={requirement.id ?? index}><span aria-hidden="true" className="mm-input-password__requirement-mark">{met ? '✓' : '○'}</span><span>{requirement.label}</span></li>;
        })}
      </ul>}
    </div>
  );
}
