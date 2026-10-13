import type { BankDocument } from "../types/statement";

export const MOCK_DOCUMENTS: BankDocument[] = [
    {
        id: 'dc_2026_09_chk',
        title: 'September Statement - Primary Checking',
        category: 'MONTHLY_STATEMENT',
        date: '2026-09-30',
        fileSizeBytes: 245000, //<-- realistic
        format: 'PDF',
        accountId: 'acc_1',
    },
    ///....
];