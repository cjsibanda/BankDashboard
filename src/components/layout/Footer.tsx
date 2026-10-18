import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-6 px-4 sm:px-8 text-xs mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Side: Brand & Copyright */}
        <div className="text-center md:text-left">
          <p className="text-slate-300 font-semibold mb-1">
            Sibanda Banking Portal
          </p>
          <p className="text-slate-500">
            © {new Date().getFullYear()} Sibanda Financial Services Inc. All rights reserved.
          </p>
        </div>

        {/* Right Side: For the Security & Compliance Links */}
        <div className="flex flex-wrap justify-center gap-4 text-slate-400 font-medium">
          <a href="#privacy" className="hover:text-emerald-400 transition-colors">
            Privacy Policy
          </a>
          <span className="text-slate-700">•</span>
          <a href="#security" className="hover:text-emerald-400 transition-colors">
            Security Guarantees
          </a>
          <span className="text-slate-700">•</span>
          <a href="#terms" className="hover:text-emerald-400 transition-colors">
            Terms of Service
          </a>
          <span className="text-slate-700">•</span>
          <span className="text-emerald-500 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            256-Bit SSL Encrypted
          </span>
        </div>
      </div>
    </footer>
  );
};