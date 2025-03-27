import React from 'react';
import { ChevronDown } from 'lucide-react';

const SPECIALIZATIONS = {
  'btech': [
    'Computer Science',
    'Electronics',
    'Mechanical',
    'Civil',
    'Electrical',
    'Other'
  ],
  'bba': [
    'Finance',
    'Marketing',
    'HR',
    'Operations',
    'Other'
  ],
  'bca': [
    'Software Development',
    'Data Science',
    'Web Development',
    'Other'
  ]
};

export default function CourseSelector({ 
  selectedCourse, 
  selectedSpecializations,
  customSpecialization,
  onCourseSelect, 
  onSpecializationToggle,
  onCustomSpecializationChange 
}) {
  const [showCustomInput, setShowCustomInput] = React.useState(false);

  const handleSpecializationToggle = (spec) => {
    if (spec === 'Other') {
      setShowCustomInput(!showCustomInput);
      if (!showCustomInput) {
        onCustomSpecializationChange('');
      }
    } else {
      const newSpecs = selectedSpecializations.includes(spec)
        ? selectedSpecializations.filter(s => s !== spec)
        : [...selectedSpecializations, spec];
      onSpecializationToggle(newSpecs);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <select
          value={selectedCourse}
          onChange={(e) => onCourseSelect(e.target.value)}
          className="w-full p-3 border rounded-lg appearance-none bg-white pr-10 cursor-pointer"
        >
          <option value="">Select Course</option>
          <option value="btech">B.Tech</option>
          <option value="bba">BBA</option>
          <option value="bca">BCA</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
      </div>

      {selectedCourse && SPECIALIZATIONS[selectedCourse] && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Specializations
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SPECIALIZATIONS[selectedCourse].map((spec) => (
              <label
                key={spec}
                className="flex items-center space-x-2 p-2 bg-white rounded border cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={spec === 'Other' ? showCustomInput : selectedSpecializations.includes(spec)}
                  onChange={() => handleSpecializationToggle(spec)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{spec}</span>
              </label>
            ))}
          </div>

          {showCustomInput && (
            <div className="mt-3">
              <input
                type="text"
                value={customSpecialization}
                onChange={(e) => onCustomSpecializationChange(e.target.value)}
                placeholder="Enter custom specialization"
                className="w-full p-2 border rounded"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}