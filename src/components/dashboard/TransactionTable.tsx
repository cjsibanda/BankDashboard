import React from 'react';
import type { Transaction } from '../../types/transaction';
import type { Account } from '../../types/account';
import { formatCurrency } from '../../utils/formatters';

interface TransactionTableProps {
  account: Account;
  transactions: Transaction[];
  onBack: () => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ account, transactions, onBack }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      {/* Header bar inside detail view */}
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div>
          <button
            onClick={onBack}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 mb-2 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
          >
            &larr; Back to Accounts Overview
          </button>
          <h2 className="text-xl font-bold text-slate-900">
            {account.nickname} <span className="text-slate-400 font-normal text-sm">({account.accountNumberMasked})</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Current Balance: <span className="font-semibold text-slate-800">{formatCurrency(account.balanceCents, account.currency)}</span>
          </p>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-400 text-sm">
                  No recent transactions found for this account.
                </td>
              </tr>
            ) : (
              transactions.map((tx) => {
                const isCredit = tx.type === 'CREDIT';
                return (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 text-slate-600 whitespace-nowrap">{tx.date}</td>
                    <td className="py-4 px-6 font-medium text-slate-900">{tx.description}</td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tx.status === 'POSTED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td
                      className={`py-4 px-6 text-right font-semibold whitespace-nowrap ${
                        isCredit ? 'text-emerald-700' : 'text-slate-900'
                      }`}
                    >
                      {isCredit ? '+' : ''}{formatCurrency(tx.amountCents, account.currency)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};