import React from 'react';
import type { Account } from '../../types/account';
import { formatCurrency } from '../../utils/formatters';

interface AccountCardProps {
  account: Account;
  onClick?: (id: string) => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({ account, onClick }) => {
  const isCredit = account.type === 'CREDIT_CARD';
  
  // Calculate mockup credit/balance utilization ratio for visual polish
  const mockCreditLimitCents = 1000000; // $10,000 limit
  const usagePercentage = isCredit 
    ? Math.min(100, Math.max(0, (Math.abs(account.balanceCents) / mockCreditLimitCents) * 100))
    : 100;

  return (
    <div
      onClick={() => onClick?.(account.id)}
      className="group bg-white rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Top Header Row */}
        <div className="p-5 pb-3 flex justify-between items-start border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 block mb-0.5">
              {account.type.replace('_', ' ')}
            </span>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
              {account.nickname}
            </h3>
            <p className="text-xs font-mono text-slate-500 mt-0.5">{account.accountNumberMasked}</p>
          </div>
          
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
              isCredit
                ? 'bg-slate-100 text-slate-700'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isCredit ? 'bg-slate-400' : 'bg-emerald-500'}`}></span>
            {account.currency}
          </span>
        </div>

        {/* Main Balance Display */}
        <div className="p-5">
          <div className="text-xs text-slate-500 font-medium mb-1">
            {isCredit ? 'Current Balance Due' : 'Total Available Balance'}
          </div>
          <div className={`text-2xl font-extrabold tracking-tight ${isCredit && account.balanceCents < 0 ? 'text-slate-900' : 'text-slate-900'}`}>
            {formatCurrency(account.balanceCents, account.currency)}
          </div>

          {/* Visual Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-[11px] font-medium text-slate-400 mb-1.5">
              <span>{isCredit ? 'Credit Utilization' : 'Available Liquidity'}</span>
              <span>{isCredit ? `${usagePercentage.toFixed(0)}% used` : '100%'}</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isCredit ? (usagePercentage > 75 ? 'bg-amber-500' : 'bg-slate-700') : 'bg-emerald-600'
                }`}
                style={{ width: `${isCredit ? usagePercentage : 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer CTA */}
      <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex justify-between items-center text-xs font-semibold text-emerald-800 group-hover:bg-emerald-50/50 transition-colors">
        <span>View Detailed Activity & Ledger</span>
        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};