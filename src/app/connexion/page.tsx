"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ marginTop: "-130px"}}>
        <div className="auth-logo">
          <div className="logo-icon">
            {/* <i className='bx bx-plus-medical'></i> */}
             <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} 
fill={"currentColor"} viewBox={"0 0 24 24"}>
{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}
<path d="M21 7.99h-5V3c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v4.99H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h5V21c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-5.01h5c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1m-1 6h-5c-.55 0-1 .45-1 1V20h-4v-5.01c0-.55-.45-1-1-1H4v-4h5c.55 0 1-.45 1-1V4h4v4.99c0 .55.45 1 1 1h5z"></path>
</svg>
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
              <input type="email" placeholder="votrepharmacie@gmail.com" required />
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