import React from 'react';
import { ChevronDown } from 'lucide-react';

const textFieldTypes = [
  { value: 'name', label: 'Name' },
  { value: 'password', label: 'Password' },
  { value: 'other', label: 'Other' }
];

const dbTypes = [
  { value: 'course', label: 'Course' },
  { value: 'salary', label: 'Salary' }
];

export default function FieldTypeSelector({
  selectedField,
  selectedDbType,
  customFieldName,
  onCustomFieldChange,
  onFieldSelect,
  onDbTypeSelect,
  usedFields
}) {
  const availableTextFields = textFieldTypes.filter(type => 
    type.value === 'other' || !usedFields.includes(type.value)
  );

  const availableDbFields = dbTypes.filter(type => 
    !usedFields.includes(type.value)
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Text Field Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Text Field Type
          </label>
          <select
            value={selectedField}
            onChange={(e) => onFieldSelect(e.target.value)}
            className="w-full p-3 border rounded-lg appearance-none bg-white pr-10 cursor-pointer"
          >
            <option value="">Select Text Field</option>
            {availableTextFields.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {selectedField === 'other' && (
            <input
              type="text"
              value={customFieldName}
              onChange={(e) => onCustomFieldChange(e.target.value)}
              placeholder="Enter custom field name"
              className="w-full p-3 border rounded-lg"
            />
          )}
        </div>

        {/* DB Field Section */}
        <div className="relative space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            DB Field Type
          </label>
          <select
            value={selectedDbType}
            onChange={(e) => {
              onDbTypeSelect(e.target.value);
              if (e.target.value) {
                onFieldSelect('db');
              }
            }}
            className={`w-full p-3 border rounded-lg appearance-none bg-white pr-10 cursor-pointer ${
              availableDbFields.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={availableDbFields.length === 0}
          >
            <option value="">
              {availableDbFields.length === 0 ? 'No available DB fields' : 'Select DB Field'}
            </option>
            {availableDbFields.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-[2.45rem] -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
        </div>
      </div>
    </div>
  );
}