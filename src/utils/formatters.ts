/**
 * Safe formatting utilities for AgriFlow & FoodPack AI
 * Guarantees zero crashes on undefined, null, NaN, or invalid inputs.
 */

/**
 * Format a number with thousands separators (Indian numbering standard).
 * Handles undefined, null, NaN gracefully.
 */
export function formatNumber(
  value: number | string | null | undefined,
  decimalsOrFallback: number | string = 0,
  fallback: string = '—'
): string {
  let decimals = 0;
  let fb = fallback;
  if (typeof decimalsOrFallback === 'string') {
    fb = decimalsOrFallback;
  } else {
    decimals = decimalsOrFallback;
  }
  if (value === null || value === undefined || value === '') return fb;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return fb;
  try {
    return decimals > 0
      ? num.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : num.toLocaleString('en-IN');
  } catch {
    return String(num);
  }
}

/**
 * Format a currency amount in Indian Rupees (₹).
 * Options allow controlling decimal points and currency symbol prefix.
 */
export function formatCurrency(
  value: number | string | null | undefined,
  options?: {
    showRupee?: boolean;
    decimals?: number;
    fallback?: string;
  } | string
): string {
  const opts = typeof options === 'string' ? { fallback: options } : options;
  const { showRupee = true, decimals = 0, fallback = '₹0' } = opts || {};
  if (value === null || value === undefined || value === '') return fallback;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return fallback;

  try {
    const formatted = decimals > 0
      ? num.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : Math.round(num).toLocaleString('en-IN');
    return showRupee ? `₹${formatted}` : formatted;
  } catch {
    return showRupee ? `₹${num}` : String(num);
  }
}

/**
 * Format a date timestamp into a readable localized date string.
 */
export function formatDate(
  value: string | number | Date | null | undefined,
  fallback: string = 'N/A'
): string {
  if (!value) return fallback;
  try {
    const date = typeof value === 'string' || typeof value === 'number' ? new Date(value) : value;
    if (isNaN(date.getTime())) return fallback;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return fallback;
  }
}

/**
 * Format a time timestamp into a readable localized time string.
 */
export function formatTime(
  value: string | number | Date | null | undefined,
  fallback: string = '—'
): string {
  if (!value) return fallback;
  try {
    const date = typeof value === 'string' || typeof value === 'number' ? new Date(value) : value;
    if (isNaN(date.getTime())) return fallback;
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return fallback;
  }
}

/**
 * Format a percentage value.
 */
export function formatPercent(
  value: number | string | null | undefined,
  decimals: number = 0,
  fallback: string = '0%'
): string {
  if (value === null || value === undefined || value === '') return fallback;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return fallback;
  return `${num.toFixed(decimals)}%`;
}
