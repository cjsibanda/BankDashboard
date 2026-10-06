export type TransactionStatus = 'POSTED' | 'PENDING';
export type TransactionType = 'CREDIT' | 'DEBIT';

export interface Transaction {
    id: string;
    accountId: string;
    date: string; //YYYY-MM-DD
    description: string;
    amountCents: number; // Stored in cents (prevents floating point errors)
    type: TransactionType;
    status: TransactionStatus;
}