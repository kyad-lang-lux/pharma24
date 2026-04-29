"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Fonction pour vérifier si le lien est actif
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="navbar">
      <div className="container nav-container">
        {/* Logo */}
        <Link href="/" className="nav-logo">
          <div className="logo-icon">
            {/* C'est cette icône précise qui correspond à ton image */}
            {/* <i className="fa-solid fa-plus"></i> */}
            <svg  xmlns="http://www.w3.org/2000/svg" width={24} height={24} 
fill={"currentColor"} viewBox={"0 0 24 24"}>
{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}
<path d="M21 7.99h-5V3c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v4.99H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h5V21c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-5.01h5c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1m-1 6h-5c-.55 0-1 .45-1 1V20h-4v-5.01c0-.55-.45-1-1-1H4v-4h5c.55 0 1-.45 1-1V4h4v4.99c0 .55.45 1 1 1h5z"></path>
</svg>
          </div>
          <div className="logo-text">
            Pharma<span>24</span>
          </div>
        </Link>

        {/* Bouton Hamburger Mobile */}
        <button className="nav-toggle" onClick={toggleMenu}>
          <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
        </button>

        {/* Liens de navigation */}
        <div className={`nav-menu ${isOpen ? "open" : ""}`}>
          <Link
            href="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Accueil
          </Link>
          <Link
            href="/pharmacies"
            className={`nav-link ${isActive("/pharmacies") ? "active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Pharmacies de garde
          </Link>
          <Link
            href="/carte"
            className={`nav-link ${isActive("/carte") ? "active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Carte
          </Link>
          <Link
            href="/posologie"
            className={`nav-link ${isActive("/posologie") ? "active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Posologie
          </Link>
          <Link
            href="/scanner"
            className={`nav-link ${isActive("/scanner") ? "active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Scanner
          </Link>
          <Link
            href="/contact"
            className={`nav-link ${isActive("/contact") ? "active" : ""}`}
            onClick={() => setIsOpen(false)} style={{color:"#fff", backgroundColor: '#2B8A4E', padding: '7px 15px', borderRadius: '50px'}}
          >
            Contact 
          </Link>

          {/* Bouton Espace Pharmacie */}
          <Link href="/connexion" onClick={() => setIsOpen(false)}>
            <button className="btn-auth">
              <i className="fa-regular fa-user"></i>
              Espace Pharmacie
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
