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
        <div>
            {/* Ledger Stuff/Table */}
        </div>
    )
}