export type DocumentCategory = 'MONTHLY_STATEMENT' | 'TAX_DOCUMENT' | 'NOTICE';

export interface BankDocument {
    id: string;
    title: string;
    category: DocumentCategory;
    date: string; //<-- YEAR-MM-DD
    fileSizeBytes: number;
    format: 'PDF';
    accountId?: string;
}