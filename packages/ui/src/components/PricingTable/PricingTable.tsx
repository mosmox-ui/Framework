import { useConfig } from '../ConfigProvider';
import type { CSSProperties, ReactNode } from 'react';
import './PricingTable.css';

export type PricingTableSize = 'sm' | 'default' | 'lg';
export type PricingTableVariant = 'cards' | 'bordered' | 'flat' | 'spotlight' | 'compact';

export type PricingFeature = {
  key?: string;
  label: ReactNode;
  included?: boolean;
  tooltip?: ReactNode;
  value?: ReactNode;
  highlight?: boolean;
};

export type PricingPlan = {
  key: string;
  name: ReactNode;
  price: ReactNode;
  billing?: ReactNode;
  description?: ReactNode;
  features?: PricingFeature[];
  action?: ReactNode;
  actionLabel?: ReactNode;
  badge?: ReactNode;
  icon?: ReactNode;
  popular?: boolean;
  disabled?: boolean;
  accent?: string;
};

export type PricingTableProps = {
  'aria-label'?: string;
  className?: string;
  columns?: number;
  currency?: string;
  defaultSelectedKey?: string;
  fullWidth?: boolean;
  heading?: ReactNode;
  onSelect?: (plan: PricingPlan) => void;
  plans: PricingPlan[];
  renderFeature?: (feature: PricingFeature, plan: PricingPlan) => ReactNode;
  renderPlanAction?: (plan: PricingPlan) => ReactNode;
  selectedKey?: string;
  showFeatureStates?: boolean;
  size?: PricingTableSize;
  style?: CSSProperties;
  variant?: PricingTableVariant;
};

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

export function PricingTable({
  'aria-label': ariaLabel,
  className,
  columns,
  currency,
  defaultSelectedKey,
  fullWidth = true,
  heading,
  onSelect,
  plans,
  renderFeature,
  renderPlanAction,
  selectedKey,
  showFeatureStates = true,
  size,
  style,
  variant,
}: PricingTableProps) {
  const { components } = useConfig();
  const config = components.pricingTable;
  const resolvedColumns = columns ?? config?.columns ?? Math.min(Math.max(plans.length, 1), 4);
  const resolvedSize = size ?? config?.size ?? 'default';
  const resolvedVariant = variant ?? config?.variant ?? 'cards';
  const activeKey = selectedKey ?? defaultSelectedKey;
  const styleVariables = { '--mm-pricing-columns': Math.max(1, Math.min(resolvedColumns, 6)), ...style } as CSSProperties;
  const formatPrice = (price: ReactNode) => typeof price === 'number' && currency ? new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(price) : price;
  return <section aria-label={ariaLabel} className={cx('mm-pricing-table', `mm-pricing-table--${resolvedVariant}`, `mm-pricing-table--${resolvedSize}`, fullWidth && 'mm-pricing-table--full-width', className)} style={styleVariables}>
    {heading && <div className="mm-pricing-table__heading">{heading}</div>}
    <div className="mm-pricing-table__grid">
      {plans.map((plan) => <article aria-label={typeof plan.name === 'string' ? plan.name : undefined} className={cx('mm-pricing-table__plan', plan.popular && 'mm-pricing-table__plan--popular', activeKey === plan.key && 'mm-pricing-table__plan--selected', plan.disabled && 'mm-pricing-table__plan--disabled')} key={plan.key} style={plan.accent ? { '--mm-pricing-accent': plan.accent } as CSSProperties : undefined}>
        {plan.badge && <div className="mm-pricing-table__badge">{plan.badge}</div>}
        {plan.icon && <div className="mm-pricing-table__icon" aria-hidden="true">{plan.icon}</div>}
        <h3 className="mm-pricing-table__name">{plan.name}</h3>
        {plan.description && <p className="mm-pricing-table__description">{plan.description}</p>}
        <div className="mm-pricing-table__price">{formatPrice(plan.price)}{plan.billing && <span className="mm-pricing-table__billing">{plan.billing}</span>}</div>
        <div className="mm-pricing-table__action">{renderPlanAction ? renderPlanAction(plan) : plan.action ?? <button className="mm-pricing-table__button" disabled={plan.disabled} onClick={() => onSelect?.(plan)} type="button">{plan.actionLabel ?? 'Choose plan'}</button>}</div>
        {plan.features && <ul className="mm-pricing-table__features">{plan.features.map((feature, index) => <li className={cx(!feature.included && showFeatureStates && 'mm-pricing-table__feature--excluded', feature.highlight && 'mm-pricing-table__feature--highlight')} key={feature.key ?? `${plan.key}-${index}`} title={typeof feature.tooltip === 'string' ? feature.tooltip : undefined}>{showFeatureStates && <span aria-hidden="true" className="mm-pricing-table__feature-mark">{feature.included === false ? '–' : '✓'}</span>}<span>{renderFeature ? renderFeature(feature, plan) : feature.value ?? feature.label}</span></li>)}</ul>}
      </article>)}
    </div>
  </section>;
}
