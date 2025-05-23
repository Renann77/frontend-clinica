
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../styles/medicos.css'; // Importando CSS tradicional

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
    <div className="medicos-container">
      <h1 className="title">🚑 Médicos Disponíveis</h1>

      <div className="grid-doctors">
        {medicos.map((medico) => (
          <div
            key={medico.id}
            onClick={() => router.push(`/medicos/${medico.id}`)}
            className="doctor-card"
          >
            <img
              src={medico.fotoUrl || '/doctor-placeholder.png'}
              alt={medico.nome}
              className="doctor-image"
            />
            <h2 className="doctor-name">{medico.nome}</h2>
            <p className="doctor-specialty">{medico.especialidade}</p>
          </div>
        ))}
      </div>

      <div className="back-button-container">
        <button
          onClick={() => router.push('/dashboard')}
          className="back-button"
        >
          🔙 Voltar
        </button>
      </div>
    </div>
  );
}
