////////////////////////////////////////
//The Root Application Assembly
//Pseudo...
///////////////////////////////////////////
import React, {useState} from 'react';
import { Account } from './types/account';
import { Sidebar } from './components/layout/Sidebar';
// coponents

const MOCK_ACCOUNTS: Account[] = [
  {
    id: 'sibanda_1',
    accountNumberMasked: '...1234',
    nickname: 'Primary Checking',
    type: 'CHECKING',
    balanceCents: 100500,
    currency: 'CAD',
    availableBalanceCents: 500100,
  },
  {
    id: 'sibanda_2',
    accountNumberMasked: '...9876',
    nickname: 'Platinum Credit Card',
    type: 'CREDIT_CARD',
    balanceCents: -10050,
    currency: 'CAD',
  },
  {
    id: 'sibanda_3',
    accountNumberMasked: '....5544',
    nickname: 'Express Credit Card',
    type: 'CREDIT CARD',
    balanceCents: -500,
    currency: CAD',
  }
];

export const App: react.FC = () => {
  const [activeTab, setActiveTab] = useState('accounts');

  return (
    <div>
      {/* The Header*/}
      <header>
        <div className="flex items-center">
          <span>
            SIBANDA<span className="bg-white emerald-800">BANKING</span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span>Hello, Mr. Sibanda </span>
          <button>Sign Out</button>
        </div>
      </header>

      {/* Main Container*/}
      <div>
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Content Area */}
        <main>
          //header? 
          // main section
        </main>
        
        {/* Right Info Panel */}
        <aside>
          //div?
        </aside>
      </div>
    </div>
  );
};

export default App;
