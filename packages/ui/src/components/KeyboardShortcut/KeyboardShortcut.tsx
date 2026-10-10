import { useEffect, useMemo, useState, type HTMLAttributes } from 'react';
import './KeyboardShortcut.css';

export type KeyboardShortcutSize = 'xs' | 'sm' | 'default';
export type KeyboardShortcutVariant = 'subtle' | 'outline' | 'solid';
export type KeyboardShortcutPlatform = 'auto' | 'mac' | 'win';

export type KeyboardShortcutProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** Shortcut tokens such as `Ctrl+K`, `⌘K`, or `['Ctrl', 'Shift', 'P']`. */
  keys: string | string[];
  /** macOS-specific shortcut. Falls back to `keys` when omitted. */
  mac?: string | string[];
  /** Windows/Linux-specific shortcut. Falls back to `keys` when omitted. */
  win?: string | string[];
  /** Selects the displayed platform. `auto` detects macOS/iOS in the browser. */
  platform?: KeyboardShortcutPlatform;
  /** Called when the shortcut is pressed. The listener is only installed when provided. */
  onTrigger?: () => void;
  /** Prevents the browser default action when `onTrigger` runs. */
  preventDefault?: boolean;
  /** Stops the shortcut event from reaching other listeners when `onTrigger` runs. */
  stopPropagation?: boolean;
  /** Ignores shortcuts typed inside inputs, textareas, selects, and contenteditable elements. */
  ignoreEditable?: boolean;
  /** Disables the visual state and keyboard listener. */
  disabled?: boolean;
  size?: KeyboardShortcutSize;
  variant?: KeyboardShortcutVariant;
  /** Text between keycaps. Defaults to `+`. */
  separator?: string;
  /** Accessible name for the shortcut. */
  label?: string;
};

type ShortcutToken = { display: string; value: string; modifier?: 'alt' | 'ctrl' | 'meta' | 'shift' };

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const isMacOS = () => typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(`${navigator.platform} ${navigator.userAgent}`);

function splitShortcut(shortcut: string | string[]): string[] {
  if (Array.isArray(shortcut)) return shortcut.flatMap((token) => splitShortcut(token));
  const value = shortcut.trim();
  if (!value) return [];
  if (value.includes('+')) return value.split('+').map((token) => token.trim()).filter(Boolean);
  return value.match(/⌘|⌥|⇧|⌃|Ctrl|Control|Cmd|Command|Alt|Option|Shift|Meta|Enter|Return|Escape|Esc|Space|Tab|Backspace|Delete|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Home|End|PageUp|PageDown|F\d{1,2}|[\w]/gi) ?? [value];
}

function normalizeToken(token: string): ShortcutToken {
  const normalized = token.trim();
  const lower = normalized.toLowerCase();
  if (normalized === '⌘' || lower === 'cmd' || lower === 'command' || lower === 'meta') return { display: '⌘', value: 'meta', modifier: 'meta' };
  if (normalized === '⌥' || lower === 'alt' || lower === 'option') return { display: '⌥', value: 'alt', modifier: 'alt' };
  if (normalized === '⇧' || lower === 'shift') return { display: '⇧', value: 'shift', modifier: 'shift' };
  if (normalized === '⌃' || lower === 'ctrl' || lower === 'control') return { display: 'Ctrl', value: 'ctrl', modifier: 'ctrl' };
  const display = lower === 'escape' ? 'Esc' : lower === 'return' ? 'Enter' : normalized;
  return { display, value: lower };
}

function eventKeyMatches(token: ShortcutToken, event: KeyboardEvent) {
  const key = event.key.toLowerCase();
  const aliases: Record<string, string[]> = {
    esc: ['esc', 'escape'],
    enter: ['enter', 'return'],
    space: [' ', 'spacebar', 'space'],
    backspace: ['backspace'],
    delete: ['delete', 'del'],
    arrowup: ['arrowup', 'up'],
    arrowdown: ['arrowdown', 'down'],
    arrowleft: ['arrowleft', 'left'],
    arrowright: ['arrowright', 'right'],
  };
  return (aliases[token.value] ?? [token.value]).includes(key);
}

function toAriaKeyShortcuts(tokens: ShortcutToken[]) {
  return tokens.map((token) => {
    if (token.modifier === 'meta') return 'Meta';
    if (token.modifier === 'ctrl') return 'Control';
    if (token.modifier === 'alt') return 'Alt';
    if (token.modifier === 'shift') return 'Shift';
    return token.display === ' ' ? 'Space' : token.display;
  }).join('+');
}

export function KeyboardShortcut({
  keys,
  mac,
  win,
  platform = 'auto',
  onTrigger,
  preventDefault = true,
  stopPropagation = false,
  ignoreEditable = true,
  disabled = false,
  size = 'default',
  variant = 'subtle',
  separator = '+',
  label,
  className,
  ...props
}: KeyboardShortcutProps) {
  const [detectedPlatform, setDetectedPlatform] = useState<'mac' | 'win'>('win');

  useEffect(() => {
    setDetectedPlatform(isMacOS() ? 'mac' : 'win');
  }, []);

  const activePlatform = platform === 'auto' ? detectedPlatform : platform;
  const activeShortcut = activePlatform === 'mac' ? (mac ?? keys) : (win ?? keys);
  const tokens = useMemo(() => splitShortcut(activeShortcut).map(normalizeToken), [activeShortcut]);
  const accessibleLabel = label ?? tokens.map((token) => token.display).join(' ');
  const ariaShortcut = toAriaKeyShortcuts(tokens);

  useEffect(() => {
    if (!onTrigger || disabled || tokens.length === 0) return;

    const modifiers = {
      alt: tokens.some((token) => token.modifier === 'alt'),
      ctrl: tokens.some((token) => token.modifier === 'ctrl'),
      meta: tokens.some((token) => token.modifier === 'meta'),
      shift: tokens.some((token) => token.modifier === 'shift'),
    };
    const mainToken = [...tokens].reverse().find((token) => !token.modifier);
    if (!mainToken) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditable = Boolean(target?.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName ?? ''));
      if (ignoreEditable && isEditable) return;
      if (event.altKey !== modifiers.alt || event.ctrlKey !== modifiers.ctrl || event.metaKey !== modifiers.meta || event.shiftKey !== modifiers.shift) return;
      if (!eventKeyMatches(mainToken, event)) return;
      if (preventDefault) event.preventDefault();
      if (stopPropagation) event.stopPropagation();
      onTrigger();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, ignoreEditable, onTrigger, preventDefault, stopPropagation, tokens]);

  return (
    <span {...props} aria-label={accessibleLabel} aria-keyshortcuts={ariaShortcut} className={cx('mm-keyboard-shortcut', `mm-keyboard-shortcut--${size}`, `mm-keyboard-shortcut--${variant}`, disabled && 'mm-keyboard-shortcut--disabled', className)} role="img">
      {tokens.map((token, index) => (
        <span className="mm-keyboard-shortcut__part" key={`${token.value}-${index}`}>
          {index > 0 && <span aria-hidden="true" className="mm-keyboard-shortcut__separator">{separator}</span>}
          <kbd>{token.display}</kbd>
        </span>
      ))}
    </span>
  );
}
