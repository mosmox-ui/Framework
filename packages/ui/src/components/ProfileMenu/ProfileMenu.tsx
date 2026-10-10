import type { ReactNode } from 'react';
import { Avatar, type AvatarProps } from '../Avatar';
import { Button } from '../Button';
import { ButtonMenu, type ButtonMenuProps } from '../ButtonMenu';
import { useConfig } from '../ConfigProvider';
import type { MenuEntry, MenuProps } from '../Menu';
import './ProfileMenu.css';

export type ProfileMenuSize = 'xs' | 'sm' | 'default';
export type ProfileMenuDisplay = 'full' | 'compact' | 'avatar';

export type ProfileMenuProps = {
  'aria-label'?: string;
  className?: string;
  name: ReactNode;
  secondaryText?: ReactNode;
  avatarProps?: Omit<AvatarProps, 'size'>;
  avatar?: ReactNode;
  entries?: MenuEntry[];
  display?: ProfileMenuDisplay;
  size?: ProfileMenuSize;
  fullWidth?: boolean;
  menuProps?: Omit<MenuProps, 'entries' | 'aria-label' | 'width'>;
  menuWidth?: number | string;
  placement?: ButtonMenuProps['placement'];
  showBackground?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClick?: () => void;
  disabled?: boolean;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function ProfileMenu({
  'aria-label': ariaLabel = 'Open profile menu', className, name, secondaryText, avatarProps, avatar,
  entries = [], display: propDisplay, size: propSize, fullWidth: propFullWidth, menuProps, menuWidth, placement, showBackground = true, defaultOpen, open,
  onOpenChange, onClick, disabled,
}: ProfileMenuProps) {
  const { components } = useConfig();
  const config = components.profileMenu;
  const size = propSize ?? config?.size ?? 'default';
  const display = propDisplay ?? config?.display ?? 'full';
  const fullWidth = propFullWidth ?? false;
  const hasMenu = entries.length > 0;
  const avatarSize = size === 'xs' ? 'sm' : size === 'sm' ? 'default' : 'lg';
  const profileAvatar = avatar ?? <Avatar {...avatarProps} aria-label={avatarProps?.['aria-label'] ?? String(name)} name={avatarProps?.name ?? (typeof name === 'string' ? name : undefined)} size={avatarSize} />;
  const content = display === 'avatar' ? null : <span className="mm-profile-menu__copy"><span className="mm-profile-menu__name">{name}</span>{display === 'full' && secondaryText ? <span className="mm-profile-menu__secondary">{secondaryText}</span> : null}</span>;
  const trigger = <span className="mm-profile-menu__trigger-content">{profileAvatar}{content}</span>;

  if (hasMenu) return <ButtonMenu aria-label={ariaLabel} className={cx('mm-profile-menu', `mm-profile-menu--${size}`, `mm-profile-menu--${display}`, fullWidth && 'mm-profile-menu--full-width', !showBackground && 'mm-profile-menu--no-background', className)} closeOnOutsideClick defaultOpen={defaultOpen} disabled={disabled} entries={entries} matchTriggerWidth={config?.matchTriggerWidth} menuProps={menuProps} menuWidth={menuWidth ?? config?.menuWidth} onOpenChange={onOpenChange} open={open} placement={placement ?? config?.placement} triggerProps={{ 'aria-label': ariaLabel, className: 'mm-profile-menu__button', disableHover: true, fullWidth, onClick, variant: 'light', size: size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : 'default' }}>{trigger}</ButtonMenu>;

  return <Button aria-label={ariaLabel} className={cx('mm-profile-menu', `mm-profile-menu--${size}`, `mm-profile-menu--${display}`, fullWidth && 'mm-profile-menu--full-width', !showBackground && 'mm-profile-menu--no-background', className)} disabled={disabled} disableHover fullWidth={fullWidth} onClick={onClick} variant="light" size={size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : 'default'}>{trigger}</Button>;
}
