import { type HTMLAttributes, type ReactNode } from 'react';
import './Text.css';
export type TextTone = 'default' | 'secondary' | 'success' | 'warning' | 'danger';
export type TextEllipsis = boolean | {
    rows?: number;
    expandable?: boolean;
    onExpand?: (expanded: boolean) => void;
};
export type TextCopyable = boolean | {
    text?: string;
    onCopy?: () => void;
    label?: string;
};
export type TextEditable = boolean | {
    editing?: boolean;
    defaultValue?: string;
    onStart?: () => void;
    onChange?: (value: string) => void;
    onEnd?: (value: string) => void;
};
export type TextProps = Omit<HTMLAttributes<HTMLElement>, 'children' | 'color'> & {
    children?: ReactNode;
    code?: boolean;
    copyable?: TextCopyable;
    delete?: boolean;
    disabled?: boolean;
    editable?: TextEditable;
    ellipsis?: TextEllipsis;
    italic?: boolean;
    mark?: boolean;
    strong?: boolean;
    tone?: TextTone;
    underline?: boolean;
};
export type TextParagraphProps = TextProps & {
    fullWidth?: boolean;
};
export type TextHeadingLevel = 1 | 2 | 3 | 4 | 5;
export type TextHeadingProps = TextProps & {
    level?: TextHeadingLevel;
};
declare function TextSpan(props: TextProps): import("react").JSX.Element;
declare function TextParagraph(props: TextParagraphProps): import("react").JSX.Element;
declare function TextHeading({ level, ...props }: TextHeadingProps): import("react").JSX.Element;
export declare const Text: typeof TextSpan & {
    P: typeof TextParagraph;
    H: typeof TextHeading;
};
export type TextComponent = typeof Text;
export {};
