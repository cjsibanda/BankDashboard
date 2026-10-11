import React, { ReactNode } from 'react';

interface TransferPayViewProps {
    children?: ReactNode;
}

export const TransferPayView: React.FC<TransferPayViewProps> = ({ children }) => {
    return (
        <div>
            {children || (
                <div>
                    <h2>Transfer & Pay</h2>
                    <p>Send funds securely between your accounts or pay bills</p>
                </div>
            )}
        </div>
    );
};


