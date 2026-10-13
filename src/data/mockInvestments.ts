import type { Holding } from '../types/investment';

export const MOCK_HOLDINGS: Holding[] = [
    {
        id: 'h_1',
        ticker: 'ZSCO',
        name: 'Zisco Core Equity ETF Portfolio',
        shares: 450,
        averagePriceCents: 2850, // $28.50 per share
        currentPriceCents: 3125, // $31.25 per share
        assetClass: 'ETF',
    },
    {
        id: 'h_2',
        ticker: 'TGER',
        name: 'Treger Industries.',
        shares: 25,
        averagePriceCents: 21000, // $210.00 per share
        currentPriceCents: 23550, // $235.50 per share
        assetClass: 'EQUITY',
    },
    {
        id: 'h_3',
        ticker: 'CASH.NM',
        name: 'NMB Trust High Interest Savings ETF',
        shares: 1300,
        averagePriceCents: 5000, // $50.00 per share
        currentPriceCents: 5012, // $50.12 per share
        assetClass: 'CASH' 
    },
    {
        id: 'h_4',
        ticker: 'ZGB',
        name: 'IShares Core Zim Bond Index ETF',
        shares: 180,
        averagePriceCents: 1750, // $17.50 per share
        assetsClass: 'FIXED_INCOME',
    },
];