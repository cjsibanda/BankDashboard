import React, { useEffect } from 'react';

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    activeTab: string;
    onSelectTab: (tabID: string) => void;
}

export const MobileDrawer: React.FC<MobileDrwerProps> = ({
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
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const navItems = [
        {id: 'accounts', label: 'Accounts Overview'},
        {id: 'transfers', label: 'Transfer & Pay'},
        {id: 'investments', label: 'Investmnets'},
        {id: 'statements', label: 'Statements & Docs'},
    ];

    return (
        <div>
            {/* Backdrop Overlay */}
            <div
              onClick={onClose}
              aria-hidden="true"
            />
        </div>

        {/* Drawer Panel */}
        <div>
            <div>
                <span>SIBANDA BANKING</span>
                <button>Submit</button>
            </div>

        </div>
    )
}