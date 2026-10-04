export type AccountType = 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD' | 'INVESTMENT';

export interface Account {
  id: string;
  accountNumberMasked: string;
  nickname: string;
  type: AccountType;
  balanceCents: number;
  currency: string;
  availableBalanceCents?: number;
}