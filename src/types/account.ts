export type AccountType = 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD' | 'INVESTENT' | 'MORTGAGE';

export interface Account {
    id: string;
    accountNumberMasked: string; //e.g., "...1234"
    nickname: string;
    type: AccountType;
    balanceCents: number; //Stored as integer cents (avoid precision bugs)
    currency: 'CAD' | 'USD';
    vailableBalanceCents?: number;
}