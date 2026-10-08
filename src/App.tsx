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
        <div className="flex items-center gep-4 text-sm">
          <span>Hello, Mr. Sibanda</span>
          <button className="border border-white/45 hover:bg-white/10 text-white px-3 py-1.5 rounded transition-colors text-xs font-semibold" >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {selectedAccount ? (
            <TransactionTable
              account={selectedAccount}
              transitions={currentTransactions}
              onBack={() => setSelectedAccountId(null)}
            />
          ) : (
            <>
              <header className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Accounts Overview</h1>
                <p className="text-sm text-slate-500">Manage your primary balances and assets in Sibanda Banking.</p>
              </header>
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_ACCOUNTS.map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    onClick={(id) => setSelectedAccountId(id)}
                  />
                ))}
              </section>
              </>
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