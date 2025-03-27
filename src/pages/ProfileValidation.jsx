import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Mail } from 'lucide-react';
import { API_CONFIG } from '../config/constants';
import HelpCard from '../components/HelpCard';

const HELP_CONTENT = `How to Configure Profile Validation:

1. Enter the number of profiles you want to validate (maximum 100)
2. Select the education level (Undergraduate or Postgraduate)
3. Choose one or more validation types from the options:
   - Education
   - Work Experience
   - Projects
4. Enter your email address for notifications
5. Click Save Configuration to complete the setup

Your configuration will be saved and can be used for validating user profiles according to the specified rules.`;

const EDUCATION_LEVELS = [
  { value: 'undergrad', label: 'Undergraduate' },
  { value: 'postgrad', label: 'Postgraduate' }
];

const VALIDATION_TYPES = [
  { value: 'education', label: 'Education' },
  { value: 'work_exp', label: 'Work Experience' },
  { value: 'project', label: 'Projects' }
];

export default function ProfileValidation() {
  const navigate = useNavigate();
  const [numProfiles, setNumProfiles] = useState(1);
  const [educationLevel, setEducationLevel] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNumProfilesChange = (value) => {
    setNumProfiles(Math.min(Math.max(1, value), 100));
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSave = async () => {
    if (!email || !educationLevel || selectedTypes.length === 0) {
      setError('Please fill in all required fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SAVE_PROFILE_CONFIGURATION}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numProfiles,
          educationLevel,
          validationTypes: selectedTypes,
          email
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save configuration');
      }

      alert('Configuration saved successfully!');
      setNumProfiles(1);
      setEducationLevel('');
      setSelectedTypes([]);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 relative">
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <img
          src="https://static.naukimg.com/s/7/123/i/naukri-hiring-suite.6d08b072.svg"
          alt="Naukri Hiring Suite"
          className="h-12 md:h-16 w-auto"
        />
      </div>

      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Profile Validation Configuration
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Profiles
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={numProfiles}
                onChange={(e) => handleNumProfilesChange(parseInt(e.target.value) || 1)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="text-xs text-gray-500 mt-1">Maximum value: 100</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Education Level
              </label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Education Level</option>
                {EDUCATION_LEVELS.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Validation Types
              </label>
              <div className="grid gap-2">
                {VALIDATION_TYPES.map(type => (
                  <button
                    key={type.value}
                    onClick={() => handleTypeToggle(type.value)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      selectedTypes.includes(type.value)
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        selectedTypes.includes(type.value)
                          ? 'bg-indigo-500 border-indigo-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedTypes.includes(type.value) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="font-medium">{type.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

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
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 
                transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} className={isSaving ? 'animate-spin' : ''} />
              <span>{isSaving ? 'Saving...' : 'Save Configuration'}</span>
            </button>
          </div>
        </div>
      </div>

      <HelpCard content={HELP_CONTENT} />
    </div>
  );
}