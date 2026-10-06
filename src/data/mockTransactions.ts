import type { Transaction } from '../types/transaction';

export const MOCK_TRANSACTIONS: Record<string, Transaction[]> = {
  acc_1: [
    {
      id: 'tx_1',
      accountId: 'acc_1',
      date: '2026-10-05',
      description: 'Walmart Store #512',
      amountCents: -8452, // -$84.52
      type: 'DEBIT',
      status: 'POSTED',
    },
    {
      id: 'tx_2',
      accountId: 'acc_1',
      date: '2026-10-04',
      description: 'Direct Deposit - Payroll',
      amountCents: 350000, // +3,500.00
      type: 'CREDIT',
      status: 'POSTED',
    },
    {
      id: 'tx_3',
      accountId: 'acc_1',
      date: '2026-10-06',
      description: 'KFC #1629',
      amountCents: -2425, // -$24.25
      type: 'DEBIT',
      status: 'PENDING',
    },
  ],
  acc_2: [
    {
      id: 'tx_4',
      accountId: 'acc_2',
      date: '2026-10-03',
      description: 'Spotify Music',
      amountCents: -1599, // -$15.99
      type: 'DEBIT',
      status: 'POSTED',
    },
    {
      id: 'tx_5',
      accountId: 'acc_2',
      date: '2026-10-01',
      description: 'Shell Gas Station',
      amountCents: -2500, // -$25.00
      type: 'DEBIT',
      status: 'POSTED',
    },
  ],
};