import type { Holding } from '../types/investment';

export const MOCK_HOLDINGS: Holding[] = [
  {
    id: 'h_1',
    ticker: 'ZISCO',
    name: 'iZisco Core Equity ETF Portfolio',
    shares: 450,
    averagePriceCents: 2850, // $28.50 per share
    currentPriceCents: 3125, // $31.25 per share
    assetClass: 'ETF',
  },
  {
    id: 'h_2',
    ticker: 'ZMDC',
    name: 'ZMDC Inc.',
    shares: 25,
    averagePriceCents: 21000, // $210.00 per share
    currentPriceCents: 23550, // $235.50 per share
    assetClass: 'EQUITY',
  },
  {
    id: 'h_3',
    ticker: 'CASH.TO',
    name: 'CJs X High Interest Savings ETF',
    shares: 1200,
    averagePriceCents: 5000, // $50.00 per share
    currentPriceCents: 5012, // $50.12 per share
    assetClass: 'CASH',
  },
  {
    id: 'h_4',
    ticker: 'NGB',
    name: 'iShares Core Government Bond Index ETF',
    shares: 180,
    averagePriceCents: 1750, // $17.50 per share
    currentPriceCents: 1810, // $18.10 per share
    assetClass: 'FIXED_INCOME',
  },
];