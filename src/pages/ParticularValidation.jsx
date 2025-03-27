import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FormFieldBuilder from '../components/FormFieldBuilder';
import HelpCard from '../components/HelpCard';

const HELP_CONTENT = `How to Use the Test Data Generation:

1. **Test Case Configuration**
   - Set the number of positive test cases (valid test cases)
   - Set the number of negative test cases (invalid test cases)
   - Maximum 100 test cases for each type

2. **Field Types**
   A. **Text Fields:**
      - Powered by ChatGPT API for intelligent validation
      - Choose from predefined types (Name, Password) or create custom
      - Set validation rules:
        • Minimum length
        • Maximum length
        • Required special characters (@, #, $, etc.)

   B. **Database Fields:**
      - Direct database integration for field validation
      - Options include Course, Salary, etc.
      - Validation rules are fetched from the database

3. **Managing Fields**
   - Click "Add Field" to add configured field
   - To delete a field:
      • Hover over the field card
      • Click the trash icon that appears in the top-right
   - You can add multiple fields with different validations

4. **Saving Configuration**
   - Enter your email address
   - Click "Save Configuration"
   - You'll receive confirmation once saved

**Note:** Text field validations use ChatGPT API for intelligent pattern matching, while database fields fetch validation rules directly from the connected database.`;

export default function ParticularValidation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 relative">
      {/* Logo in top right */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <img
          // src="https://static.naukimg.com/s/7/123/i/naukri-hiring-suite.6d08b072.svg"
          alt="Naukri Hiring Suite"
          className="h-12 md:h-16 w-auto"
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-center border-b border-gray-200 pb-6 mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-display">
              Form Field Configuration
            </h1>
            <p className="text-gray-600 mt-2">
              Configure your form fields with custom validation rules
            </p>
          </div>
          
          <FormFieldBuilder />
        </div>
      </div>

      <HelpCard content={HELP_CONTENT} />
    </div>
  );
}