"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-icon">
            <i className='bx bx-plus-medical'></i>
          </div>
        </div>
        
        <h1>Connexion</h1>
        <p className="subtitle">Heureux de vous revoir !</p>

        <button className="btn-google">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="Google" />
          Continuer avec Google
        </button>

        <div className="auth-divider">
          <span>ou</span>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>Email</label>
            <div className="input-field-wrapper">
              <input type="email" placeholder="votre@email.com" required />
            </div>
          </div>

          <div className="input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label>Mot de passe</label>
              <Link href="#" style={{ fontSize: '13px', color: '#10b981' }}>Oublié ?</Link>
            </div>
            <div className="input-field-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                required 
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? "bx bx-hide" : "bx bx-show"}></i>
              </button>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            Se connecter
          </button>
        </form>

        <p className="auth-footer">
          Nouveau sur Pharma24 ? <Link href="/inscription">Créer un compte</Link>
        </p>
      </div>
    </div>
  );
}