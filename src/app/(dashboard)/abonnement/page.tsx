"use client";
import React, { useState } from 'react';

export default function AbonnementPage() {
  // État pour gérer le plan sélectionné (mensuel ou annuel)
  const [selectedPlan, setSelectedPlan] = useState('annuel');

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

  const handlePayment = () => {
    const plan = selectedPlan === 'mensuel' ? plans.mensuel : plans.annuel;
    alert(`Redirection vers le portail de paiement MoMo pour le plan ${plan.nom} (${plan.prix} FCFA)...`);
  };

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
        {/* Plan Mensuel */}
        <div 
          className={`plan-card ${selectedPlan === 'mensuel' ? 'selected border-green' : ''}`}
          onClick={() => setSelectedPlan('mensuel')}
          style={{ cursor: 'pointer' }}
        >
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
            <i className="fa-solid fa-bolt"></i> {plans.mensuel.credits} crédits
          </div>
          {selectedPlan === 'mensuel' ? (
            <div className="plan-selected-badge">
              <i className="fa-solid fa-check"></i> Sélectionné
            </div>
          ) : (
            <span className="plan-action-text">Toucher pour sélectionner</span>
          )}
        </div>

        {/* Plan Annuel */}
        <div 
          className={`plan-card ${selectedPlan === 'annuel' ? 'selected border-green' : ''}`}
          onClick={() => setSelectedPlan('annuel')}
          style={{ cursor: 'pointer' }}
        >
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
            <i className="fa-solid fa-bolt"></i> {plans.annuel.credits} crédits
          </div>
          {selectedPlan === 'annuel' ? (
            <div className="plan-selected-badge">
              <i className="fa-solid fa-check"></i> Sélectionné
            </div>
          ) : (
            <span className="plan-action-text">Toucher pour sélectionner</span>
          )}
        </div>
      </div>

      {/* Section Détails Avantages */}
      <div className="sub-benefits-card">
        <h3>Ce que comprend votre abonnement {selectedPlan}</h3>
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
          <p>Le paiement se fait par Mobile Money (MTN MoMo / Moov Money). Une fois validé, vos crédits seront ajoutés instantanément.</p>
        </div>

        <div className="sub-actions">
          <button className="btn-secondary">
            <i className="fa-solid fa-phone"></i> Support
          </button>
          <button className="btn-primary-sub" onClick={handlePayment}>
            <i className="fa-solid fa-bolt"></i> Payer {selectedPlan === 'mensuel' ? '2 000' : '20 000'} FCFA
          </button>
        </div>
      </div>

      {/* Section Historique des factures */}
      <div className="sub-benefits-card mt-20">
        <h3><i className="fa-solid fa-file-invoice"></i> Historique des transactions</h3>
        <div className="invoice-list" style={{ marginTop: '15px' }}>
          <div className="invoice-item" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: '1px solid #f1f5f9'
          }}>
            <div>
              <div style={{ fontWeight: '600' }}>Plan Annuel 2025</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>01 Janv 2025 • MTN MoMo</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '600' }}>20 000 FCFA</div>
              <a href="#" style={{ fontSize: '12px', color: '#157F3C', textDecoration: 'none' }}>
                <i className="fa-solid fa-download"></i> Facture
              </a>
            </div>
          </div>
          
          <div className="invoice-item" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '12px 0'
          }}>
            <div>
              <div style={{ fontWeight: '600' }}>Plan Mensuel (Test)</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>15 Déc 2024 • Moov Money</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '600' }}>2 000 FCFA</div>
              <a href="#" style={{ fontSize: '12px', color: '#157F3C', textDecoration: 'none' }}>
                <i className="fa-solid fa-download"></i> Facture
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  ); 
}