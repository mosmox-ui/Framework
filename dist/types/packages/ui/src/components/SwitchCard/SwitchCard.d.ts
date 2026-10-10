import { type ReactNode } from 'react';
import { type SwitchProps } from '../Switch';
import './SwitchCard.css';
export type SwitchCardProps = Omit<SwitchProps, 'label' | 'description' | 'className'> & {
    alwaysContent?: ReactNode;
    checkedContent?: ReactNode;
    description?: ReactNode;
    switchPosition?: 'left' | 'right';
    title: ReactNode;
    uncheckedContent?: ReactNode;
};
export declare function SwitchCard({ alwaysContent, checkedContent, checked: controlledChecked, defaultChecked, description, onChange, switchPosition, title, uncheckedContent, ...switchProps }: SwitchCardProps): import("react").JSX.Element;
