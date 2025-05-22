'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        senha,
      });
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
      <div className="bg-white/10 backdrop-blur-md border border-blue-500 p-10 rounded-2xl shadow-xl w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-white mb-6 animate-pulse">
          🔐 Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-white/20 placeholder-white text-white border border-blue-700 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-white/20 placeholder-white text-white border border-blue-700 focus:outline-none"
        />

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-700 hover:bg-blue-900 text-white px-4 py-3 rounded-lg shadow-md"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
