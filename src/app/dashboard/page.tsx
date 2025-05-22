'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
      <h1 className="text-4xl font-bold text-white mb-8 animate-pulse text-center">
        🏥 Dashboard
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => router.push(card.path)}
            className="bg-white/10 backdrop-blur-md border border-blue-500 rounded-2xl p-8 shadow-xl hover:scale-105 transition-all cursor-pointer flex flex-col items-center"
          >
            <div className="text-6xl mb-4">{card.icon}</div>
            <h2 className="text-2xl text-white font-semibold">{card.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
