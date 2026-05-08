"use client";
import React, { useState, useEffect } from 'react';

export default function PosologiePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [meds, setMeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les données depuis Turso via l'API
  useEffect(() => {
    async function fetchMeds() {
      try {
        const res = await fetch('/api/medicaments');
        if (res.ok) {
          const data = await res.json();
          setMeds(data);
        }
      } catch (err) {
        console.error("Erreur chargement posologies:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMeds();
  }, []);

  const filteredMeds = meds.filter(med => 
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

        {loading ? (
          <div style={{textAlign: 'center', padding: '40px'}}>
             <i className="fa-solid fa-spinner fa-spin fa-2x" style={{color: '#157F3C'}}></i>
          </div>
        ) : (
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
        )}

        {!loading && filteredMeds.length === 0 && (
          <div className="no-results">
            <p>Aucun médicament trouvé pour "{searchTerm}"</p>
          </div>
        )}
      </div>
    </main>
  );
}