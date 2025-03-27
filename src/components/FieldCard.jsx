import React from 'react';
import { Trash2, Database, FileText } from 'lucide-react';

export default function FieldCard({ field, onDelete }) {
  const renderValidationInfo = () => {
    if (!field.validation) return null;
    
    return (
      <div className="text-sm text-gray-600 mt-2 space-y-1">
        {field.validation.minLength && (
          <p>Min Length: {field.validation.minLength}</p>
        )}
        {field.validation.maxLength && (
          <p>Max Length: {field.validation.maxLength}</p>
        )}
        {field.validation.specialCharacters?.length ? (
          <p>Special Characters: {field.validation.specialCharacters.join(' ')}</p>
        ) : null}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg border relative group hover:shadow-md transition-shadow">
      <button
        onClick={onDelete}
        className="absolute right-2 top-2 p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 size={18} />
      </button>
      
      <div className="flex items-center gap-2">
        {field.isDbField ? (
          <Database className="text-indigo-600" size={20} />
        ) : (
          <FileText className="text-blue-600" size={20} />
        )}
        <h4 className="font-medium capitalize text-gray-900">{field.type}</h4>
      </div>
      
      {renderValidationInfo()}
    </div>
  );
}