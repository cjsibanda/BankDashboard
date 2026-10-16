import React, { useState } from 'react';
import { MOCK_DOCUMENTS } from '../../data/mockStatements';
import type { DocumentCategory } from '../../types/statement';

export const StatementsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'ALL'>('ALL');

  const filteredDocs = MOCK_DOCUMENTS.filter((doc) => {
    if (selectedCategory === 'ALL') return true;
    return doc.category === selectedCategory;
  });

  const formatFileSize = (bytes: number): string => {
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  const handleDownload = (docTitle: string) => {
    alert(`Downloading statement: ${docTitle}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Statements & Official Documents</h1>
        <p className="text-sm text-slate-500">Access, download, and archive your official electronic banking records.</p>
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-3 text-sm font-medium">
        <button
          onClick={() => setSelectedCategory('ALL')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            selectedCategory === 'ALL'
              ? 'bg-emerald-100 text-emerald-800 font-semibold'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Documents
        </button>
        <button
          onClick={() => setSelectedCategory('MONTHLY_STATEMENT')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            selectedCategory === 'MONTHLY_STATEMENT'
              ? 'bg-emerald-100 text-emerald-800 font-semibold'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Monthly Statements
        </button>
        <button
          onClick={() => setSelectedCategory('TAX_DOCUMENT')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            selectedCategory === 'TAX_DOCUMENT'
              ? 'bg-emerald-100 text-emerald-800 font-semibold'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Tax Documents
        </button>
      </div>

      {/* Document List Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                <th className="py-3 px-6">Document Title</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Date Issued</th>
                <th className="py-3 px-6">Size</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900 flex items-center gap-2">
                    <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">PDF</span>
                    {doc.title}
                  </td>
                  <td className="py-4 px-6 text-xs font-medium text-slate-600">
                    {doc.category.replace('_', ' ')}
                  </td>
                  <td className="py-4 px-6 text-slate-600">{doc.date}</td>
                  <td className="py-4 px-6 text-slate-500 text-xs">{formatFileSize(doc.fileSizeBytes)}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDownload(doc.title)}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-2 py-1"
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};