"use client";
import React, { useState, useMemo } from 'react';

const BENIN_DATA = [
  {
    departement: "ATLANTIQUE",
    communes: [
      {
        nom: "Abomey-Calavi",
        villes: [
          {
            nom: "Godomey",
            quartiers: ["Salamey", "Togoudo", "Houèdonou", "Cocotomey", "Fidjrossè-Kpota", "Découngbé", "Denou", "Hevié-Adovié"],
          },
          {
            nom: "Abomey-Calavi Centre",
            quartiers: ["Zogbadjè", "Tankpè", "Sèmè", "Tokpa-Zoungo", "Grawi", "Kansounkpa"],
          },
          { nom: "Akassato", quartiers: ["Glo-Djigbé", "Missébo", "Zopah"] },
        ],
      },
      {
        nom: "Ouidah",
        villes: [
          { nom: "Ouidah Centre", quartiers: ["Sogbadji", "Toutche", "Fonsaramè", "Zoungbodji"] },
          { nom: "Pahou", quartiers: ["Houndjava", "Acadjamè", "Kpovié"] },
        ],
      },
    ],
  },
  {
    departement: "LITTORAL",
    communes: [
      {
        nom: "Cotonou",
        villes: [
          { nom: "1er Arrondissement", quartiers: ["Dandji", "Donaten", "Finagnon", "Tchanhounkpami"] },
          { nom: "6ème Arrondissement", quartiers: ["Aidjèdo", "Hindé", "Ladji", "Vêdoko"] },
          { nom: "9ème Arrondissement", quartiers: ["Fifadji", "Ménontin", "Zogbo", "Zogbohouè"] },
          { nom: "12ème Arrondissement", quartiers: ["Fidjrossè", "Agla", "Akogbato", "Cadjèhoun"] },
        ],
      },
    ],
  },
  {
    departement: "OUÉMÉ",
    communes: [
      {
        nom: "Porto-Novo",
        villes: [{ nom: "Arrondissements 1-5", quartiers: ["Agbokou", "Djassin", "Tokpota", "Ayélawadjè", "Houinmè", "Kandévié", "Louho"] }],
      },
      {
        nom: "Sèmè-Kpodji",
        villes: [
          { nom: "Agblangandan", quartiers: ["PK10", "Cité de l'Espoir", "Gbagla"] },
          { nom: "Ekpè", quartiers: ["Ekpè-Hadjaho", "Tchonvi", "Djeffa"] },
        ],
      },
    ],
  },
  // ... Les autres départements peuvent être ajoutés ici sur le même modèle
];

export default function MaPharmacie() {
  const joursSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  // États pour la localisation dynamique
  const [dept, setDept] = useState(BENIN_DATA[0].departement);
  const [commune, setCommune] = useState(BENIN_DATA[0].communes[0].nom);
  const [ville, setVille] = useState(BENIN_DATA[0].communes[0].villes[0].nom);

  // État pour la gestion des jours de garde (Ouvert/Fermé)
  const [joursGarde, setJoursGarde] = useState<{ [key: string]: boolean }>({
    "Mardi": true,
    "Mercredi": true
  });

  // Logique de filtrage des données
  const communesDispo = useMemo(() => BENIN_DATA.find(d => d.departement === dept)?.communes || [], [dept]);
  const villesDispo = useMemo(() => communesDispo.find(c => c.nom === commune)?.villes || [], [commune, communesDispo]);
  const quartiersDispo = useMemo(() => villesDispo.find(v => v.nom === ville)?.quartiers || [], [ville, villesDispo]);

  const toggleJour = (jour: string) => {
    setJoursGarde(prev => ({ ...prev, [jour]: !prev[jour] }));
  }; 

  return (
    <div className="pharma-page">
      <div className="sub-header">
        <h1>Ma pharmacie</h1>
        <p>Gérez les informations et les horaires de votre pharmacie.</p>
      </div>

      <div className="sub-status-banner">
        <div className="status-icon"><i className="fa-solid fa-bolt"></i></div>
        <div className="status-info">
          <h3>Abonnement actif — 362 jours restants</h3>
          <p>Votre fiche est visible par les utilisateurs.</p>
        </div>
      </div>

      <div className="pharma-card">
        <h2 className="card-title">Modifier votre pharmacie</h2>
        <form className="pharma-form">
          <div className="form-row">
            <div className="input-group">
              <label>Nom de la pharmacie *</label>
              <input type="text" className="db-input" defaultValue="Pharmacie Saint Paul" />
            </div>
          </div>

          <div className="form-row flex-row">
            <div className="input-group half">
              <label>Département *</label>
              <select className="db-input" value={dept} onChange={(e) => { setDept(e.target.value); setCommune(""); setVille(""); }}>
                {BENIN_DATA.map(d => <option key={d.departement} value={d.departement}>{d.departement}</option>)}
              </select>
            </div>
            <div className="input-group half">
              <label>Commune *</label>
              <select className="db-input" value={commune} onChange={(e) => { setCommune(e.target.value); setVille(""); }}>
                <option value="">Sélectionner...</option>
                {communesDispo.map(c => <option key={c.nom} value={c.nom}>{c.nom}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row flex-row">
            <div className="input-group half">
              <label>Ville *</label>
              <select className="db-input" value={ville} onChange={(e) => setVille(e.target.value)}>
                <option value="">Sélectionner...</option>
                {villesDispo.map(v => <option key={v.nom} value={v.nom}>{v.nom}</option>)}
              </select>
            </div>
            <div className="input-group half">
              <label>Quartier *</label>
              <select className="db-input">
                <option value="">Sélectionner...</option>
                {quartiersDispo.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row flex-row">
            <div className="input-group half"><label>Téléphone *</label><input type="text" className="db-input" defaultValue="0157234689" /></div>
            <div className="input-group half"><label>WhatsApp</label><input type="text" className="db-input" defaultValue="0157234689" /></div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Numéro MoMo (paiement mobile)</label>
              <input type="text" className="db-input" defaultValue="0157234689" />
            </div>
          </div>

          <div className="toggle-container">
            <span>Pharmacie ouverte</span>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider round"></span>
            </label>
          </div>

          <button type="submit" className="btn-primary-sub"><i className="fa-solid fa-floppy-disk"></i> Sauvegarder</button>
        </form>
      </div>

      {/* Section Horaires de Garde */}
      <div className="pharma-card mt-20">
        <h2 className="card-title">Horaires de garde</h2>
        <p className="card-subtitle">Horaires de garde par jour</p>
        <p className="card-hint">Activez les jours où votre pharmacie est de garde et définissez les horaires.</p>

        <div className="hours-list">
          {joursSemaine.map((jour) => (
            <div key={jour} className={`hour-item ${joursGarde[jour] ? 'active-day' : ''}`}>
              <div className="hour-header">
                <span className="day-name">{jour}</span>
                <label className="switch mini">
                  <input 
                    type="checkbox" 
                    checked={!!joursGarde[jour]} 
                    onChange={() => toggleJour(jour)} 
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              
              {/* Le contenu ne s'affiche que si le toggle est activé */}
              {joursGarde[jour] && (
                <div className="hour-content-fade">
                  <div className="hour-options">
                    <label className="checkbox-custom">
                      <input type="checkbox" defaultChecked={jour === "Mardi"} />
                      <span className="checkmark"></span>
                      Journée complète (00h — 23h)
                    </label>
                  </div>

                  <div className="time-range flex-row">
                    <div className="input-group half">
                      <label>Début</label>
                      <div className="time-input">
                        <input type="time" defaultValue="08:00" />
                        <i className="fa-regular fa-clock"></i>
                      </div>
                    </div>
                    <div className="input-group half">
                      <label>Fin</label>
                      <div className="time-input">
                        <input type="time" defaultValue="20:00" />
                        <i className="fa-regular fa-clock"></i>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="btn-primary-sub mt-20">
          <i className="fa-solid fa-floppy-disk"></i> Sauvegarder les horaires
        </button>
      </div>
    </div>
  );
}