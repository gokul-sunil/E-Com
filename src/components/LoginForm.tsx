'use client';
import { useState, FormEvent, useEffect } from 'react';
import {
  FiUser, FiLock, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginFormProps {
  onSubmit: (data: { username: string; password: string }) => Promise<void>;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit({ username, password });
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Failed to login. Please try again.');
      setShake(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  return (
    <motion.div>
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-[0_10px_30px_-5px_rgba(6,182,212,0.3)] max-w-md w-full mx-4 relative"
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '0 15px 35px rgba(6, 182, 212, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <motion.div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src="/logo.png"
              alt="Company Logo"
              className="w-14 h-14 rounded-full border-4 border-white"
              animate={{
                rotate: [0, 5, 0, -5, 0],
                y: [0, -3, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          </motion.div>
        </div>

        {/* Header */}
        <motion.h1
          className="text-xl font-bold text-center text-gray-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome Back
        </motion.h1>
        <motion.p
          className="text-center text-gray-600 mb-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Please enter your credentials to login
        </motion.p>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring' }}
            >
              <FiAlertCircle className="flex-shrink-0 mt-0.5 mr-2" />
              <div>{error}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Username */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="relative">
              <FiUser className="absolute inset-y-0 left-3 text-gray-400 text-sm my-auto" />
              <input
                id="username"
                type="text"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 hover:shadow-sm hover:border-cyan-300 text-sm"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                disabled={isSubmitting}
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute inset-y-0 left-3 text-gray-400 text-sm my-auto" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 hover:shadow-sm hover:border-cyan-300 text-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                minLength={6}
                disabled={isSubmitting}
              />
              <motion.button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={isSubmitting}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? (
                  <FiEyeOff className="text-gray-400 text-sm" />
                ) : (
                  <FiEye className="text-gray-400 text-sm" />
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Remember Me & Forgot Password */}
        <motion.div
          className="flex justify-between items-center mt-4 mb-5 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="flex items-center text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded transition-all duration-200"
              disabled={isSubmitting}
            />
            <span className="ml-2">Remember me</span>
          </label>
          <motion.a
            href="#"
            className="text-cyan-600 hover:text-cyan-700 hover:underline"
            whileHover={{ x: 2 }}
            transition={{ type: 'spring', stiffness: 500 }}
          >
            Forgot password?
          </motion.a>
        </motion.div>

        {/* Submit Button */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2.5 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            whileHover={!isSubmitting ? { y: -2 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {isSubmitting ? (
              <motion.span
                className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            ) : (
              <>
                Login
                <motion.span
                  animate={isHovered ? { x: 3 } : { x: 0 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <FiArrowRight className="ml-2 text-sm" />
                </motion.span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div
          className="mt-5 text-center text-xs text-gray-600"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Don't have an account?{' '}
          <motion.a
            href="/signup"
            className="font-medium text-cyan-600 hover:text-cyan-700 hover:underline"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 500 }}
          >
            Sign up
          </motion.a>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
