"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import "@/app/dashboard.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Fonction de déconnexion
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/connexion");
        router.refresh(); // Force le middleware à re-vérifier l'accès
      }
    } catch (err) {
      console.error("Erreur déconnexion:", err);
    }
  };

  const navLinks = [
    { name: 'Accueil', href: '/dashboard', icon: 'fa fa-home' },
    { name: 'Ma pharmacie', href: '/mapharmacie', icon: 'fa-solid fa-notes-medical' },
    { name: 'Abonnement', href: '/abonnement', icon: 'fa fa-star' },
    { name: 'Rapports', href: '/rapports', icon: 'fa fa-chart-pie' },
    { name: 'Parametres', href: '/parametre', icon: 'fa fa-cog' },
  ];

  return (
    <div className="db-container">
      {/* SIDEBAR - Desktop */}
      <aside className="db-sidebar">
        <Link href="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="db-logo" style={{ cursor: 'pointer' }}>
            <div className="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>
                <path d="M21 7.99h-5V3c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v4.99H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h5V21c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-5.01h5c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1m-1 6h-5c-.55 0-1 .45-1 1V20h-4v-5.01c0-.55-.45-1-1-1H4v-4h5c.55 0 1-.45 1-1V4h4v4.99c0 .55.45 1 1 1h5z"></path>
              </svg>
            </div>
            <span><span className='noir'>Pharma</span>24</span>
          </div>
        </Link>

        <nav className="db-nav">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`db-nav-item ${pathname === link.href ? 'active' : ''}`}
            >
              <i className={link.icon}></i>
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className="db-sidebar-footer">
          {/* <Link href="/parametre" className="db-footer-link">
            <i className="fa fa-cog"></i>
            <span>Parametres</span> 
          </Link> */}
          <Link href="/" className="db-footer-link">
            <i className="fa fa-house"></i>
            <span>Retour au site</span> 
          </Link>
          <button className="db-logout-btn" onClick={handleLogout}>
            <i className="fa fa-arrow-right-from-bracket"></i>
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      <div className="db-main">
        {/* TOPBAR - Mobile */}
        <header className="db-topbar">
          <div className="db-logo-mobile">
            <div className="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>
                <path d="M21 7.99h-5V3c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v4.99H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h5V21c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-5.01h5c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1m-1 6h-5c-.55 0-1 .45-1 1V20h-4v-5.01c0-.55-.45-1-1-1H4v-4h5c.55 0 1-.45 1-1V4h4v4.99c0 .55.45 1 1 1h5z"></path>
              </svg>
            </div>
            <span><span className='noir'>Pharma</span>24</span>
          </div>
          <button className="db-mobile-logout" onClick={handleLogout}>
             <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </header>

        <main className="db-content">
          {children}
        </main>

        {/* TAB BAR - Mobile (Bas de l'écran) */}
        <nav className="db-tabbar">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`db-tab-item ${pathname === link.href ? 'active' : ''}`}
            >
              <i className={link.icon}></i>
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}