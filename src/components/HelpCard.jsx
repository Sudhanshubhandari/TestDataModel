import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import HelpModal from './HelpModal';

export default function HelpCard({ content }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 flex items-center gap-2 hover:shadow-xl transition-shadow group"
      >
        <HelpCircle size={20} className="text-indigo-600 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium text-gray-700">How to Use</span>
      </button>
      
      <HelpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={content}
      />
    </>
  );
}