"use client";
import { useSearchParams } from 'next/navigation';

import React, { useState, useEffect } from 'react';

// Tes données BENIN_DATA (Gardées intactes comme demandé)

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

export default function PharmaciesPage() {
  const [allPharmacies, setAllPharmacies] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    departement: "",
    commune: "",
    ville: "",
    quartier: ""
  });

  const daysFull = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const daysShort = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const currentDayIndex = new Date().getDay();
  const currentDayName = daysFull[currentDayIndex];

  // --- FONCTION DE TRACKING ---
  const trackAction = async (pharmaId: number, type: 'vue' | 'appel' | 'maps') => {
    try {
      await fetch('/api/stats/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pharmacieId: pharmaId, type })
      });
    } catch (err) {
      console.error("Erreur de tracking:", err);
    }
  };

  // 1. Charger TOUTES les pharmacies au démarrage + Tracker les VUES
  useEffect(() => {
    async function fetchAll() {
      try {
        const res = await fetch('/api/pharmacie/public');
        if (res.ok) {
          const data = await res.json();
          setAllPharmacies(data);
          setFilteredResults(data);

          // Tracker la vue pour chaque pharmacie affichée au chargement
          data.forEach((p: any) => trackAction(p.id, 'vue'));
        }
      } catch (err) {
        console.error("Erreur chargement pharmacies:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const getGardeInfo = (horaires: any[]) => {
    const aujourdhui = horaires?.find(h => h.jour === currentDayName);
    if (!aujourdhui || !aujourdhui.isGarde) return { active: false, label: "Pas de garde" };
    if (aujourdhui.isFullDay) return { active: true, label: "De garde (24h/24)" };

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [startH, startM] = (aujourdhui.heureDebut || "08:00").split(":").map(Number);
    const [endH, endM] = (aujourdhui.heureFin || "20:00").split(":").map(Number);
    const startTime = startH * 60 + startM;
    const endTime = endH * 60 + endM;

    if (currentTime >= startTime && currentTime <= endTime) {
      return { active: true, label: `De garde (${aujourdhui.heureDebut} — ${aujourdhui.heureFin})` };
    }
    return { active: false, label: `Garde terminée (${aujourdhui.heureFin})` };
  };

  const selectedDept = BENIN_DATA.find(d => d.departement === filters.departement);
  const communes = selectedDept ? selectedDept.communes : [];
  const selectedCommune = communes.find(c => c.nom === filters.commune);
  const villes = selectedCommune ? selectedCommune.villes : [];
  const selectedVille = villes.find(v => v.nom === filters.ville);
  const quartiers = selectedVille ? selectedVille.quartiers : [];

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      const results = allPharmacies.filter(pharma => {
        const matchDept = filters.departement ? pharma.departement === filters.departement : true;
        const matchCommune = filters.commune ? pharma.commune === filters.commune : true;
        const matchVille = filters.ville ? pharma.ville === filters.ville : true;
        const matchQuartier = filters.quartier ? pharma.quartier === filters.quartier : true;
        return matchDept && matchCommune && matchVille && matchQuartier;
      });
      setFilteredResults(results);
      setIsSearching(false);
    }, 400);
  };

  useEffect(() => {
    // 1. On récupère les valeurs de l'URL
    const dept = searchParams.get("dept") || "";
    const commune = searchParams.get("commune") || "";
    const ville = searchParams.get("ville") || "";
    const quartier = searchParams.get("quartier") || "";

    // 2. On met à jour les filtres de la page
    if (dept) {
      setFilters({
        departement: dept,
        commune: commune,
        ville: ville,
        quartier: quartier
      });

      // 3. On déclenche le filtrage automatique sur les données chargées
      // Si allPharmacies est déjà chargé, on filtre
      if (allPharmacies.length > 0) {
        const results = allPharmacies.filter(pharma => {
          const matchDept = dept ? pharma.departement === dept : true;
          const matchCommune = commune ? pharma.commune === commune : true;
          const matchVille = ville ? pharma.ville === ville : true;
          const matchQuartier = quartier ? pharma.quartier === quartier : true;
          return matchDept && matchCommune && matchVille && matchQuartier;
        });
        setFilteredResults(results);
      }
    }
  }, [searchParams, allPharmacies]); // S'exécute quand l'URL change ou quand les données arrivent

  
  return (
    <main className="pharmacy-page">
      <div className="container">
        <header className="page-header">
          <h1>Pharmacies de garde</h1>
          <p>Trouvez les pharmacies ouvertes et de garde près de vous au Bénin.</p>
        </header>
        <br />

        <div className="search-section">
          <div className="filter-bar">
            <select value={filters.departement} onChange={(e) => setFilters({departement: e.target.value, commune: "", ville: "", quartier: ""})}>
              <option value="">Département</option>
              {BENIN_DATA.map(d => <option key={d.departement} value={d.departement}>{d.departement}</option>)}
            </select>
            <select value={filters.commune} disabled={!filters.departement} onChange={(e) => setFilters({...filters, commune: e.target.value, ville: "", quartier: ""})}>
              <option value="">Commune</option>
              {communes.map(c => <option key={c.nom} value={c.nom}>{c.nom}</option>)}
            </select>
            <select value={filters.ville} disabled={!filters.commune} onChange={(e) => setFilters({...filters, ville: e.target.value, quartier: ""})}>
              <option value="">Ville</option>
              {villes.map(v => <option key={v.nom} value={v.nom}>{v.nom}</option>)}
            </select>
            <select value={filters.quartier} disabled={!filters.ville} onChange={(e) => setFilters({...filters, quartier: e.target.value})}>
              <option value="">Quartier</option>
               {quartiers.map(q => <option key={q} value={q}>{q}</option>)}
            </select>
          </div>

          <button onClick={handleSearch} className="btn-search shine-effect" disabled={isSearching || loading}>
            {isSearching ? <><i className="fa-solid fa-spinner fa-spin"></i> Recherche...</> : <><i className="fa-solid fa-magnifying-glass"></i> Rechercher</>}
          </button>
        </div>

        {loading ? (
          <div className="loading-state" style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin fa-3x" style={{ color: '#157F3C' }}></i>
            <p>Chargement des pharmacies...</p>
          </div>
        ) : (
          <div className="pharmacy-grid">
            {filteredResults.length > 0 ? (
              filteredResults.map((pharma) => {
                const garde = getGardeInfo(pharma.horaires);
                return (
                  <div key={pharma.id} className="pharmacy-card">
                    <div className="card-top">
                      <div className="pharma-info">
                        <h3>{pharma.nom}</h3>
                        <p className="address">
                          <i className="fa-solid fa-location-dot"></i> {pharma.quartier}, {pharma.ville}, {pharma.commune}
                        </p>
                      </div>
                      <div className="pharma-badges">
                        <span className={garde.active ? "badge-garde" : "badge-not-garde"}>
                          {garde.active ? "de garde" : "pas de garde"}
                        </span>
                      </div>
                    </div>

                    <div className="card-body">
                      <p className="garde-time">
                        <i className="fa-regular fa-clock"></i> {garde.label}
                      </p>

                      <div className="days-list">
                        {daysShort.map((day, idx) => {
                          const isGardeOnThisDay = pharma.horaires?.find((h: any) => h.jour === daysFull[idx] && h.isGarde);
                          return (
                            <span key={day} className={`day-item ${idx === currentDayIndex ? 'current' : ''} ${isGardeOnThisDay ? 'highlight' : ''}`}>
                              {day}
                            </span>
                          );
                        })}
                      </div>

                      <div className="momo-box">
                        <i className="fa-solid fa-money-bill-transfer"></i> MoMo : {pharma.momo || 'N/A'}
                      </div>
                    </div>

                    <div className="card-footer">
                      {/* BOUTON APPEL AVEC TRACKING */}
                      <a 
                        href={`tel:+229${pharma.telephone}`} 
                        className="btn-action call"
                        onClick={() => trackAction(pharma.id, 'appel')}
                      >
                        <i className="fa-solid fa-phone"></i> Appeler
                      </a>

                      <a 
                        href={`https://wa.me/229${pharma.whatsapp?.replace(/\s+/g, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-action whatsapp"
                      >
                        <i className="fa-brands fa-whatsapp"></i> WhatsApp
                      </a>

                      {/* BOUTON MAPS AVEC TRACKING */}
                      <a 
                        href={pharma.googleMapsLink || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`btn-action maps ${!pharma.googleMapsLink ? 'disabled' : ''}`}
                        onClick={(e) => {
                          if (!pharma.googleMapsLink) {
                            e.preventDefault();
                          } else {
                            trackAction(pharma.id, 'maps');
                          }
                        }}
                        style={{ opacity: pharma.googleMapsLink ? 1 : 0.5, cursor: pharma.googleMapsLink ? 'pointer' : 'not-allowed' }}
                      >
                        <i className="fa-solid fa-location-arrow"></i> Itinéraire
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-results" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                <i className="fa-solid fa-face-frown fa-3x" style={{ color: '#cbd5e1' }}></i>
                <p>Aucune pharmacie trouvée pour cette sélection.</p>
                <button onClick={() => setFilteredResults(allPharmacies)} style={{ color: '#157F3C', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'underline' }}>Voir tout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}