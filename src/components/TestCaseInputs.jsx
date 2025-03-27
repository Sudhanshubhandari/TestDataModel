import React from 'react';

export default function TestCaseInputs({
  positiveCount,
  negativeCount,
  dropdownProfiles,
  onPositiveChange,
  onNegativeChange,
  onDropdownProfilesChange,
  disabled = false
}) {
  const handleNumberInput = (value, onChange, max = 100) => {
    const numValue = parseInt(value) || 0;
    onChange(Math.min(Math.max(0, numValue), max));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Positive Test Cases
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={positiveCount}
            onChange={(e) => handleNumberInput(e.target.value, onPositiveChange)}
            className={`w-full p-2.5 border rounded-lg ${
              disabled 
                ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                : 'bg-white'
            }`}
            disabled={disabled}
          />
          {disabled && (
            <p className="text-xs text-amber-600 mt-1">
              Remove all text fields to modify test cases
            </p>
          )}
          {!disabled && (
            <p className="text-xs text-gray-500 mt-1">Maximum value: 100</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Negative Test Cases
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={negativeCount}
            onChange={(e) => handleNumberInput(e.target.value, onNegativeChange)}
            className={`w-full p-2.5 border rounded-lg ${
              disabled 
                ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                : 'bg-white'
            }`}
            disabled={disabled}
          />
          {disabled && (
            <p className="text-xs text-amber-600 mt-1">
              Remove all text fields to modify test cases
            </p>
          )}
          {!disabled && (
            <p className="text-xs text-gray-500 mt-1">Maximum value: 100</p>
          )}
        </div>
      </div>
      {dropdownProfiles !== undefined && onDropdownProfilesChange && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Dropdown Profiles
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={dropdownProfiles}
            onChange={(e) => handleNumberInput(e.target.value, onDropdownProfilesChange)}
            className="w-full p-2.5 border rounded-lg bg-white"
          />
          <p className="text-xs text-gray-500 mt-1">Maximum value: 100</p>
        </div>
      )}
    </div>
  );
}