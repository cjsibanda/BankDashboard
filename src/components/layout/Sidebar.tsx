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





