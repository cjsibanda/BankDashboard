export type AssetClass = 'EQUITY' | 'FIXED_INCOME' | 'ETF' | 'CASH';

export interface Holding {
    id: string;
    ticker: string;
    name: string;
    shares: number;
    averagePriceCents: number;
    currentPriceCents: number;
    assetClass: AssetClass;
}

export interface PortfolioSummary {
    totalValueCents: number;
    totalCostCents: number;
    unrealizedGainLossCents: number;
    returnPercentage: number;
}