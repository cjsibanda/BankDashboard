// Sampe Current Account file (models)
import { Account } from './Account' //<--- check this later

export class CurrentAccount extends Account {
    constructor(accountNumber: string, accountHolder: string, initialBalance: number) {
        super(accountNumber, accountHolder, initialBalance);
    }

    withdraw(amount: number): void {
        if (amount > 0 && this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdraw $${amount}. New balance: $${this.balance}`);
        } else {
            console.log("Withdraw exceeds overdraft limit or amount is invalid")
        }
    }
}


