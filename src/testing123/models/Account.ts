//Sample Account (models)

export abstract class Account {
    private accountNumber: string;
    private accountHolder: string;
    protected balance: number;

    constructor(accountNumber: string, accountHolder: string, initialBalance: number = 0) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
    }

    getBalance(): number {
        return this.balance;
    }

    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposit $${amount}. New balance: $${this.balance}`);
        } else {
            console.log("Deposit amount has to be positive.");
        }
    }

    abstract withdraw(amount: number): void;

    getAccountDetails(): void {
       console.log(`Account Holder: ${this.accountHolder}, Account Number: ${this.accountNumber}, Balance: $${this.balance}`); 
    }
}