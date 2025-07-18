'use client';
import { useState, FormEvent } from 'react';
import { FiUser, FiLock, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle } from 'react-icons/fi';

interface UserLoginFormProps {
  onSubmit: (data: { username: string; password: string }) => Promise<void>;
}

function UserLoginForm({ onSubmit }: UserLoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      await onSubmit({ username, password });
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Failed to login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full mx-4"
    >
      <div className="flex justify-center mb-8">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-full">
          <img 
            src="/logo.png" 
            alt="Company Logo" 
            className="w-16 h-16 rounded-full border-4 border-white" 
          />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h1>
      <p className="text-center text-gray-600 mb-8">Please enter your credentials to login</p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
          <FiAlertCircle className="flex-shrink-0 mt-1 mr-3" />
          <div>{error}</div>
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
          Username
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiUser className="text-gray-400" />
          </div>
          <input
            id="username"
            type="text"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLock className="text-gray-400" />
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            minLength={6}
            disabled={isSubmitting}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            disabled={isSubmitting}
          >
            {showPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <label className="flex items-center text-sm text-gray-600">
          <input 
            type="checkbox" 
            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded" 
            disabled={isSubmitting}
          />
          <span className="ml-2">Remember me</span>
        </label>
        <a href="#" className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all flex items-center justify-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? (
          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
        ) : (
          <>
            Login <FiArrowRight className="ml-2" />
          </>
        )}
      </button>

      <div className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <a href="#" className="font-medium text-cyan-600 hover:text-cyan-700 hover:underline">
          Sign up
        </a>
      </div>
    </form>
  );
}

export default UserLoginForm;