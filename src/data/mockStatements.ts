import type { BankDocument } from "../types/statement";

export const MOCK_DOCUMENTS: BankDocument[] = [
    {
        id: 'doc_2026_09_chk',
        title: 'September Statement - Primary Checking',
        category: 'MONTHLY_STATEMENT',
        date: '2026-09-30',
        fileSizeBytes: 245000, //<-- realistic
        format: 'PDF',
        accountId: 'acc_1',
    },
    {
        id: 'doc_2026_08_chk',
        title: "October Statement - Primary Checking",
        category: "MONTHLY_STATEMENT",
        date: "2026-08-31", 
        fileSizeBytes: 238000,
        format: 'PDF',
        accountId: 'acc_1',
    },
    {
        id: "doc_2026_09_cc",
        title: "October Statement - Platinum Credit Card",
        category: "MONTHLY_STATEMENT",
        date: "2026-09-28",
        fileSizeBytes: 185000,
        format: 'PDF',
        accountId: 'acc_2',
    },
    {
        id: 'doc_2025_tax_t5',
        title: '2025 T5 Statement of Investment Income',
        category: 'TAX_DOCUMENT',
        date: '2026-02-15',
        fileSizeBytes: 515000,
        format: 'PDF',
    },
];