"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const BENIN_DATA = [
  {
    departement: "ATLANTIQUE",
    communes: [
      {
        nom: "Abomey-Calavi",
        villes: [
          {
            nom: "Godomey",
            quartiers: [
              "Salamey",
              "Togoudo",
              "Houèdonou",
              "Cocotomey",
              "Fidjrossè-Kpota",
              "Découngbé",
              "Denou",
              "Hevié-Adovié",
            ],
          },
          {
            nom: "Abomey-Calavi",
            quartiers: [
              "Zogbadjè",
              "Tankpè",
              "Sèmè",
              "Tokpa-Zoungo",
              "Grawi",
              "Kansounkpa",
            ],
          },
          { nom: "Akassato", quartiers: ["Glo-Djigbé", "Missébo", "Zopah"] },
        ],
      },
      {
        nom: "Ouidah",
        villes: [
          {
            nom: "Ouidah Centre",
            quartiers: ["Sogbadji", "Toutche", "Fonsaramè", "Zoungbodji"],
          },
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
          {
            nom: "1er Arrondissement",
            quartiers: ["Dandji", "Donaten", "Finagnon", "Tchanhounkpami"],
          },
          {
            nom: "6ème Arrondissement",
            quartiers: ["Aidjèdo", "Hindé", "Ladji", "Vêdoko"],
          },
          {
            nom: "9ème Arrondissement",
            quartiers: ["Fifadji", "Ménontin", "Zogbo", "Zogbohouè"],
          },
          {
            nom: "12ème Arrondissement",
            quartiers: ["Fidjrossè", "Agla", "Akogbato", "Cadjèhoun"],
          },
        ],
      },
    ],
  },
  {
    departement: "OUÉMÉ",
    communes: [
      {
        nom: "Porto-Novo",
        villes: [
          {
            nom: "Arrondissements 1-5",
            quartiers: [
              "Agbokou",
              "Djassin",
              "Tokpota",
              "Ayélawadjè",
              "Houinmè",
              "Kandévié",
              "Louho",
            ],
          },
        ],
      },
      {
        nom: "Sèmè-Kpodji",
        villes: [
          {
            nom: "Agblangandan",
            quartiers: ["PK10", "Cité de l'Espoir", "Gbagla"],
          },
          { nom: "Ekpè", quartiers: ["Ekpè-Hadjaho", "Tchonvi", "Djeffa"] },
        ],
      },
    ],
  },
  {
    departement: "BORGOU",
    communes: [
      {
        nom: "Parakou",
        villes: [
          {
            nom: "Arrondissements 1-3",
            quartiers: [
              "Albarika",
              "Amanwignon",
              "Bakpérou",
              "Tibona",
              "Titirou",
              "Yarakinnin",
            ],
          },
        ],
      },
    ],
  },
  {
    departement: "ZOU",
    communes: [
      {
        nom: "Bohicon",
        villes: [
          {
            nom: "Bohicon Centre",
            quartiers: ["Agbanwémè", "Gnidjazoun", "Sogba", "Kpocon"],
          },
        ],
      },
      {
        nom: "Abomey",
        villes: [
          { nom: "Vidolè", quartiers: ["Goho", "Djègbé", "Hountondji"] },
        ],
      },
    ],
  },
  {
    departement: "MONO",
    communes: [
      {
        nom: "Lokossa",
        villes: [
          { nom: "Lokossa Centre", quartiers: ["Agonvè", "Glo", "Sèhou-Laba"] },
        ],
      },
    ],
  },
  {
    departement: "ALIBORI",
    communes: [
      {
        nom: "Kandi",
        villes: [
          {
            nom: "Kandi Centre",
            quartiers: ["Baobab", "Madina", "Pèpère-Béri"],
          },
        ],
      },
    ],
  },
  {
    departement: "ATACORA",
    communes: [
      {
        nom: "Natitingou",
        villes: [
          {
            nom: "Natitingou Centre",
            quartiers: ["Kantaborifa", "Ourou-Boni", "Yelwa"],
          },
        ],
      },
    ],
  },
  {
    departement: "DONGA",
    communes: [
      {
        nom: "Djougou",
        villes: [
          {
            nom: "Djougou Centre",
            quartiers: ["Kamouhoun", "Madina", "Taïfa"],
          },
        ],
      },
    ],
  },
  {
    departement: "COLLINES",
    communes: [
      {
        nom: "Dassa-Zoumè",
        villes: [
          { nom: "Dassa Centre", quartiers: ["Arigbo", "Esso", "Zongo"] },
        ],
      },
    ],
  },
  {
    departement: "PLATEAU",
    communes: [
      {
        nom: "Pobè",
        villes: [
          { nom: "Pobè Centre", quartiers: ["Issaba", "Oke-Ola", "Towé"] },
        ],
      },
    ],
  },
  {
    departement: "COUFFO",
    communes: [
      {
        nom: "Aplahoué",
        villes: [
          {
            nom: "Aplahoué Centre",
            quartiers: ["Azovè", "Kissamey", "Godohou"],
          },
        ],
      },
    ],
  },
];

const PHARMACIES_MOCK = [
  {
    id: 1,
    nom: "Pharmacie Saint Paul",
    adresse: "Salamey, Godomey, Abomey-Calavi, Atlantique",
    departement: "ATLANTIQUE",
    commune: "Abomey-Calavi",
    isDeGarde: true,
    horaireGarde: "08:00:00 — 09:00:00",
    joursGarde: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
    momo: "0157234689",
    telephone: "+2290157234689",
    whatsapp: "2290157234689",
    mapsLink: "https://maps.app.goo.gl/G4wGGjC6DkHpQDjV8",
  }
];

export default function PharmaciesPage() {
  const [filters, setFilters] = useState({
    departement: "",
    commune: "",
    ville: "",
    quartier: ""
  });
  const checkIfCurrentlyOpen = (horaireGarde: string) => {
  if (horaireGarde.includes("complète")) return true;

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  // On extrait les heures (ex: "08:00:00 — 20:00:00" -> ["08:00", "20:00"])
  const times = horaireGarde.split("—").map(t => t.trim());
  if (times.length !== 2) return false;

  const [startH, startM] = times[0].split(":").map(Number);
  const [endH, endM] = times[1].split(":").map(Number);

  const startTime = startH * 60 + startM;
  const endTime = endH * 60 + endM;

  return currentTime >= startTime && currentTime <= endTime;
};

  const [filteredResults, setFilteredResults] = useState(PHARMACIES_MOCK);
  const [isSearching, setIsSearching] = useState(false);

  const currentDayIndex = new Date().getDay();
  const daysShort = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  // Données pour les selects en cascade
  const selectedDept = BENIN_DATA.find(d => d.departement === filters.departement);
  const communes = selectedDept ? selectedDept.communes : [];
  const selectedCommune = communes.find(c => c.nom === filters.commune);
  const villes = selectedCommune ? selectedCommune.villes : [];
  const selectedVille = villes.find(v => v.nom === filters.ville);
  const quartiers = selectedVille ? selectedVille.quartiers : [];

  // Fonction de recherche
  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulation d'un petit délai pour l'effet visuel
    setTimeout(() => {
      const results = PHARMACIES_MOCK.filter(pharma => {
        const matchDept = filters.departement ? pharma.departement === filters.departement : true;
        const matchCommune = filters.commune ? pharma.commune === filters.commune : true;
        // Ajoute ici tes autres logiques de filtrage si nécessaire
        return matchDept && matchCommune;
      });
      
      setFilteredResults(results);
      setIsSearching(false);
    }, 400);
  };

  return (
    <main className="pharmacy-page">
      <div className="container">
        <header className="page-header">
          <h1>Pharmacies de garde</h1>
          <p>Trouvez les pharmacies ouvertes et de garde près de vous au Bénin.</p>
          <br /> 
        </header>

        <div className="search-section">
          <div className="filter-bar">
            <select 
              value={filters.departement} 
              onChange={(e) => setFilters({departement: e.target.value, commune: "", ville: "", quartier: ""})}
            >
              <option value="">Département</option>
              {BENIN_DATA.map(d => <option key={d.departement} value={d.departement}>{d.departement}</option>)}
            </select>

            <select 
              value={filters.commune} 
              disabled={!filters.departement}
              onChange={(e) => setFilters({...filters, commune: e.target.value, ville: "", quartier: ""})}
            >
              <option value="">Commune</option>
              {communes.map(c => <option key={c.nom} value={c.nom}>{c.nom}</option>)}
            </select>

            <select 
              value={filters.ville} 
              disabled={!filters.commune}
              onChange={(e) => setFilters({...filters, ville: e.target.value, quartier: ""})}
            >
              <option value="">Ville</option>
              {villes.map(v => <option key={v.nom} value={v.nom}>{v.nom}</option>)}
            </select>

            <select 
              value={filters.quartier} 
              disabled={!filters.ville}
              onChange={(e) => setFilters({...filters, quartier: e.target.value})}
            >
              <option value="">Quartier</option>
              {quartiers.map(q => <option key={q} value={q}>{q}</option>)}
            </select>
          </div>

          <button 
            onClick={handleSearch} 
            className="btn-search shine-effect"
            disabled={isSearching}
          >
            {isSearching ? ( 
              <><i className="fa-solid fa-spinner fa-spin"></i> Recherche...</>
            ) : (
              <><i className="fa-solid fa-magnifying-glass"></i> Rechercher</>
            )}
          </button>
        </div>

        <div className="pharmacy-grid">
          {filteredResults.length > 0 ? (
            filteredResults.map((pharma) => (
              <div key={pharma.id} className="pharmacy-card">
                <div className="card-top">
                  <div className="pharma-info">
                    <h3>{pharma.nom}</h3>
                    <p className="address">
                      <i className="fa-solid fa-location-dot"></i> {pharma.adresse}
                    </p>
                  </div>
                  <div className="pharma-badges">
  {pharma.isDeGarde && checkIfCurrentlyOpen(pharma.horaireGarde) ? (
    <span className="badge-garde">de garde</span>
  ) : (
    <span className="badge-not-garde">pas de garde</span>
  )}
  
</div>
                </div>

                <div className="card-body">
                  <p className="garde-time">
                    <i className="fa-regular fa-clock"></i> {pharma.horaireGarde.includes('complète') ? 'De garde (journée complète)' : `De garde (${pharma.horaireGarde})`}
                  </p>
                  
                  <div className="days-list">
                    {daysShort.map((day, idx) => (
                      <span 
                        key={day} 
                        className={`day-item ${idx === currentDayIndex ? 'current' : ''}`}
                      >
                        {day}
                      </span>
                    ))}
                  </div>

                  <div className="momo-box">
                    <i className="fa-solid fa-money-bill-transfer"></i> MoMo : {pharma.momo}
                  </div>
                </div>

                <div className="card-footer">
                  <a href={`tel:${pharma.telephone}`} className="btn-action call">
                    <i className="fa-solid fa-phone"></i> Appeler
                  </a>
                  <a href={`https://wa.me/${pharma.whatsapp}`} target="_blank" className="btn-action whatsapp">
                    <i className="fa-brands fa-whatsapp"></i> WhatsApp
                  </a>
                  <a href={pharma.mapsLink} target="_blank" className="btn-action maps">
                    <i className="fa-solid fa-location-arrow"></i> Itinéraire
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <i className="fa-solid fa-face-frown"></i>
              <p>Aucune pharmacie trouvée pour cette sélection.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}