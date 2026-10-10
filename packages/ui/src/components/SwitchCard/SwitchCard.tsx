import { useState, type ChangeEvent, type ReactNode } from 'react';
import { Switch, type SwitchProps } from '../Switch';
import './SwitchCard.css';

export type SwitchCardProps = Omit<SwitchProps, 'label' | 'description' | 'className'> & {
  alwaysContent?: ReactNode;
  checkedContent?: ReactNode;
  description?: ReactNode;
  switchPosition?: 'left' | 'right';
  title: ReactNode;
  uncheckedContent?: ReactNode;
};

export function SwitchCard({ alwaysContent, checkedContent, checked: controlledChecked, defaultChecked = false, description, onChange, switchPosition = 'left', title, uncheckedContent, ...switchProps }: SwitchCardProps) {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const checked = controlledChecked === undefined ? uncontrolledChecked : controlledChecked;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (controlledChecked === undefined) setUncontrolledChecked(event.target.checked);
    onChange?.(event);
  };

  return (
    <section className={`mm-switch-card mm-switch-card--${switchPosition}`}>
      <div className="mm-switch-card__switch"><Switch {...switchProps} checked={checked} onChange={handleChange} /></div>
      <div className="mm-switch-card__content">
        <h3 className="mm-switch-card__title">{title}</h3>
        {description && <p className="mm-switch-card__description">{description}</p>}
        {alwaysContent && <div className="mm-switch-card__always">{alwaysContent}</div>}
        {(checked ? checkedContent : uncheckedContent) && <div className="mm-switch-card__conditional">{checked ? checkedContent : uncheckedContent}</div>}
      </div>
    </section>
  );
}
