import React from 'react';

export default function FieldList({ fields }) {
  if (fields.length === 0) return null;

  return (
    <div className="mt-4">
      <h3 className="font-medium text-gray-700 mb-2">Added Fields</h3>
      <div className="grid gap-2">
        {fields.map((field, index) => (
          <div key={index} className="bg-white p-3 rounded-lg border text-sm">
            <div className="flex items-center justify-between">
              <h4 className="font-medium capitalize">{field.type}</h4>
              <div className="flex gap-2">
                {field.validation.minLength && (
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    Min: {field.validation.minLength}
                  </span>
                )}
                {field.validation.maxLength && (
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    Max: {field.validation.maxLength}
                  </span>
                )}
              </div>
            </div>
            {field.validation.specialCharacters?.length ? (
              <div className="mt-1 flex gap-1 flex-wrap">
                {field.validation.specialCharacters.map((char) => (
                  <span key={char} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {char}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}