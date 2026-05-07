import React from 'react';

const SignupStep2 = ({ formData, setFormData, errors, onContinue, onSkip, isLoading }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      errors[name] = '';
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({
      ...prev,
      emergencyContactPhone: value
    }));
    
    if (errors.emergencyContactPhone) {
      errors.emergencyContactPhone = '';
    }
  };

  return (
    <div className="fade-in">
      {/* Heading */}
      <h2 className="text-3xl font-bold font-serif text-[#2D1B2E] mb-2">
        One more thing...
      </h2>
      <p className="text-sm text-[#6B5B6B] mb-8">
        Add your primary emergency contact to stay protected
      </p>

      {/* Emergency Contact Information Section */}
      <div className="bg-[#FFF5F7] border-l-4 border-[#C94A7D] p-6 rounded-lg mb-8">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="font-semibold text-[#8B4A6A] mb-2">
              Primary Emergency Contact
            </h3>
            <p className="text-sm text-[#6B5B6B]">
              This person will be immediately notified when you trigger SOS or share your location
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Contact Name */}
        <div>
          <label className="block text-sm font-semibold text-[#2D1B2E] mb-2 font-serif">
            Contact Name (e.g., Mom, Best Friend, Sister)
          </label>
          <input
            type="text"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleInputChange}
            placeholder="Enter contact name"
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
              errors.emergencyContactName 
                ? 'border-red-500' 
                : 'border-gray-300 focus:border-[#8B4A6A] focus:ring-2 focus:ring-[#8B4A6A]'
            }`}
          />
          {errors.emergencyContactName && (
            <p className="mt-1 text-sm text-red-500">{errors.emergencyContactName}</p>
          )}
        </div>

        {/* Contact Phone Number */}
        <div>
          <label className="block text-sm font-semibold text-[#2D1B2E] mb-2 font-serif">
            Contact Phone Number
          </label>
          <div className="flex gap-2">
            <div className="flex items-center px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50">
              <span className="text-gray-600 font-medium">+91</span>
            </div>
            <input
              type="tel"
              name="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              onChange={handlePhoneChange}
              placeholder="10-digit number"
              maxLength="10"
              className={`flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                errors.emergencyContactPhone 
                  ? 'border-red-500' 
                  : 'border-gray-300 focus:border-[#8B4A6A] focus:ring-2 focus:ring-[#8B4A6A]'
              }`}
            />
          </div>
          {errors.emergencyContactPhone && (
            <p className="mt-1 text-sm text-red-500">{errors.emergencyContactPhone}</p>
          )}
        </div>

        {/* Relationship */}
        <div>
          <label className="block text-sm font-semibold text-[#2D1B2E] mb-2 font-serif">
            Relationship
          </label>
          <select
            name="emergencyContactRelationship"
            value={formData.emergencyContactRelationship}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
              errors.emergencyContactRelationship 
                ? 'border-red-500' 
                : 'border-gray-300 focus:border-[#8B4A6A] focus:ring-2 focus:ring-[#8B4A6A]'
            }`}
          >
            <option value="">Select relationship</option>
            <option value="Mom">Mom</option>
            <option value="Dad">Dad</option>
            <option value="Sister">Sister</option>
            <option value="Brother">Brother</option>
            <option value="Friend">Friend</option>
            <option value="Partner">Partner</option>
            <option value="Spouse">Spouse</option>
            <option value="Guardian">Guardian</option>
            <option value="Other">Other</option>
          </select>
          {errors.emergencyContactRelationship && (
            <p className="mt-1 text-sm text-red-500">{errors.emergencyContactRelationship}</p>
          )}
        </div>
      </div>

      {/* Button Row */}
      <div className="flex justify-between gap-4 mt-8">
        {/* Skip Button */}
        <button
          onClick={onSkip}
          disabled={isLoading}
          className="flex-1 py-3 px-6 border-2 border-[#8B4A6A] text-[#8B4A6A] font-semibold rounded-lg hover:bg-[#F5F1E8] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'SKIP'}
        </button>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          disabled={isLoading}
          className="flex-1 py-3 px-6 bg-[#8B4A6A] text-white font-semibold rounded-lg hover:bg-[#6B2A4A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'SAVE & CONTINUE'}
        </button>
      </div>

      {/* Bottom Text */}
      <p className="text-xs text-gray-400 text-center mt-4">
        You can add more contacts later in Guardian Network
      </p>

      {/* Security Badge */}
      <div className="flex items-center justify-center mt-6 text-xs text-gray-400">
        <span className="mr-2">🔒</span>
        <span>256-bit encrypted, RBI compliant</span>
      </div>
    </div>
  );
};

export default SignupStep2;
