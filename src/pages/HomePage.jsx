import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, UserCheck } from 'lucide-react';
import HelpCard from '../components/HelpCard';

const HELP_CONTENT = `Welcome to the Validation Builder!

Choose between two types of validation:

1. Particular Validation: Configure specific validation rules for individual fields with custom test cases.

2. Profile Validation: Set up comprehensive validation rules for user profiles and forms.

Click on either option to get started with your validation configuration.`;

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Logo in top right */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <img
          src="https://static.naukimg.com/s/7/123/i/naukri-hiring-suite.6d08b072.svg"
          alt="Naukri Hiring Suite"
          className="h-12 md:h-16 w-auto"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Validation Builder
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the type of validation you want to configure
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/particular-validation')}
            className="group p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ClipboardCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Particular Validation
              </h2>
              <p className="text-gray-600 text-center">
                Configure specific validation rules for individual fields with custom test cases
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/profile-validation')}
            className="group p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-indigo-500"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <UserCheck className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Profile Validation
              </h2>
              <p className="text-gray-600 text-center">
                Set up comprehensive validation rules for user profiles and forms
              </p>
            </div>
          </button>
        </div>
      </div>

      <HelpCard content={HELP_CONTENT} />
    </div>
  );
}