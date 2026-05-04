"use client";
import React, { useState, useEffect } from 'react';

export default function AbonnementPage() {
  // État pour stocker les données réelles de l'utilisateur
  const [userData, setUserData] = useState<{ nom: string, credits: number } | null>(null);
  const [loading, setLoading] = useState(true);

  // Récupération des données réelles (crédits) au chargement
  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        }
      } catch (err) {
        console.error("Erreur récupération crédits:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, []);

  const plans = {
    mensuel: {
      nom: "Mensuel",
      prix: "2 000",
      unite: "mois",
      credits: 31
    },
    annuel: {
      nom: "Annuel",
      prix: "20 000",
      unite: "an",
      credits: 365
    }
  };

  return (
    <div className="sub-wrapper">
      <div className="sub-header">
        <h1>Abonnement Pharma<span>24</span> </h1>
        <p>Consultez votre solde de crédits et découvrez nos offres de renouvellement.</p>
      </div>

      {/* Bannière État Actuel - Connectée aux données réelles */}
      <div className="sub-status-banner">
        <div className="status-icon">
          <i className="fa-solid fa-bolt"></i>
        </div>
        <div className="status-info">
          <h3>Statut de votre visibilité</h3>
          {loading ? (
            <p><i className="fa-solid fa-spinner fa-spin"></i> Chargement de votre solde...</p>
          ) : (
            <p>
              Compte : <strong>{userData?.nom || "Ma Pharmacie"}</strong> — 
              {userData && userData.credits > 0 
                ? ` ${userData.credits} jours de visibilité restants.` 
                : " Votre abonnement est expiré."}
            </p>
          )}
        </div>
        <div className="status-badge">
          <span className="days">{userData?.credits ?? 0}</span>
          <span className="label">JOURS</span>
        </div>
      </div>

      {/* Cartes de Tarifs - Désormais statiques (non sélectionnables) */}
      <div className="sub-plans-grid">
        {/* Plan Mensuel */}
        <div className="plan-card">
          <div className="plan-icon green-bg">
             <i className="fa-regular fa-calendar"></i>
          </div>
          <h2>{plans.mensuel.nom}</h2>
          <p className="plan-desc">Idéal pour démarrer en toute flexibilité.</p>
          <div className="plan-price">
            <span className="amount">{plans.mensuel.prix}</span>
            <span className="currency">FCFA / {plans.mensuel.unite}</span>
          </div>
          <div className="plan-credits">
            <i className="fa-solid fa-bolt"></i> {plans.mensuel.credits} crédits (31 jours)
          </div>
          <span className="plan-action-text" style={{ color: '#64748b' }}>Tarif standard</span>
        </div>

        {/* Plan Annuel */}
        <div className="plan-card">
          <div className="best-offer-tag">
            <i className="fa-solid fa-star"></i> Meilleure offre
          </div>
          <div className="plan-icon solid-green">
             <i className="fa-solid fa-calendar-days"></i>
          </div>
          <h2>{plans.annuel.nom}</h2>
          <p className="plan-desc">Engagez-vous pour un an, profitez de la plateforme toute l'année.</p>
          <div className="plan-price">
            <span className="amount">{plans.annuel.prix}</span>
            <span className="currency">FCFA / {plans.annuel.unite}</span>
          </div>
          <div className="plan-credits">
            <i className="fa-solid fa-bolt"></i> {plans.annuel.credits} crédits (365 jours)
          </div>
          <span className="plan-action-text" style={{ color: '#157F3C' }}>Économisez 4 000 FCFA</span>
        </div>
      </div>

      {/* Section Détails Avantages */}
      <div className="sub-benefits-card">
        <h3>Services inclus dans votre accès</h3>
        <div className="benefits-grid">
          <div className="benefit-item"><i className="fa-solid fa-circle-check"></i> Fiche pharmacie visible sur la plateforme</div>
          <div className="benefit-item"><i className="fa-solid fa-circle-check"></i> Gestion des horaires de garde par jour</div>
          <div className="benefit-item"><i className="fa-solid fa-circle-check"></i> Appels et WhatsApp directs depuis votre fiche</div>
          <div className="benefit-item"><i className="fa-solid fa-circle-check"></i> Affichage du numéro MoMo pour les paiements</div>
          <div className="benefit-item"><i className="fa-solid fa-circle-check"></i> Localisation sur la carte interactive</div>
          <div className="benefit-item"><i className="fa-solid fa-circle-check"></i> Visibilité auprès de milliers de patients</div>
          <div className="benefit-item"><i className="fa-solid fa-circle-check"></i> Statut Ouvert / De garde en temps réel</div>
          <div className="benefit-item"><i className="fa-solid fa-circle-check"></i> Compteur de vues sur votre fiche</div>
          <div className="benefit-item"><i className="fa-solid fa-circle-check"></i> Support technique dédié</div>
        </div>

        <div className="payment-notice">
          <div className="notice-header">
            <i className="fa-solid fa-circle-info"></i>
            <span>Comment renouveler ?</span>
          </div>
          <p>Pour acheter des crédits supplémentaires, veuillez contacter le support ou vous rendre dans la section dédiée du menu principal. Le paiement est instantané via MTN MoMo ou Moov Money.</p>
        </div>

        <div className="sub-actions">
          <button className="btn-secondary">
            <i className="fa-solid fa-phone"></i> Contacter le support
          </button>
          <button className="btn-primary-sub">
            <i className="fa-solid fa-cart-shopping"></i> Acheter des crédits
          </button>
        </div>
      </div>

      {/* Section Historique des factures */}
      <div className="sub-benefits-card mt-20">
        <h3><i className="fa-solid fa-file-invoice"></i> Historique des transactions</h3>
        <div className="invoice-list" style={{ marginTop: '15px' }}>
          {/* Si pas de transactions, afficher un message, sinon lister ici */}
          <div className="invoice-item" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: '1px solid #f1f5f9'
          }}>
            <div>
              <div style={{ fontWeight: '600' }}>Crédits de bienvenue (Confirmation)</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Automatique • Activation compte</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '600' }}>Gratuit</div>
              <span style={{ fontSize: '12px', color: '#10b981' }}>+31 crédits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ); 
}