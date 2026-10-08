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
    availableBalanceCents: 906070
  },
  {
    id: 'acc_2',
    accountNumberMasked: '...9876',
    nickname: 'Platinum Credit Card',
    type: 'CREDIT_CARD',
    balanceCents: -10050,
    currency: 'CAD'
  },
  {
    id: 'acc_3',
    accountNumberMasked: '...5076',
    nickname: 'Diamond Access Card',
    type: 'CREDIT_CARD',
    balanceCents: -2267,
    currency: 'CAD',
  },
];



export function App() {
  const [activeTab, setActiveTab] = useState('accounts');
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const selectedAccount = MOCK_ACCOUNTS.find((acc) =>acc.id === selectedAccountId);
  const currentTransactions = selectedAccountId ? MOCK_TRANSACTIONS[selectedAccountId] || [] : [];

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans">
      {/*Header*/}
      <header className="h-16 bg-slate-900 text-white flex justify-between items-center px-6 shadow-md z-10">
        <div className="flex items-center">
          <span className="text-x1 font-bold tracking-wide">
            Sibanda<span className="bg-white text-emerald-800 text-xs px-1.5 py-0.5 rounded ml-1.5 font-extrabold">BANKING</span>
          </span>
        </div>
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