"use client";
import React, { useState } from 'react';

export default function RapportPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const stats = [
    { label: "Vues de la fiche", value: "1 240", icon: "fa-solid fa-eye", color: "#6366f1", trend: "+ 12.5%" },
    { label: "Appels lancés", value: "85", icon: "fa-solid fa-phone", color: "#10b981", trend: "+ 5.2%" },
    { label: "Itinéraires Maps", value: "142", icon: "fa-solid fa-location-dot", color: "#f59e0b", trend: "+ 8.1%" },
  ];

  const data = [
    { day: "Lun", vues: 45 },
    { day: "Mar", vues: 30 },
    { day: "Mer", vues: 65 },
    { day: "Jeu", vues: 40 },
    { day: "Ven", vues: 85 },
    { day: "Sam", vues: 55 },
    { day: "Dim", vues: 90 },
  ];

  // Calcul du chemin de la ligne (SVG) basé sur les données
  const points = data.map((d, i) => `${i * 100 + 50},${180 - d.vues * 1.5}`).join(" ");

  return (
    <div className="reports-wrapper">
      <div className="reports-header">
        <h1>Statistiques de visibilité</h1>
        <p>Impact réel de votre pharmacie sur Pharma24.</p>
      </div>

      {/* Cartes de résumé */}
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
                <span className="stat-trend" style={{ color: '#10b981' }}>{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphique Linéaire Analytics */}
      <div className="analytics-container">
        <div className="chart-header">
          <div className="chart-period-text">
            <strong>7 derniers jours</strong> <span style={{ color: '#64748b', marginLeft: '8px' }}>(lun 27 avril - dim 3 mai)</span>
          </div>
        </div>

        <div className="chart-visual-wrapper">
          <svg viewBox="0 0 700 200" className="line-chart-svg" preserveAspectRatio="none">
            {/* Dégradé sous la courbe */}
            <defs>
              <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Zone remplie */}
            <path 
              d={`M 50,200 L ${points} L 650,200 Z`} 
              fill="url(#lineGradient)" 
            />

            {/* Ligne principale */}
            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />

            {/* Points et Labels de données */}
            {data.map((d, i) => (
              <g key={i}>
                {/* Texte des vues affiché au-dessus du pic */}
                <text
                  x={i * 100 + 50}
                  y={180 - d.vues * 1.5 - 15}
                  textAnchor="middle"
                  fill="#1e293b"
                  style={{ fontSize: '14px', fontWeight: 'bold' }}
                >
                  {d.vues}
                </text>

                <circle 
                  cx={i * 100 + 50} 
                  cy={180 - d.vues * 1.5} 
                  r="6" 
                  className="chart-point"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ fill: hoveredIndex === i ? '#10b981' : '#fff', stroke: '#10b981', strokeWidth: 3 }}
                />
              </g>
            ))}
          </svg>

          {/* Axe X - Jours */}
          <div className="chart-x-axis">
            {data.map((d, i) => (
              <span key={i}>{d.day}</span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
} 