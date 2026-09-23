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
      
    </div>
  )

}
