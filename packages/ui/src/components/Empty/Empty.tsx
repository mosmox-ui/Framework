import { useConfig, type Locale } from '../ConfigProvider';
import type { ReactNode } from 'react';
import './Empty.css';

export type EmptySize = 'sm' | 'default';
export type EmptyLocale = Locale;

export type EmptyProps = {
  'aria-label'?: string;
  actions?: ReactNode;
  bordered?: boolean;
  children?: ReactNode;
  className?: string;
  content?: ReactNode;
  description?: ReactNode;
  fullWidth?: boolean;
  image?: ReactNode;
  imageContent?: ReactNode;
  imageAlt?: string;
  imageSrc?: string;
  locale?: EmptyLocale;
  size?: EmptySize;
  subtitle?: ReactNode;
  title?: ReactNode;
};

const translations: Record<EmptyLocale, { description: string; title: string }> = {
  en: { description: 'There is no information to display here yet.', title: 'Nothing here yet' },
  uk: { description: 'Тут поки що немає інформації для відображення.', title: 'Тут поки що нічого немає' },
  de: { description: 'Hier gibt es noch keine Informationen anzuzeigen.', title: 'Noch nichts vorhanden' },
  fr: { description: "Aucune information à afficher pour le moment.", title: 'Rien ici pour le moment' },
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function Empty({
  'aria-label': ariaLabel,
  actions,
  bordered,
  children,
  className,
  content,
  description,
  fullWidth = false,
  image,
  imageContent,
  imageAlt = '',
  imageSrc = '/empty/empty-state-illustration.png',
  locale,
  size,
  subtitle,
  title,
}: EmptyProps) {
  const { components, locale: globalLocale } = useConfig();
  const config = components.empty;
  const resolvedBordered = bordered ?? config?.bordered ?? true;
  const resolvedSize = size ?? config?.size ?? 'default';
  const language = translations[locale ?? globalLocale];
  const body = content ?? children;
  return <section aria-label={ariaLabel} className={cx('mm-empty', `mm-empty--${resolvedSize}`, resolvedBordered && 'mm-empty--bordered', fullWidth && 'mm-empty--full-width', className)}>
    <div className="mm-empty__inner">
      {imageContent ?? image ?? <img alt={imageAlt} className="mm-empty__image" src={imageSrc} />}
      {subtitle && <div className="mm-empty__subtitle">{subtitle}</div>}
      <h2 className="mm-empty__title">{title ?? language.title}</h2>
      <div className="mm-empty__description">{description ?? language.description}</div>
      {body && <div className="mm-empty__content">{body}</div>}
      {actions && <div className="mm-empty__actions">{actions}</div>}
    </div>
  </section>;
}
