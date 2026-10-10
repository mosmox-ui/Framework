import { useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import './Text.css';

export type TextTone = 'default' | 'secondary' | 'success' | 'warning' | 'danger';
export type TextEllipsis = boolean | { rows?: number; expandable?: boolean; onExpand?: (expanded: boolean) => void };
export type TextCopyable = boolean | { text?: string; onCopy?: () => void; label?: string };
export type TextEditable = boolean | { editing?: boolean; defaultValue?: string; onStart?: () => void; onChange?: (value: string) => void; onEnd?: (value: string) => void };
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
export type TextParagraphProps = TextProps & { fullWidth?: boolean };
export type TextHeadingLevel = 1 | 2 | 3 | 4 | 5;
export type TextHeadingProps = TextProps & { level?: TextHeadingLevel };

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

function TextPrimitive({ as: Component, children, className, code, copyable, delete: deleted, disabled, editable, ellipsis, italic, mark, strong, tone = 'default', underline, ...rest }: TextProps & { as: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' }) {
  const editConfig = typeof editable === 'object' ? editable : {};
  const initialValue = editConfig.defaultValue ?? (typeof children === 'string' ? children : '');
  const [value, setValue] = useState(initialValue);
  const [editing, setEditing] = useState(typeof editable === 'object' && editable.editing === true);
  const [expanded, setExpanded] = useState(false);
  const isEllipsis = Boolean(ellipsis);
  const ellipsisConfig = typeof ellipsis === 'object' ? ellipsis : {};
  const copyConfig = typeof copyable === 'object' ? copyable : {};
  const editValue = value || initialValue;
  const toggleEdit = () => { if (!editable) return; if (!editing) { setEditing(true); editConfig.onStart?.(); } };
  const finishEdit = () => { setEditing(false); editConfig.onChange?.(editValue); editConfig.onEnd?.(editValue); };
  const copy = async () => { const copyValue = copyConfig.text ?? editValue; try { await navigator.clipboard?.writeText(copyValue); } catch { /* Clipboard may be unavailable in restricted contexts. */ } copyConfig.onCopy?.(); };
  const toggleExpanded = () => { const next = !expanded; setExpanded(next); ellipsisConfig.onExpand?.(next); };
  if (editing) return <span className={cx('mm-text-editable', className)}><textarea aria-label="Edit text" autoFocus className="mm-text__editor" onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); finishEdit(); } if (event.key === 'Escape') setEditing(false); }} value={editValue} /><button className="mm-text__action" onClick={finishEdit} type="button">Save</button></span>;
  const content = value || children;
  const ellipsisStyle: CSSProperties | undefined = !expanded && ellipsisConfig.rows ? { display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: ellipsisConfig.rows, whiteSpace: 'normal' } : undefined;
  return <span className={cx('mm-text-wrap', isEllipsis && !expanded && 'mm-text-wrap--ellipsis', className)}>
    <Component {...rest} style={{ ...rest.style, ...ellipsisStyle }} className={cx('mm-text', `mm-text--${tone}`, strong && 'mm-text--strong', italic && 'mm-text--italic', underline && 'mm-text--underline', deleted && 'mm-text--delete', mark && 'mm-text--mark', code && 'mm-text--code', disabled && 'mm-text--disabled')} onClick={editable ? toggleEdit : rest.onClick}>{content}</Component>
    {isEllipsis && ellipsisConfig.expandable && <button aria-expanded={expanded} className="mm-text__action" onClick={toggleExpanded} type="button">{expanded ? 'Collapse' : 'Expand'}</button>}
    {copyable && <button aria-label={copyConfig.label ?? 'Copy text'} className="mm-text__action" onClick={copy} type="button">Copy</button>}
  </span>;
}

function TextSpan(props: TextProps) { return <TextPrimitive as="span" {...props} />; }
function TextParagraph(props: TextParagraphProps) { const { fullWidth = true, ...rest } = props; return <TextPrimitive as="p" {...rest} className={cx(fullWidth && 'mm-text--full-width', props.className)} />; }
function TextHeading({ level = 1, ...props }: TextHeadingProps) { return <TextPrimitive as={`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5'} {...props} />; }

export const Text = Object.assign(TextSpan, { P: TextParagraph, H: TextHeading });
export type TextComponent = typeof Text;
