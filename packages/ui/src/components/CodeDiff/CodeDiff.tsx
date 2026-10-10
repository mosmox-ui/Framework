import { useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import type { CodeBlockSize, CodeBlockTheme } from '../CodeBlock';
import './CodeDiff.css';

export type CodeDiffView = 'unified' | 'split';

export type CodeDiffProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title'> & {
  oldCode?: string;
  newCode?: string;
  diff?: string;
  language?: string;
  title?: ReactNode;
  oldLabel?: ReactNode;
  newLabel?: ReactNode;
  view?: CodeDiffView;
  showHeader?: boolean;
  showLineNumbers?: boolean;
  copyable?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
  onCopy?: (code: string) => void;
  size?: CodeBlockSize;
  theme?: CodeBlockTheme;
  wrap?: boolean;
  radius?: number | string;
  maxHeight?: number | string;
  onLineClick?: (lineNumber: number, content: string, kind: 'added' | 'removed' | 'context') => void;
};

type DiffLine = { content: string; kind: 'added' | 'removed' | 'context'; oldNumber?: number; newNumber?: number };

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const cssLength = (value?: number | string) => typeof value === 'number' ? `${value}px` : value;

function fromUnifiedDiff(diff: string): DiffLine[] {
  let oldNumber = 1;
  let newNumber = 1;
  return diff.replace(/\n$/, '').split('\n').filter((line) => !line.startsWith('@@') && !line.startsWith('---') && !line.startsWith('+++')).map((line) => {
    if (line.startsWith('+')) return { content: line.slice(1), kind: 'added', newNumber: newNumber++ };
    if (line.startsWith('-')) return { content: line.slice(1), kind: 'removed', oldNumber: oldNumber++ };
    const content = line.startsWith(' ') ? line.slice(1) : line;
    return { content, kind: 'context', oldNumber: oldNumber++, newNumber: newNumber++ };
  });
}

function fromCodePair(oldCode: string, newCode: string): DiffLine[] {
  const oldLines = oldCode.replace(/\n$/, '').split('\n');
  const newLines = newCode.replace(/\n$/, '').split('\n');
  const lines: DiffLine[] = [];
  const length = Math.max(oldLines.length, newLines.length);
  for (let index = 0; index < length; index += 1) {
    const oldLine = oldLines[index];
    const newLine = newLines[index];
    if (oldLine === newLine) lines.push({ content: oldLine ?? '', kind: 'context', oldNumber: index + 1, newNumber: index + 1 });
    else {
      if (oldLine !== undefined) lines.push({ content: oldLine, kind: 'removed', oldNumber: index + 1 });
      if (newLine !== undefined) lines.push({ content: newLine, kind: 'added', newNumber: index + 1 });
    }
  }
  return lines;
}

export function CodeDiff({ oldCode = '', newCode = '', diff, language, title, oldLabel = 'Before', newLabel = 'After', view = 'unified', showHeader = true, showLineNumbers = true, copyable = true, copyLabel = 'Copy result', copiedLabel = 'Copied', onCopy, size = 'default', theme = 'dark', wrap = false, radius, maxHeight, onLineClick, className, style, ...rest }: CodeDiffProps) {
  const [copied, setCopied] = useState(false);
  const lines = diff !== undefined ? fromUnifiedDiff(diff) : fromCodePair(oldCode, newCode);
  const result = newCode || lines.filter((line) => line.kind !== 'removed').map((line) => line.content).join('\n');
  const styleVariables = { ...(radius !== undefined && { '--mm-code-diff-radius': cssLength(radius) }), ...(maxHeight !== undefined && { '--mm-code-diff-max-height': cssLength(maxHeight) }), ...style } as CSSProperties;
  const copy = async () => {
    try { await navigator.clipboard.writeText(result); setCopied(true); onCopy?.(result); window.setTimeout(() => setCopied(false), 1600); } catch { setCopied(false); }
  };
  return <div className={cx('mm-code-diff', `mm-code-diff--${theme}`, `mm-code-diff--${size}`, `mm-code-diff--${view}`, wrap && 'mm-code-diff--wrap', className)} style={styleVariables} {...rest}>
    {showHeader && (title || language || copyable) && <div className="mm-code-diff__header"><div className="mm-code-diff__heading">{title && <span className="mm-code-diff__title">{title}</span>}{language && <span className="mm-code-diff__language">{language}</span>}</div>{copyable && <button aria-label={copied ? copiedLabel : copyLabel} className="mm-code-diff__copy" onClick={copy} type="button">{copied ? copiedLabel : copyLabel}</button>}</div>}
    {view === 'split' && <div className="mm-code-diff__split-labels"><span>{oldLabel}</span><span>{newLabel}</span></div>}
    <pre className="mm-code-diff__pre"><code>{lines.map((line, index) => <span className={cx('mm-code-diff__line', `mm-code-diff__line--${line.kind}`)} key={`${index}-${line.content}`} onClick={() => onLineClick?.(line.newNumber ?? line.oldNumber ?? index + 1, line.content, line.kind)}>{showLineNumbers && <span className="mm-code-diff__numbers" aria-hidden="true">{view === 'split' ? `${line.oldNumber ?? ''}\t${line.newNumber ?? ''}` : (line.newNumber ?? line.oldNumber ?? '')}</span>}<span className="mm-code-diff__marker" aria-hidden="true">{line.kind === 'added' ? '+' : line.kind === 'removed' ? '-' : ' '}</span><span className="mm-code-diff__content">{line.content || ' '}</span></span>)}</code></pre>
  </div>;
}
