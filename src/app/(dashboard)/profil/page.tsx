"use client";
import React from 'react';

export default function ProfilPage() {
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
            <div className="input-group">
              <label>Nouveau mot de passe</label>
              <input 
                type="password" 
                className="db-input" 
                placeholder="........" 
              />
            </div>
            <div className="input-group">
              <label>Confirmer le mot de passe</label>
              <input 
                type="password" 
                className="db-input" 
                placeholder="........" 
              />
            </div>
            <button type="submit" className="db-btn-primary">
              Modifier le mot de passe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}