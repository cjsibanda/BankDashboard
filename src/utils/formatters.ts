///////////////////////////////////////////////////////////////////////////
// to 'safely' transform intger cents into readable currency strings
//////////////////////////////////////////////////////////////////////////
export const formatCurrency = (amountCents: number, currency: 'CAD' | 'USD' = 'CAD'): string => {
    const dollars = amountCents / 100;
    return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(dollars);
};

