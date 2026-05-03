"use client";
import React, { useState, useMemo, useEffect } from 'react';

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

export default function MaPharmacie() {
  const joursSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const [toast, setToast] = useState<{ type: "success" | "error", msg: string } | null>(null);

// Petit effet pour faire disparaître le popup après 3 secondes
useEffect(() => {
  if (toast) {
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }
}, [toast]);
  // --- ÉTATS ---
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    departement: BENIN_DATA[0].departement,
    commune: BENIN_DATA[0].communes[0].nom,
    ville: BENIN_DATA[0].communes[0].villes[0].nom,
    quartier: "",
    telephone: "",
    whatsapp: "",
    momo: "",
    isOpen: true
  });

  // État des horaires (objet indexé par jour)
  const [horaires, setHoraires] = useState<any>(
    joursSemaine.reduce((acc, jour) => ({
      ...acc,
      [jour]: { isGarde: false, isFullDay: false, heureDebut: "08:00", heureFin: "20:00" }
    }), {})
  );

  // --- CHARGEMENT INITIAL ---
  useEffect(() => {
    async function loadData() {
      const res = await fetch('/api/pharmacie');
      const data = await res.json();
      if (data.pharma) {
        setForm(data.pharma);
        if (data.horaires.length > 0) {
          const hMap = { ...horaires };
          data.horaires.forEach((h: any) => { hMap[h.jour] = h; });
          setHoraires(hMap);
        }
      }
    }
    loadData();
  }, []);

  // --- LOGIQUE FILTRAGE ---
  const communesDispo = useMemo(() => BENIN_DATA.find(d => d.departement === form.departement)?.communes || [], [form.departement]);
  const villesDispo = useMemo(() => communesDispo.find(c => c.nom === form.commune)?.villes || [], [form.commune, communesDispo]);
  const quartiersDispo = useMemo(() => villesDispo.find(v => v.nom === form.ville)?.quartiers || [], [form.ville, villesDispo]);

  // --- HANDLERS ---
  const updateHoraire = (jour: string, field: string, value: any) => {
    setHoraires((prev: any) => ({
      ...prev,
      [jour]: { ...prev[jour], [field]: value }
    }));
  };

 const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  const payload = {
    info: form,
    horaires: Object.keys(horaires).map(jour => ({ jour, ...horaires[jour] }))
  };

  try {
    const res = await fetch('/api/pharmacie', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    
    if (res.ok) {
      setToast({ type: "success", msg: "Informations mises à jour avec succès !" });
    } else {
      setToast({ type: "error", msg: "Erreur lors de la sauvegarde." });
    }
  } catch (err) {
    setToast({ type: "error", msg: "Erreur de connexion au serveur." });
  } finally {
    setLoading(false);
  }
};

  return ( 
    <div className="pharma-page">
      <div className="sub-header">
        <h1>Ma pharmacie</h1>
        <p>Gérez les informations et les horaires de votre pharmacie.</p>
      </div>

      <div className="pharma-card">
        <h2 className="card-title">Modifier votre pharmacie</h2>
        <form className="pharma-form" onSubmit={handleSave}>
          <div className="form-row">
            <div className="input-group">
              <label>Nom de la pharmacie *</label>
              <input 
                type="text" className="db-input" 
                value={form.nom} 
                onChange={(e) => setForm({...form, nom: e.target.value})} 
                required 
              />
            </div>
          </div>

          <div className="form-row flex-row">
            <div className="input-group half">
              <label>Département *</label>
              <select className="db-input" value={form.departement} onChange={(e) => setForm({...form, departement: e.target.value, commune: "", ville: "", quartier: ""})}>
                {BENIN_DATA.map(d => <option key={d.departement} value={d.departement}>{d.departement}</option>)}
              </select>
            </div>
            <div className="input-group half">
              <label>Commune *</label>
              <select className="db-input" value={form.commune} onChange={(e) => setForm({...form, commune: e.target.value, ville: "", quartier: ""})}>
                <option value="">Sélectionner...</option>
                {communesDispo.map(c => <option key={c.nom} value={c.nom}>{c.nom}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row flex-row">
            <div className="input-group half">
              <label>Ville *</label>
              <select className="db-input" value={form.ville} onChange={(e) => setForm({...form, ville: e.target.value, quartier: ""})}>
                <option value="">Sélectionner...</option>
                {villesDispo.map(v => <option key={v.nom} value={v.nom}>{v.nom}</option>)}
              </select>
            </div>
            <div className="input-group half">
              <label>Quartier *</label>
              <select className="db-input" value={form.quartier} onChange={(e) => setForm({...form, quartier: e.target.value})}>
                <option value="">Sélectionner...</option>
                {quartiersDispo.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row flex-row">
            <div className="input-group half">
              <label>Téléphone *</label>
              <input type="text" className="db-input" value={form.telephone} onChange={(e) => setForm({...form, telephone: e.target.value})} />
            </div>
            <div className="input-group half">
              <label>WhatsApp</label>
              <input type="text" className="db-input" value={form.whatsapp} onChange={(e) => setForm({...form, whatsapp: e.target.value})} />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Numéro MoMo (paiement mobile)</label>
              <input type="text" className="db-input" value={form.momo} onChange={(e) => setForm({...form, momo: e.target.value})} />
            </div>
          </div>

          <div className="toggle-container">
            <span>Pharmacie ouverte</span>
            <label className="switch">
              <input type="checkbox" checked={form.isOpen} onChange={(e) => setForm({...form, isOpen: e.target.checked})} />
              <span className="slider round"></span>
            </label>
          </div>

          <button type="submit" className="btn-primary-sub" disabled={loading}>
  {loading ? (
    <>
      <i className="fa-solid fa-spinner fa-spin"></i> Enregistrement...
    </>
  ) : (
    <>
      <i className="fa-solid fa-floppy-disk"></i> Sauvegarder
    </>
  )}
</button>
        </form>
      </div>

      {/* Section Horaires de Garde */}
      <div className="pharma-card mt-20">
        <h2 className="card-title">Horaires de garde</h2>
        <p className="card-subtitle">Horaires de garde par jour</p>
        <p className="card-hint">Activez les jours où votre pharmacie est de garde et définissez les horaires.</p>

        <div className="hours-list">
          {joursSemaine.map((jour) => (
            <div key={jour} className={`hour-item ${horaires[jour].isGarde ? 'active-day' : ''}`}>
              <div className="hour-header">
                <span className="day-name">{jour}</span>
                <label className="switch mini">
                  <input 
                    type="checkbox" 
                    checked={horaires[jour].isGarde} 
                    onChange={(e) => updateHoraire(jour, 'isGarde', e.target.checked)} 
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              
              {horaires[jour].isGarde && (
                <div className="hour-content-fade">
                  <div className="hour-options">
                    <label className="checkbox-custom">
                      <input 
                        type="checkbox" 
                        checked={horaires[jour].isFullDay} 
                        onChange={(e) => updateHoraire(jour, 'isFullDay', e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      Journée complète (00h — 23h)
                    </label>
                  </div>

                  {!horaires[jour].isFullDay && (
                    <div className="time-range flex-row">
                      <div className="input-group half">
                        <label>Début</label>
                        <div className="time-input">
                          <input 
                            type="time" 
                            value={horaires[jour].heureDebut} 
                            onChange={(e) => updateHoraire(jour, 'heureDebut', e.target.value)}
                          />
                          <i className="fa-regular fa-clock"></i>
                        </div>
                      </div>
                      <div className="input-group half">
                        <label>Fin</label>
                        <div className="time-input">
                          <input 
                            type="time" 
                            value={horaires[jour].heureFin} 
                            onChange={(e) => updateHoraire(jour, 'heureFin', e.target.value)}
                          />
                          <i className="fa-regular fa-clock"></i>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div> 

        <button className="btn-primary-sub mt-20" onClick={handleSave} disabled={loading}>
  {loading ? (
    <>
      <i className="fa-solid fa-spinner fa-spin"></i> Sauvegarde en cours...
    </>
  ) : (
    <>
      <i className="fa-solid fa-floppy-disk"></i> Sauvegarder les horaires
    </>
  )}
</button>
      </div>















      {toast && (
  <div style={{
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    padding: '15px 25px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#fff',
    fontWeight: '500',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    backgroundColor: toast.type === "success" ? '#10b981' : '#ef4444',
    animation: 'slideIn 0.3s ease-out'
  }}>
    <i className={toast.type === "success" ? "fa-solid fa-circle-check" : "fa-solid fa-circle-xmark"}></i>
    {toast.msg}
    
    <style jsx>{`
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `}</style>
  </div>
)}


    </div>

    
  );
}