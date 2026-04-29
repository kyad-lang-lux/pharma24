"use client";
import React from 'react';

export default function AbonnementPage() {
  return (
    <div className="sub-wrapper">
      <div className="sub-header">
        <h1>Abonnement Pharma24</h1>
        <p>Choisissez le plan qui vous convient. Sans engagement, résiliable à tout moment.</p>
      </div>

      {/* Bannière État Actuel */}
      <div className="sub-status-banner">
        <div className="status-icon">
          <i className="fa-solid fa-bolt"></i>
        </div>
        <div className="status-info">
          <h3>Abonnement actif</h3>
          <p>Plan annuel — 362 crédits restants (1 crédit = 1 jour).</p>
        </div>
        <div className="status-badge">
          <span className="days">362</span>
          <span className="label">JOURS</span>
        </div>
      </div>

      {/* Cartes de Tarifs */}
      <div className="sub-plans-grid">
        <div className="plan-card">
          <div className="plan-icon green-bg">
             <i className="fa-regular fa-calendar"></i>
          </div>
          <h2>Mensuel</h2>
          <p className="plan-desc">Idéal pour démarrer en toute flexibilité.</p>
          <div className="plan-price">
            <span className="amount">2 000</span>
            <span className="currency">FCFA / mois</span>
          </div>
          <div className="plan-credits">
            <i className="fa-solid fa-bolt"></i> 31 crédits
          </div>
          <span className="plan-action-text">Toucher pour sélectionner</span>
        </div>

        <div className="plan-card selected border-green">
          <div className="best-offer-tag">
            <i className="fa-solid fa-star"></i> Meilleure offre
          </div>
          <div className="plan-icon solid-green">
             <i className="fa-solid fa-calendar-days"></i>
          </div>
          <h2>Annuel</h2>
          <p className="plan-desc">Engagez-vous pour un an, profitez de la plateforme toute l'année.</p>
          <div className="plan-price">
            <span className="amount">20 000</span>
            <span className="currency">FCFA / an</span>
          </div>
          <div className="plan-credits">
            <i className="fa-solid fa-bolt"></i> 365 crédits
          </div>
          <div className="plan-selected-badge">
             <i className="fa-solid fa-check"></i> Plan sélectionné
          </div>
        </div>
      </div>

      {/* Section Détails Avantages */}
      <div className="sub-benefits-card">
        <h3>Ce que comprend votre abonnement</h3>
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
            <i className="fa-solid fa-credit-card"></i>
            <span>Comment payer ?</span>
          </div>
          <p>Le paiement se fait par Mobile Money (MTN MoMo / Moov Money). Après votre paiement, cliquez sur le bouton ci-dessous pour activer vos crédits (365 jours).</p>
        </div>

        <div className="sub-actions">
          <button className="btn-secondary">
            <i className="fa-solid fa-phone"></i> Contacter le support
          </button>
          <button className="btn-primary-sub">
            <i className="fa-solid fa-bolt"></i> Activer annuel
          </button>
        </div>
      </div>
    </div>
  );
}