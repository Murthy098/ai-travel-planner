'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Create Account</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" placeholder="Full Name" className="border p-3 rounded-lg" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input type="email" placeholder="Email" className="border p-3 rounded-lg" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          <input type="password" placeholder="Password" className="border p-3 rounded-lg" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
          <button type="submit" className="bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">Already have an account? <Link href="/login" className="text-blue-900 font-semibold">Login</Link></p>
      </div>
    </main>
  );
}