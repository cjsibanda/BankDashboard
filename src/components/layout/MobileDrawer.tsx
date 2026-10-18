import React, { useEffect } from 'react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
}) => {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navItems = [
    { id: 'accounts', label: 'Accounts Overview', icon: '💳' },
    { id: 'transfers', label: 'Transfer & Pay', icon: '🔄' },
    { id: 'investments', label: 'Investments', icon: '📈' },
    { id: 'statements', label: 'Statements & Docs', icon: '📄' },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 w-72 bg-slate-900 text-white shadow-xl flex flex-col z-50 transform transition-transform ease-in-out duration-300">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <span className="text-lg font-bold tracking-wide">
            Sibanda<span className="bg-emerald-600 text-white text-xs px-1.5 py-0.5 rounded ml-1.5 font-extrabold">BANKING</span>
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-slate-400 hover:text-white p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-emerald-700 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-800 text-xs text-slate-400">
          <p className="font-semibold text-slate-300">CJ Sibanda</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Encrypted Mobile Session</p>
        </div>
      </div>
    </div>
  );
};