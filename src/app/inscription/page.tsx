"use client";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [nom, setNom] = useState(""); // Nouvel état pour le nom
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // État de succès
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };

  const isPasswordValid = Object.values(checks).every(Boolean);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSubmitted(true); // Affiche la div d'attente
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Une erreur est survenue lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  // SI INSCRIPTION RÉUSSIE : ON AFFICHE LE MESSAGE D'ATTENTE
  if (isSubmitted) {
    return (
      <div className="auth-page">
        <div className="auth-card success-card">
          <div className="success-icon">
            <i className="fa-solid fa-clock-rotate-left"></i>
          </div>
          <h1>Demande envoyée !</h1>
          <p>Votre compte <strong>{nom}</strong> a été créé avec succès.</p>
          <div className="info-box">
             <p>Par mesure de sécurité, un administrateur doit valider votre pharmacie. Vous recevrez un mail dès que votre accès sera activé.</p>
          </div>
          <Link href="/" className="btn-submit" style={{ textAlign: 'center', textDecoration: 'none' }}>
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ marginTop: "-10px", marginBottom: "40px"}}>
        <div className="auth-logo">
          <div className="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>
              <path d="M21 7.99h-5V3c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v4.99H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h5V21c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-5.01h5c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1m-1 6h-5c-.55 0-1 .45-1 1V20h-4v-5.01c0-.55-.45-1-1-1H4v-4h5c.55 0 1-.45 1-1V4h4v4.99c0 .55.45 1 1 1h5z"></path>
            </svg>
          </div>
        </div>
        
        <h1>Inscription</h1>
        <p className="subtitle">Créez un compte pour enregistrer votre pharmacie</p>

        <button className="btn-google">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="Google" />
          S'inscrire avec Google
        </button>

        <div className="auth-divider"><span>ou avec votre email</span></div>

        <form onSubmit={handleRegister}>
          {error && <div className="error-msg" style={{color: 'red', marginBottom: '10px', fontSize: '0.8rem'}}>{error}</div>}
          
          <div className="input-group">
            <label>Nom de la pharmacie</label>
            <div className="input-field-wrapper">
              <input type="text" placeholder="Nom de la pharmacie" value={nom} onChange={(e) => setNom(e.target.value)} required />
            </div>
          </div>
          <div className="input-group">
            <label>Email</label>
            <div className="input-field-wrapper">
              <input type="email" placeholder="votrepharmacie@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="input-group">
            <label>Mot de passe</label>
            <div className="input-field-wrapper">
              <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                <i className={showPassword ? "bx bx-hide" : "bx bx-show"}></i>
              </button>
            </div>
          </div>

          <ul className="password-requirements">
            <li className={`requirement-item ${checks.length ? "valid" : ""}`}>
              <i className={`bx ${checks.length ? "bx-check-circle" : "bx-circle"}`}></i> 8 caractères minimum
            </li>
            <li className={`requirement-item ${checks.upper ? "valid" : ""}`}>
              <i className={`bx ${checks.upper ? "bx-check-circle" : "bx-circle"}`}></i> Une majuscule (A-Z)
            </li>
            <li className={`requirement-item ${checks.lower ? "valid" : ""}`}>
              <i className={`bx ${checks.lower ? "bx-check-circle" : "bx-circle"}`}></i> Une minuscule (a-z)
            </li>
            <li className={`requirement-item ${checks.number ? "valid" : ""}`}>
              <i className={`bx ${checks.number ? "bx-check-circle" : "bx-circle"}`}></i> Un chiffre (0-9)
            </li>
            <li className={`requirement-item ${checks.symbol ? "valid" : ""}`}>
              <i className={`bx ${checks.symbol ? "bx-check-circle" : "bx-circle"}`}></i> Un symbole (!@#$%...)
            </li>
          </ul>

          <button type="submit" className="btn-submit" disabled={!isPasswordValid || !email || loading}>
            {loading ? "Traitement..." : "S'inscrire"}
          </button>
        </form>

        <p className="auth-footer">
          Déjà un compte ? <Link href="/connexion">Connectez-vous</Link>
        </p>
      </div>
    </div>
  );
}