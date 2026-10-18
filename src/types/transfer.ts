export interface TransferFormData {
    sourceAccountId: string;
    destinationAccountId: string;
    amountDollars: string; //<-- stored as string input and parsed to string
    memo: string;
}

export interface TransferErrorState {
    sourceAccountId?: string;
    destinationAccountId?: string;
    amountDollars?: string;
    general?: string; 
}