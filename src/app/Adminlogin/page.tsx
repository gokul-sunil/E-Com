'use client'
import UserLoginForm from '@/components/UserLoginForm';
// import LoginForm from '@/components/UserLoginForm';

interface LoginData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const handleLogin = async (formData: LoginData) => {
    try {
      const res = await fetch('https://api.example.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      console.log('Logged in:', data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Login error:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-cyan-100 to-cyan-400">
      <UserLoginForm onSubmit={handleLogin} />
    </div>
  );
}
