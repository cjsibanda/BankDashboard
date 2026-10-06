import type { Transaction } from '../types/transaction';

export const MOCK_TRANSACTIONS: Record<string, Transaction[]> = {
    acc_1: [
        {
            id: "tx_1",
            accountID: 'acc_1',
            date: '2026-10-05',
            description: 'Sobeys Grocery #412',
            amountCents: -8450, // -$84.50
            type: 'DEBIT',
            status: 'POSTED',
        },
        {
            id: 'tx_2',
            accountId: 'acc_1',
            date: '2026-10-04',
            description: 'Direct Deposit - Payroll',
            amountCents: 350000, // // +$3,500.00
            type: 'CREDIT',
            status: 'POSTED',
        },
    ]
}
