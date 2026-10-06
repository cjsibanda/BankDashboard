import { useState } from 'react';
import type { Account } from './types/account';
import { AccountCard } from './components/dashboard/AccountCard';
import { Sidebar } from './components/layout/Sidebar';
import { TransactionTable } from './dashboard/transactionTable';
import { MOCK_TRANSACTIONS } from './data/mockTransactions';

const MOCK_ACCOUNTS: Account[] = [
  {
    id: 'acc_1',
    accountNumberMasked: '...1234',
    nickname: 'Primary Checking',
    type: 'CHECKING',
    balanceCents: 856725,
    currency: 'CAD',
    availableBalanceCents: 900000
  },
  {
    id: 'acc_2',
    accountNumberMasked: '...9876',
    nickname: 'Platinum Credit Card',
    type: 'CREDIT_CARD',
    balanceCents: -10050,
    currency: 'CAD'
  },
];

export function App() {
  const [activeTab, setActiveTab] = useState('accounts');
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const selectedAccount = MOCK_ACCOUNTS.find((acc) =>acc.id === selectedAccountId);
  const currentTransactions = selectedAccountId ? MOCK_TRANSACTIONS[selectedAccountId] || [] : [];

  return (
    <div>
      {/*Header*/}
      <header>
        <div></div>
      </header>

      {/* Main Content */}
      <div>
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Content Area */}
        <main>
          {selectedAccount ? (
            <TransactionTable
              account={selectedAccount}
              transactions={currentTransactions}
              onBack={() => setSelectedAccountId(null)}
            />
          ): (
            <>
              <header></header>
              <section></section>
          )}
        </main>

        {/* Right Information Panel */}
        <aside>
          <div>
            <h2>The Aside</h2>
            <p>Right Information Panel Text</p>
          </div>
        </aside>

      </div>

    </div>
  );
}

export default App;