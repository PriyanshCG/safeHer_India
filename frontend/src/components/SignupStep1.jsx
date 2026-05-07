import React, { useState } from 'react';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

const SignupStep1 = ({ formData, setFormData, errors, onContinue, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'termsAccepted' ? e.target.checked : value
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
      phone: value
    }));
    
    if (errors.phone) {
      errors.phone = '';
    }
  };

  return (
    <div className="fade-in">
      {/* Heading */}
      <h2 className="text-3xl font-bold font-serif text-[#2D1B2E] mb-2">
        Create your account
      </h2>
      <p className="text-sm text-[#6B5B6B] mb-8">
        Your safe journey starts here
      </p>

      {/* Form */}
      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-[#2D1B2E] mb-2 font-serif">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
              errors.fullName 
                ? 'border-red-500' 
                : 'border-gray-300 focus:border-[#8B4A6A] focus:ring-2 focus:ring-[#8B4A6A]'
            }`}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-semibold text-[#2D1B2E] mb-2 font-serif">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your@email.com"
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
              errors.email 
                ? 'border-red-500' 
                : 'border-gray-300 focus:border-[#8B4A6A] focus:ring-2 focus:ring-[#8B4A6A]'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-semibold text-[#2D1B2E] mb-2 font-serif">
            Phone Number
          </label>
          <div className="flex gap-2">
            <div className="flex items-center px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50">
              <span className="text-gray-600 font-medium">+91</span>
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="10-digit number"
              maxLength="10"
              className={`flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                errors.phone 
                  ? 'border-red-500' 
                  : 'border-gray-300 focus:border-[#8B4A6A] focus:ring-2 focus:ring-[#8B4A6A]'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-[#2D1B2E] mb-2 font-serif">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create strong password"
              className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:outline-none transition-colors ${
                errors.password 
                  ? 'border-red-500' 
                  : 'border-gray-300 focus:border-[#8B4A6A] focus:ring-2 focus:ring-[#8B4A6A]'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          {/* Password Strength Indicator */}
          <PasswordStrengthIndicator password={formData.password} />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-semibold text-[#2D1B2E] mb-2 font-serif">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Re-enter password"
              className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:outline-none transition-colors ${
                errors.confirmPassword 
                  ? 'border-red-500' 
                  : 'border-gray-300 focus:border-[#8B4A6A] focus:ring-2 focus:ring-[#8B4A6A]'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Terms of Service Checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            name="termsAccepted"
            id="termsAccepted"
            checked={formData.termsAccepted || false}
            onChange={handleInputChange}
            className="mt-1 w-4 h-4 accent-[#8B4A6A] cursor-pointer"
          />
          <label htmlFor="termsAccepted" className="text-sm text-[#4B3B4B] cursor-pointer select-none">
            I agree to the{' '}
            <a href="/terms" className="text-[#8B4A6A] font-semibold hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-[#8B4A6A] font-semibold hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.termsAccepted && (
          <p className="text-sm text-red-500 -mt-4">{errors.termsAccepted}</p>
        )}
      </div>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        disabled={isLoading}
        className="w-full mt-8 py-3 px-6 bg-[#8B4A6A] text-white font-semibold text-lg rounded-lg hover:bg-[#6B2A4A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating Account...' : 'Continue'}
      </button>

      {/* Bottom Link */}
      <div className="text-center mt-6">
        <p className="text-sm text-[#6B5B6B]">
          Already have a sanctuary?{' '}
          <a href="/login" className="text-[#8B4A6A] hover:underline">
            Log in here
          </a>
        </p>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center mt-6 text-xs text-gray-400">
        <span className="mr-2">🔒</span>
        <span>256-bit encrypted, RBI compliant</span>
      </div>
    </div>
  );
};

export default SignupStep1;
