import React, { useState, useMemo } from 'react';
import TestCaseInputs from './TestCaseInputs';
import ValidationRules from './ValidationRules';
import FieldCard from './FieldCard';
import SaveSection from './SaveSection';
import FieldTypeSelector from './FieldTypeSelector';
import { saveTextConfiguration, saveDbConfiguration } from '../utils/api';

export default function FormFieldBuilder() {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [selectedDbType, setSelectedDbType] = useState('');
  const [validation, setValidation] = useState({
    minLength: '',
    maxLength: '',
    specialCharacters: []
  });
  const [positiveTestCases, setPositiveTestCases] = useState(1);
  const [negativeTestCases, setNegativeTestCases] = useState(0);
  const [dropdownProfiles, setDropdownProfiles] = useState(1);
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [customFieldName, setCustomFieldName] = useState('');

  const usedFields = fields.map(field => field.type);
  const textFields = fields.filter(field => !field.isDbField);
  const dbFields = fields.filter(field => field.isDbField);

  const isAddButtonDisabled = useMemo(() => {
    // If no field is selected
    if (!selectedField) return true;

    // If 'other' is selected but no custom name is provided
    if (selectedField === 'other' && !customFieldName.trim()) return true;

    // For DB fields, only check if a type is selected
    if (selectedField === 'db') return !selectedDbType;

    // For text fields, check validation rules
    if (selectedField !== 'db') {
      const minLength = parseInt(validation.minLength);
      const maxLength = parseInt(validation.maxLength);

      // If negative test cases are present, validation rules are required
      if (negativeTestCases > 0) {
        const hasValidation = validation.minLength || 
                           validation.maxLength || 
                           (validation.specialCharacters && validation.specialCharacters.length > 0);
        if (!hasValidation) return true;
      }

      // If both min and max length are provided, check their values
      if (!isNaN(minLength) && !isNaN(maxLength)) {
        if (minLength > maxLength) return true;
      }

      // If only one length is provided, it should be a positive number
      if ((!isNaN(minLength) && minLength < 0) || (!isNaN(maxLength) && maxLength < 0)) return true;
    }

    return false;
  }, [selectedField, selectedDbType, customFieldName, validation, negativeTestCases]);

  const resetForm = () => {
    setSelectedField('');
    setSelectedDbType('');
    setValidation({
      minLength: '',
      maxLength: '',
      specialCharacters: []
    });
    setError('');
    setCustomFieldName('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFieldSelect = (type) => {
    if (type === 'db' && selectedDbType) {
      setSelectedDbType('');
    }
    setSelectedField(type);
    setValidation({
      minLength: '',
      maxLength: '',
      specialCharacters: []
    });
    setError('');
    if (type !== 'other') {
      setCustomFieldName('');
    }
  };

  const handleDbTypeSelect = (type) => {
    if (usedFields.includes(type)) {
      setError('This DB field is already used');
      return;
    }
    setSelectedDbType(type);
    if (type) {
      setSelectedField('db');
    }
  };

  const handleAddField = () => {
    setError('');

    let fieldData;
    
    if (selectedField === 'db' && selectedDbType) {
      if (usedFields.includes(selectedDbType)) {
        setError('This DB field is already used');
        return;
      }
      fieldData = {
        type: selectedDbType,
        isDbField: true
      };
    } else {
      const fieldType = selectedField === 'other' ? customFieldName : selectedField;
      
      if (selectedField === 'other' && usedFields.includes(customFieldName.trim())) {
        setError('This field name is already used');
        return;
      }
      
      fieldData = {
        type: fieldType,
        validation: {
          ...validation,
          minLength: validation.minLength ? parseInt(validation.minLength) : undefined,
          maxLength: validation.maxLength ? parseInt(validation.maxLength) : undefined,
          specialCharacters: validation.specialCharacters?.length ? validation.specialCharacters : undefined
        }
      };
    }
    
    if (fieldData) {
      setFields([...fields, fieldData]);
      resetForm();
    }
  };

  const handleDeleteField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const validateForm = () => {
    if (!email) {
      throw new Error('Please enter your email address');
    }
    if (!validateEmail(email)) {
      throw new Error('Please enter a valid email address');
    }
    if (fields.length === 0) {
      throw new Error('Please add at least one field');
    }
  };

  const handleSave = async () => {
    try {
      setError('');
      setIsSaving(true);
      
      validateForm();

      const textFields = fields.filter(field => !field.isDbField);
      const dropdownFields = fields.filter(field => field.isDbField);

      const payload = {
        email,
        positiveTestCases,
        negativeTestCases,
        dropdownProfiles,
        textField: textFields.length > 0 ? { fields: textFields } : undefined,
        dropdownField: dropdownFields.length > 0 ? { fields: dropdownFields } : undefined
      };

      const hasDbFields = fields.some(field => field.isDbField);
      if (hasDbFields) {
        await saveDbConfiguration(payload);
      } else {
        await saveTextConfiguration(payload);
      }

      setFields([]);
      setEmail('');
      setPositiveTestCases(1);
      setNegativeTestCases(0);
      setDropdownProfiles(1);
      
      alert('Configuration saved successfully!');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-4">
        <TestCaseInputs
          positiveCount={positiveTestCases}
          negativeCount={negativeTestCases}
          dropdownProfiles={dropdownProfiles}
          onPositiveChange={setPositiveTestCases}
          onNegativeChange={setNegativeTestCases}
          onDropdownProfilesChange={setDropdownProfiles}
          disabled={textFields.length > 0}
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <FieldTypeSelector
          selectedField={selectedField}
          selectedDbType={selectedDbType}
          customFieldName={customFieldName}
          onCustomFieldChange={setCustomFieldName}
          onFieldSelect={handleFieldSelect}
          onDbTypeSelect={handleDbTypeSelect}
          usedFields={usedFields}
        />

        {selectedField && !selectedField.includes('db') && (
          <div className="mt-4">
            <ValidationRules 
              validation={validation} 
              onChange={setValidation}
              selectedFieldType={selectedField === 'other' ? customFieldName : selectedField}
              isRequired={negativeTestCases > 0}
            />
          </div>
        )}

        {selectedField && (
          <button
            onClick={handleAddField}
            disabled={isAddButtonDisabled}
            className={`w-full mt-4 py-2.5 px-4 rounded-lg text-white transition-colors ${
              isAddButtonDisabled 
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Add Field
          </button>
        )}
      </div>

      {/* Text Fields Section */}
      {textFields.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-700 mb-3">Text Fields</h3>
          <div className="space-y-3">
            {textFields.map((field, index) => (
              <FieldCard
                key={index}
                field={field}
                onDelete={() => handleDeleteField(fields.indexOf(field))}
              />
            ))}
          </div>
        </div>
      )}

      {/* DB Fields Section */}
      {dbFields.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-700 mb-3">DB Fields</h3>
          <div className="space-y-3">
            {dbFields.map((field, index) => (
              <FieldCard
                key={index}
                field={field}
                onDelete={() => handleDeleteField(fields.indexOf(field))}
              />
            ))}
          </div>
        </div>
      )}

      <SaveSection
        email={email}
        onEmailChange={setEmail}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
}