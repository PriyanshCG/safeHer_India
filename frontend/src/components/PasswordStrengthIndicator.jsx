import React, { useMemo } from 'react';

/**
 * Password Strength Indicator
 * Shows a segmented strength bar + a requirements checklist.
 * Matches the design from the reference screenshot.
 */
const PasswordStrengthIndicator = ({ password }) => {
  // Individual requirement checks
  const requirements = useMemo(() => [
    {
      label: 'At least 8 characters',
      met: password.length >= 8,
    },
    {
      label: 'Contains uppercase and lowercase letters',
      met: /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
    {
      label: 'Contains at least one number',
      met: /\d/.test(password),
    },
    {
      label: 'Contains at least one special character',
      met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password),
    },
  ], [password]);

  // Compute overall strength from the number of requirements met
  const metCount = requirements.filter(r => r.met).length;

  const strengthMap = {
    0: { label: '', color: '', segments: 0 },
    1: { label: 'Weak', color: '#ef4444', segments: 1 },
    2: { label: 'Fair', color: '#f97316', segments: 2 },
    3: { label: 'Strong', color: '#22c55e', segments: 3 },
    4: { label: 'Very Strong', color: '#15803d', segments: 4 },
  };

  const strength = password.length === 0 ? strengthMap[0] : strengthMap[metCount];

  // Don't render anything if the user hasn't typed
  if (!password) return null;

  return (
    <div className="pwd-strength-wrapper">
      {/* Segmented bar */}
      <div className="pwd-strength-bar">
        {[1, 2, 3, 4].map(seg => (
          <div
            key={seg}
            className="pwd-strength-segment"
            style={{
              backgroundColor: seg <= strength.segments ? strength.color : '#e5e7eb',
              transition: 'background-color 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Strength label */}
      <p className="pwd-strength-label" style={{ color: strength.color }}>
        Password strength: <strong>{strength.label}</strong>
      </p>

      {/* Requirement tags (inline, like the reference image) */}
      <div className="pwd-strength-tags">
        {requirements.map((req, i) => (
          <span
            key={i}
            className="pwd-strength-tag"
            style={{ color: req.met ? '#16a34a' : '#9ca3af' }}
          >
            {req.met ? '8+ chars' === req.label ? '8+ chars' : '' : ''}
          </span>
        ))}
      </div>

      {/* Full checklist */}
      <ul className="pwd-requirements-list">
        {requirements.map((req, idx) => (
          <li key={idx} className={`pwd-req-item ${req.met ? 'pwd-req-met' : 'pwd-req-unmet'}`}>
            <span className="pwd-req-icon">
              {req.met ? (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="#16a34a" strokeWidth="2" fill="none" />
                  <path d="M6 10l3 3 5-5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="#d1d5db" strokeWidth="2" fill="none" />
                  <path d="M7 7l6 6M13 7l-6 6" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </span>
            <span className="pwd-req-text">{req.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordStrengthIndicator;
