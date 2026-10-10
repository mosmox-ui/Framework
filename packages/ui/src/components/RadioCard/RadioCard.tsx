import { createContext, useContext, useId, useState, type ChangeEvent, type CSSProperties, type ReactNode } from 'react';
import { useConfig } from '../ConfigProvider';
import { Radio } from '../Radio';
import './RadioCard.css';

export type RadioCardSize = 'xs' | 'sm' | 'default';
export type RadioCardVariant = 'outline' | 'soft' | 'filled' | 'elevated';
export type RadioCardDirection = 'horizontal' | 'vertical';
export type RadioCardIndicator = 'start' | 'end' | 'top' | 'none';
export type RadioCardRightContentAlign = 'start' | 'center' | 'end';

export type RadioCardProps = {
  value: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  rightContent?: ReactNode;
  rightContentAlign?: RadioCardRightContentAlign;
  content?: ReactNode;
  footer?: ReactNode;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  loading?: boolean;
  required?: boolean;
  size?: RadioCardSize;
  variant?: RadioCardVariant;
  indicator?: RadioCardIndicator;
  cardDirection?: RadioCardDirection;
  error?: string;
  onChange?: (checked: boolean, value: string, event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
};

export type RadioCardGroupProps = {
  children: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  direction?: RadioCardDirection;
  columns?: number | string;
  gap?: number | string;
  size?: RadioCardSize;
  variant?: RadioCardVariant;
  indicator?: RadioCardIndicator;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
};

type RadioCardContextValue = { name: string; value?: string; onChange: RadioCardGroupProps['onChange']; size?: RadioCardSize; variant?: RadioCardVariant; indicator?: RadioCardIndicator; disabled?: boolean; required?: boolean };
const RadioCardContext = createContext<RadioCardContextValue | null>(null);
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const cssLength = (value?: number | string) => typeof value === 'number' ? `${value}px` : value;

export function RadioCard({ value, title, description, icon, badge, leading, trailing, rightContent, rightContentAlign = 'center', content, footer, name, checked: controlledChecked, defaultChecked = false, disabled = false, loading = false, required, size = 'default', variant = 'outline', indicator = 'start', cardDirection = 'horizontal', error, onChange, className, style, 'aria-label': ariaLabel }: RadioCardProps) {
  const group = useContext(RadioCardContext);
  const generatedId = useId();
  const id = `mm-radio-card-${generatedId}`;
  const checkedByGroup = group?.value === undefined ? undefined : group.value === value;
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const checked = controlledChecked ?? checkedByGroup ?? uncontrolledChecked;
  const activeSize = group?.size ?? size;
  const activeVariant = group?.variant ?? variant;
  const activeIndicator = group?.indicator ?? indicator;
  const isDisabled = disabled || Boolean(group?.disabled) || loading;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!group && controlledChecked === undefined) setUncontrolledChecked(event.target.checked);
    onChange?.(event.target.checked, value, event);
    group?.onChange?.(value, event);
  };
  const endContent = rightContent ?? trailing;
  return <div className={cx('mm-radio-card-field', error && 'mm-radio-card-field--error', className)} style={style}>
    <Radio aria-describedby={description ? `${id}-description` : undefined} aria-label={ariaLabel} checked={checked} className={cx('mm-radio-card', `mm-radio-card--${activeSize}`, `mm-radio-card--${activeVariant}`, `mm-radio-card--indicator-${activeIndicator}`, `mm-radio-card--${cardDirection}`, checked && 'mm-radio-card--checked', isDisabled && 'mm-radio-card--disabled', loading && 'mm-radio-card--loading')} disabled={isDisabled} id={id} label={<><span className="mm-radio-card__body">{icon && <span aria-hidden="true" className="mm-radio-card__icon">{icon}</span>}{leading && <span className="mm-radio-card__leading">{leading}</span>}<span className="mm-radio-card__main"><span className="mm-radio-card__heading"><span className="mm-radio-card__title">{title}</span>{badge && <span className="mm-radio-card__badge">{badge}</span>}</span>{description && <span className="mm-radio-card__description" id={`${id}-description`}>{description}</span>}{content && <span className="mm-radio-card__content">{content}</span>}{footer && <span className="mm-radio-card__footer">{footer}</span>}</span>{endContent && <span className={cx('mm-radio-card__right-content', `mm-radio-card__right-content--${rightContentAlign}`)}>{endContent}</span>}{loading && <span aria-label="Loading" className="mm-radio-card__spinner" role="status" />}</span></>} name={group?.name ?? name} onChange={handleChange} required={required ?? group?.required} size={activeSize} value={value} />
    {error && <p className="mm-radio-card-field__error" role="alert">{error}</p>}
  </div>;
}

export function RadioCardGroup({ children, label, description, error, name: providedName, value, defaultValue, onChange, direction = 'vertical', columns, gap = 12, size, variant, indicator, disabled = false, required = false, className, style, 'aria-label': ariaLabel }: RadioCardGroupProps) {
  const { components } = useConfig();
  const config = components.radioCard;
  const generatedName = useId();
  const name = providedName ?? `mm-radio-card-group-${generatedName}`;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value === undefined ? internalValue : value;
  const handleChange = (nextValue: string, event: ChangeEvent<HTMLInputElement>) => { if (value === undefined) setInternalValue(nextValue); onChange?.(nextValue, event); };
  const groupStyle = { '--mm-radio-card-columns': columns, '--mm-radio-card-gap': cssLength(gap), ...style } as CSSProperties;
  const activeSize = size ?? config?.size;
  const activeVariant = variant ?? config?.variant;
  const activeIndicator = indicator ?? config?.indicator;
  return <fieldset aria-label={ariaLabel} className={cx('mm-radio-card-group', className)} style={groupStyle}><legend className="mm-radio-card-group__label">{label}</legend>{description && <p className="mm-radio-card-group__description">{description}</p>}<RadioCardContext.Provider value={{ name, value: currentValue, onChange: handleChange, size: activeSize, variant: activeVariant, indicator: activeIndicator, disabled, required }}><div className={cx('mm-radio-card-group__options', `mm-radio-card-group__options--${direction}`)}>{children}</div></RadioCardContext.Provider>{error && <p className="mm-radio-card-group__error" role="alert">{error}</p>}</fieldset>;
}
