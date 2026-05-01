"use client";
import React, { useState } from 'react';

export default function ProfilPage() {
  // États pour gérer la visibilité des mots de passe
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleLogout = () => {
    // Ajoutez ici votre logique de déconnexion (ex: suppression cookie, redirection)
    console.log("Déconnexion demandée...");
  };

  return (
    <div className="profile-wrapper">
      <h1 className="profile-title">Mon profil</h1>

      <div className="profile-container">
        {/* Section Adresse Email */}
        <div className="profile-card">
          <div className="card-header">
            <span> <i className="fa-regular fa-envelope"></i> Adresse email</span>
          </div>
          <div className="card-body">
            <input 
              type="email" 
              className="db-input disabled" 
              defaultValue="emrissoglo@gmail.com" 
              readOnly 
            />
          </div>
        </div>

        {/* Section Modifier le mot de passe */}
        <div className="profile-card">
          <div className="card-header">
            <span> <i className="fa-solid fa-lock"></i> Modifier le mot de passe</span>
          </div>
          <form className="card-body">
            
            {/* Nouveau mot de passe */}
            <div className="input-group">
              <label>Nouveau mot de passe</label>
              <div className="password-input-wrapper" style={{ position: 'relative' }}>
                <input 
                  type={showNewPass ? "text" : "password"} 
                  className="db-input" 
                  placeholder="........" 
                  style={{ width: '100%' }}
                />
                <i 
                  className={`fa-solid ${showNewPass ? 'fa-eye-slash' : 'fa-eye'}`}
                  onClick={() => setShowNewPass(!showNewPass)}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    color: '#64748b'
                  }}
                ></i>
              </div>
            </div>

            {/* Confirmer le mot de passe */}
            <div className="input-group">
              <label>Confirmer le mot de passe</label>
              <div className="password-input-wrapper" style={{ position: 'relative' }}>
                <input 
                  type={showConfirmPass ? "text" : "password"} 
                  className="db-input" 
                  placeholder="........" 
                  style={{ width: '100%' }}
                />
                <i 
                  className={`fa-solid ${showConfirmPass ? 'fa-eye-slash' : 'fa-eye'}`}
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    color: '#64748b'
                  }}
                ></i>
              </div>
            </div>

            <button type="submit" className="db-btn-primary">
              Modifier le mot de passe
            </button>
          </form>
        </div>

        {/* Bouton de déconnexion */}
        <div style={{ marginTop: '10px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <button 
            onClick={handleLogout}
            className="logout-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#fff', // Rouge pour l'alerte
              background: '#dc2626',
              border: '1px solid #fee2e2',
              padding: '12px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              width: '100%',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}