'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import '../styles/dashboard.css'; // Importa o CSS tradicional

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const cards = [
    { title: 'Médicos', path: '/medicos', icon: '🩺' },
    { title: 'Agenda', path: '/agenda', icon: '📅' },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">🏥 Dashboard</h1>

      <div className="card-grid">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => router.push(card.path)}
            className="dashboard-card"
          >
            <div className="dashboard-icon">{card.icon}</div>
            <h2 className="dashboard-card-title">{card.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
