import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer>
            <div>
                {/* Left Side: Brand & Copyright */}
                <div>
                    <p>Sibanda Banking Portal</p>
                    <p>@ 2026 Sibanda Financial Services Inc. All rights reserved </p>
                </div>

                {/* Right Side*/}
                <div>
                    <a>
                        Privacy Policy
                    </a>
                    <span>.</span>
                    <a>Security Guarantees</a>
                    <span>.</span>
                    <span></span>
                </div>
            </div>
        </footer>
    )
}