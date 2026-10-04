import React, { useState } from 'react';
import { Account } from './types/account';
import { AccountCard } from './components/dashboard/AccountCard';
import { Sidebar } from './components/layout/Sidebar';

const MOCK_ACCOUNTS: Account[] = [
  {
    id: 'acc_1',
    accountNumberMasked: '...1234',
    nickname: 'Primary Checking',
    type: 'CHECKING',
    balanceCents: 856725,
    currency: 'CAD',
    availableBalanceCents: 856725,
  },
  {
    id: 'acc_2',
    accountNumberMasked: '...9876',
    nickname: 'Platinum Credit Card',
    type: 'CREDIT_CARD',
    balanceCents: -10050,
    currency: 'CAD',
  },
];

export function App() {
  const [activeTab, setActiveTab] = useState('accounts');

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="h-16 bg-slate-900 text-white flex justify-between items-center px-6 shadow-md z-10">
        <div className="flex items-center">
          <span className="text-xl font-bold tracking-wide">
            Sibanda<span className="bg-white text-emerald-800 text-xs px-1.5 py-0.5 rounded ml-1.5 font-extrabold">BANKING</span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span>Hello, Mr. Sibanda</span>
          <button className="border border-white/45 hover:bg-white/10 text-white px-3 py-1.5 rounded transition-colors text-xs font-semibold focus:ring-2 focus:ring-white">
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Accounts Overview</h1>
            <p className="text-sm text-slate-500">Manage your primary balances and assets in Sibanda Banking.</p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_ACCOUNTS.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </section>
        </main>

        {/* Right Info Panel */}
        <aside className="w-72 p-6 bg-slate-50 border-l border-slate-200 hidden lg:block">
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">Security Status</h2>
            <p className="text-emerald-700 font-semibold text-sm my-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Protected & Encrypted
            </p>
            <small className="text-xs text-slate-400 block">Session ID: 8F92-A10X</small>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;