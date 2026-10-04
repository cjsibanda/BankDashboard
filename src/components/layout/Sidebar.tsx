import React from 'react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

const NAV_ITEMS = [
  { id: 'accounts', label: 'Accounts' },
  { id: 'transfers', label: 'Transfer & Pay' },
  { id: 'investments', label: 'Investments' },
  { id: 'statements', label: 'Statements' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  return (
    <aside className="w-60 bg-white border-r border-slate-200 pt-4 flex-shrink-0" aria-label="Main Navigation">
      <nav>
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSelectTab(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full text-left px-6 py-3.5 font-medium text-sm transition-colors border-l-4 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-700 font-semibold'
                      : 'text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};