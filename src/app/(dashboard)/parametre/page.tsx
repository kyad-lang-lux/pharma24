"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

export default function ProfilPage() {
  const router = useRouter();
  
  // États pour gérer la visibilité des mots de passe
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // États pour le formulaire
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // --- LOGIQUE DE DÉCONNEXION ---
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (res.ok) {
        // Redirection vers la page de connexion après déconnexion réussie
        router.push("/connexion"); 
        router.refresh();
      }
    } catch (err) {
      console.error("Erreur lors de la déconnexion", err);
    }
  };

  // --- FONCTION POUR MODIFIER LE MOT DE PASSE ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (newPassword !== confirmPassword) {
      return setMessage({ type: "error", text: "Les mots de passe ne correspondent pas." });
    }

    if (newPassword.length < 6) {
      return setMessage({ type: "error", text: "Le mot de passe doit contenir au moins 6 caractères." });
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Mot de passe mis à jour avec succès !" });
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ type: "error", text: data.error || "Une erreur est survenue." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Erreur de connexion au serveur." });
    } finally {
      setLoading(false);
    }
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
          
          {/* Affichage des messages */}
          {message.text && (
            <div style={{ 
              padding: '10px 20px', 
              margin: '10px 20px', 
              borderRadius: '8px', 
              fontSize: '0.9rem',
              backgroundColor: message.type === "error" ? '#fef2f2' : '#f0fdf4',
              color: message.type === "error" ? '#dc2626' : '#16a34a',
              border: `1px solid ${message.type === "error" ? '#fee2e2' : '#dcfce7'}`
            }}>
              {message.text}
            </div>
          )}

          <form className="card-body" onSubmit={handleSubmit}>
            
            {/* Nouveau mot de passe */}
            <div className="input-group">
              <label>Nouveau mot de passe</label>
              <div className="password-input-wrapper" style={{ position: 'relative' }}>
                <input 
                  type={showNewPass ? "text" : "password"} 
                  className="db-input" 
                  placeholder="........" 
                  style={{ width: '100%' }}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
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

            <button type="submit" className="db-btn-primary" disabled={loading}>
              {loading ? "Mise à jour..." : "Modifier le mot de passe"}
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
              color: '#fff', 
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