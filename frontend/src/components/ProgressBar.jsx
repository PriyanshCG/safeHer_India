import React from 'react';

const ProgressBar = ({ currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
            currentStep >= 1 
              ? 'bg-[#C94A7D] text-white' 
              : 'bg-gray-200 text-gray-500'
          }`}>
            1
          </div>
          <span className={`ml-2 text-sm font-semibold ${
            currentStep >= 1 ? 'text-[#8B4A6A]' : 'text-gray-400'
          }`}>
            Essential Details
          </span>
        </div>
        
        <div className="flex-1 mx-4">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-[#C94A7D] transition-all duration-300 ${
                currentStep === 1 ? 'w-1/2' : 'w-full'
              }`}
            />
          </div>
        </div>
        
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
            currentStep >= 2 
              ? 'bg-[#C94A7D] text-white' 
              : 'bg-gray-200 text-gray-500'
          }`}>
            2
          </div>
          <span className={`ml-2 text-sm font-semibold ${
            currentStep >= 2 ? 'text-[#8B4A6A]' : 'text-gray-400'
          }`}>
            Emergency Contact
          </span>
        </div>
      </div>
      
      <div className="text-center">
        <span className="text-sm text-[#8B4A6A] font-medium">
          Step {currentStep} of 2 → {currentStep === 1 ? 'Essential Details' : 'Emergency Contact'}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
