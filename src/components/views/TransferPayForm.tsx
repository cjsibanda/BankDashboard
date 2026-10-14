import React, { useState } from 'react';
import type { Account } from '../../types/account';
import type { TransferFormData, TransferErrorState } from '../../types/transfer';
import { formatCurrency } from '../../utils/formatters';

interface TransferPayFormProps {
  accounts: Account[];
  onExecuteTransfer: (transfer: TransferFormData) => boolean;
}

export const TransferPayForm: React.FC<TransferPayFormProps> = ({ accounts, onExecuteTransfer }) => {
  const [formData, setFormData] = useState<TransferFormData>({
    sourceAccountID: accounts[0]?.id || '',
    destinationAccountId: accounts.length > 1 ? accounts[1].id : '',
    amountDollars: '',
    memo: '',
  });

  const [errors, setErrors] = useState<TransferErrorState>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const selectedSourceAccount = accounts.find((acc) => acc.id === formData.sourceAccountID);

  const handleChange = (field: keyof TransferFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
    setSuccessMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: TransferErrorState = {};

    // Validation: Accounts must be different
    if (formData.sourceAccountID === formData.destinationAccountId) {
      newErrors.destinationAccountId = 'Source and destination accounts cannot be the same.';
    }

    // Validation: Amount parsing & positive check
    const parsedAmountFloat = parseFloat(formData.amountDollars);
    if (isNaN(parsedAmountFloat) || parsedAmountFloat <= 0) {
      newErrors.amountDollars = 'Please enter a valid transfer amount greater than $0.00.';
    } else {
      // Convert to integer cents to check against available balance
      const amountCents = Math.round(parsedAmountFloat * 100);
      if (selectedSourceAccount && amountCents > selectedSourceAccount.balanceCents) {
        newErrors.amountDollars = `Insufficient funds. Available balance is ${formatCurrency(selectedSourceAccount.balanceCents, selectedSourceAccount.currency)}.`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Execute transfer through parent handler
    const success = onExecuteTransfer(formData);
    if (success) {
      setSuccessMessage(`Successfully transferred $${formData.amountDollars} CAD.`);
      setFormData((prev) => ({ ...prev, amountDollars: '', memo: '' }));
    } else {
      setErrors({ general: 'Transaction failed due to a security or processing error. Please try again.' });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm max-w-2xl">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Transfer & Pay</h2>
      <p className="text-sm text-slate-500 mb-6">Move funds instantly and securely between accounts.</p>

      {successMessage && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm font-medium" role="alert">
          {successMessage}
        </div>
      )}

      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium" role="alert">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Source Account */}
        <div>
          <label htmlFor="sourceAccount" className="block text-sm font-medium text-slate-700 mb-1">
            From Account
          </label>
          <select
            id="sourceAccount"
            value={formData.sourceAccountID}
            onChange={(e) => handleChange('sourceAccountID', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          >
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.nickname} ({acc.accountNumberMasked}) — Balance: {formatCurrency(acc.balanceCents, acc.currency)}
              </option>
            ))}
          </select>
        </div>

        {/* Destination Account */}
        <div>
          <label htmlFor="destAccount" className="block text-sm font-medium text-slate-700 mb-1">
            To Account
          </label>
          <select
            id="destAccount"
            value={formData.destinationAccountId}
            onChange={(e) => handleChange('destinationAccountId', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          >
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.nickname} ({acc.accountNumberMasked}) — Balance: {formatCurrency(acc.balanceCents, acc.currency)}
              </option>
            ))}
          </select>
          {errors.destinationAccountId && (
            <p className="mt-1 text-xs text-red-600">{errors.destinationAccountId}</p>
          )}
        </div>

        {/* Amount Input */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">
            Amount (CAD)
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-sm">
              $
            </div>
            <input
              type="number"
              step="0.01"
              id="amount"
              placeholder="0.00"
              value={formData.amountDollars}
              onChange={(e) => handleChange('amountDollars', e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
          </div>
          {errors.amountDollars && (
            <p className="mt-1 text-xs text-red-600">{errors.amountDollars}</p>
          )}
          {selectedSourceAccount && (
            <p className="mt-1 text-xs text-slate-400">
              Available to transfer: {formatCurrency(selectedSourceAccount.balanceCents, selectedSourceAccount.currency)}
            </p>
          )}
        </div>

        {/* Memo / Description */}
        <div>
          <label htmlFor="memo" className="block text-sm font-medium text-slate-700 mb-1">
            Memo (Optional)
          </label>
          <input
            type="text"
            id="memo"
            maxLength={50}
            placeholder="e.g., Monthly savings contribution"
            value={formData.memo}
            onChange={(e) => handleChange('memo', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2.5 px-4 rounded-md shadow-sm transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Complete Transfer
          </button>
        </div>
      </form>
    </div>
  );
};