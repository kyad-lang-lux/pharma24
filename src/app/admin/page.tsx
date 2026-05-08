"use client";
import React, { useState, useEffect } from 'react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ÉTATS POUR LES MÉDICAMENTS (POSOLOGIES)
  const [allMeds, setAllMeds] = useState<any[]>([]);
  const [showPosoForm, setShowPosoForm] = useState(false);
  const [editingMed, setEditingMed] = useState<any>(null); // null = ajout, non-null = modification
  const [newMed, setNewMed] = useState({
    nom: '', categorie: '', indication: '', dosageAdulte: '', dosageEnfant: '', precaution: ''
  });

  // Chargement des pharmacies
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (Array.isArray(data)) setAllUsers(data);
    } catch (err) { console.error("Erreur users:", err); } 
    finally { setLoading(false); }
  };

  // Chargement des médicaments (Historique)
  const fetchMeds = async () => {
    try {
      const res = await fetch("/api/medicaments");
      const data = await res.json();
      if (Array.isArray(data)) setAllMeds(data);
    } catch (err) { console.error("Erreur meds:", err); }
  };

  useEffect(() => {
    const session = localStorage.getItem('pharma24_admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
      fetchUsers();
      fetchMeds();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === "Admin" && credentials.password === "Pharma24#0a") {
      setIsAuthenticated(true);
      localStorage.setItem('pharma24_admin_session', 'true');
      fetchUsers();
      fetchMeds();
      setError('');
    } else { setError('Identifiants incorrects'); }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('pharma24_admin_session');
  };

  // Actions Pharmacies
  const updateStatus = async (id: number, action: "approve" | "reject") => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action })
      });
      if (res.ok) fetchUsers();
    } catch (err) { alert("Erreur"); }
  };

  // ACTIONS MÉDICAMENTS (Ajout / Modif / Suppr)
  const handleAddOrEditMed = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingMed ? "PATCH" : "POST";
    const body = editingMed ? { ...editingMed } : { ...newMed };

    try {
      const res = await fetch("/api/medicaments", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        alert(editingMed ? "Modifié avec succès !" : "Publié avec succès !");
        closePosoModal();
        fetchMeds();
      }
    } catch (err) { alert("Erreur lors de l'opération"); }
  };

  const deleteMed = async (id: number) => {
    if (!confirm("Supprimer ce médicament de l'historique ?")) return;
    try {
      const res = await fetch(`/api/medicaments?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchMeds();
    } catch (err) { alert("Erreur suppression"); }
  };

  const openEditModal = (med: any) => {
    setEditingMed(med);
    setShowPosoForm(true);
  };

  const closePosoModal = () => {
    setShowPosoForm(false);
    setEditingMed(null);
    setNewMed({ nom: '', categorie: '', indication: '', dosageAdulte: '', dosageEnfant: '', precaution: '' });
  };

  const pending = allUsers.filter(u => !u.isValidated);
  const confirmed = allUsers.filter(u => u.isValidated);

  if (!isAuthenticated) {
    return (
      <div className="login-screen">
        <form className="login-box" onSubmit={handleLogin}>
          <h3>Admin Login</h3>
          <input type="text" placeholder="Username" autoComplete="off" onChange={(e) => setCredentials({...credentials, username: e.target.value})} />
          <div className="pass-container">
            <input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="eye-btn"><i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i></button>
          </div>
          {error && <p className="err">{error}</p>}
          <button type="submit" className="login-btn">Entrer</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <header className="dash-header">
        <div>
          <h1>Dashboard Admin</h1>
          <p>Gestion des accès Pharma24</p>
        </div>
        <div style={{display: 'flex', flexDirection:" column", gap: '10px'}}>
           <button 
             onClick={() => setShowPosoForm(true)}
             style={{backgroundColor: '#2B8A4E', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer'}}
           >
             <i className="fa-solid fa-plus"></i> Publier Posologie
           </button>

           
           <button className="logout-mini" onClick={handleLogout}>
             <i className="fa-solid fa-power-off"></i> Déconnexion
           </button>
        </div>
      </header>

      <div className="mini-stats">
        {/* <div className="m-card"><span>Visiteurs</span><strong>5,420</strong></div> */}
        <div className="m-card"><span>Total Pharmacies</span><strong>{confirmed.length}</strong></div>
        <div className="m-card warning"><span>En attente</span><strong>{pending.length}</strong></div>
      </div>

      {/* SECTION 1: EN ATTENTE */}
      <section className="table-section">
        <div className="table-head">
          <h2><i className="fa-solid fa-clock"></i> Demandes en attente ({pending.length})</h2>
        </div>
        <div className="list-container">
          {pending.length === 0 && !loading && <p className="empty">Aucune demande.</p>}
          {pending.map((pharma) => (
            <div className="pharma-row" key={pharma.id}>
              <div className="pharma-info"><span className="p-name">{pharma.nom}</span><span className="p-email">{pharma.email}</span></div>
              <div className="p-actions">
                <button className="btn-v" onClick={() => updateStatus(pharma.id, "approve")}>Confirmer</button>
                <button className="btn-r" onClick={() => updateStatus(pharma.id, "reject")}>Refuser</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: CONFIRMÉES */}
      <section className="table-section" style={{ marginTop: '30px' }}>
        <div className="table-head"><h2 style={{ color: '#2B8A4E' }}><i className="fa-solid fa-circle-check"></i> Pharmacies Confirmées ({confirmed.length})</h2></div> 
        <div className="list-container">
          {confirmed.map((pharma) => (
            <div className="pharma-row confirmed" key={pharma.id}>
              <div className="pharma-info"><span className="p-name">{pharma.nom}</span><span className="p-email">{pharma.email}</span></div>
              <span className="p-status">Actif</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: HISTORIQUE POSOLOGIES */}
      <section className="table-section" style={{ marginTop: '30px' }}>
        <div className="table-head">
          <h2><i className="fa-solid fa-pills"></i> Historique des Posologies ({allMeds.length})</h2>
        </div>
        <div className="list-container">
          {allMeds.length === 0 && <p className="empty">Aucun médicament enregistré.</p>}
          {allMeds.map((med) => (
            <div className="pharma-row" key={med.id}>
              <div className="pharma-info">
                <span className="p-name">{med.nom}</span>
                <span className="p-email">{med.categorie}</span>
              </div>
              <div className="p-actions">
                <button className="btn-v" onClick={() => openEditModal(med)}>Modifier</button>
                <button className="btn-r" onClick={() => deleteMed(med.id)}>Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL UNIQUE (AJOUT ET MODIFICATION) */}
      {showPosoForm && (
        <div style={{position:'fixed', top:0, left:0, width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0.8)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}}>
          <div style={{backgroundColor:'white', width:'100%', maxWidth:'500px', padding:'30px', borderRadius:'15px', position:'relative'}}>
            <button onClick={closePosoModal} style={{position:'absolute', right:'20px', top:'20px', border:'none', background:'none', fontSize:'1.5rem', cursor:'pointer'}}>&times;</button>
            <h2 style={{marginBottom:'20px'}}>{editingMed ? 'Modifier Posologie' : 'Nouveau Médicament'}</h2>
            
            <form onSubmit={handleAddOrEditMed} style={{display:'flex', flexDirection:'column', gap:'12px'}}>
              <input 
                type="text" placeholder="Nom du médicament" required 
                value={editingMed ? editingMed.nom : newMed.nom}
                onChange={e => editingMed ? setEditingMed({...editingMed, nom: e.target.value}) : setNewMed({...newMed, nom: e.target.value})} 
                style={{padding:'12px', borderRadius:'8px', border:'1px solid #ddd'}} 
              />
              <input 
                type="text" placeholder="Catégorie" required 
                value={editingMed ? editingMed.categorie : newMed.categorie}
                onChange={e => editingMed ? setEditingMed({...editingMed, categorie: e.target.value}) : setNewMed({...newMed, categorie: e.target.value})} 
                style={{padding:'12px', borderRadius:'8px', border:'1px solid #ddd'}} 
              />
              <textarea 
                placeholder="Indication" required 
                value={editingMed ? editingMed.indication : newMed.indication}
                onChange={e => editingMed ? setEditingMed({...editingMed, indication: e.target.value}) : setNewMed({...newMed, indication: e.target.value})} 
                style={{padding:'12px', borderRadius:'8px', border:'1px solid #ddd', minHeight:'60px'}} 
              />
              <input 
                type="text" placeholder="Dosage Adulte" required 
                value={editingMed ? editingMed.dosageAdulte : newMed.dosageAdulte}
                onChange={e => editingMed ? setEditingMed({...editingMed, dosageAdulte: e.target.value}) : setNewMed({...newMed, dosageAdulte: e.target.value})} 
                style={{padding:'12px', borderRadius:'8px', border:'1px solid #ddd'}} 
              />
              <input 
                type="text" placeholder="Dosage Enfant" required 
                value={editingMed ? editingMed.dosageEnfant : newMed.dosageEnfant}
                onChange={e => editingMed ? setEditingMed({...editingMed, dosageEnfant: e.target.value}) : setNewMed({...newMed, dosageEnfant: e.target.value})} 
                style={{padding:'12px', borderRadius:'8px', border:'1px solid #ddd'}} 
              />
              <textarea 
                placeholder="Précautions" required 
                value={editingMed ? editingMed.precaution : newMed.precaution}
                onChange={e => editingMed ? setEditingMed({...editingMed, precaution: e.target.value}) : setNewMed({...newMed, precaution: e.target.value})} 
                style={{padding:'12px', borderRadius:'8px', border:'1px solid #ddd'}} 
              />
              <button type="submit" style={{backgroundColor:'#157F3C', color:'white', border:'none', padding:'15px', borderRadius:'8px', fontWeight:'bold', cursor:'pointer', marginTop:'10px'}}>
                {editingMed ? "Enregistrer les modifications" : "Publier sur le site"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}