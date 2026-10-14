import React from 'react';
import { MOCK_HOLDINGS } from '../../data/mockInvestments';
import { formatCurrency } from '../../utils/formatters';

export const InvestmentsView: React.FC = () => {
  // Calculate aggregate portfolio metrics using integer cents
  const summary = MOCK_HOLDINGS.reduce(
    (acc, holdings) => {
      const marketValue = holdings.shares * holdings.currentPriceCents;
      const costBasis = holdings.shares * holdings.averagePriceCents;
      return {
        totalValueCents: acc.totalValueCents + marketValue,
        totalCostCents: acc.totalCostCents + costBasis,
      };
    },
    { totalValueCents: 0, totalCostCents: 0 }
  );

  const unrealizedGainLossCents = summary.totalValueCents - summary.totalCostCents;
  const returnPercentage = summary.totalCostCents > 0 
    ? (unrealizedGainLossCents / summary.totalCostCents) * 100 
    : 0;

  const isPositiveGain = unrealizedGainLossCents >= 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Investment Portfolio</h1>
          <p className="text-sm text-slate-500">Track equity holdings, ETFs, and fixed-income assets.</p>
        </div>
      </header>

      {/* Portfolio Summary Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Portfolio Value</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {formatCurrency(summary.totalValueCents, 'CAD')}
          </p>
          <span className="text-xs text-emerald-700 font-medium mt-1 block">Live market valuation</span>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Cost Basis</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {formatCurrency(summary.totalCostCents, 'CAD')}
          </p>
          <span className="text-xs text-slate-500 font-medium mt-1 block">Principal invested</span>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Unrealized Return</span>
          <p className={`text-2xl font-bold mt-1 ${isPositiveGain ? 'text-emerald-700' : 'text-red-600'}`}>
            {isPositiveGain ? '+' : ''}{formatCurrency(unrealizedGainLossCents, 'CAD')} ({returnPercentage.toFixed(2)}%)
          </p>
          <span className="text-xs text-slate-500 font-medium mt-1 block">All-time performance</span>
        </div>
      </div>

      {/* Visual Allocation Bar */}
      <div>
        <div>
          <h3>Asset Class Allocation</h3>
          <span>Balanced Diversified Portfolio</span>
        </div>

        {/* Multi-Segmented Progress Bar */}
        <div>
          <div></div>
        </div>

        {/* Legend */}
        <div>
          <span>ETFs (45%)</span>
          <span>Equities (30%)</span>
          <span>Fixed Income (15%)</span>
          <span>Cash (10%)</span>
        </div>
      </div>
      

      {/* Holdings Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Holdings Breakdown</h2>
          <span className="text-xs font-semibold text-slate-500">{MOCK_HOLDINGS.length} Assets Registered</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                <th className="py-3 px-6">Asset / Ticker</th>
                <th className="py-3 px-6">Asset Class</th>
                <th className="py-3 px-6 text-right">Shares</th>
                <th className="py-3 px-6 text-right">Avg Price</th>
                <th className="py-3 px-6 text-right">Current Price</th>
                <th className="py-3 px-6 text-right">Total Value</th>
                <th className="py-3 px-6 text-right">Return</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {MOCK_HOLDINGS.map((holding) => {
                const marketValue = holding.shares * holding.currentPriceCents;
                const costBasis = holding.shares * holding.averagePriceCents;
                const gainLoss = marketValue - costBasis;
                const gainLossPct = costBasis > 0 ? (gainLoss / costBasis) * 100 : 0;
                const isGain = gainLoss >= 0;

                return (
                  <tr key={holding.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-bold text-slate-900 block">{holding.ticker}</span>
                      <span className="text-xs text-slate-500">{holding.name}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {holding.assetClass}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-medium text-slate-900">{holding.shares.toLocaleString()}</td>
                    <td className="py-4 px-6 text-right text-slate-600">{formatCurrency(holding.averagePriceCents, 'CAD')}</td>
                    <td className="py-4 px-6 text-right font-semibold text-slate-900">{formatCurrency(holding.currentPriceCents, 'CAD')}</td>
                    <td className="py-4 px-6 text-right font-bold text-slate-900">{formatCurrency(marketValue, 'CAD')}</td>
                    <td className={`py-4 px-6 text-right font-semibold ${isGain ? 'text-emerald-700' : 'text-red-600'}`}>
                      {isGain ? '+' : ''}{formatCurrency(gainLoss, 'CAD')} ({gainLossPct.toFixed(1)}%)
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};