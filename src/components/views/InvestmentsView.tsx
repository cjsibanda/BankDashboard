import React from 'react';

/*********************************************************
import { MOCK_HOLDINGS } from '../../data/mockInvestments';
import { formatCurrency } from '../../formatters'; 
**********************************************************/


export const InvestmentsView: React.FC = () => {
    /*****************
      // To calculate aggraate portfolio metrics using interger cents
      const summary = MOCK_HOLDINGS.reduce(
        (acc, holding) => {
          const marketValue = holding.shares * holding.currentPriceCents;
          const costBasis = holding.shares * holding.avergaePriceCents;
          return {
            totalValueCents: acc.totalVaueCents + marketValue,
            totalCostCents: acc.totalCostCents + costBasis,
          };
        },
        { totalValueCents: 0, totalCostCents: 0 }
      );
    *******************/


    return (
        <div>
            <h2>Investments & Portfolios</h2>
            <p>Track your equity holdings, mutual funds, amd retirement assets/</p>
            <div>
                [ Investment Portfolio Analytics will appear/render here]
            </div>
        </div>
    );
};
