export const PRICING_PLAN_QUERY_PARAM = 'plan';
export const SELECTED_PRICING_PLAN_STORAGE_KEY = 'prometey:selected-pricing-plan';

export const PRICING_PLAN_IDS = [
  'one-month',
  'quarter',
  'half-year',
  'year',
] as const;

export type PricingPlanId = (typeof PRICING_PLAN_IDS)[number];

interface SearchParamsLike {
  get(name: string): string | null;
}

export function isPricingPlanId(value: unknown): value is PricingPlanId {
  return (
    typeof value === 'string' &&
    PRICING_PLAN_IDS.includes(value as PricingPlanId)
  );
}

export function normalizePricingPlanId(value: unknown): PricingPlanId | null {
  return isPricingPlanId(value) ? value : null;
}

export function buildPricingPlanHref(href: string, planId: PricingPlanId): string {
  const separator = href.includes('?') ? '&' : '?';
  return `${href}${separator}${PRICING_PLAN_QUERY_PARAM}=${encodeURIComponent(planId)}`;
}

export function getSelectedPricingPlanFromSearch(
  searchParams: SearchParamsLike,
): PricingPlanId | null {
  return normalizePricingPlanId(searchParams.get(PRICING_PLAN_QUERY_PARAM));
}

export function saveSelectedPricingPlan(planId: PricingPlanId): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SELECTED_PRICING_PLAN_STORAGE_KEY, planId);
}

export function getStoredPricingPlan(): PricingPlanId | null {
  if (typeof window === 'undefined') return null;
  return normalizePricingPlanId(
    window.localStorage.getItem(SELECTED_PRICING_PLAN_STORAGE_KEY),
  );
}

export function resolveSelectedPricingPlan(
  searchParams: SearchParamsLike,
): PricingPlanId | null {
  return getSelectedPricingPlanFromSearch(searchParams) ?? getStoredPricingPlan();
}

export function buildPostAuthHref(planId: PricingPlanId | null): string {
  return planId ? buildPricingPlanHref('/dashboard/subscription', planId) : '/dashboard';
}
