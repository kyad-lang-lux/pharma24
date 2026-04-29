"use client";
import React, { useState } from 'react';

const MEDICAMENTS_DATA = [
  {
    id: 1,
    nom: "Paracétamol",
    categorie: "Antalgique / Antipyrétique",
    indication: "Douleurs légères à modérées (maux de tête, fièvre, douleurs dentaires).",
    dosageAdulte: "500 mg à 1 g toutes les 4 à 6 heures. Maximum 4 g par jour.",
    dosageEnfant: "10 à 15 mg/kg toutes les 4 à 6 heures, sans dépasser 60 mg/kg/jour.",
    precaution: "À éviter en cas d'insuffisance hépatique. Ne pas associer à d'autres produits contenant du paracétamol."
  },
  {
    id: 2,
    nom: "Ibuprofène",
    categorie: "Anti-inflammatoire (AINS)",
    indication: "Fièvre, douleurs, inflammations (règles douloureuses, entorses, maux de dos).",
    dosageAdulte: "200 à 400 mg toutes les 6 heures. Maximum 1 200 mg par jour sans avis médical.",
    dosageEnfant: "20 à 30 mg/kg/jour répartis en 3 prises. À partir de 3 mois.",
    precaution: "Ne pas prendre à jeun. Contre-indiqué en cas d'ulcère, grossesse (3e trimestre), asthme sévère."
  }
];

export default function PosologiePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMeds = MEDICAMENTS_DATA.filter(med => 
    med.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
    med.indication.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="posologie-page">
      <div className="container">
        <header className="poso-header">
          <h1>Posologie des médicaments courants</h1>
          <p>Retrouvez les indications, doses adultes et enfants ainsi que les précautions des médicaments les plus utilisés.</p>
          
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input 
              type="text" 
              placeholder="Rechercher un médicament..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="info-alert">
          <i className="fa-solid fa-circle-info"></i>
          <p>Ces informations sont données à titre indicatif et ne remplacent pas l'avis d'un médecin ou pharmacien. En cas de doute, consultez un professionnel de santé.</p>
        </div>

        <div className="poso-grid">
          {filteredMeds.map((med) => (
            <div key={med.id} className="poso-card">
              <div className="card-header">
                <div className="med-title">
                  <span className="icon-pill"><i className="fa-solid fa-capsules"></i></span>
                  <h3>{med.nom}</h3>
                </div>
                <span className="med-category">{med.categorie}</span>
              </div>

              <div className="card-section">
                <h4>Indication</h4>
                <p>{med.indication}</p>
              </div>

              <div className="dosage-container">
                <div className="dosage-box adult">
                  <span className="label">ADULTE</span>
                  <p>{med.dosageAdulte}</p>
                </div>
                <div className="dosage-box child">
                  <span className="label">ENFANT</span>
                  <p>{med.dosageEnfant}</p>
                </div>
              </div>

              <div className="card-footer-warning">
                <i className="fa-solid fa-triangle-exclamation"></i>
                <p>{med.precaution}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredMeds.length === 0 && (
          <div className="no-results">
            <p>Aucun médicament trouvé pour "{searchTerm}"</p>
          </div>
        )}
      </div>
    </main>
  );
}