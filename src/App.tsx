import { useState } from 'react';
import type { Account } from './types/account';
import type { TransferFormData } from './types/transfer';
import { AccountCard } from './components/dashboard/AccountCard';
import { Sidebar } from './components/layout/Sidebar';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { Footer } from './components/layout/Footer';
import { TransactionTable } from './components/dashboard/TransactionTable';
import { MOCK_TRANSACTIONS as initialTransactions } from './data/mockTransactions';
import { TransferPayView } from './components/views/TransferPayView';
import { InvestmentsView } from './components/views/InvestmentsView';
import { StatementsView } from './components/views/StatementsView';
import { TransferPayForm } from './components/views/TransferPayForm';

const INITIAL_ACCOUNTS: Account[] = [
  {
    id: 'acc_1',
    accountNumberMasked: '...1234',
    nickname: 'Primary Checking',
    type: 'CHECKING',
    balanceCents: 1856725,
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
  {
    id: 'acc_3',
    accountNumberMasked: '...5070',
    nickname: "Diamond Access Card",
    type: 'CREDIT_CARD',
    balanceCents: -25075,
    currency: 'CAD',
  },
];

export function App() {
  const [activeTab, setActiveTab] = useState('accounts');
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectedAccount = accounts.find((acc) => acc.id === selectedAccountId);
  const currentTransactions = selectedAccountId ? transactions[selectedAccountId] || [] : [];

  // This handles transfer execution [cent arithmetic and ledger logging]
  const handleExecuteTransfer = (transfer: TransferFormData): boolean => {
    const amountCents = Math.round(parseFloat(transfer.amountDollars) * 100);
    const today = new Date().toISOString().split('T')[0];

    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) => {
        if (acc.id === transfer.sourceAccountId) {
          const newBalance = acc.balanceCents - amountCents;
          return {
            ...acc,
            balanceCents: newBalance,
            availableBalanceCents: acc.availableBalanceCents !== undefined ? newBalance : undefined,
          };
        }
        if (acc.id === transfer.destinationAccountId) {
          const newBalance = acc.balanceCents + amountCents;
          return {
            ...acc,
            balanceCents: newBalance,
            availableBalanceCents: acc.availableBalanceCents !== undefined ? newBalance : undefined,
          };
        }
        return acc;
      })
    );

    // Appends the transaction log entiries
    const sourceAccount = accounts.find((a) => a.id === transfer.sourceAccountId);
    const destAccount = accounts.find((a) => a.id === transfer.destinationAccountId);
    const memoText = transfer.memo ? ` - ${transfer.memo}` : '';

    setTransactions((prev) => {
      const updated = { ...prev };

      // Debit record for source
      if (updated[transfer.sourceAccountId]) {
        updated[transfer.sourceAccountId] = [
          {
            id: `tx_${Date.now()}_src`,
            accountId: transfer.sourceAccountId,
            date: today,
            description: `Transfer to ${destAccount?.nickname || 'Account'}${memoText}`,
            amountCents: -amountCents,
            type: 'DEBIT',
            status: 'POSTED',
          },
          ...updated[transfer.sourceAccountId],
        ];
      }

      // Credit record for destination
      if (updated[transfer.destinationAccountId]) {
        updated[transfer.destinationAccountId] = [
          {
            id: `tx_${Date.now()}_dst`,
            accountId: transfer.destinationAccountId,
            date: today,
            description: `Transfer from ${sourceAccount?.nickname || 'Account'}${memoText}`,
            amountCents: amountCents,
            type: 'CREDIT',
            status: 'POSTED',
          },
          ...updated[transfer.destinationAccountId],
        ];
      }

      return updated;
    });

    return true;
  };

  const renderMainContent = () => {
    if (activeTab === 'accounts' && selectedAccount) {
      return (
        <TransactionTable
          account={selectedAccount}
          transactions={currentTransactions}
          onBack={() => setSelectedAccountId(null)}
        />
      );
    }

    switch (activeTab) {
      case 'accounts':
        return (
          <>
            <header className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Accounts Overview</h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Manage your primary balances and assets in Sibanda Banking.
              </p>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {accounts.map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  onClick={(id) => setSelectedAccountId(id)}
                />
              ))}
            </section>
          </>
        );
      case 'transfers':
        return (
          <TransferPayView>
            <TransferPayForm accounts={accounts} onExecuteTransfer={handleExecuteTransfer} />
          </TransferPayView>
        );
      case 'investments':
        return <InvestmentsView />;
      case 'statements':
        return <StatementsView />;
      default:
        return <div className="text-slate-500">Page not found.</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Responsive Header */}
      <header className="h-16 bg-slate-900 text-white flex justify-between items-center px-4 sm:px-6 shadow-md z-10 border-b border-slate-800">
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Hamburger Menu Toggle (Visible on mobile/tablet) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Open navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center">
            <span className="text-lg sm:text-xl font-bold tracking-wide text-white">
              Sibanda
              <span className="bg-emerald-600 text-white text-[10px] sm:text-xs px-1.5 py-0.5 rounded ml-1 font-extrabold tracking-wider">
                BANKING
              </span>
            </span>
          </div>

          {/* Metric Badge Pill in Header (Desktop view) */}
          <div className="hidden xl:flex items-center gap-4 border-l border-slate-800 pl-6 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Total Liquidity</span>
              <span className="text-emerald-400 font-bold font-mono">$8,567.25 CAD</span>
            </div>
            <div className="w-px h-6 bg-slate-800"></div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Portfolio Value</span>
              <span className="text-white font-bold font-mono">$89,450.00 CAD</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="text-right hidden sm:block">
            <span className="block text-xs font-semibold text-white">CJ Sibanda</span>
            <span className="block text-[10px] text-slate-400">Enterprise Checking & Portfolio</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold border border-emerald-500 shadow-xs">
            CS
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tabId) => {
            setActiveTab(tabId);
            setSelectedAccountId(null);
          }}
        />

        {/* Mobile Slide-Out Drawer */}
        <MobileDrawer
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeTab={activeTab}
          onSelectTab={(tabId) => {
            setActiveTab(tabId);
            setSelectedAccountId(null);
          }}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            {renderMainContent()}
          </div>
          <Footer />
        </main>

        {/* Right Info Panel (Desktop screens) */}
        <aside className="w-72 p-6 bg-slate-50 border-l border-slate-200 hidden xl:block">
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