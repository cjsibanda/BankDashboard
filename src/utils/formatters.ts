export function formatCurrency(cents: number, currency: string = 'CAD'): string {
  const amount = cents / 100;
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}