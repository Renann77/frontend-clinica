'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../styles/agenda.css'; // ✅ Importa o CSS

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
    <div className="agenda-container">
      <h1 className="agenda-title">📅 Agenda</h1>

      <div className="agenda-list">
        {agenda.map((item) => (
          <div key={item.id} className="agenda-card">
            <h2 className="agenda-paciente">Paciente: {item.paciente}</h2>
            <p className="agenda-horario">
              {item.data} às {item.horario}
            </p>
            <p className="agenda-medico">Médico: {item.medico}</p>
          </div>
        ))}
      </div>

      <div className="agenda-footer">
        <button onClick={() => router.push('/dashboard')} className="agenda-voltar">
          🔙 Voltar
        </button>
      </div>
    </div>
  );
}
