'use client';
import { useRouter } from 'next/navigation';
import SignUpForm from '@/components/SignUpForm';

export default function UserSignupPage() {
  const router = useRouter();

  const handleSignUp = async (formData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'user' // Explicitly setting role as user
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      // Redirect to login page with success state
      router.push('/login?signup=success');
    } catch (error) {
      console.error('Signup error:', error);
      throw error; // This will be caught by the SignUpForm component
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-100 p-4">
      <SignUpForm 
        onSubmit={handleSignUp} 
        role="user"
        adminOnlyFields={false}
      />
    </div>
  );
}