import React from 'react';
import SignupFlow from '../components/Signup';

/**
 * Signup Page — Renders the two-step signup flow component.
 * Step 1: Personal details (name, email, phone, password)
 * Step 2: Emergency contact (optional, can skip)
 */
export default function Signup() {
  return <SignupFlow />;
}
