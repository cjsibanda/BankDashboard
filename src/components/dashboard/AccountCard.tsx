//AccountCard.tsx
import React from 'react';
import { Account } from '../../types/account';
import { formatCurrency } from '../../utils/formatters';

interface AccountCardProps {
  account: Account;
  onClick?: (accountID: string) => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({ account, onClick}) => {
  const isNegative = account.balanceCents < 0;

  return (
    <div
      role="region"
      arial-labelledby={`account-title-${account.id}`}
      className="bg-white p-6 rounded-lg"
    >
      <div className="flex justify-between" items-start>
        <h3 id={`account-title-${account.id}`} className="text-sm font-medium text-slate-600">
          {account.nickname} <span className="text-slate-400">({account.accountNumberMasked})</span>
        </h3>
      </div>

      <p
        className={`text-2xl font-bold tracking-tight mb-1 ${
          isNegative ? 'text-red-600' : 'text-slate-900'
        }`}
        aria-live="polite"
      >
        {formatCurrency(account.balanceCents, account.currency)}
      </p>

      {account.availableBalanceCents !== underfined && (
        <span className="text-xs font-semibold text-emerald-700 block">
          Available: {formatCurrency(account.availableBalanceCents, account.currency)}
        </span>
      )}  

      {onClick && (
        <button
          onclick={() => onClick(account.id)}
          className="mt-4 text-xs font-medium text-emerald-700"
        >
         View Activity <span className="sr-only">for {account.nickname}</span> 
        </button>
      );
        
      }
      
    </div>
  )

}
