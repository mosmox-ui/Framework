import { useState, type CSSProperties, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { useConfig } from '../ConfigProvider';
import './CodeBlock.css';

export type CodeBlockSize = 'sm' | 'default' | 'lg';
export type CodeBlockTheme = 'light' | 'dark' | 'black' | 'github' | 'solarized' | 'dracula' | 'nord' | 'monokai' | 'ocean' | 'high-contrast';

export type CodeBlockProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title'> & {
  code: string;
  language?: string;
  title?: ReactNode;
  showHeader?: boolean;
  showLineNumbers?: boolean;
  lineNumberStart?: number;
  onLineClick?: (lineNumber: number, code: string) => void;
  highlightLines?: number[];
  wrap?: boolean;
  copyable?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
  onCopy?: (code: string) => void;
  size?: CodeBlockSize;
  theme?: CodeBlockTheme;
  syntaxHighlight?: boolean;
  radius?: number | string;
  maxHeight?: number | string;
  tabSize?: number;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const cssLength = (value?: number | string) => typeof value === 'number' ? `${value}px` : value;

function highlightLine(line: string, enabled: boolean) {
  if (!enabled) return line || ' ';
  const tokenPattern = /(\/\/.*|\/\*[\s\S]*?\*\/|#[a-fA-F0-9]{3,8}|`[^`]*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(?:\.\d+)?\b|\b(?:const|let|var|function|return|if|else|for|while|class|export|import|from|new|true|false|null|undefined|async|await|type|interface|extends)\b)/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = tokenPattern.exec(line))) {
    if (match.index > lastIndex) parts.push(line.slice(lastIndex, match.index));
    const token = match[0];
    const tokenClass = token.startsWith('//') || token.startsWith('/*') ? 'comment' : token.startsWith('"') || token.startsWith("'") || token.startsWith('`') ? 'string' : /^\d/.test(token) ? 'number' : /^(true|false|null|undefined)$/.test(token) ? 'literal' : /^(const|let|var|function|return|if|else|for|while|class|export|import|from|new|async|await|type|interface|extends)$/.test(token) ? 'keyword' : 'value';
    parts.push(<span className={`mm-code-block__token mm-code-block__token--${tokenClass}`} key={`${match.index}-${token}`}>{token}</span>);
    lastIndex = match.index + token.length;
  }
  if (lastIndex < line.length) parts.push(line.slice(lastIndex));
  return parts.length ? parts : ' ';
}

export function CodeBlock({ code, language, title, showHeader = true, showLineNumbers, lineNumberStart = 1, onLineClick, highlightLines = [], wrap = false, copyable, copyLabel, copiedLabel, onCopy, size = 'default', theme, syntaxHighlight = true, radius, maxHeight, tabSize = 2, className, style, ...rest }: CodeBlockProps) {
  const { components } = useConfig();
  const config = components.codeBlock;
  const [copied, setCopied] = useState(false);
  const shouldCopy = copyable ?? config?.copyable ?? true;
  const activeTheme = theme ?? config?.theme ?? 'dark';
  const lines = code.replace(/\n$/, '').split('\n');
  const styleVariables = {
    ...(config?.radius && { '--mm-code-block-radius': config.radius }),
    ...(config?.fontSize && { '--mm-code-block-font-size': config.fontSize }),
    ...(radius !== undefined && { '--mm-code-block-radius': cssLength(radius) }),
    ...(maxHeight !== undefined && { '--mm-code-block-max-height': cssLength(maxHeight) }),
    '--mm-code-block-tab-size': tabSize,
    ...style,
  } as CSSProperties;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      onCopy?.(code);
      window.setTimeout(() => setCopied(false), 1600);
    } catch { setCopied(false); }
  };
  const accessibleCopyLabel = copied ? (copiedLabel ?? 'Copied') : (copyLabel ?? 'Copy code');
  return (
    <div aria-label={typeof title === 'string' ? title : undefined} className={cx('mm-code-block', `mm-code-block--${activeTheme}`, `mm-code-block--${size}`, wrap && 'mm-code-block--wrap', className)} style={styleVariables} {...rest}>
      {showHeader && (title || language || shouldCopy) && <div className="mm-code-block__header">
        <div className="mm-code-block__heading">{title && <span className="mm-code-block__title">{title}</span>}{language && <span className="mm-code-block__language">{language}</span>}</div>
        {shouldCopy && <button aria-label={accessibleCopyLabel} className="mm-code-block__copy" onClick={copy} type="button">{accessibleCopyLabel}</button>}
      </div>}
      <pre className="mm-code-block__pre"><code className="mm-code-block__code">{lines.map((line, index) => {
        const lineNumber = lineNumberStart + index;
        const lineIsInteractive = Boolean(onLineClick);
        return <span className={cx('mm-code-block__line', highlightLines.includes(lineNumber) && 'mm-code-block__line--highlight')} key={`${lineNumber}-${line}`}>
          {showLineNumbers && <span aria-hidden="true" className="mm-code-block__line-number">{lineNumber}</span>}
          {lineIsInteractive ? <span className="mm-code-block__content mm-code-block__line-hit-area" onClick={() => onLineClick?.(lineNumber, line)} onKeyDown={(event: KeyboardEvent<HTMLSpanElement>) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onLineClick?.(lineNumber, line); } }} role="button" tabIndex={0}>{highlightLine(line, syntaxHighlight)}</span> : null}
          {!lineIsInteractive && <span className="mm-code-block__content">{highlightLine(line, syntaxHighlight)}</span>}
        </span>;
      })}</code></pre>
    </div>
  );
}
