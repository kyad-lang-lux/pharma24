"use client";
import React, { useState, useEffect } from 'react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  // Listes de pharmacies (Simulation d'état local)
  const [pending, setPending] = useState([
    { id: 1, nom: "Pharmacie de l'Étoile", email: "etoile@gmail.com", date: "01/05/2026" },
    { id: 2, nom: "Pharmacie Saint Jean", email: "stjean@yahoo.fr", date: "02/05/2026" },
  ]);

  const [confirmed, setConfirmed] = useState([
    { id: 10, nom: "Pharmacie Fidjrossè", email: "fidjrosse@pharma.bj", date: "20/04/2026" }
  ]);

  // Vérifier la session au chargement
  useEffect(() => {
    const session = localStorage.getItem('pharma24_admin_session');
    if (session === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === "Pharma24admin" && credentials.password === "Pharma24#0a") {
      setIsAuthenticated(true);
      localStorage.setItem('pharma24_admin_session', 'true');
      setError('');
    } else {
      setError('Identifiants incorrects');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('pharma24_admin_session');
  };

  // Actions Boutons
  const approvePharma = (pharma: any) => {
    setConfirmed([...confirmed, pharma]);
    setPending(pending.filter(p => p.id !== pharma.id));
  };

  const rejectPharma = (id: number) => {
    setPending(pending.filter(p => p.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="login-screen">
        <form className="login-box" onSubmit={handleLogin}>
          <h3>Admin Login</h3>
          <input 
            type="text" 
            placeholder="Username" 
            autoComplete="off"
            onChange={(e) => setCredentials({...credentials, username: e.target.value})} 
          />
          <div className="pass-container">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="eye-btn">
              <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
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
        <button className="logout-mini" onClick={handleLogout}>
          <i className="fa-solid fa-power-off"></i> Déconnexion
        </button>
      </header>

      <div className="mini-stats">
        <div className="m-card"><span>Visiteurs</span><strong>5,420</strong></div>
        <div className="m-card"><span>Total Pharmacies</span><strong>{confirmed.length}</strong></div>
        <div className="m-card warning"><span>En attente</span><strong>{pending.length}</strong></div>
      </div>

      {/* SECTION 1: EN ATTENTE */}
      <section className="table-section">
        <div className="table-head">
          <h2><i className="fa-solid fa-clock"></i> Demandes en attente ({pending.length})</h2>
        </div>
        <div className="list-container">
          {pending.length === 0 && <p className="empty">Aucune demande en attente.</p>}
          {pending.map((pharma) => (
            <div className="pharma-row" key={pharma.id}>
              <div className="pharma-info">
                <span className="p-name">{pharma.nom}</span>
                <span className="p-email">{pharma.email}</span>
              </div>
              <div className="p-actions">
                <button className="btn-v" onClick={() => approvePharma(pharma)}>Confirmer</button>
                <button className="btn-r" onClick={() => rejectPharma(pharma.id)}>Refuser</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: CONFIRMÉES */}
      <section className="table-section" style={{ marginTop: '30px' }}>
        <div className="table-head">
          <h2 style={{ color: '#10b981' }}><i className="fa-solid fa-circle-check"></i> Pharmacies Confirmées ({confirmed.length})</h2>
        </div>
        <div className="list-container">
          {confirmed.map((pharma) => (
            <div className="pharma-row confirmed" key={pharma.id}>
              <div className="pharma-info">
                <span className="p-name">{pharma.nom}</span>
                <span className="p-email">{pharma.email}</span>
              </div>
              <span className="p-status">Actif</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}