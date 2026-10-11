import React, { ReactNode } from 'react';

interface TransferPayViewProps {
    children?: ReactNode;
}

export const TransferPayView: React.FC<TransferPayViewProps> = ({ children }) => {
    return (
        <div>
            {children || (
                <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Transfer & Pay</h2>
                    <p className="text-sm text-slate-500 mb-6">Send funds securely between your accounts or pay bills</p>
                </div>
            )}
        </div>
    );
};


