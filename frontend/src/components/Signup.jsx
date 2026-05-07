import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupStep1 from './SignupStep1';
import SignupStep2 from './SignupStep2';
import ProgressBar from './ProgressBar';
import { authAPI } from '../utils/api';
import './Signup.css';

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.fullName || formData.fullName.length < 2 || formData.fullName.length > 50) {
      newErrors.fullName = 'Full name must be between 2 and 50 characters';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the Terms of Service and Privacy Policy';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (formData.emergencyContactName && (formData.emergencyContactName.length < 2 || formData.emergencyContactName.length > 50)) {
      newErrors.emergencyContactName = 'Contact name must be between 2 and 50 characters';
    }
    
    const phoneRegex = /^\d{10}$/;
    if (formData.emergencyContactPhone && !phoneRegex.test(formData.emergencyContactPhone)) {
      newErrors.emergencyContactPhone = 'Phone number must be exactly 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Continue = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleStep2Continue = async () => {
    if (validateStep2()) {
      setIsLoading(true);
      try {
        const data = await authAPI.register(formData);
        
        if (data.success) {
          localStorage.setItem('authToken', data.data.token);
          navigate('/dashboard');
        } else {
          setErrors({ submit: data.message });
        }
      } catch (error) {
        setErrors({ submit: error.message || 'Registration failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleStep2Skip = async () => {
    setIsLoading(true);
    try {
      const skipData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        termsAccepted: formData.termsAccepted
      };
      
      const data = await authAPI.register(skipData);
      
      if (data.success) {
        localStorage.setItem('authToken', data.data.token);
        navigate('/dashboard');
      } else {
        setErrors({ submit: data.message });
      }
    } catch (error) {
      setErrors({ submit: error.message || 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Indian women traveling safely"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB939moER2ZG6cduuQx5MFuT6OtAuQ7XaFy9bhrqTAkl-jPIp_h3KTpFAqoC9O9CC7eYaJw3yeQZpmRODkNPfVAa4uWW9WglSV1aOS96FT1aIo_0qO-zFZj708Z0CEUvS2OqXMWABecW4tPQo-1J4YEUaHgmpj2YcVlPMsfkDBeO-J9QHIQYpdHwPrrOvJEAKtxZA6IJEtdRaWsMbpRvAKuKNxY9MI294L4AKWJv-gnpSRJ6_OnEVXnmxs-uwfS8bRr6C1e1haj7dvC"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3e0021]/90 via-[#3e0021]/60 to-[#3e0021]/40"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 h-full">
          {/* Logo */}
          <div className="text-3xl font-bold font-serif text-white mb-2">SafeHer India</div>
          <div className="text-xs tracking-widest text-gray-300 mb-12">YOUR SAFETY. OUR PRIORITY</div>
          
          {/* Heading */}
          <h1 className="text-5xl font-bold font-serif text-white leading-tight mb-8 text-center">
            Begin your journey
          </h1>
          
          {/* Features List */}
          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-3xl text-white">notifications_active</span>
              <div>
                <h3 className="text-white font-semibold text-lg">SOS Alerts</h3>
                <p className="text-gray-300 text-sm">Instant emergency notifications to your trusted circle with precise location tracking</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-3xl text-white">map</span>
              <div>
                <h3 className="text-white font-semibold text-lg">Safe Zone Maps</h3>
                <p className="text-gray-300 text-sm">Navigate confidently with community-verified safe routes and shelter locations</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-3xl text-white">group</span>
              <div>
                <h3 className="text-white font-semibold text-lg">Guardian Network</h3>
                <p className="text-gray-300 text-sm">Connect with verified volunteers and authorities in your immediate vicinity</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-3xl text-white">support_agent</span>
              <div>
                <h3 className="text-white font-semibold text-lg">24/7 Priority Helpline</h3>
                <p className="text-gray-300 text-sm">Direct access to our dedicated support team and emergency dispatchers at any time</p>
              </div>
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="flex justify-center gap-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10k+</div>
              <div className="text-sm text-gray-300">Protected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-300">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-300">Support</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Form Area */}
      <div className="w-full lg:w-3/5 bg-white h-full overflow-y-auto flex items-center justify-center px-6 py-8 lg:px-12 lg:py-16">
        <div className="w-full max-w-xl">
          {/* Progress Bar */}
          <ProgressBar currentStep={currentStep} />
          
          {/* Error Message */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}
          
          {/* Step Content */}
          {currentStep === 1 ? (
            <SignupStep1
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              onContinue={handleStep1Continue}
              isLoading={isLoading}
            />
          ) : (
            <SignupStep2
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              onContinue={handleStep2Continue}
              onSkip={handleStep2Skip}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
