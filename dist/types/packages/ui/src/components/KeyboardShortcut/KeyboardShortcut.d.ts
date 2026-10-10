import { type HTMLAttributes } from 'react';
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
export declare function KeyboardShortcut({ keys, mac, win, platform, onTrigger, preventDefault, stopPropagation, ignoreEditable, disabled, size, variant, separator, label, className, ...props }: KeyboardShortcutProps): import("react").JSX.Element;
