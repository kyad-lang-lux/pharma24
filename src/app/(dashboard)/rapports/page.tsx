"use client";
import React, { useState, useEffect } from 'react';

export default function RapportPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // ÉTATS POUR LES DONNÉES RÉELLES
  const [statsData, setStatsData] = useState({ vues: 0, appels: 0, maps: 0 });
  const [chartData, setChartData] = useState([
    { day: "Lun", vues: 0 }, { day: "Mar", vues: 0 }, { day: "Mer", vues: 0 },
    { day: "Jeu", vues: 0 }, { day: "Ven", vues: 0 }, { day: "Sam", vues: 0 }, { day: "Dim", vues: 0 },
  ]);

  // Chargement des données au montage
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats/rapport');
        const data = await res.json();
        
        if (data.totaux) {
          const s = { vues: 0, appels: 0, maps: 0 };
          data.totaux.forEach((t: any) => {
            if (t.type === 'vue') s.vues = t.count;
            if (t.type === 'appel') s.appels = t.count;
            if (t.type === 'maps') s.maps = t.count;
          });
          setStatsData(s);
        }

        if (data.graphData && data.graphData.length > 0) {
          const daysShort = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
          const formatted = data.graphData.map((d: any) => ({
            day: daysShort[new Date(d.date).getDay()],
            vues: d.vues
          }));
          setChartData(formatted);
        }
      } catch (err) {
        console.error("Erreur stats:", err);
      }
    }
    fetchStats();
  }, []);

  const stats = [
    { label: "Vues de la fiche", value: statsData.vues.toLocaleString(), icon: "fa-solid fa-eye", color: "#6366f1", trend: "+ 12.5%" },
    { label: "Appels lancés", value: statsData.appels.toLocaleString(), icon: "fa-solid fa-phone", color: "#157F3C", trend: "+ 5.2%" },
    { label: "Itinéraires Maps", value: statsData.maps.toLocaleString(), icon: "fa-solid fa-location-dot", color: "#f59e0b", trend: "+ 8.1%" },
  ];

  // --- LOGIQUE DU GRAPHIQUE ---
  // On cherche la valeur max pour que le graphique soit proportionnel
  const maxVues = Math.max(...chartData.map(d => d.vues), 10); 
  // Calcul des points SVG (x: index * 100, y: 180 - ratio)
  const points = chartData.map((d, i) => {
    const x = i * 100 + 50;
    const y = 180 - (d.vues / maxVues) * 150;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="reports-wrapper">
      <div className="reports-header">
        <h1>Statistiques de visibilité</h1>
        <p>Impact réel de votre pharmacie sur Pharma24.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ color: stat.color, backgroundColor: `${stat.color}15` }}>
              <i className={stat.icon}></i>
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <div className="stat-val-row">
                <h2 className="stat-value">{stat.value}</h2>
                <span className="stat-trend" style={{ color: '#157F3C' }}>{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="analytics-container">
        <div className="chart-header">
          <div className="chart-period-text">
            <strong>7 derniers jours</strong> <span style={{ color: '#64748b', marginLeft: '8px' }}>(Données en temps réel)</span>
          </div>
        </div> 

        <div className="chart-visual-wrapper">
          <svg viewBox="0 0 700 200" className="line-chart-svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#157F3C" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#157F3C" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Zone remplie sous la ligne */}
            <path 
              d={`M 50,200 L ${points} L 650,200 Z`} 
              fill="url(#lineGradient)" 
            />

            {/* Ligne du graphique */}
            <polyline
              fill="none"
              stroke="#157F3C"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />

            {chartData.map((d, i) => {
              const cx = i * 100 + 50;
              const cy = 180 - (d.vues / maxVues) * 150;
              return (
                <g key={i}>
                  <text
                    x={cx}
                    y={cy - 15}
                    textAnchor="middle"
                    fill="#1e293b"
                    style={{ fontSize: '12px', fontWeight: 'bold' }}
                  >
                    {d.vues}
                  </text>

                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r="6" 
                    className="chart-point"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{ 
                      fill: hoveredIndex === i ? '#157F3C' : '#fff', 
                      stroke: '#157F3C', 
                      strokeWidth: 3,
                      transition: 'all 0.2s'
                    }}
                  />
                </g>
              );
            })}
          </svg>

          <div className="chart-x-axis">
            {chartData.map((d, i) => (
              <span key={i}>{d.day}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}