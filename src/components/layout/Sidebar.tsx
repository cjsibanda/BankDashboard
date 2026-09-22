/***************************************************************************
* For Accessible Sidebar Navigation 
****************************************************************************/
import React from 'react';

interface NavItem {
  id: string;
  label: string;
}

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tabID: string) => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'accounts', label: 'Accounts' },
  { id: 'transfers', label: 'Transfer & Pay' },
  { id: 'investments', label: 'Investments' },
  { id: 'statements', label: 'Statements' },
];


export const Sidebar: React.FC<sidebarProps> = ({activeTab, onSelectTab}) => {
  return (
    <aside>
      <nav>
        <ul>
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onclick={() => onSelectTab(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  
                  >
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

