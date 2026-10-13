import React from 'react';
import { MOCK_HOLDING } from '../../data/mockInvestments';
import { formatCurrency } from '../../formatters'; 



export const InvestmentsView: React.FC = () => {
  
      // To calculate aggraate portfolio metrics using integer cents
      const summary = MOCK_HOLDING.reduce(
        (acc, holding) => {
          const marketValue = holding.shares * holding.currentPriceCents;
          const costBasis = holding.shares * holding.averagePriceCents;
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
    <div>
      {/* Header */}
      <header>
        <div>
          <h1>Investment Portfolio</h1>
          <p>Track equity holdings, ETFs, and fixed-income assets.</p>
        </div>
      </header>

      {/* Portfolio Summary Metrics Cards */}
      <div>
        <div>
          <span>Total Portfolio Value</span>
          <p>
            {formatCurrency(summary.totalValueCents, 'CAD')}
          </p>
          <span>Live market valuation</span>
        </div>

        <div>
          <span>Total Cost Basis</span>
          <p>
            {formatCurrency(summary.totalCostCents, 'CAD')}
          </p>
          <span>Principle Invested</span>
        </div>

        <div>
          <span>Unrealized Return</span>
          <p>
            {isPositiveGain ? '+' : ''}{formatCurrency(unrealizedGainLossCents, 'CAD')} ({returnPercentage.toFixed(2)}%)
          </p>
          <span>All-time performance</span>
        </div>
      </div>

      {/* Holdings Table */}
      <div>
        <div>
          <h2>Holdings Breakdown</h2>
          <span>{MOCK_HOLDING.length} Assets Registered</span>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Asset Class</th>
                <th>Shares</th>
                <th>Avg Price</th>
                <th>Current Price</th>
                <th>Total Value</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_HOLDING.map((holding) => {
                const marketValue = holding.shares * holding.currentPriceCents;
                const costBasis = holding.shares * holding.averagePriceCents;
                const gainLoss = marketValue - costBasis;
                const gainLossPct = costBasis > 0 ? (gainLoss / costBasis) * 100 : 0;
                const isGain = gainLoss >= 0;

                return (
                  <tr>
                    <td>
                      <span>{holding.ticker}</span>
                      <span>{holding.name}</span>
                    </td>
                    <td>
                      <span>
                        {holding.assetClass}
                      </span>
                    </td>
                    <td>{holding.shares.toLocaleString()}</td>
                    <td>{formatCurrency(holding.averagePriceCents, 'CAD')}</td>
                    <td>{formatCurrency(holding.currentPriceCents, 'CAD')}</td>
                    <td>{formatCurrency(marketValue, 'CAD')}</td>
                    <td>
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
   )
  };