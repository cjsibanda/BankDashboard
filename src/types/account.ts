export type AccountType = 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD' | 'INVESTMENT' | 'MORTGAGE';

export interface Account {
    id: string;
    accountNumberMasked: string; //e.g., "...1234"
    nickname: string;
    type: AccountType;
    balanceCents: number; //Stored as integer cents (avoid precision bugs)
    currency: 'CAD' | 'USD';
    availableBalanceCents?: number;
}
