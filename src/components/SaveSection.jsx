import React from 'react';
import { Save, Mail } from 'lucide-react';

export default function SaveSection({ 
  email, 
  onEmailChange, 
  onSave,
  isSaving 
}) {
  return (
    <div className="bg-white p-6 rounded-lg border space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-gray-500" />
            <span>Email Address</span>
          </div>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your email"
          disabled={isSaving}
        />
      </div>

      <button
        onClick={onSave}
        disabled={isSaving}
        className="w-full bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Save size={18} className={isSaving ? 'animate-spin' : ''} />
        <span>{isSaving ? 'Saving...' : 'Save Configuration'}</span>
      </button>
    </div>
  );
}