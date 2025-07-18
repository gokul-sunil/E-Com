'use client';

import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  const handleLogin = async (formData: { username: string; password: string }) => {
    const res = await fetch('https://api.example.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');

    console.log('Login successful:', data);
    // navigate to dashboard or home
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-cyan-100 to-cyan-400">
      <LoginForm onSubmit={handleLogin} />

    </div>
  );
}
