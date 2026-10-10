import { memo, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react';
import { SpinnerGap } from '../../icons';
import { useConfig } from '../ConfigProvider';
import './Button.css';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'light'
  | 'outline'
  | 'dashed'
  | 'text'
  | 'link'
  | 'danger'
  | 'success';

export type ButtonSize = 'xs' | 'sm' | 'default';
export type ButtonLoadingMode = 'inline' | 'replace';

type SharedButtonProps = {
  children?: ReactNode;
  className?: string;
  circle?: boolean;
  disableHover?: boolean;
  fullWidth?: boolean;
  hoverScale?: boolean;
  iconOnly?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  loadingMode?: ButtonLoadingMode;
  loadingLabel?: string;
  progress?: number;
  win?: string;
  mac?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export type ButtonProps = SharedButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedButtonProps> & {
    href?: never;
  };

export type ButtonLinkProps = SharedButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedButtonProps> & {
    href: string;
  };

export type AnyButtonProps = ButtonProps | ButtonLinkProps;

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
type ButtonStyle = CSSProperties & Record<`--${string}`, string | number | undefined>;
const isMacOS = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(`${navigator.platform} ${navigator.userAgent}`);

const SimpleButton = memo(function SimpleButton({
  children,
  className,
  circle = false,
  disableHover = false,
  fullWidth = false,
  hoverScale: _hoverScale,
  iconLeft: _iconLeft,
  iconOnly: _iconOnly,
  iconRight: _iconRight,
  loading: _loading,
  loadingLabel: _loadingLabel,
  loadingMode: _loadingMode,
  mac: _mac,
  progress: _progress,
  size = 'default',
  variant = 'primary',
  win: _win,
  ...props
}: ButtonProps) {
  const { components } = useConfig();
  const buttonConfig = components.button;
  const buttonStyle: ButtonStyle = {
    ...(buttonConfig?.gap && { '--mm-button-gap': buttonConfig.gap }),
    ...(buttonConfig?.iconSize && { '--mm-button-icon-size': buttonConfig.iconSize }),
    ...(buttonConfig?.radius && { '--mm-button-radius': buttonConfig.radius }),
  };
  const classes = cx(
    'mm-button',
    `mm-button--${variant}`,
    `mm-button--${size}`,
    circle && 'mm-button--circle',
    fullWidth && 'mm-button--full-width',
    disableHover && 'mm-button--disable-hover',
    className,
  );

  return <button {...props} style={{ ...buttonStyle, ...props.style }} type={props.type ?? 'button'} className={classes}>{children}</button>;
});

const canUseSimpleButton = (props: AnyButtonProps): props is ButtonProps => {
  return !('href' in props && props.href)
    && !props.iconLeft
    && !props.iconRight
    && !props.iconOnly
    && !props.loading
    && props.progress === undefined
    && !props.win
    && !props.mac
    && !props.hoverScale;
};

const FullButton = memo(function FullButton({
  children,
  className,
  circle = false,
  disableHover = false,
  fullWidth = false,
  hoverScale = false,
  iconOnly = false,
  iconLeft,
  iconRight,
  loading = false,
  loadingMode = 'inline',
  loadingLabel = 'Loading',
  progress,
  win,
  mac,
  size = 'default',
  variant = 'primary',
  ...props
}: AnyButtonProps) {
  const { components } = useConfig();
  const buttonConfig = components.button;
  const isLink = 'href' in props && Boolean(props.href);
  const normalizedProgress = progress === undefined ? undefined : Math.min(100, Math.max(0, progress));
  const hasProgress = normalizedProgress !== undefined;
  const isBusy = loading || hasProgress;
  const activeShortcut = isMacOS ? (mac ?? win) : (win ?? mac);
  const replacesContent = loading && loadingMode === 'replace';
  const classes = cx(
    'mm-button',
    `mm-button--${variant}`,
    `mm-button--${size}`,
    circle && 'mm-button--circle',
    iconOnly && 'mm-button--icon-only',
    fullWidth && 'mm-button--full-width',
    disableHover && 'mm-button--disable-hover',
    hoverScale && 'mm-button--hover-scale',
    loading && 'mm-button--loading',
    replacesContent && 'mm-button--loading-replace',
    hasProgress && 'mm-button--with-progress',
    className,
  );
  const buttonStyle: ButtonStyle = {
    ...(buttonConfig?.gap && { '--mm-button-gap': buttonConfig.gap }),
    ...(buttonConfig?.iconSize && { '--mm-button-icon-size': buttonConfig.iconSize }),
    ...(buttonConfig?.radius && { '--mm-button-radius': buttonConfig.radius }),
  };

  const progressLabel = hasProgress && <span className="mm-button__progress-label"> ({normalizedProgress}%)</span>;
  const defaultContent = (
    <>
      {iconLeft}
      {iconOnly ? <span className="mm-button__sr-only">{children}</span> : <>{children}{progressLabel}</>}
      {!iconOnly && iconRight}
    </>
  );
  const animatedIcon = (icon: ReactNode) => (
    <span className="mm-button__icon-transition" aria-hidden="true">
      <span className="mm-button__icon-transition-old">{icon}</span>
      <span className="mm-button__icon-transition-loader"><SpinnerGap className="mm-button__spinner" /></span>
    </span>
  );
  const inlineContent = (
    <>
      {loading && iconLeft ? animatedIcon(iconLeft) : loading && !iconRight ? <SpinnerGap className="mm-button__spinner" aria-hidden="true" /> : iconLeft}
      {iconOnly ? <span className="mm-button__sr-only">{loading ? loadingLabel : children}</span> : <>{children}{progressLabel}</>}
      {loading && iconRight ? animatedIcon(iconRight) : !loading && !iconOnly && iconRight}
    </>
  );
  const contentWrapper = replacesContent ? (
    <>
      <span className="mm-button__content mm-button__content--default">{defaultContent}</span>
      <span className="mm-button__content mm-button__content--loading" aria-hidden="true"><SpinnerGap className="mm-button__spinner" /></span>
    </>
  ) : <span className="mm-button__content">{inlineContent}</span>;

  const progressBar = hasProgress ? (
    <span className="mm-button__progress-track" aria-hidden="true">
      <span className="mm-button__progress-value" style={{ width: `${normalizedProgress}%` }} />
    </span>
  ) : null;

  if (isLink) {
    const linkProps = props as ButtonLinkProps;
    return (
      <a
        {...linkProps}
        className={classes}
        style={{ ...buttonStyle, ...linkProps.style }}
        aria-label={replacesContent ? loadingLabel : linkProps['aria-label']}
        aria-busy={isBusy || undefined}
        aria-keyshortcuts={activeShortcut || undefined}
        aria-disabled={isBusy || undefined}
        onClick={isBusy ? (event) => event.preventDefault() : linkProps.onClick}
      >
        {contentWrapper}
        {!replacesContent && activeShortcut && <kbd className="mm-button__shortcut">{activeShortcut}</kbd>}
        {progressBar}
      </a>
    );
  }

  const buttonProps = props as ButtonProps;
  return (
    <button
      {...buttonProps}
      style={{ ...buttonStyle, ...buttonProps.style }}
      type={buttonProps.type ?? 'button'}
      className={classes}
      aria-label={replacesContent ? loadingLabel : buttonProps['aria-label']}
      disabled={buttonProps.disabled || isBusy}
      aria-busy={isBusy || undefined}
      aria-keyshortcuts={activeShortcut || undefined}
    >
      {contentWrapper}
      {!replacesContent && activeShortcut && <kbd className="mm-button__shortcut">{activeShortcut}</kbd>}
      {progressBar}
    </button>
  );
});

export const Button = memo(function Button(props: AnyButtonProps) {
  return canUseSimpleButton(props) ? <SimpleButton {...props} /> : <FullButton {...props} />;
});
