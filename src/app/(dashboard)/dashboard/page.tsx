"use client";
import React from 'react';
import Link from 'next/link';

export default function DashboardHome() {
  const nomPharmacie = "Pharmacie Saint Paul"; // Dynamique plus tard

  const menuItems = [
    {
      title: "Ma Pharmacie",
      desc: "Gérez vos informations de contact et définissez vos périodes de garde pour apparaître en priorité sur la carte.",
      link: "/mapharmacie",
      icon: "fa-solid fa-notes-medical",
      color: "#157F3C"
    },
    
    {
      title: "Abonnement & Crédits",
      desc: "Suivez votre solde de jours restants et gérez vos factures de paiement.",
      link: "/abonnement",
      icon: "fa-solid fa-bolt",
      color: "#f59e0b"
    },
    {
      title: "Profil & Sécurité",
      desc: "Modifiez vos accès, votre email de contact et votre mot de passe.",
      link: "/parametre",
      icon: "fa-solid fa-user-gear",
      color: "#ef4444"
    }
  ];

  return (
    <div className="dash-home-wrapper">
      <div className="welcome-section">
        <h1> <span className="highlight">{nomPharmacie}</span> </h1>
        <p>Votre tableau de bord est prêt. Gérez votre visibilité en quelques clics.</p>
        
        {/* <div className="quick-stats">
          <div className="stat-pill"><i className="fa-solid fa-circle-check"></i> Fiche active</div>
          <div className="stat-pill"><i className="fa-solid fa-calendar-day"></i> Garde demain : Non</div>
        </div> */}
      </div>

      <div className="welcome-grid">
        {menuItems.map((item, index) => (
          <div key={index} className="welcome-card">
            <div className="card-icon" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
              <i className={item.icon}></i>
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <Link href={item.link} className="card-link">
              Accéder <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        ))}
      </div> 
    </div>
  );
}