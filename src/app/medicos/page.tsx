'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Doctor {
  id: number;
  nome: string;
  especialidade: string;
  fotoUrl: string;
}

export default function Medicos() {
  const [medicos, setMedicos] = useState<Doctor[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios
      .get('http://localhost:8080/api/doctors', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMedicos(res.data))
      .catch(() => router.push('/login'));
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 p-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center animate-pulse">
        🚑 Médicos Disponíveis
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {medicos.map((medico) => (
          <div
            key={medico.id}
            onClick={() => router.push(`/medicos/${medico.id}`)}
            className="bg-white/10 backdrop-blur-md border border-blue-500 rounded-2xl p-6 shadow-xl hover:scale-105 transition-all cursor-pointer"
          >
            <img
              src={medico.fotoUrl || '/doctor-placeholder.png'}
              alt={medico.nome}
              className="w-full h-48 object-cover rounded-xl mb-4 border border-blue-700"
            />
            <h2 className="text-2xl font-semibold text-white">{medico.nome}</h2>
            <p className="text-blue-300">{medico.especialidade}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-blue-700 hover:bg-blue-900 text-white px-6 py-3 rounded-full shadow-lg"
        >
          🔙 Voltar
        </button>
      </div>
    </div>
  );
}
