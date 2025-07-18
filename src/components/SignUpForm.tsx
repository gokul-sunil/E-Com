'use client';
import { useState, FormEvent } from 'react';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface SignUpFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) => Promise<void>;
  role?: 'user' | 'admin'; // Optional role prop
  adminOnlyFields?: boolean; // Show additional admin fields
}

export default function SignUpForm({ onSubmit, role = 'user', adminOnlyFields = false }: SignUpFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Admin-specific fields
  const [organization, setOrganization] = useState('');
  const [adminCode, setAdminCode] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    
    try {
      const formData = {
        name,
        email,
        password,
        role,
        ...(adminOnlyFields && { organization, adminCode })
      };
      await onSubmit(formData);
    } catch (err) {
      console.error('Sign up error:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-md max-w-md w-full"
    >
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          {role === 'admin' ? 'Create Admin Account' : 'Join Us Today'}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {role === 'admin' 
            ? 'Setup your administrator account' 
            : 'Create your account to get started'}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start text-sm">
          <FiAlertCircle className="flex-shrink-0 mt-0.5 mr-2" />
          <div>{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-gray-400 text-sm" />
            </div>
            <input
              id="name"
              type="text"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-400 text-sm" />
            </div>
            <input
              id="email"
              type="email"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        {adminOnlyFields && (
          <>
            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                Organization
              </label>
              <input
                id="organization"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                placeholder="Your organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="adminCode" className="block text-sm font-medium text-gray-700 mb-1">
                Admin Code
              </label>
              <input
                id="adminCode"
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                placeholder="Enter admin code"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="text-gray-400 text-sm" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full pl-9 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              disabled={isSubmitting}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
            >
              {showPassword ? <FiEyeOff className="text-gray-400 text-sm" /> : <FiEye className="text-gray-400 text-sm" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="text-gray-400 text-sm" />
            </div>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              {role === 'admin' ? 'Create Admin Account' : 'Sign Up'} 
              <FiArrowRight className="ml-2 text-sm" />
            </>
          )}
        </motion.button>
      </form>

      {role === 'user' && (
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-cyan-600 hover:text-cyan-700 hover:underline">
            Log in
          </a>
        </div>
      )}
    </motion.div>
  );
}