import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const SPECIAL_CHARS = ['@', '#', '$', '%', '&', '*', '!'];

export default function ValidationRules({ validation, onChange, selectedFieldType, isRequired }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSpecialChar = (char) => {
    const currentChars = validation.specialCharacters || [];
    const newChars = currentChars.includes(char)
      ? currentChars.filter(c => c !== char)
      : [...currentChars, char];
    
    onChange({
      ...validation,
      specialCharacters: newChars
    });
  };

  return (
    <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
      {selectedFieldType && (
        <h3 className="text-xl font-semibold text-red-800 mb-4 text-center border-b border-red-200 pb-3">
          Validation Rules for {selectedFieldType}
          {isRequired && (
            <span className="block text-sm font-normal text-red-600 mt-1">
              Validation required when negative test cases are present
            </span>
          )}
        </h3>
      )}
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Min Length
          </label>
          <input
            type="number"
            value={validation.minLength || ''}
            onChange={(e) => onChange({
              ...validation,
              minLength: parseInt(e.target.value) || undefined
            })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Max Length
          </label>
          <input
            type="number"
            value={validation.maxLength || ''}
            onChange={(e) => onChange({
              ...validation,
              maxLength: parseInt(e.target.value) || undefined
            })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
          />
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        <label className="block text-sm text-gray-600 mb-1">
          Special Characters
        </label>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-2 border rounded bg-white flex items-center justify-between hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="text-gray-700">
            {validation.specialCharacters?.length
              ? validation.specialCharacters.join(' ')
              : 'Select special characters'}
          </span>
          <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
            <div className="p-2 grid grid-cols-4 gap-1">
              {SPECIAL_CHARS.map((char) => (
                <button
                  key={char}
                  onClick={() => toggleSpecialChar(char)}
                  className={`p-2 text-center rounded transition-colors ${
                    validation.specialCharacters?.includes(char)
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {char}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}