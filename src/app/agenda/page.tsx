'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Appointment {
  id: number;
  paciente: string;
  data: string;
  horario: string;
  medico: string;
}

export default function Agenda() {
  const [agenda, setAgenda] = useState<Appointment[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios
      .get('http://localhost:8080/api/appointments', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAgenda(res.data))
      .catch(() => router.push('/login'));
  }, [router]);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
      <h1 className="text-4xl font-bold text-white mb-8 text-center animate-pulse">
        📅 Agenda
      </h1>

      <div className="space-y-4">
        {agenda.map((item) => (
          <div
            key={item.id}
            className="bg-white/10 backdrop-blur-md border border-blue-500 rounded-xl p-6 shadow-lg hover:scale-[1.02] transition-all"
          >
            <h2 className="text-2xl text-white font-semibold">
              Paciente: {item.paciente}
            </h2>
            <p className="text-blue-300">
              {item.data} às {item.horario}
            </p>
            <p className="text-blue-400">Médico: {item.medico}</p>
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
